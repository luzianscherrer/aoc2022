import { readFileSync } from "fs";

interface Directory {
  name: string;
  directories: Array<Directory>;
  files: Array<File>;
}

interface File {
  name: string;
  size: number;
}

let tree: Directory;
let directoryStack: Array<Directory> = [];

function readInput(): string[] {
  const fileContent = readFileSync("day7.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

let size: number;
function directorySize(node: Directory) {
  for (let file of node.files) {
    size += file.size;
  }
  for (let directory of node.directories) {
    directorySize(directory);
  }
}

let totalSize: number;
function traverseDirectories(node: Directory) {
  // console.log(`traversing ${node.name}`);
  size = 0;
  directorySize(node);
  // console.log(`size ${size}`);
  if (size <= 100000) totalSize += size;
  for (let directory of node.directories) {
    traverseDirectories(directory);
  }
}

async function main() {
  const lines = readInput();
  for (const line of lines) {
    if (/^\$ cd ([^.]+)$/.test(line)) {
      const matches = line.match(/\$ cd ([^.]+)/);
      let directory = { name: matches![1], directories: [], files: [] };
      if (tree === undefined) {
        tree = directory;
      } else {
        directoryStack[directoryStack.length - 1].directories.push(directory);
      }
      directoryStack.push(directory);
    } else if (/^\$ cd \.\.$/.test(line)) {
      directoryStack.pop();
    } else if (/^([0-9]+) ([^ ]+)$/.test(line)) {
      const matches = line.match(/^([0-9]+) ([^ ]+)$/);
      directoryStack[directoryStack.length - 1].files.push({
        name: matches![2],
        size: +matches![1],
      });
    }
  }
  // console.log(JSON.stringify(tree, null, 2));

  totalSize = 0;
  traverseDirectories(tree);
  console.log(`total: ${totalSize}`);
}

main();
