import { readFileSync } from "fs";

const inputReal =
  "><<<<>>>><<<><<<><<<>><<>>><>><>><<<<>><<<<>><<<>>>><<<><<<>>>><<<<><<><<>><<>>>><<<>>><<<>>>><<>><>><<<<>>><<<>>>><<<<><<>>><<<>>><<>>><>>>><>><>>>><<<>>><<<>><>>><<<<>>><>>>><<<>>>><<<<>><<>>>><<>><>>><<>>><>>>><<<>><<>>><<>>><<<<>>>><>>><>><<<<>>><<<>>><<<<>>>><<<>>><<<>><><<<<>>><<<<><<<>>><<><>>><<<<>>>><>><<<>><<>>><<<<>><<<>>><<>>>><>>>><>>><>>>><<<><<<<>><<>><>>><<>>>><<<<>>>><>>>><>><<<<>>>><<<<>>><<>>><<><>><<<<>><><<<<>>><<<>>><<<>>><<<>><<>>>><<<><<<>>><><<>>>><<<><>>>><<>>><>><<<>>><<<<><<<>><<<>><>>><<<<>>><<>>>><>><<<>>>><<<<>>>><<<>><<<>>>><<>><<>>>><<>>><<<<>>><>>>><>><<<>><<<>>><<<<>>>><<<>>>><>>><>>><>>><><<<>><<<>>><<<<>>>><<<>>>><<>>><<<<>><>><<>>>><>><<>><<<<>>><<<>><<><<<<>><<<<>><<<<><<>><>>><<<><<<><<<<>><<<>>><<>>><>>><<<<>><<><>><<>>><><<<<>>>><<>>>><<<<>>><>><<<<>><<>>>><<<>>>><<<>>>><<><<<<>>>><<<><<<<><<<>>>><<>>><<><>>>><<<>>>><<<<>>>><<<><<<>><<>>>><>>>><>><<<><>>>><<<>>>><<<<>><<<><<<<>>>><<>><>>><<<>>><>><>>>><<<<>>>><<<><<<>><<>>><<<>>><>>><><>>><<>><<>>><<<<>><<><<<>><><<><<>><>>>><<>>>><<<<>>><>>>><>>><<<>>><<<>>>><<><>>><<<>>><>>>><>>>><><<>>>><<<>>><<<>><<>>>><>>>><<><>>>><<<><<<>>>><<<<>>>><<>>><<<<>><<<>><><<<>>>><>>><><><<<><<>><<>>>><<<><<><<<>>>><<<<>>><<><<>>><<<>>>><>>>><<<<>><>><<><<<>><<<>>><<<<>>>><<><<<<>>>><>><<<>>>><<<<><<<<>>>><<>><<>><<><<>>>><<>>><<><<>>>><<>>>><<>>>><<<<><<<<><<<<><<<>>><<<<>>>><>>>><<<>>><<>>><<<>>>><>>><<>>>><<<>><<>>><<><>><<<>><<><<>>>><<>><<<<>><<<>>>><<<>>><<>>><<>>><<>>>><<<<>><>>><>>><><<<><>>><<<>>><><<>>>><<><<<<>><<<<>>><<<<>>><<<<>>><<<>>><<<<>>>><<<<>>><<>>><<<<>><>>>><>>><>><<<><<<><<>><<><<<<><<<<>><<<<><>><<<>>>><<<<>>>><>>><<<>>><>>><<>><<><<>>>><<>><<<<>>><<<>>>><<>>><<>><<<><<<<>>>><<>><>>>><<<<><>>><<>>><>>><<<>>><>><<>><<>>>><<<<><<>><<<<>>>><<<<>>><<<<><>>>><>>><<><>>><<<<>>>><>><<<><><>><><><<<<>><<<<>>><<<><<<<>><>>>><<<><<<<>>><<>>><>>><<<>>><<<<>><><<<>>><<>>>><><<<<><<><<><<<>>><>><>>><<<>><<<<>>>><<<>><<<<><<<<>>><<<<><<>>>><<<>><>><<<>>><<<<>><>>><<<<>><<<<>>><<<<>>>><<>><<<>><<>>><<>>>><>><<><<<>>><<<<><<>><<<<>>><<<>>>><<>><<><>><<<>>><>><<<<>>><<<<><<>><<<>>><<>>>><<<>>>><<<<>><<<<><<<<>>>><<<<>>>><<><<<<>>>><>>>><<<<>>><<<<>><<>><<<<>>><<<<>>>><<>><<>><<<<><<<<>>><<<><<<>><>>>><>>>><<>><<<<>>>><>>>><<<>>>><<<>>><<<<><<<>>>><<>>>><<><<<<>><><<<>>><<<><>><<<<><<<>>>><>><<>>><<<>>>><<>>><<<>><<>>>><<<<>>>><<<<>>><<>>>><<<<>>><<<<>><<>>><<<><>>><<>>><>><<><>>><<<><<>>><<<>>><<<>><<>>><>><>><><<<<>>><<<>><<<<>>>><<<<>><>>><<<<><>>><><<<<>>><<<>>>><>>><<<>><>><<<>>>><<<<><<<>>><<><<>>><<<>>>><><<<>>><<>><<<><<<<>><>>><<><<>>><<<<>><<<<>><<<<><<><>>><><<>>>><<>>>><<<<>>><<<>><<<><<<<>>>><<>>><<<>>><>>><<<><>>>><<<><<<<>>>><>><>><<<>>>><<<>><<>><<>>><<<<>><<<<>>>><<<<>>>><<><>>>><<<<>>>><<<<>><<<<><<<<>>><<<<>><<<>>>><>><<<><<<<>>><<>>>><<<>><<<>>><>>><<<><><<><<>>><>>><<<>><<<>>>><<<<>>>><<<<>><<<>>><<<>><<>><>>>><<<<>><<<>>>><<<>><<<>>>><>>>><>>><<<<><>>><>>><<>><><<<>>>><<<<>>>><<>><<>>><><>><<<<>><<<>><<<>>>><<<>><<<>>><<>>><<<>>>><<><<<<>><>>><<<>>><<><<<<>><<<<>>><<<<>>>><<<><<<<>>><<<<>>>><<<>>><><<>>>><>>>><<<<>>><<<>>><<<<><<<>><<<><<<>><<<>>>><<<<>>>><<>>><<>><<>>>><<<>><><<<>>>><><<<>>>><<><<>>><>>><<<<>><<<<>>>><<<<><<<>>>><<>><<<>><<<>><<<<>><>>>><<<<><<<<>>>><><<>><<>><<<<>><<<<>>>><<<<>>><<><<><<>>>><>>>><<><<<>>><<>>><<>><>><<<><<>>>><<<>>><>>>><>>><<><<><<><>><>>>><>><>><<>><<<>><<>><<<<>>><<<<>>><><<<>>>><><<>><>>><>><<<><<>><<><><<<>>>><<<<>>>><<<<><>>>><<<<>>><<>>>><<<>><<<<>><<>>>><<<<>>>><<>>><<<<>><<<>>><<<<>><<>><<<>>>><>>>><<<<><<<<>>><<<<>><<<<>>>><<<>><<<<>>><>><><<<<><<><<<>><<><<<>>><<<>>><<><<>>><<>>>><<<<>><>>>><<><<>>><<>>>><<><<<<>><>><>><<>><<<>>>><<<<>>>><<<><<<<>>>><<<<>>>><<>><<>>>><<<>>>><>>><<<><<<>>>><<>>><<<<>>>><<<<><<>><<>>><<>><<<>>>><>><>><<<><<<>>><<<><>>>><>>><><<<<>><<<>>>><<<<>><<>><<<>>>><>>>><<>>><<<<>>><<<>>>><<<<>><<<<>>>><<<<>><<<><<>>><<>>><><<<><<<>><<>>>><>><<<>><<>><<<<>>><<><<<>>><<>>>><<<<><<>>>><><>>>><<>>><<<<><<<<>><<<><<<><<><<<>>><<<<><<<>><><<<<>>>><<<<>>>><<<>><<<>>><<<><<><><<>>>><>>><<<<>>>><<<<>>><<>>><<<<><<<<>>><<<><<<<>><<><<><<<>><<>><<>>><<>>><<>>><>>><<<>>>><<<<>>><>>><<<>><<><<>>>><<<<>>>><<<>>>><<<>>><<><<><<<><<<><>>>><><<<<><<<>>>><>>><>>>><>><<>><<<<>>>><<>>><>><>><>>><<<<>>><>><<<<>>>><<<<><<>><>>>><>>><<>>>><<<>>>><<>><<<<><<<>><><<<<>>>><>>>><>>><<<>>>><>>>><<<<>>>><<<>>>><<><<><<>>><<><<>><>>>><<<>>><<<>>><<<>>><><<<<>>><>><<<<><<>>><<>><<<<><<<<>><<>><<>><<>>>><<<>>>><>>><<<>>>><<<>><<<<>>><>><<>>><><<>>><<<>>><>><<>><<<<>><<<>>>><<<<>><<>><<<<>>>><<<>>>><<<<><<<<>><<<<>><<<<>>>><<>><<<<>>>><<<<>>>><>>>><>>><>>><<<<><<<>><<>>>><><<>>><>>>><<<<>>>><>><>>>><>>>><<<><<<>>><<>>>><<<<><>>><<>><<<>>>><<>>>><<>><<<><<<>>><<<><<><<>>><>><>>><<>>>><<<>><<>>><<<>>>><<>><><<>><<<<>>><<<>><<<>>><>><<>>><<<<>>>><<>><<>><<<<>>>><<>>><>>>><>><<>><<>>>><<<>>>><<<>>><<>>>><<><<><<<><<>>>><<>>>><<><>>><<><<<>>>><><<>><<<>><<<>>>><<>><<<<>>>><>><<<>><>>><<<>>><<<>>>><<<<>>><<<>><<<<>>><><<<<>>>><<><<>><<<<><<><<>>>><>><>><>>><<<>>>><<<<><<<>><<>>>><><<<><<>>><<<<><<<<>>>><<<>>>><<<>><<<>><<<><<><<><><<<<>>>><<<<><<<>><<<<><<<<><<<<>>>><<<>><<<>>>><<<<>><>><<>><>>>><>><<>><<><<<><<<>><<<>>><<<<>>><<<>>>><>>><<<><><<<<>>><<<<>><<<<>>>><>>><<<<>>>><<>>>><<<<><<>>>><<<<><<>>><<<>>><<<><<<<>>>><<<<>><<<<>><<<<><<<>>><<<<><<<<>><<<>><<<<>><<>>>><><<>>><>>><<<>><<><<><<>><<><><<>>>><><>>><<<>><>>><<<>>><<<>><<<<>>><<>>><<>>>><<>>><<<<>><<<<><>>>><>>>><<<<>>><<<>><><><<>>>><<><<<>>>><<>><<<><><<<<><<<><<<>><<<<>>><<<<>><<<<>><<<<>>>><<<<>>>><><>>>><<>>><<><<<>>><<<><>>>><<<<>>>><>><<<>><<>><<>>>><<<<><>>><<<<>><<><<>><<<<>>><><<<><<<><<<>>><<>><<<<>>>><<<>>>><<<<><>>>><><>><<<>>><<<<>>>><<<>>>><<>><<><<>><<<<>>><<<<>><<>>>><<>><<<<>>>><<<>>>><<<<>>><<>><<<<><><<>><>>><<><<<>><<<>><<<>>>><<>><<<<>>><<<>>>><>>><<<><<<<>>>><<<<>>><<<>><<<>>><><<<<>>><<>>>><<<>>><>><><>><<<><<<<><<<<>>>><<<>>><><<<><<<>><<>><<><<><>><><<<>><<<<>><<>>>><<<<>>>><><<<<><<<>>>><>>><<<>>>><<<>><>>>><<<>><<<<>>><<<<>><<>><><<<<>><<>>><<<<>><<<>>>><<><>>>><<<<>>>><><>>><<>>>><>><<>>>><><>><<>>><><>>><<<>>>><<<<>>><<<><<<<>>>><<<>><<<<>><<<>><>><<<>>><<<<>><<>>><>><<<<>>>><<<>><<>><>>><<<<>>>><><<><<<>>><<<<>><<<<>><><>>><<>><>>>><<<<>>>><<<>>><<<>><<<<>>>><<<>><<>>><<<>>><>>><<<><<<<>>>><<><<<<><<<>>>><>>>><<<>><>>>><><<<<>><<<<>>>><<<>>><>>>><>><<<>>>><<><<<>>><<><<<>>>><<>><<>>><<<>>>><<<<>><>>><<<<><<<<>>>><>><<<>>><<><>><<<>><>>><<<>>><<<<>>>><<<>>>><>>><<><<<<>>>><><<<>>>><<>>><><<<>>><<<<>><<<>>><<>>><<<><<><<<>><<>><<<<>>><<<><><>><<>>><<<<>>><>>>><<><<<<>>>><<<<><<<>>><<<>><<>>>><>>>><<<><<>>><<<>>>><<><<<>>><><<<<>><<<<><<<<>><<>><<<<>>>><<<>><<<<><<<<>>><<>>><<<>>><<<<><<<<>>><<<<>>>><<<>>><<><<<<>>><<<<>>><><<<>>><<><<<>><>>><<<<>>>><<<<>>><<>><<<<>><<<><<<<><<>>>><<<<>>>><<>>>><<<<>>><<<>>>><<>>><<>>><<<<><<<<>>>><><<<>>><<<>>><><<<<>>><<>>>><<<<>>><<<>><<>>>><<<<>><<>><<<<>><<<<>>>><<<><>>>><<<><<<<>><>>><>><<<<>>><>>>><>><>><<<<>>>><<<<><>>><<<<>><>><><><<>><<<>><<<><>>><<<<><<<>><<<<>><<<<>>><<>>>><<><<<<>><<<>>><<<>><>><>>>><<<<>>><<>><<>><<>>>><<<<>>>><<<<><<>><>><>>>><<<>>><<<<>><<>>>><<>>><>>>><<>>>><<<<>>>><<<<>>><<>><<<>>><<>>>><<>>>><<<><<<>>>><<<<>>>><<<><<><<>>>><>>><<>><<>><<<>>>><<<><<>>><<><<<>>>><<<>>><>>><<<>><<<>><>>><<<<>><<<>>>><<><<>>><>>><>><<>><<<>>>><<>><<<<><><<<><<>>>><<>><<<>>>><<<><<<<><<><<<<>>>><<<<>><<><>>><<<><><<<<>><<>><<<<><>><<><<<>><<<>>>><>><>>><<<><><<<>><<<>><>>><>><<<<>><<<>>><<<>>>><>><>>>><<>><<<>>><<>>><<><<>><<>><><<<>>><<<>><<<<>><<<>>><<<<>><<<>>><<<>>><<<<><<<<>>><>><<<<>>><<<>>>><<<>><<>>><<>>><>>><<><<<><<<<><<>>>><<<><<>>><>>>><<<>>>><>>>><<><<<>>><>>><<>>><<>>>><>>>><>>><<>><<<>>><<<>><>><>>>><<<><>>><>><>>><>>><<<>>>><<>>>><<<>>><<<<>><>><><<>>>><>><<><<<<><><><<>>>><<<<>>><>>><<<>>>><<<>>><>>><<<>><<<>>><<<<>><<>><<<<>>><<<>><<<<>>><<<<>><>><>>>><>>><>><<<<>><<<<><>>><>><>>><<<<>>>><<<><<>>><<>>>><<<<>><<<<><>><>><<>>><<>><<><>><><<>>>><<<<>>>><<<<>>>><<>>><<<<><>>>><<<<>>><<<>><<>>>><>>><<<>>><<>>>><<<>><<<><<<<>>>><<<>>>><<<<>><<<><<<<>>>><><><><>>><<<>><<<>><<<>>><<>><<<<>><<<<>>><<<>><<<<>><>><<<>><<<>>>><<<>>>><<>><<<<>>><<>>>><<>><<>>>><<<<>>>><<<>>><<>>>><<<>>>><<><<<<><<>><<<>><<<>><<><<<>><><>>><<>>><<><>>><<<<>>>><<<>>><<>>>><<<>>>><<<>>>><<<<>><<<<>><<>><>>><<>><<><<<>>><<<>><<><<>><<><<<<>>><>>><<><<<>>>><<>>>><>>><<>>><<><><<<<>>><<><<<>><<<><<>>><<<<>>>><<>>>><><>>><<<>>>><<<>><<<<><<<<><<<<>>><><<<>><<<<>>><<<<><<<>>><<<>><<<<>><<<<>>>><<<<><>><<<>>><<<<><<><<<<><<<<>>><<>>><>>>><<<>>><>>><<>><>><<<<><<<<>>>><<<>>><<<><<>>>><<><<<<>><<>>>><<<>><<<<><<<<>>><>><><<<>>>><<<<>><>>>><>>><<<<>>>><<>><<>><>>><<><<><>>>><<<<>>><<<>><>>><<<><>>><<<<>><<<<>>>><>>><>>><>>>><>><<>>><<<<>><>>><<><<<>>><<>>>><>>>><<>>><<<<>>><<><<<><<<><<<<>>>><<<>>>><<<>>><<<<>>>><<<<>>>><<>><<<<>>><<>>><><<>><<><>>><<>>><>>>><<<>>>><<<<>>><<<><<<<><>>><<><>>>><<<<>>>><<<>>><>>>><<<<>>><<<>>>><<>>><<<><<>>>><<>>>><<<<><>>>><<>>><<<<><<<><>>>><<<<>>><<<>><>><<>><>>><>>><<<>><<><>><<<<>><<<<><<<<>>><<<>>>><<<<>>>><>>>><<<<>><<<<><<<<>>>><<<<>>><<<>>>><>>><<>>>><<<>><>>>><<<<>>>><<<>><<>>>><<<>>>><<<><<>>>><<<<>>>><<<<>><<<<>>>><>>><<>>><<<>>>><<<>>><<<>><>><<>><>>><<>><<<>><<<><<<<>><<<<>>><<<<>>>><<<<>>><<<>><<<<><<<><<<><<<>>><<>><>><>>><<>>><<<<><<<<>><>>><>>><<<><<<<>>><>>>><<>><<<<>>>><<>>><<<><><>>>><<>>>><><>>>><<><<<<>><<<<>><<<>><>>><<>>><<<<>>>><<<<>><<<<><<><>>>><<<>><<>><<<>>>><><<<><<<>>><>>>><<>>><<<<>>>><><>><>>><<<<>><<><>>>><<<>><<<<><<<>>><>>><<><<<>>><<<<>><<<>><<<>>><>>>><<<>>>><<<>>>><<<>>><<<<>><<<<>><<<<>><<<<>>>><<<>><>><>><<>>>><>>>><><<<<>><<><<>><>><>>>><<>>>><<>>><<>>>><<>><<<>><<<<>>>><<<<><>>><<<<><<><<<><<<>><><<<>>>><<>>><<<>>>><>>><<<<>>><<<>>><<<>>><>>><<<<>><<>>>><><>>><<>>>><<>>><<>>><><<<>>><<<<><<<>>>><<<><<<<>><>>><<<>>><>>><<><<><<>>>><<>>><<<><<><<>>>><<<>><<>><<<<>><>>>><>><>><><>><><<>>>><>><<<>>>><<><<<>><<<<>><<><<<<><<><>>><<>>><<>><<<>>>><<<<>>>><<<<>>>><<<<>><<<<><<<>>><<<><<>><><<>>>><<><>><>>>><>>>><<>>><<><<<>>>><<<<>>>><>>>><>><<<<>>>><>>>><<<>><<>><<<<><<>>>><<<>>>><>>>><<>>>><>><><<<<>>>><<<><<>><<<<>>>><<<>>>><<<<><<<>><>>>><<<<>><<<><<<<>>><<<>><<>>>><<<<>><<<><<>><<<>";
const inputExample = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>";
const input = inputReal;

const emptyLine = 0b100000001;
let rocks = [
  [0b000111100],
  [0b000010000, 0b000111000, 0b000010000],
  [0b000111000, 0b000001000, 0b000001000],
  [0b000100000, 0b000100000, 0b000100000, 0b000100000],
  [0b000110000, 0b000110000],
];
let field: Array<number> = [0b111111111];
let inputOffset = 0;

function drawField(title: string, shape?: Array<number>, height?: number) {
  console.log();
  console.log(title);
  for (let i = field.length - 1; i >= 0; i--) {
    if (shape && i >= height! && i < height! + shape!.length) {
      console.log((field[i] | shape[i - height!]).toString(2));
    } else {
      console.log(field[i].toString(2));
    }
  }
}

function growField() {
  for (let i = 0; i < 3; i++) {
    field.push(emptyLine);
  }
}

function truncateField() {
  field = field.filter((item) => !(item === emptyLine));
}

function moveDown(shape: Array<number>, height: number): boolean {
  for (let i = 0; i < shape.length; i++) {
    if (shape[i] & field[i + height - 1]) {
      return false;
    }
  }
  return true;
}

function moveRight(shape: Array<number>, height: number): boolean {
  for (let i = 0; i < shape.length; i++) {
    if ((shape[i] >> 1) & field[i + height]) {
      return false;
    }
  }
  for (let i = 0; i < shape.length; i++) {
    shape[i] = shape[i] >> 1;
  }
  return true;
}

function moveLeft(shape: Array<number>, height: number): boolean {
  for (let i = 0; i < shape.length; i++) {
    if ((shape[i] << 1) & field[i + height]) {
      return false;
    }
  }
  for (let i = 0; i < shape.length; i++) {
    shape[i] = shape[i] << 1;
  }
  return true;
}

function setShape(shape: Array<number>, height: number) {
  for (let i = 0; i < shape.length; i++) {
    field[height + i] |= shape[i];
  }
  truncateField();
}

function dropShape(shape: Array<number>) {
  growField();
  for (let i = 0; i < shape.length; i++) {
    field.push(emptyLine);
  }
  let height = field.length - shape.length;
  // drawField("start:", shape, height);
  while (true) {
    switch (input.charAt(inputOffset)) {
      case ">":
        moveRight(shape, height);
        // drawField("right:", shape, height);
        break;
      case "<":
        moveLeft(shape, height);
        // drawField("left:", shape, height);
        break;
    }
    inputOffset++;
    if (inputOffset == input.length) {
      inputOffset = 0;
    }
    if (moveDown(shape, height) == false) break;
    height--;
    // drawField("fall:", shape, height);
  }
  setShape(shape, height);
}

async function main() {
  for (let i = 0; i < 10000; i++) {
    dropShape([...rocks[i % rocks.length]]);
    // drawField("rest:");
    // console.log(`height: ${field.length - 1}`);

    console.log(
      `rocks: ${i + 1} shape: ${
        i % rocks.length
      } offset: ${inputOffset} height: ${field.length - 1}`
    );

    // ts-node src/day17b.ts | grep 'shape: 0'
  }
  // drawField("rest:");
  // console.log(`height: ${field.length - 1}`);
}

main();

/*

TEST DATA

Zyklus:

rocks: 1976 shape: 0 offset: 6 height: 2994
rocks: 1981 shape: 0 offset: 32 height: 3005
rocks: 1986 shape: 0 offset: 19 height: 3012
rocks: 1991 shape: 0 offset: 11 height: 3019
rocks: 1996 shape: 0 offset: 38 height: 3029
rocks: 2001 shape: 0 offset: 25 height: 3035
rocks: 2006 shape: 0 offset: 14 height: 3041
rocks: 2011 shape: 0 offset: 6 height: 3047

rocks: 35 height: 53

Start:

rocks: 16 shape: 0 offset: 6 height: 26

Zyklen: floor((2022-16)/35) = 57

Height ohne Rest: 26 + 57*53 = 3'047
Rocks ohne Rest: 16 + 57*35 = 2'011
Rest: 2'022 - 2011 = 11 rocks nach Zyklus

rocks: 16 shape: 0 offset: 6 height: 26
rocks: 27 shape: 1 offset: 23 height: 47

Rest: 47-26 = 21

Total: 3'047 + 21 = 3'047


REAL DATA


Zyklus:

rocks: 6791 shape: 0 offset: 24 height: 10461
...
rocks: 8486 shape: 0 offset: 24 height: 13071

rocks: 1'695 height: 2'610

Start:

rocks: 1706 shape: 0 offset: 24 height: 2631

Zyklen: floor((1'000'000'000'000-1706)/1695) = 589'970'500

Height ohne Rest: 2631 + 589'970'500*2'610 = 1'539'823'007'631
Rocks ohne Rest: 1706 + 589'970'500*1695 = 999'999'999'206
Rest: 1000000000000 - 999'999'999'206 = 794 rocks nach Zyklus

rocks: 1706 shape: 0 offset: 24 height: 2631
rocks: 2500 shape: 4 offset: 4829 height: 3825

Rest: 3825 - 2631 = 1'194

Total: 1'539'823'007'631 + 1'194 = 1'539'823'008'825

*/