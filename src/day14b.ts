import { readFileSync } from "fs";

let field: Array<Array<string>> = [];
const widthAndHeight = 1000;
const offset = 0;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readInput(): string[] {
  const fileContent = readFileSync("day14.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function drawField() {
  let drawLine;
  for (let y = 0; y < widthAndHeight; y++) {
    drawLine = "";
    for (let x = 0; x < widthAndHeight; x++) {
      drawLine += field[y][x];
    }
    console.log(drawLine);
  }
}

async function simulate(): Promise<boolean> {
  let x = 500 - offset;
  let y = 0;

  while (true) {
    // if (y >= widthAndHeight - 1) {
    //   return false;
    // }
    field[y][x] = "o";
    // console.log("\x1Bc");
    // drawField();
    // await delay(5);
    if (field[y + 1][x] == ".") {
      field[y][x] = ".";
      y++;
    } else if (field[y + 1][x - 1] == ".") {
      field[y][x] = ".";
      y++;
      x--;
    } else if (field[y + 1][x + 1] == ".") {
      field[y][x] = ".";
      y++;
      x++;
    } else {
      break;
    }
  }
  if (x == 500 - offset && y == 0) return false;
  return true;
}

async function main() {
  for (let y = 0; y < widthAndHeight; y++) {
    field[y] = [];
    for (let x = 0; x < widthAndHeight; x++) {
      field[y].push(".");
    }
  }

  const lines = readInput();
  let floor = 0;
  for (const line of lines) {
    let points = line.split(" -> ");
    let lastX = -1;
    let lastY = -1;
    for (let point of points) {
      let elements = point.split(",");
      let nextX = +elements[0] - offset;
      let nextY = +elements[1];
      if (nextY > floor) floor = nextY;
      field[nextY][nextX] = "#";
      if (lastX != -1 && lastY != -1) {
        if (lastX == nextX) {
          if (nextY - lastY > 0) {
            for (let y = lastY; y < nextY; y++) {
              field[y][nextX] = "#";
            }
          } else {
            for (let y = lastY; y > nextY; y--) {
              field[y][nextX] = "#";
            }
          }
        } else if (lastY == nextY) {
          if (nextX - lastX > 0) {
            for (let x = lastX; x < nextX; x++) {
              field[nextY][x] = "#";
            }
          } else {
            for (let x = lastX; x > nextX; x--) {
              field[nextY][x] = "#";
            }
          }
        }
      }
      lastX = nextX;
      lastY = nextY;
    }
  }
  for (let x = 0; x < widthAndHeight; x++) {
    field[floor + 2][x] = "#";
  }

  let count = 0;
  while (await simulate()) {
    count++;
  }
  // drawField();
  console.log(count + 1);
}

main();
