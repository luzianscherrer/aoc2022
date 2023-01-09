import { readFileSync } from "fs";

function readInput(): string[] {
  const fileContent = readFileSync("day13.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\n\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function compare(left: any, right: any) {
  console.log(`compare ${left} vs ${right}`);

  left = JSON.parse(left);
  right = JSON.parse(right);
  while (!stop) {
    let leftElement = left.shift();
    let rightElement = right.shift();
    if (leftElement === undefined && rightElement === undefined) {
      return;
    }
    if (leftElement == undefined) {
      console.log("left side ran out");
      stop = true;
      result = -1;
      return;
    }
    if (rightElement == undefined) {
      console.log("right side ran out");
      stop = true;
      return;
    }
    if (typeof leftElement == "object" && typeof rightElement == "object") {
      compare(JSON.stringify(leftElement), JSON.stringify(rightElement));
    }
    if (typeof leftElement == "number" && typeof rightElement == "number") {
      if (leftElement < rightElement) {
        console.log("left side is smaller");
        stop = true;
        result = -1;
        return;
      } else if (leftElement > rightElement) {
        console.log("right side is smaller");
        stop = true;
        return;
      } else {
        compare(JSON.stringify(left), JSON.stringify(right));
      }
    }
    if (typeof leftElement == "number" && typeof rightElement == "object") {
      compare(JSON.stringify([leftElement]), JSON.stringify(rightElement));
    }
    if (typeof leftElement == "object" && typeof rightElement == "number") {
      compare(JSON.stringify(leftElement), JSON.stringify([rightElement]));
    }
  }
}

let stop: boolean;
let result: number;

async function main() {
  let signals = ["[[2]]", "[[6]]"];
  const lines = readInput();
  for (const line of lines) {
    let matches = line.match(/(.*)\n(.*)/);
    signals.push(matches![1]);
    signals.push(matches![2]);
  }

  signals.sort((a, b) => {
    stop = false;
    result = 1;
    compare(a, b);
    return result;
  });
  console.log(signals);

  console.log((signals.indexOf("[[2]]") + 1) * (signals.indexOf("[[6]]") + 1));
}

main();
