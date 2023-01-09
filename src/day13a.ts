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
      pairSum += pair;
      stop = true;
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
        pairSum += pair;
        stop = true;
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
let pair = 0;
let pairSum = 0;

async function main() {
  const lines = readInput();
  for (const line of lines) {
    pair++;
    let matches = line.match(/(.*)\n(.*)/);
    console.log(`== pair ${pair} ==`);
    stop = false;
    compare(matches![1], matches![2]);
  }
  console.log(pairSum);
}

main();
