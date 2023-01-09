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

function getScore(x: number, y: number): number {
  let current = field[y][x];
  let score;
  let scoreTotal = 0;

  // right
  score = 0;
  for (let i = x + 1; i < width; i++) {
    score++;
    if (field[y][i] >= current) {
      break;
    }
  }
  scoreTotal = score;

  // bottom
  score = 0;
  for (let i = y + 1; i < height; i++) {
    score++;
    if (field[i][x] >= current) {
      break;
    }
  }
  scoreTotal *= score;

  // left
  score = 0;
  for (let i = x - 1; i >= 0; i--) {
    score++;
    if (field[y][i] >= current) {
      break;
    }
  }
  scoreTotal *= score;

  // top
  score = 0;
  for (let i = y - 1; i >= 0; i--) {
    score++;
    if (field[i][x] >= current) {
      break;
    }
  }
  scoreTotal *= score;

  return scoreTotal;
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

  let highScore = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let score = getScore(x, y);
      console.log(`${x}/${y}: ${score}`);
      if (score > highScore) highScore = score;
    }
  }
  console.log(highScore);
}

main();
