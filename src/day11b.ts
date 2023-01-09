import { readFileSync } from "fs";

const monkeys: Array<Monkey> = [];

class Monkey {
  items: Array<number>;
  operationFactor: number;
  operationSummand: number;
  testDivisor: number;
  inspections: number;
  jumpTrue: number;
  jumpFalse: number;

  constructor() {
    this.items = [];
    this.operationFactor = 1;
    this.operationSummand = 0;
    this.testDivisor = 0;
    this.inspections = 0;
    this.jumpTrue = 0;
    this.jumpFalse = 0;
  }

  operation(item: number): number {
    // console.log(`  inspecting ${item}`);
    this.inspections++;
    this.operationFactor == -1
      ? (item *= item)
      : (item *= this.operationFactor);
    this.operationSummand == -1
      ? (item += item)
      : (item += this.operationSummand);
    // console.log(`    worry ${item}`);
    return item;
  }

  test(item: number): boolean {
    return item % this.testDivisor == 0;
  }
}

function readInput(): string[] {
  const fileContent = readFileSync("day11.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/Monkey [0-9]+:\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

async function main() {
  const lines = readInput();
  for (const line of lines) {
    const matches = line.match(
      /.+items: ([0-9 ,]+)\n.+old (.) ([^\n]+)\n.+by ([0-9]+)\n.+monkey ([0-9]+)\n.+monkey ([0-9]+)/
    );
    let monkey = new Monkey();
    monkey.items = [...matches![1].split(/, /)].map((str) => Number(str));
    if (matches![2] === "+") {
      matches![3] == "old"
        ? (monkey.operationSummand = -1)
        : (monkey.operationSummand = +matches![3]);
    } else if (matches![2] === "*") {
      matches![3] == "old"
        ? (monkey.operationFactor = -1)
        : (monkey.operationFactor = +matches![3]);
    }
    monkey.testDivisor = +matches![4];
    monkey.jumpTrue = +matches![5];
    monkey.jumpFalse = +matches![6];
    // console.log(monkey);
    monkeys.push(monkey);
  }

  let reductionLimit = 1;
  for (let monkey of monkeys) {
    reductionLimit *= monkey.testDivisor;
  }
  for (let i = 0; i < 10000; i++) {
    let counter = 0;
    for (let monkey of monkeys) {
      // console.log(`monkey ${counter}`);
      counter++;
      for (let item of monkey.items) {
        item = monkey.operation(item);
        if (item > reductionLimit) item %= reductionLimit;
        // console.log(`    worry ${item}`);
        monkey.test(item)
          ? monkeys[monkey.jumpTrue].items.push(item)
          : monkeys[monkey.jumpFalse].items.push(item);
      }
      monkey.items = [];
    }
    // console.log(`round ${i + 1}`, monkeys);
  }
  let inspections = monkeys.map((monkey) => monkey.inspections);
  console.log(inspections);
  inspections.sort(function (a, b) {
    return b - a;
  });
  console.log(inspections[0] * inspections[1]);
}

main();
