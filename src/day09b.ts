import { readFileSync } from "fs";

const START = "s";
const UNVISITED = ".";
const VISITED = "#";

enum Direction {
  Up = 1,
  UpRight,
  Right,
  DownRight,
  Down,
  DownLeft,
  Left,
  UpLeft,
  Stay,
}

interface Coordinate {
  x: number;
  y: number;
}

let field: Array<Array<string>>;
let head: Coordinate;
let tail: Coordinate;
let longtail: Array<Coordinate>;
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
      let isInLongtail = false;
      for (let i = 0; i < 10; i++) {
        if (x == longtail[i].x && y == longtail[i].y && isInLongtail == false) {
          drawLine += `${i}`;
          isInLongtail = true;
        }
      }
      if (isInLongtail == false) {
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

function catchup(direction: Direction, position: number): Direction {
  let performedDirection: Direction = Direction.Stay;
  switch (direction) {
    case Direction.Up:
      if (longtail[position].y - longtail[position + 1].y > 1) {
        longtail[position + 1].y++;
        performedDirection = Direction.Up;
        if (longtail[position].x > longtail[position + 1].x) {
          longtail[position + 1].x++;
          performedDirection = Direction.UpRight;
        } else if (longtail[position].x < longtail[position + 1].x) {
          longtail[position + 1].x--;
          performedDirection = Direction.UpLeft;
        }
      }
      break;
    case Direction.UpRight:
      if (
        longtail[position].x - longtail[position + 1].x > 1 &&
        longtail[position].y - longtail[position + 1].y > 1
      ) {
        longtail[position + 1].x++;
        longtail[position + 1].y++;
        performedDirection = Direction.UpRight;
      } else if (longtail[position].x - longtail[position + 1].x > 1) {
        longtail[position + 1].x++;
        performedDirection = Direction.Right;
        if (longtail[position].y > longtail[position + 1].y) {
          longtail[position + 1].y++;
          performedDirection = Direction.UpRight;
        }
      } else if (longtail[position].y - longtail[position + 1].y > 1) {
        longtail[position + 1].y++;
        performedDirection = Direction.Up;
        if (longtail[position].x > longtail[position + 1].x) {
          longtail[position + 1].x++;
          performedDirection = Direction.UpRight;
        }
      }
      break;
    case Direction.Right:
      if (longtail[position].x - longtail[position + 1].x > 1) {
        longtail[position + 1].x++;
        performedDirection = Direction.Right;
        if (longtail[position].y > longtail[position + 1].y) {
          longtail[position + 1].y++;
          performedDirection = Direction.UpRight;
        } else if (longtail[position].y < longtail[position + 1].y) {
          longtail[position + 1].y--;
          performedDirection = Direction.DownRight;
        }
      }
      break;
    case Direction.DownRight:
      if (
        longtail[position].x - longtail[position + 1].x > 1 &&
        longtail[position + 1].y - longtail[position].y > 1
      ) {
        longtail[position + 1].x++;
        longtail[position + 1].y--;
        performedDirection = Direction.DownRight;
      } else if (longtail[position].x - longtail[position + 1].x > 1) {
        longtail[position + 1].x++;
        performedDirection = Direction.Right;
        if (longtail[position + 1].y > longtail[position].y) {
          longtail[position + 1].y--;
          performedDirection = Direction.DownRight;
        }
      } else if (longtail[position + 1].y - longtail[position].y > 1) {
        longtail[position + 1].y--;
        performedDirection = Direction.Down;
        if (longtail[position].x > longtail[position + 1].x) {
          longtail[position + 1].x++;
          performedDirection = Direction.DownRight;
        }
      }
      break;
    case Direction.Down:
      if (longtail[position + 1].y - longtail[position].y > 1) {
        longtail[position + 1].y--;
        performedDirection = Direction.Down;
        if (longtail[position].x > longtail[position + 1].x) {
          longtail[position + 1].x++;
          performedDirection = Direction.DownRight;
        } else if (longtail[position].x < longtail[position + 1].x) {
          longtail[position + 1].x--;
          performedDirection = Direction.DownLeft;
        }
      }
      break;
    case Direction.DownLeft:
      if (
        longtail[position + 1].x - longtail[position].x > 1 &&
        longtail[position + 1].y - longtail[position].y > 1
      ) {
        longtail[position + 1].x--;
        longtail[position + 1].y--;
        performedDirection = Direction.DownLeft;
      } else if (longtail[position + 1].x - longtail[position].x > 1) {
        longtail[position + 1].x--;
        performedDirection = Direction.Left;
        if (longtail[position + 1].y > longtail[position].y) {
          longtail[position + 1].y--;
          performedDirection = Direction.DownLeft;
        }
      } else if (longtail[position + 1].y - longtail[position].y > 1) {
        longtail[position + 1].y--;
        performedDirection = Direction.Down;
        if (longtail[position + 1].x > longtail[position].x) {
          longtail[position + 1].x--;
          performedDirection = Direction.DownLeft;
        }
      }
      break;
    case Direction.Left:
      if (longtail[position + 1].x - longtail[position].x > 1) {
        longtail[position + 1].x--;
        performedDirection = Direction.Left;
        if (longtail[position].y > longtail[position + 1].y) {
          longtail[position + 1].y++;
          performedDirection = Direction.UpLeft;
        } else if (longtail[position].y < longtail[position + 1].y) {
          longtail[position + 1].y--;
          performedDirection = Direction.DownLeft;
        }
      }
      break;
    case Direction.UpLeft:
      if (
        longtail[position + 1].x - longtail[position].x > 1 &&
        longtail[position].y - longtail[position + 1].y > 1
      ) {
        longtail[position + 1].x--;
        longtail[position + 1].y++;
        performedDirection = Direction.UpLeft;
      } else if (longtail[position + 1].x - longtail[position].x > 1) {
        longtail[position + 1].x--;
        performedDirection = Direction.Left;
        if (longtail[position].y > longtail[position + 1].y) {
          longtail[position + 1].y++;
          performedDirection = Direction.UpLeft;
        }
      } else if (longtail[position].y - longtail[position + 1].y > 1) {
        longtail[position + 1].y++;
        performedDirection = Direction.Up;
        if (longtail[position + 1].x > longtail[position].x) {
          longtail[position + 1].x--;
          performedDirection = Direction.UpLeft;
        }
      }
      break;
    case Direction.Stay:
      break;
  }
  return performedDirection;
}

async function main() {
  field = [[START]];
  head = { x: 0, y: 0 };
  longtail = [];
  for (let i = 0; i < 10; i++) longtail.push({ x: 0, y: 0 });
  tail = { x: 0, y: 0 };
  width = 1;
  height = 1;

  const lines = readInput();
  for (const line of lines) {
    const matches = line.match(/^([URDL]) ([0-9]+)$/);
    for (let i = 0; i < +matches![2]; i++) {
      // console.log("\x1Bc");
      // console.log(`== move ${matches![1]} ==`);
      // drawField();
      // await delay(10);
      let direction: Direction;
      switch (matches![1]) {
        case "U":
          head.y++;
          if (head.y >= height) {
            height++;
            adjustField();
          }
          longtail[0].x = head.x;
          longtail[0].y = head.y;
          direction = Direction.Up;
          for (let i = 0; i < 9; i++) {
            direction = catchup(direction, i);
          }
          break;
        case "R":
          head.x++;
          if (head.x >= width) {
            width++;
            adjustField();
          }
          longtail[0].x = head.x;
          longtail[0].y = head.y;
          direction = Direction.Right;
          for (let i = 0; i < 9; i++) {
            direction = catchup(direction, i);
          }
          break;
        case "D":
          head.y--;
          if (head.y < 0) {
            field.unshift([]);
            height++;
            head.y++;
            for (let i = 0; i < 10; i++) longtail[i].y++;
            adjustField();
          }
          longtail[0].x = head.x;
          longtail[0].y = head.y;
          direction = Direction.Down;
          for (let i = 0; i < 9; i++) {
            direction = catchup(direction, i);
          }
          break;
        case "L":
          head.x--;
          if (head.x < 0) {
            for (let y = 0; y < height; y++) field[y].unshift(UNVISITED);
            width++;
            head.x++;
            for (let i = 0; i < 10; i++) longtail[i].x++;
            adjustField();
          }
          longtail[0].x = head.x;
          longtail[0].y = head.y;
          direction = Direction.Left;
          for (let i = 0; i < 9; i++) {
            direction = catchup(direction, i);
          }
          break;
      }
      field[longtail[9].y][longtail[9].x] = VISITED;
    }
  }
  // console.log("\x1Bc");
  console.log(`== final ==`);
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
