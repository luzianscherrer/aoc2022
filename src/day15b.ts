import { readFileSync } from "fs";

// answer was: x: 3103499 / y: 3391794 | 12413999391794

interface Line {
  sensorX: number;
  sensorY: number;
  beaconX: number;
  beaconY: number;
}
interface Range {
  lower: number;
  upper: number;
}

let ranges: Array<Range>;
let resultLine: number;
const searchLower = 2057220;
const searchUpper = 3000000;

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

  let y = resultLine;

  // for (let y = sensorY - distance; y <= sensorY + distance; y++) {
  if (sensorY + distance < resultLine) return;
  if (sensorY - distance > resultLine) return;
  if (sensorX - distance > searchUpper) return;
  if (sensorX + distance < searchLower) return;

  let start = sensorX - distance + Math.abs(y - sensorY);
  let length = distance * 2 + 1 - 2 * Math.abs(y - sensorY);

  // console.log(`realstart ${start} reallength: ${length}`);

  // console.log(`calcstart ${start} calclength: ${length}`);

  // let newLower = start;
  // let newUpper = start + length - 1;

  ranges.push({ lower: start, upper: start + length - 1 });

  // for (let range of ranges) {
  //   if (Math.max(range.lower, newLower) <= Math.min(range.upper, newUpper)) {
  //   }
  // }

  // if (y < sensorY) {
  //   start--;
  //   length += 2;
  // } else if (y >= sensorY) {
  //   start++;
  //   length -= 2;
  // }
  // }
}

function findBeacon(): boolean {
  // console.log(ranges);

  for (let x = searchLower; x <= searchUpper; x++) {
    let isInRange = false;
    for (let range of ranges) {
      if (x >= range.lower && x <= range.upper) {
        isInRange = true;
        break;
      }
    }
    if (isInRange == false) {
      console.log(`x: ${x} / y: ${resultLine} | ${x * 4000000 + resultLine}`);
      return true;
    }
  }

  // for (let range1 of ranges) {
  //   for (let range2 of ranges) {
  //   }
  // }
  // for (let x = searchLower + offsetX; x < searchUpper + offsetX; x++) {
  //   if (field[x] === ".") {
  //     console.log(`beacon x: ${x - offsetX} y:${resultLine}`);
  //     console.log(`result: ${(x - offsetX) * 4000000 + resultLine}`);
  //     return true;
  //   }
  // }
  return false;
}

async function main() {
  var sensors: Array<Line> = [];
  const lines = readInput();
  for (const line of lines) {
    // console.log(line);
    const matches = line.match(
      /.+x=([-0-9]+), y=([-0-9]+).+x=([-0-9]+), y=([-0-9]+)/
    );
    const sensorX = +matches![1];
    const sensorY = +matches![2];
    const beaconX = +matches![3];
    const beaconY = +matches![4];
    sensors.push({
      sensorX: sensorX,
      sensorY: sensorY,
      beaconX: beaconX,
      beaconY: beaconY,
    });
  }

  for (let y = searchLower; y < searchUpper; y++) {
    console.log(y);
    resultLine = y;

    ranges = [];

    for (const sensor of sensors) {
      drawArea(sensor.sensorX, sensor.sensorY, sensor.beaconX, sensor.beaconY);
    }

    if (findBeacon()) break;
  }
}

main();
