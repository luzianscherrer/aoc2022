import { readFileSync } from "fs";

interface Instruction {
  steps?: number;
  direction?: string;
}

interface Position {
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
let position: Position;

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
      str += field[y][x];
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

function startPosition(): Position {
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
        for (let i = 0; i < field[position.y].length; i++) {
          if (field[position.y][i] !== " ") {
            if (field[position.y][i] === ".") {
              position.x = i;
              return true;
            } else {
              return false;
            }
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
        for (let i = 0; i < field.length; i++) {
          if (field[i][position.x] !== " ") {
            if (field[i][position.x] === ".") {
              position.y = i;
              return true;
            } else {
              return false;
            }
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
        for (let i = field[position.y].length - 1; i > 0; i--) {
          if (field[position.y][i] !== " ") {
            if (field[position.y][i] === ".") {
              position.x = i;
              return true;
            } else {
              return false;
            }
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
        for (let i = field.length - 1; i > 0; i--) {
          if (field[i][position.x] !== " ") {
            if (field[i][position.x] === ".") {
              position.y = i;
              return true;
            } else {
              return false;
            }
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
  drawField();
  console.log("instructions", JSON.stringify(instructions));
  position = startPosition();
  console.log("start", position);
  run();
  console.log("end", position);
  console.log("value", position.y * 1000 + 4 * position.x + direction);
}

main();
