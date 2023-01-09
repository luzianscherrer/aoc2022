import { readFileSync } from "fs";

function readInput(): string[] {
  const fileContent = readFileSync("day25.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function snafu2dec(snafu: string): number {
  let number = 0;
  let exp = 0;
  for (let i = snafu.length - 1; i >= 0; i--) {
    let base = 0;
    if (snafu.charAt(i) === "-") {
      base = -1;
    } else if (snafu.charAt(i) === "=") {
      base = -2;
    } else {
      base = +snafu.charAt(i);
    }
    number += base * Math.pow(5, exp);
    exp++;
  }
  return number;
}

function dec2snafu(dec: number): string {
  let snafu = "";
  let exp = 1;
  while (true) {
    let carryOver = false;
    let digit = dec % Math.pow(5, exp);
    if (
      digit >= Math.pow(5, exp - 1) * 0 &&
      digit <= Math.pow(5, exp - 1) * 2
    ) {
      snafu = `${digit / Math.pow(5, exp - 1)}${snafu}`;
    } else if (digit == Math.pow(5, exp - 1) * 3) {
      snafu = `=${snafu}`;
      carryOver = true;
    } else if (digit == Math.pow(5, exp - 1) * 4) {
      snafu = `-${snafu}`;
      carryOver = true;
    }
    if (dec / Math.pow(5, exp) < 1) {
      if (carryOver) {
        snafu = `1${snafu}`;
      }
      break;
    }
    dec -= digit;
    if (carryOver) {
      dec += Math.pow(5, exp);
    }
    exp++;
  }
  return snafu;
}

function parseInput() {
  let sum = 0;
  const lines = readInput();
  for (const line of lines) {
    console.log(`${line} -> ${snafu2dec(line)}`);
    sum += snafu2dec(line);
  }
  console.log(`sum dec: ${sum} sum snafu: ${dec2snafu(sum)}`);
  // for (let i = 1; i <= 10; i++) {
  //   console.log(`${i} -> ${dec2snafu(i)}`);
  // }
  // console.log(`${15} -> ${dec2snafu(15)}`);
  // console.log(`${20} -> ${dec2snafu(20)}`);
  // console.log(`${2022} -> ${dec2snafu(2022)}`);
  // console.log(`${12345} -> ${dec2snafu(12345)}`);
  // console.log(`${314159265} -> ${dec2snafu(314159265)}`);
}

async function main() {
  parseInput();
}

main();
