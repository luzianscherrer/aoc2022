import { readFileSync } from "fs";

interface Cube {
  x: number;
  y: number;
  z: number;
}

function readInput(): string[] {
  const fileContent = readFileSync("day18.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function fillArea(cube: Cube, cubes: Array<Cube>): boolean {
  let maxHoleSize = 200;
  let closedArea = true;
  let queue: Array<Cube> = [];
  let visited: Array<Cube> = [];

  queue.push(cube);
  visited.push(queue[queue.length - 1]);
  while (queue.length) {
    if (queue.length > maxHoleSize) {
      closedArea = false;
      break;
    }
    let currentCube = queue.shift();

    if (
      cubes.filter(
        (existingCube) =>
          existingCube.x == currentCube!.x &&
          existingCube.y == currentCube!.y &&
          existingCube.z == currentCube!.z + 1
      ).length == 0 &&
      visited.filter(
        (existingCube) =>
          existingCube.x == currentCube!.x &&
          existingCube.y == currentCube!.y &&
          existingCube.z == currentCube!.z + 1
      ).length == 0
    ) {
      queue.push({
        x: currentCube!.x,
        y: currentCube!.y,
        z: currentCube!.z + 1,
      });
      visited.push(queue[queue.length - 1]);
    }

    if (
      cubes.filter(
        (existingCube) =>
          existingCube.x == currentCube!.x &&
          existingCube.y == currentCube!.y &&
          existingCube.z == currentCube!.z - 1
      ).length == 0 &&
      visited.filter(
        (existingCube) =>
          existingCube.x == currentCube!.x &&
          existingCube.y == currentCube!.y &&
          existingCube.z == currentCube!.z - 1
      ).length == 0
    ) {
      queue.push({
        x: currentCube!.x,
        y: currentCube!.y,
        z: currentCube!.z - 1,
      });
      visited.push(queue[queue.length - 1]);
    }

    if (
      cubes.filter(
        (existingCube) =>
          existingCube.x == currentCube!.x &&
          existingCube.y == currentCube!.y + 1 &&
          existingCube.z == currentCube!.z
      ).length == 0 &&
      visited.filter(
        (existingCube) =>
          existingCube.x == currentCube!.x &&
          existingCube.y == currentCube!.y + 1 &&
          existingCube.z == currentCube!.z
      ).length == 0
    ) {
      queue.push({
        x: currentCube!.x,
        y: currentCube!.y + 1,
        z: currentCube!.z,
      });
      visited.push(queue[queue.length - 1]);
    }

    if (
      cubes.filter(
        (existingCube) =>
          existingCube.x == currentCube!.x &&
          existingCube.y == currentCube!.y - 1 &&
          existingCube.z == currentCube!.z
      ).length == 0 &&
      visited.filter(
        (existingCube) =>
          existingCube.x == currentCube!.x &&
          existingCube.y == currentCube!.y - 1 &&
          existingCube.z == currentCube!.z
      ).length == 0
    ) {
      queue.push({
        x: currentCube!.x,
        y: currentCube!.y - 1,
        z: currentCube!.z,
      });
      visited.push(queue[queue.length - 1]);
    }

    if (
      cubes.filter(
        (existingCube) =>
          existingCube.x == currentCube!.x + 1 &&
          existingCube.y == currentCube!.y &&
          existingCube.z == currentCube!.z
      ).length == 0 &&
      visited.filter(
        (existingCube) =>
          existingCube.x == currentCube!.x + 1 &&
          existingCube.y == currentCube!.y &&
          existingCube.z == currentCube!.z
      ).length == 0
    ) {
      queue.push({
        x: currentCube!.x + 1,
        y: currentCube!.y,
        z: currentCube!.z,
      });
      visited.push(queue[queue.length - 1]);
    }

    if (
      cubes.filter(
        (existingCube) =>
          existingCube.x == currentCube!.x - 1 &&
          existingCube.y == currentCube!.y &&
          existingCube.z == currentCube!.z
      ).length == 0 &&
      visited.filter(
        (existingCube) =>
          existingCube.x == currentCube!.x - 1 &&
          existingCube.y == currentCube!.y &&
          existingCube.z == currentCube!.z
      ).length == 0
    ) {
      queue.push({
        x: currentCube!.x - 1,
        y: currentCube!.y,
        z: currentCube!.z,
      });
      visited.push(queue[queue.length - 1]);
    }
  }

  return closedArea;
}

function addCube(cube: Cube, cubes: Array<Cube>, surface: number): number {
  surface += 6;
  for (const exitingCube of cubes) {
    if (
      cube.x == exitingCube.x &&
      cube.y == exitingCube.y &&
      cube.z - exitingCube.z == 1
    ) {
      surface -= 2;
    }

    if (
      cube.x == exitingCube.x &&
      cube.y == exitingCube.y &&
      cube.z - exitingCube.z == -1
    ) {
      surface -= 2;
    }

    if (
      cube.x == exitingCube.x &&
      cube.y - exitingCube.y == 1 &&
      cube.z == exitingCube.z
    ) {
      surface -= 2;
    }

    if (
      cube.x == exitingCube.x &&
      cube.y - exitingCube.y == -1 &&
      cube.z == exitingCube.z
    ) {
      surface -= 2;
    }

    if (
      cube.x - exitingCube.x == 1 &&
      cube.y == exitingCube.y &&
      cube.z == exitingCube.z
    ) {
      surface -= 2;
    }

    if (
      cube.x - exitingCube.x == -1 &&
      cube.y == exitingCube.y &&
      cube.z == exitingCube.z
    ) {
      surface -= 2;
    }
  }

  cubes.push(cube);
  return surface;
}

async function main() {
  let cubes: Array<Cube> = [];
  let surface = 0;
  let cube: Cube;
  let highX = 0;
  let highY = 0;
  let highZ = 0;
  let closedCubes: Array<Cube> = [];

  const lines = readInput();
  for (const line of lines) {
    const matches = line.match(/([0-9]+),([0-9]+),([0-9]+)/);
    console.log(
      `processing x:${+matches![1]} y:${+matches![2]} z:${+matches![3]}`
    );
    cube = { x: +matches![1], y: +matches![2], z: +matches![3] };
    if (cube.x > highX) highX = cube.x;
    if (cube.y > highY) highY = cube.y;
    if (cube.z > highZ) highZ = cube.z;
    surface = addCube(cube, cubes, surface);
    console.log(`  total: ${surface}`);
  }

  console.log(`searching closed areas in range ${highX}, ${highY}, ${highZ}`);
  for (let x = 0; x < highX; x++) {
    for (let y = 0; y < highY; y++) {
      for (let z = 0; z < highZ; z++) {
        if (
          cubes.filter(
            (existingCube) =>
              existingCube.x == x && existingCube.y == y && existingCube.z == z
          ).length == 0
        ) {
          if (fillArea({ x: x, y: y, z: z }, cubes)) {
            console.log(`closed area at x:${x} y:${y} z:${z}`);
            closedCubes.push({ x: x, y: y, z: z });
          }
        }
      }
    }
  }

  for (const closedCube of closedCubes) {
    let subtraction = 6;

    if (
      cubes.filter(
        (existingCube) =>
          existingCube.x == closedCube.x &&
          existingCube.y == closedCube.y &&
          existingCube.z - closedCube.z == 1
      ).length == 0
    ) {
      subtraction -= 1;
    }

    if (
      cubes.filter(
        (existingCube) =>
          existingCube.x == closedCube.x &&
          existingCube.y == closedCube.y &&
          existingCube.z - closedCube.z == -1
      ).length == 0
    ) {
      subtraction -= 1;
    }

    if (
      cubes.filter(
        (existingCube) =>
          existingCube.x == closedCube.x &&
          existingCube.y - closedCube.y == 1 &&
          existingCube.z == closedCube.z
      ).length == 0
    ) {
      subtraction -= 1;
    }

    if (
      cubes.filter(
        (existingCube) =>
          existingCube.x == closedCube.x &&
          existingCube.y - closedCube.y == -1 &&
          existingCube.z == closedCube.z
      ).length == 0
    ) {
      subtraction -= 1;
    }

    if (
      cubes.filter(
        (existingCube) =>
          existingCube.x - closedCube.x == 1 &&
          existingCube.y == closedCube.y &&
          existingCube.z == closedCube.z
      ).length == 0
    ) {
      subtraction -= 1;
    }

    if (
      cubes.filter(
        (existingCube) =>
          existingCube.x - closedCube.x == -1 &&
          existingCube.y == closedCube.y &&
          existingCube.z == closedCube.z
      ).length == 0
    ) {
      subtraction -= 1;
    }

    console.log(
      `subtraction for closed cube at x:${closedCube.x} y:${closedCube.y} z:${closedCube.z} is ${subtraction}`
    );
    surface -= subtraction;
  }

  console.log(surface);
}

main();
