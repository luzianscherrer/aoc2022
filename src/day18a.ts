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

function commonSurfaces(cube: Cube, cubes: Array<Cube>): number {
  let common = 0;
  for (const exitingCube of cubes) {
    if (
      cube.x == exitingCube.x &&
      cube.y == exitingCube.y &&
      cube.z - exitingCube.z == 1
    ) {
      common += 2;
    }

    if (
      cube.x == exitingCube.x &&
      cube.y == exitingCube.y &&
      cube.z - exitingCube.z == -1
    ) {
      common += 2;
    }

    if (
      cube.x == exitingCube.x &&
      cube.y - exitingCube.y == 1 &&
      cube.z == exitingCube.z
    ) {
      common += 2;
    }

    if (
      cube.x == exitingCube.x &&
      cube.y - exitingCube.y == -1 &&
      cube.z == exitingCube.z
    ) {
      common += 2;
    }

    if (
      cube.x - exitingCube.x == 1 &&
      cube.y == exitingCube.y &&
      cube.z == exitingCube.z
    ) {
      common += 2;
    }

    if (
      cube.x - exitingCube.x == -1 &&
      cube.y == exitingCube.y &&
      cube.z == exitingCube.z
    ) {
      common += 2;
    }
  }
  return common;
}

async function main() {
  let cubes: Array<Cube> = [];
  let surface = 0;
  let cube: Cube;
  let common: number;

  const lines = readInput();
  for (const line of lines) {
    const matches = line.match(/([0-9]+),([0-9]+),([0-9]+)/);
    console.log(
      `processing x:${+matches![1]} y:${+matches![2]} z:${+matches![3]}`
    );
    cube = { x: +matches![1], y: +matches![2], z: +matches![3] };
    common = commonSurfaces(cube, cubes);
    cubes.push(cube);
    surface += 6 - common;
    console.log(`  surfaces common: ${common} total: ${surface}`);
  }
}

main();
