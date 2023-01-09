import { readFileSync } from "fs";

interface PathPosition {
  distance: number;
  x: number;
  y: number;
}

let shortestDist: number;

function readInput(): string[] {
  const fileContent = readFileSync("day12.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function checkDone(
  pathQueue: Array<PathPosition>,
  targetX: number,
  targetY: number
): boolean {
  if (
    pathQueue[pathQueue.length - 1].x == targetX &&
    pathQueue[pathQueue.length - 1].y == targetY
  ) {
    console.log(
      `found with distance ${pathQueue[pathQueue.length - 1].distance}`
    );
    if (
      shortestDist === undefined ||
      pathQueue[pathQueue.length - 1].distance < shortestDist
    )
      shortestDist = pathQueue[pathQueue.length - 1].distance;
    return true;
  }
  return false;
}

function distanceForStart(
  startX: number,
  startY: number,
  targetX: number,
  targetY: number,
  field: Array<Array<string>>
) {
  const pathQueue: Array<PathPosition> = [];
  const visited: Array<number> = [];

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
      if (checkDone(pathQueue, targetX, targetY)) return;
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
      if (checkDone(pathQueue, targetX, targetY)) return;
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
      if (checkDone(pathQueue, targetX, targetY)) return;
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
      if (checkDone(pathQueue, targetX, targetY)) return;
    }
  }
}

async function main() {
  const field: Array<Array<string>> = [];
  let targetX = 0;
  let targetY = 0;

  const lines = readInput();
  let y = 0;
  for (const line of lines) {
    field.push(line.split(""));
    if (field[y].includes("E")) {
      targetX = field[y].indexOf("E");
      targetY = y;
    }
    if (field[y].includes("S")) {
      field[y][field[y].indexOf("S")] = "a";
    }
    y++;
  }
  field[targetY][targetX] = "z";

  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[0].length; x++) {
      if (field[y][x] == "a") distanceForStart(x, y, targetX, targetY, field);
    }
  }

  console.log(`shortest distance: ${shortestDist}`);
}

main();
