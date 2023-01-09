import { readFileSync } from "fs";

let field: Array<Array<number>> = [];
let width = 0;
let height = 0;

function readInput(): string[] {
  const fileContent = readFileSync("day8example.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function isVisible(x: number, y: number): boolean {
  let current = field[y][x];
  let visible;

  // right
  visible = true;
  for (let i = x + 1; i < width; i++) {
    if (field[y][i] >= current) {
      visible = false;
      break;
    }
  }
  if (visible) return true;

  // bottom
  visible = true;
  for (let i = y + 1; i < height; i++) {
    if (field[i][x] >= current) {
      visible = false;
      break;
    }
  }
  if (visible) return true;

  // left
  visible = true;
  for (let i = x - 1; i >= 0; i--) {
    if (field[y][i] >= current) {
      visible = false;
      break;
    }
  }
  if (visible) return true;

  // top
  visible = true;
  for (let i = y - 1; i >= 0; i--) {
    if (field[i][x] >= current) {
      visible = false;
      break;
    }
  }
  if (visible) return true;

  return false;
}

async function main() {
  const lines = readInput();
  let y = 0;
  for (const line of lines) {
    field.push([]);
    const characters = line.split("");
    for (let x = 0; x < characters.length; x++) {
      field[field.length - 1].push(+characters[x]);
    }
    y++;
  }
  height = y;
  width = field[field.length - 1].length;
  console.log(width, height, field);

  let visible = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (isVisible(x, y)) {
        visible++;
        // console.log(`${x}/${y} visible`);
      } else {
        // console.log(`${x}/${y} not visible`);
      }
    }
  }
  console.log(visible);
}

main();
