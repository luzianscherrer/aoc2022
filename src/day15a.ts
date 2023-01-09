import { readFileSync } from "fs";

let field: Array<Array<string>> = [];
const width = 100;
const height = 100;
const offsetX = 20;
const offsetY = 20;

function readInput(): string[] {
  const fileContent = readFileSync("day15example.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function drawField() {
  let drawLine;
  for (let y = 0; y < height; y++) {
    drawLine = "";
    for (let x = 0; x < width; x++) {
      drawLine += field[y][x];
    }
    console.log(drawLine);
  }
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
    for (let x = start; x < start + length; x++) {
      if (field[y][x] !== "S" && field[y][x] !== "B") {
        field[y][x] = "#";
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

function calcLine(y: number): number {
  let total = 0;
  for (let x = 0; x < width; x++) {
    if (field[y][x] === "#" || field[y][x] === "S") {
      total++;
    }
  }
  return total;
}

async function main() {
  for (let y = 0; y < height; y++) {
    field[y] = [];
    for (let x = 0; x < width; x++) {
      field[y].push(".");
    }
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
    field[sensorY][sensorX] = "S";
    field[beaconY][beaconX] = "B";
    drawArea(sensorX, sensorY, beaconX, beaconY);
  }
  // drawField();
  console.log(calcLine(10 + offsetY));
}

main();
