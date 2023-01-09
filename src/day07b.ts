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
let sizes: Array<number> = [];

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

function traverseDirectories(node: Directory) {
  // console.log(`traversing ${node.name}`);
  size = 0;
  directorySize(node);
  sizes.push(size);
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

  traverseDirectories(tree);

  sizes.sort(function (a, b) {
    return a - b;
  });
  let total = sizes.pop();
  for (let size of sizes) {
    if (70000000 - total! + size > 30000000) {
      console.log(size);
      break;
    }
  }
}

main();
