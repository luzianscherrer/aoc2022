import { readFileSync } from "fs";

let field: Array<string> = [];
const width = 10000000;
const height = 10000000;
const offsetX = 1000000;
const offsetY = 1000000;
const resultLine = 2000000;

function readInput(): string[] {
  const fileContent = readFileSync("day15.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function drawArea(
  sensorX: number,
  sensorY: number,
  beaconX: number,
  beaconY: number
) {
  const distance = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);

  let start = sensorX;
  let length = 1;
  for (let y = sensorY - distance; y <= sensorY + distance; y++) {
    if (y == resultLine + offsetY) {
      for (let x = start; x < start + length; x++) {
        if (field[x] !== "S" && field[x] !== "B") {
          field[x] = "#";
        }
      }
    }
    if (y < sensorY) {
      start--;
      length += 2;
    } else if (y >= sensorY) {
      start++;
      length -= 2;
    }
  }
}

function calcLine(): number {
  let total = 0;
  for (let x = 0; x < width; x++) {
    if (field[x] === "#" || field[x] === "S") {
      total++;
    }
  }
  return total;
}

async function main() {
  for (let x = 0; x < width; x++) {
    field.push(".");
  }

  const lines = readInput();
  for (const line of lines) {
    // console.log(line);
    const matches = line.match(
      /.+x=([-0-9]+), y=([-0-9]+).+x=([-0-9]+), y=([-0-9]+)/
    );
    const sensorX = +matches![1] + offsetX;
    const sensorY = +matches![2] + offsetY;
    const beaconX = +matches![3] + offsetX;
    const beaconY = +matches![4] + offsetY;
    if (sensorY == resultLine + offsetY) {
      field[sensorX] = "S";
    }
    if (beaconY == resultLine + offsetY) {
      field[beaconX] = "B";
    }
    drawArea(sensorX, sensorY, beaconX, beaconY);
  }
  console.log(calcLine());
}

main();
