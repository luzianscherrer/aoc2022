import { readFileSync } from "fs";

interface Element {
  index: number;
  value: number;
}

function readInput(): string[] {
  const fileContent = readFileSync("day20.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function display(elements: Array<Element>) {
  let str = "";
  for (const element of elements) {
    str += `${element.value}, `;
  }
  console.log(str);
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

async function main() {
  let count = 0;
  let elements: Array<Element> = [];
  const lines = readInput();
  for (const line of lines) {
    elements.push({ index: count++, value: +line });
  }
  // console.log("original:");
  // display(elements);
  for (let i = 0; i < count; i++) {
    let idx = elements.map((item) => item.index).indexOf(i);
    let element = elements[idx];
    console.log(`move ${element.value} (at ${idx})`);

    elements.splice(idx, 1);
    if (mod(idx + element.value, count - 1) == 0) {
      elements.push(element);
    } else {
      elements.splice(mod(idx + element.value, count - 1), 0, element);
    }
    // display(elements);
  }

  let idx = elements.map((item) => item.value).indexOf(0);
  console.log(`0 is at ${idx}`);
  console.log(`1000th is ${elements[mod(1000 + idx, count)].value}`);
  console.log(`2000th is ${elements[mod(2000 + idx, count)].value}`);
  console.log(`3000th is ${elements[mod(3000 + idx, count)].value}`);
  console.log(
    `result: ${
      elements[mod(1000 + idx, count)].value +
      elements[mod(2000 + idx, count)].value +
      elements[mod(3000 + idx, count)].value
    }`
  );
}

main();
