import { readFileSync } from "fs";

interface Node {
  field: Array<Array<Position>>;
  position: Coordinate;
  minute: number;
}

interface Coordinate {
  x: number;
  y: number;
}

interface Position {
  elements: Array<string>;
}

function readInput(): string[] {
  const fileContent = readFileSync("day24example.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function parseInput(field: Array<Array<Position>>) {
  const lines = readInput();
  for (const line of lines) {
    field.push([]);
    let chars = line.split("");
    for (const char of chars) {
      field[field.length - 1].push({ elements: [char] });
    }
  }
}

function drawField(
  field: Array<Array<Position>>,
  title: string,
  position: Coordinate
) {
  console.log(title);
  for (let y = 0; y < field.length; y++) {
    let str = "";
    for (let x = 0; x < field[y].length; x++) {
      if (x === position.x && y === position.y) {
        str += "E";
      } else {
        if (field[y][x].elements.length == 1) {
          str += field[y][x].elements[0];
        } else {
          str += field[y][x].elements.length;
        }
      }
    }
    console.log(str);
  }
  console.log();
}

function moveBlizzards(field: Array<Array<Position>>): Array<Array<Position>> {
  let newField = JSON.parse(JSON.stringify(field));
  for (let y = 1; y < field.length - 1; y++) {
    for (let x = 1; x < field[y].length - 1; x++) {
      newField[y][x].elements = [];
    }
  }
  for (let y = 1; y < field.length - 1; y++) {
    for (let x = 1; x < field[y].length - 1; x++) {
      while (field[y][x].elements.length > 0) {
        const element = field[y][x].elements.pop();
        switch (element) {
          case "^":
            if (field[y - 1][x].elements[0] === "#") {
              newField[field.length - 2][x].elements.push("^");
            } else {
              newField[y - 1][x].elements.push("^");
            }
            break;
          case ">":
            if (field[y][x + 1].elements[0] === "#") {
              newField[y][1].elements.push(">");
            } else {
              newField[y][x + 1].elements.push(">");
            }
            break;
          case "v":
            if (field[y + 1][x].elements[0] === "#") {
              newField[1][x].elements.push("v");
            } else {
              newField[y + 1][x].elements.push("v");
            }
            break;
          case "<":
            if (field[y][x - 1].elements[0] === "#") {
              newField[y][field[0].length - 2].elements.push("<");
            } else {
              newField[y][x - 1].elements.push("<");
            }
            break;
        }
      }
    }
  }
  for (let y = 1; y < field.length - 1; y++) {
    for (let x = 1; x < field[y].length - 1; x++) {
      if (newField[y][x].elements.length == 0) {
        newField[y][x].elements.push(".");
      }
    }
  }
  return newField;
}

async function main() {
  let field: Array<Array<Position>> = [];
  parseInput(field);
  let startCoordinate = { x: 1, y: 0 };
  let targetCoordinate = { x: field[0].length - 2, y: field.length - 1 };
  console.log("Target: ", targetCoordinate);

  // drawField(field, "Initial state:", targetCoordinate);
  // for (let minute = 1; minute < 19; minute++) {
  //   field = moveBlizzards(field);
  //   drawField(field, `Minute ${minute}:`);
  // }

  let visited: Array<string> = [];
  let queue: Array<Node> = [];
  queue.push({
    field: field,
    position: startCoordinate,
    minute: 0,
  });
  visited.push(`${startCoordinate.x},${startCoordinate.y},0`);
  while (queue.length) {
    let node = queue.shift()!;

    // drawField(node.field, `Minute ${node.minute}:`, node.position);

    // console.log(node.minute, queue.length, node.position);

    if (
      node.position.x === targetCoordinate.x &&
      node.position.y === targetCoordinate.y
    ) {
      drawField(node.field, `Minute ${node.minute}:`, node.position);
      break;
    }

    let testField = moveBlizzards(node.field);

    if (
      node.position.y - 1 >= 0 &&
      testField[node.position.y - 1][node.position.x].elements[0] === "." &&
      visited.includes(
        `${node.position.x},${node.position.y - 1},${node.minute + 1}`
      ) === false
    ) {
      queue.push({
        field: JSON.parse(JSON.stringify(testField)),
        position: { x: node.position.x, y: node.position.y - 1 },
        minute: node.minute + 1,
      });
      visited.push(
        `${node.position.x},${node.position.y - 1},${node.minute + 1}`
      );
    }

    if (
      node.position.y + 1 <= node.field.length - 1 &&
      testField[node.position.y + 1][node.position.x].elements[0] === "." &&
      visited.includes(
        `${node.position.x},${node.position.y + 1},${node.minute + 1}`
      ) === false
    ) {
      queue.push({
        field: JSON.parse(JSON.stringify(testField)),
        position: { x: node.position.x, y: node.position.y + 1 },
        minute: node.minute + 1,
      });
      visited.push(
        `${node.position.x},${node.position.y + 1},${node.minute + 1}`
      );
    }

    if (
      testField[node.position.y][node.position.x + 1].elements[0] === "." &&
      visited.includes(
        `${node.position.x + 1},${node.position.y},${node.minute + 1}`
      ) === false
    ) {
      queue.push({
        field: JSON.parse(JSON.stringify(testField)),
        position: { x: node.position.x + 1, y: node.position.y },
        minute: node.minute + 1,
      });
      visited.push(
        `${node.position.x + 1},${node.position.y},${node.minute + 1}`
      );
    }

    if (
      testField[node.position.y][node.position.x - 1].elements[0] === "." &&
      visited.includes(
        `${node.position.x - 1},${node.position.y},${node.minute + 1}`
      ) === false
    ) {
      queue.push({
        field: JSON.parse(JSON.stringify(testField)),
        position: { x: node.position.x - 1, y: node.position.y },
        minute: node.minute + 1,
      });
      visited.push(
        `${node.position.x - 1},${node.position.y},${node.minute + 1}`
      );
    }

    if (
      testField[node.position.y][node.position.x].elements[0] === "." &&
      visited.includes(
        `${node.position.x},${node.position.y},${node.minute + 1}`
      ) === false
    ) {
      queue.push({
        field: JSON.parse(JSON.stringify(testField)),
        position: { x: node.position.x, y: node.position.y },
        minute: node.minute + 1,
      });
    }
  }
}

main();
