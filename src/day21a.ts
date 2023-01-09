import { readFileSync } from "fs";

interface Unresolved {
  identifier: string;
  operand1: string;
  operand2: string;
  operation: string;
}

function readInput(): string[] {
  const fileContent = readFileSync("day21.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

async function main() {
  let resolved = new Map();
  let unresolveds: Array<Unresolved> = [];

  const lines = readInput();
  for (const line of lines) {
    if (line.match(/[0-9]+/)) {
      const matches = line.match(/([a-z]+): ([0-9]+)/);
      resolved.set(matches![1], +matches![2]);
    } else {
      const matches = line.match(/([a-z]+): ([a-z]+) (.) ([a-z]+)/);
      unresolveds.push({
        identifier: matches![1],
        operand1: matches![2],
        operand2: matches![4],
        operation: matches![3],
      });
    }
  }
  while (!resolved.get("root")) {
    console.log(`resolved: ${resolved.size} unresolved: ${unresolveds.length}`);
    for (const unresolved of unresolveds) {
      if (
        resolved.get(unresolved.operand1) &&
        resolved.get(unresolved.operand2)
      ) {
        resolved.set(
          unresolved.identifier,
          eval(
            resolved.get(unresolved.operand1) +
              unresolved.operation +
              resolved.get(unresolved.operand2)
          )
        );
        unresolveds.splice(unresolveds.indexOf(unresolved), 1);
      }
    }
  }
  console.log(resolved.get("root"));
}

main();
