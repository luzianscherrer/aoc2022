import { readFileSync } from "fs";

let field: Array<Array<string>> = [];
const widthAndHeight = 160;

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
  let x = 500 - 400;
  let y = 0;

  while (true) {
    if (y >= widthAndHeight - 1) {
      return false;
    }
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
  for (const line of lines) {
    let points = line.split(" -> ");
    let lastX = -1;
    let lastY = -1;
    for (let point of points) {
      let elements = point.split(",");
      let nextX = +elements[0] - 400;
      let nextY = +elements[1];
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
  let count = 0;
  while (await simulate()) {
    count++;
  }
  console.log(count);
}

main();
