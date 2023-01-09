import { readFileSync } from "fs";

let sum = 0;
let crt = "";

function readInput(): string[] {
  const fileContent = readFileSync("day10.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function drawCrt(cycle: number, x: number) {
  if (cycle % 40 == x - 1 || cycle % 40 == x || cycle % 40 == x + 1) crt += "#";
  else crt += ".";
}

function checkSignal(cycle: number, x: number) {
  if ((cycle + 20) % 40 == 0) {
    sum += cycle * x;
  }
}

async function main() {
  let x = 1;
  let cycle = 0;

  const lines = readInput();
  for (const line of lines) {
    const matches = line.match(/^([a-z]+) ?([-0-9]+)?$/);
    if (matches![1] === "addx") {
      for (let i = 0; i < 2; i++) {
        drawCrt(cycle, x);
        cycle++;
        checkSignal(cycle, x);
      }
      x += +matches![2];
    } else if (matches![1] === "noop") {
      drawCrt(cycle, x);
      cycle++;
      checkSignal(cycle, x);
    }
  }

  console.log(sum);
  console.log(crt.match(/.{1,40}/g));
}

main();
