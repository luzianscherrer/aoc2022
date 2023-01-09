import { readFileSync } from "fs";

interface PathPosition {
  distance: number;
  x: number;
  y: number;
}

function readInput(): string[] {
  const fileContent = readFileSync("day12.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

/*
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function drawField(currentX: number, currentY: number, visited: Array<number>) {
  console.log("\x1Bc");
  for (let y = 0; y < field.length; y++) {
    let str = "";
    for (let x = 0; x < field[0].length; x++) {
      if (x == targetX && y == targetY) {
        str += "E";
      } else if (x == currentX && y == currentY) {
        str += "*";
      } else if (visited.includes(y * field[0].length + x)) {
        // str += field[y][x].toUpperCase();
        str += "\x1b[31m" + field[y][x] + "\x1b[0m";
      } else {
        str += field[y][x];
      }
    }
    console.log(str);
  }
}
*/

function checkDone(
  pathQueue: Array<PathPosition>,
  targetX: number,
  targetY: number
) {
  if (
    pathQueue[pathQueue.length - 1].x == targetX &&
    pathQueue[pathQueue.length - 1].y == targetY
  ) {
    console.log(
      `found with distance ${pathQueue[pathQueue.length - 1].distance}`
    );
  }
}

async function main() {
  const pathQueue: Array<PathPosition> = [];
  const visited: Array<number> = [];
  const field: Array<Array<string>> = [];
  let targetX = 0;
  let targetY = 0;

  const lines = readInput();
  let y = 0;
  let startX = 0;
  let startY = 0;
  for (const line of lines) {
    field.push(line.split(""));
    if (field[y].includes("E")) {
      targetX = field[y].indexOf("E");
      targetY = y;
    }
    if (field[y].includes("S")) {
      startX = field[y].indexOf("S");
      startY = y;
    }
    y++;
  }
  field[startY][startX] = "a";
  field[targetY][targetX] = "z";

  visited.push(0);
  pathQueue.push({ distance: 0, x: startX, y: startY });
  while (pathQueue.length) {
    let pathPosition = pathQueue.shift()!;

    if (
      pathPosition.x + 1 < field[0].length &&
      visited.includes(pathPosition.y * field[0].length + pathPosition.x + 1) ==
        false &&
      field[pathPosition.y][pathPosition.x + 1].charCodeAt(0) -
        field[pathPosition.y][pathPosition.x].charCodeAt(0) <=
        1
    ) {
      visited.push(pathPosition.y * field[0].length + pathPosition.x + 1);
      pathQueue.push({
        distance: pathPosition.distance + 1,
        x: pathPosition.x + 1,
        y: pathPosition.y,
      });
      checkDone(pathQueue, targetX, targetY);
    }

    if (
      pathPosition.x - 1 >= 0 &&
      visited.includes(pathPosition.y * field[0].length + pathPosition.x - 1) ==
        false &&
      field[pathPosition.y][pathPosition.x - 1].charCodeAt(0) -
        field[pathPosition.y][pathPosition.x].charCodeAt(0) <=
        1
    ) {
      visited.push(pathPosition.y * field[0].length + pathPosition.x - 1);
      pathQueue.push({
        distance: pathPosition.distance + 1,
        x: pathPosition.x - 1,
        y: pathPosition.y,
      });
      checkDone(pathQueue, targetX, targetY);
    }

    if (
      pathPosition.y + 1 < field.length &&
      visited.includes(
        (pathPosition.y + 1) * field[0].length + pathPosition.x
      ) == false &&
      field[pathPosition.y + 1][pathPosition.x].charCodeAt(0) -
        field[pathPosition.y][pathPosition.x].charCodeAt(0) <=
        1
    ) {
      visited.push((pathPosition.y + 1) * field[0].length + pathPosition.x);
      pathQueue.push({
        distance: pathPosition.distance + 1,
        x: pathPosition.x,
        y: pathPosition.y + 1,
      });
      checkDone(pathQueue, targetX, targetY);
    }

    if (
      pathPosition.y - 1 >= 0 &&
      visited.includes(
        (pathPosition.y - 1) * field[0].length + pathPosition.x
      ) == false &&
      field[pathPosition.y - 1][pathPosition.x].charCodeAt(0) -
        field[pathPosition.y][pathPosition.x].charCodeAt(0) <=
        1
    ) {
      visited.push((pathPosition.y - 1) * field[0].length + pathPosition.x);
      pathQueue.push({
        distance: pathPosition.distance + 1,
        x: pathPosition.x,
        y: pathPosition.y - 1,
      });
      checkDone(pathQueue, targetX, targetY);
    }
  }
}

main();
