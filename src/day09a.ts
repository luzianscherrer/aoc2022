import { readFileSync } from "fs";

const START = "s";
const HEAD = "H";
const TAIL = "T";
const UNVISITED = ".";
const VISITED = "#";

interface Coordinate {
  x: number;
  y: number;
}

let field: Array<Array<string>>;
let head: Coordinate;
let tail: Coordinate;
let width: number;
let height: number;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readInput(): string[] {
  const fileContent = readFileSync("day9.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function drawField() {
  let drawLine;
  for (let y = height - 1; y >= 0; y--) {
    drawLine = "";
    for (let x = 0; x < width; x++) {
      if (x == head.x && y == head.y) {
        drawLine += HEAD;
      } else if (x == tail.x && y == tail.y) {
        drawLine += TAIL;
      } else {
        drawLine += field[y][x];
      }
    }
    console.log(drawLine);
  }
}

function adjustField() {
  for (let y = height - 1; y >= 0; y--) {
    if (!field[y]) field[y] = [];
    for (let x = 0; x < width; x++) {
      if (!field[y][x]) field[y][x] = UNVISITED;
    }
  }
}

async function main() {
  field = [[START]];
  head = { x: 0, y: 0 };
  tail = { x: 0, y: 0 };
  width = 1;
  height = 1;

  const lines = readInput();
  for (const line of lines) {
    const matches = line.match(/^([URDL]) ([0-9]+)$/);
    for (let i = 0; i < +matches![2]; i++) {
      console.log("\x1Bc");
      // console.log(`== move ${matches![1]} ==`);
      drawField();
      await delay(10);
      switch (matches![1]) {
        case "U":
          head.y++;
          if (head.y >= height) {
            height++;
            adjustField();
          }
          if (head.y - tail.y > 1) {
            tail.y++;
            if (head.x > tail.x) tail.x++;
            else if (head.x < tail.x) tail.x--;
          }
          break;
        case "R":
          head.x++;
          if (head.x >= width) {
            width++;
            adjustField();
          }
          if (head.x - tail.x > 1) {
            tail.x++;
            if (head.y > tail.y) tail.y++;
            else if (head.y < tail.y) tail.y--;
          }
          break;
        case "D":
          head.y--;
          if (head.y < 0) {
            field.unshift([]);
            height++;
            head.y = 0;
            tail.y++;
            adjustField();
          }
          if (tail.y - head.y > 1) {
            tail.y--;
            if (head.x > tail.x) tail.x++;
            else if (head.x < tail.x) tail.x--;
          }
          break;
        case "L":
          head.x--;
          if (head.x < 0) {
            for (let y = 0; y < height; y++) field[y].unshift(UNVISITED);
            width++;
            head.x = 0;
            tail.x++;
            adjustField();
          }
          if (tail.x - head.x > 1) {
            tail.x--;
            if (head.y > tail.y) tail.y++;
            else if (head.y < tail.y) tail.y--;
          }
          break;
      }
      field[tail.y][tail.x] = VISITED;
    }
  }
  // console.log("\x1Bc");
  // console.log(`== final ==`);
  drawField();

  let visitedCount = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (field[y][x] === VISITED) visitedCount++;
    }
  }
  console.log(`result: ${visitedCount}`);
}

main();
