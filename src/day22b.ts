import { readFileSync } from "fs";

interface Instruction {
  steps?: number;
  direction?: string;
}

interface Coordinates {
  x: number;
  y: number;
}

enum Direction {
  Right = 0,
  Down,
  Left,
  Up,
}

let field: Array<Array<string>> = [];
let instructions: Array<Instruction> = [];
let direction: Direction = Direction.Right;
let position: Coordinates;

function readInput(): string[] {
  const fileContent = readFileSync("day22.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function drawField() {
  for (let y = 0; y < field.length; y++) {
    let str = "";
    for (let x = 0; x < field[y].length; x++) {
      if (position.x === x && position.y === y) {
        switch (direction) {
          case Direction.Up:
            str += "^";
            break;
          case Direction.Down:
            str += "v";
            break;
          case Direction.Left:
            str += "<";
            break;
          case Direction.Right:
            str += ">";
            break;
        }
      } else {
        str += field[y][x];
      }
    }
    console.log(str);
  }
}

function parseInput() {
  const lines = readInput();
  let longestLine = 0;
  field.push([" "]);
  for (const line of lines) {
    if (line.match(/\./)) {
      if (line.length > longestLine) {
        longestLine = line.length;
      }
      field.push([]);
      const chars = line.split("");
      for (const char of chars) {
        field[field.length - 1].push(char);
      }
    } else if (line.match(/[0-9]/)) {
      const chars = line.split("");
      let multi = 1;
      let number = 0;
      for (const char of chars) {
        if (char.match(/[0-9]/)) {
          number = number * multi + +char;
          multi *= 10;
        } else {
          instructions.push({ steps: number });
          instructions.push({ direction: char });
          multi = 1;
          number = 0;
        }
      }
      instructions.push({ steps: number });
    }
  }
  field.push([" "]);
  for (let y = 0; y < field.length; y++) {
    if (field[y].length < longestLine) {
      const padding = longestLine - field[y].length;
      for (let k = 0; k < padding; k++) {
        field[y].push(" ");
      }
    }
    field[y].push(" ");
    field[y].unshift(" ");
  }
}

function startPosition(): Coordinates {
  for (let x = 0; x < field[1].length; x++) {
    if (field[1][x] === ".") {
      return { x: x, y: 1 };
    }
  }
  return { x: 0, y: 0 };
}

function changeDirection(turn: string) {
  switch (turn) {
    case "R":
      direction += 1;
      if (direction > Direction.Up) direction = Direction.Right;
      break;
    case "L":
      direction -= 1;
      if (direction < Direction.Right) direction = Direction.Up;
      break;
  }
}

function moveOne(): boolean {
  switch (direction) {
    case Direction.Right:
      if (field[position.y][position.x + 1] === ".") {
        position.x += 1;
      } else if (field[position.y][position.x + 1] === " ") {
        if (position.x == 150 && position.y >= 1 && position.y <= 50) {
          if (field[151 - position.y][100] === ".") {
            position.x = 100;
            position.y = 151 - position.y;
            direction = Direction.Left;
            return true;
          } else {
            return false;
          }
        }
        if (position.x == 100 && position.y >= 51 && position.y <= 100) {
          if (field[50][position.y + 50] === ".") {
            position.x = position.y + 50;
            position.y = 50;
            direction = Direction.Up;
            return true;
          } else {
            return false;
          }
        }
        if (position.x == 100 && position.y >= 101 && position.y <= 150) {
          if (field[151 - position.y][150] === ".") {
            position.x = 150;
            position.y = 151 - position.y;
            direction = Direction.Left;
            return true;
          } else {
            return false;
          }
        }
        if (position.x == 50 && position.y >= 151 && position.y <= 200) {
          if (field[150][position.y - 100] === ".") {
            position.x = position.y - 100;
            position.y = 150;
            direction = Direction.Up;
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
      break;
    case Direction.Down:
      if (field[position.y + 1][position.x] === ".") {
        position.y += 1;
      } else if (field[position.y + 1][position.x] === " ") {
        if (position.y == 50 && position.x >= 101 && position.x <= 150) {
          if (field[position.x - 50][100] === ".") {
            position.y = position.x - 50;
            position.x = 100;
            direction = Direction.Left;
            return true;
          } else {
            return false;
          }
        }
        if (position.y == 150 && position.x >= 51 && position.x <= 100) {
          if (field[position.x + 100][50] === ".") {
            position.y = position.x + 100;
            position.x = 50;
            direction = Direction.Left;
            return true;
          } else {
            return false;
          }
        }
        if (position.y == 200 && position.x >= 1 && position.x <= 50) {
          if (field[1][position.x + 100] === ".") {
            position.y = 1;
            position.x = position.x + 100;
            direction = Direction.Down;
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
      break;
    case Direction.Left:
      if (field[position.y][position.x - 1] === ".") {
        position.x -= 1;
      } else if (field[position.y][position.x - 1] === " ") {
        if (position.x == 51 && position.y >= 1 && position.y <= 50) {
          if (field[151 - position.y][1] === ".") {
            position.x = 1;
            position.y = 151 - position.y;
            direction = Direction.Right;
            return true;
          } else {
            return false;
          }
        }
        if (position.x == 51 && position.y >= 51 && position.y <= 100) {
          if (field[101][position.y - 50] === ".") {
            position.x = position.y - 50;
            position.y = 101;
            direction = Direction.Down;
            return true;
          } else {
            return false;
          }
        }
        if (position.x == 1 && position.y >= 101 && position.y <= 150) {
          if (field[151 - position.y][51] === ".") {
            position.x = 51;
            position.y = 151 - position.y;
            direction = Direction.Right;
            return true;
          } else {
            return false;
          }
        }
        if (position.x == 1 && position.y >= 151 && position.y <= 200) {
          if (field[1][position.y - 100] === ".") {
            position.x = position.y - 100;
            position.y = 1;
            direction = Direction.Down;
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
      break;
    case Direction.Up:
      if (field[position.y - 1][position.x] === ".") {
        position.y -= 1;
      } else if (field[position.y - 1][position.x] === " ") {
        if (position.y == 1 && position.x >= 51 && position.x <= 100) {
          if (field[position.x + 100][1] === ".") {
            position.y = position.x + 100;
            position.x = 1;
            direction = Direction.Right;
            return true;
          } else {
            return false;
          }
        }
        if (position.y == 1 && position.x >= 101 && position.x <= 150) {
          if (field[200][position.x - 100] === ".") {
            position.y = 200;
            position.x = position.x - 100;
            direction = Direction.Up;
            return true;
          } else {
            return false;
          }
        }
        if (position.y == 101 && position.x >= 1 && position.x <= 50) {
          if (field[position.x + 50][51] === ".") {
            position.y = position.x + 50;
            position.x = 51;
            direction = Direction.Right;
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
      break;
  }
  return true;
}

function run() {
  for (const instruction of instructions) {
    if (instruction.direction !== undefined) {
      changeDirection(instruction.direction);
    } else if (instruction.steps !== undefined) {
      for (let i = 0; i < instruction.steps; i++) {
        if (moveOne() === false) {
          break;
        }
      }
    }
  }
}

async function main() {
  parseInput();
  // console.log("instructions", JSON.stringify(instructions));
  position = startPosition();

  // position = { x: 3, y: 101 };
  // direction = Direction.Up;
  // drawField();
  // console.log("position", position);

  // console.log(moveOne());
  // drawField();
  // console.log("position", position);

  run();
  console.log("end", position);
  console.log("value", position.y * 1000 + 4 * position.x + direction);
}

main();
