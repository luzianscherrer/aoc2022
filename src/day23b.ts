import { readFileSync } from "fs";

interface Position {
  symbol: string;
  locks: number;
  moveTo?: {
    x: number;
    y: number;
  };
}

interface Movement {
  checks: [
    {
      x: number;
      y: number;
    }
  ];
  move: {
    x: number;
    y: number;
  };
}

let movements = [
  {
    checks: [
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: -1 },
    ],
    move: { x: 0, y: -1 },
  },
  {
    checks: [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: 1 },
    ],
    move: { x: 0, y: 1 },
  },
  {
    checks: [
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: -1, y: 1 },
    ],
    move: { x: -1, y: 0 },
  },
  {
    checks: [
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: 1, y: 1 },
    ],
    move: { x: 1, y: 0 },
  },
];

let field: Array<Array<Position>> = [];

function readInput(): string[] {
  const fileContent = readFileSync("day23.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function drawField() {
  let free = 0;
  for (let y = 0; y < field.length; y++) {
    let str = "";
    for (let x = 0; x < field[y].length; x++) {
      if (field[y][x].symbol === ".") free++;
      str += field[y][x].symbol;
    }
    console.log(str);
  }
  console.log(`\nfree ${free}\n`);
}

function parseInput() {
  const lines = readInput();
  for (const line of lines) {
    field.push([]);
    const chars = line.split("");
    for (const char of chars) {
      field[field.length - 1].push({ symbol: char, locks: 0 });
    }
  }
}

function prepareMovements() {
  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[0].length; x++) {
      if (field[y][x].symbol === "#") {
        if (
          field[y - 1][x].symbol === "." &&
          field[y - 1][x + 1].symbol === "." &&
          field[y][x + 1].symbol === "." &&
          field[y + 1][x + 1].symbol === "." &&
          field[y + 1][x].symbol === "." &&
          field[y + 1][x - 1].symbol === "." &&
          field[y][x - 1].symbol === "." &&
          field[y - 1][x - 1].symbol === "."
        ) {
          continue;
        }
        for (let movement of movements) {
          let canMove = true;
          for (let check of movement.checks) {
            if (field[y + check.y][x + check.x].symbol === "#") {
              canMove = false;
              break;
            }
          }
          if (canMove) {
            field[y][x].moveTo = {
              x: x + movement.move.x,
              y: y + movement.move.y,
            };
            field[y + movement.move.y][x + movement.move.x].locks += 1;
            break;
          }
        }
      }
    }
  }
}

function executeMovements(): boolean {
  let didMove = false;
  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[0].length; x++) {
      if (field[y][x].moveTo !== undefined) {
        let moveTo = field[y][x].moveTo!;
        if (field[moveTo.y][moveTo.x].locks === 1) {
          field[moveTo.y][moveTo.x].symbol = "#";
          field[y][x].symbol = ".";
          didMove = true;
        }
      }
    }
  }
  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[0].length; x++) {
      field[y][x].locks = 0;
      delete field[y][x].moveTo;
    }
  }
  return didMove;
}

function reorderMovements() {
  const movement = movements.shift()!;
  movements.push(movement);
}

function growField() {
  let growTop = false;
  let growLeft = false;
  let growRight = false;
  let growBottom = false;
  for (let x = 0; x < field[0].length; x++) {
    if (field[0][x].symbol === "#") {
      growTop = true;
    }
    if (field[field.length - 1][x].symbol === "#") {
      growBottom = true;
    }
  }
  for (let y = 0; y < field.length; y++) {
    if (field[y][0].symbol === "#") {
      growLeft = true;
    }
    if (field[y][field[0].length - 1].symbol === "#") {
      growRight = true;
    }
  }
  if (growTop) {
    field.unshift([]);
    for (let x = 0; x < field[1].length; x++) {
      field[0].push({ symbol: ".", locks: 0 });
    }
  }
  if (growLeft) {
    for (let y = 0; y < field.length; y++) {
      field[y].unshift({ symbol: ".", locks: 0 });
    }
  }
  if (growRight) {
    for (let y = 0; y < field.length; y++) {
      field[y].push({ symbol: ".", locks: 0 });
    }
  }
  if (growBottom) {
    field.push([]);
    for (let x = 0; x < field[0].length; x++) {
      field[field.length - 1].push({ symbol: ".", locks: 0 });
    }
  }
}

function shrinkField() {
  let maxX = 0;
  let minX = field[0].length - 1;
  let maxY = 0;
  let minY = field.length - 1;
  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[0].length; x++) {
      if (field[y][x].symbol === "#") {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  let popX = field[0].length - 1 - maxX;
  let shiftX = minX;
  let popY = field.length - 1 - maxY;
  let shiftY = minY;

  for (let i = 0; i < shiftY; i++) {
    field.shift();
  }
  for (let i = 0; i < popY; i++) {
    field.pop();
  }
  for (let i = 0; i < shiftX; i++) {
    for (let y = 0; y < field.length; y++) {
      field[y].shift();
    }
  }
  for (let i = 0; i < popX; i++) {
    for (let y = 0; y < field.length; y++) {
      field[y].pop();
    }
  }
}

function performOneCycle(): boolean {
  growField();
  prepareMovements();
  let didMove = executeMovements();
  reorderMovements();
  shrinkField();
  return didMove;
}

async function main() {
  parseInput();
  drawField();

  let count = 1;
  while (true) {
    console.log(`cycle ${count++}`);
    if (performOneCycle() === false) break;
  }
  drawField();
}

main();
