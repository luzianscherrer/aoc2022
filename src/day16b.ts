import { readFileSync } from "fs";

let nodes: Array<Node> = [];
let distances: Map<string, Map<string, number>>;
let rates: Map<string, number>;
let maxOutput = 0;
let runs: Array<Run> = [];
const minutes = 26;

interface Run {
  output: number;
  path: Array<string>;
}

interface Node {
  name: string;
  neighbours: Array<Node>;
  rate: number;
  visited: boolean;
}

interface PathPosition {
  distance: number;
  node: Node;
}

interface PathElement {
  output: number;
  elapsed: number;
  node: string;
  visited: Array<string>;
}

function readInput(): string[] {
  const fileContent = readFileSync("day16example.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function parseGraph() {
  rates = new Map<string, number>();
  const lines = readInput();

  for (const line of lines) {
    const matches = line.match(/^Valve ([A-Z]+) has flow rate=([-0-9]+).+/);
    nodes.push({
      name: matches![1],
      neighbours: [],
      rate: +matches![2],
      visited: false,
    });
    rates.set(matches![1], +matches![2]);
  }

  let count = 0;
  for (const line of lines) {
    const matches = line.match(/^.+to valves? ([A-Z ,]+)$/);
    const names = matches![1].split(", ");
    for (const name of names) {
      for (const node of nodes) {
        if (node.name === name) {
          nodes[count].neighbours.push(node);
        }
      }
    }
    count++;
  }
}

function shortestPaths(startNode: Node) {
  let queue: Array<PathPosition>;
  distances = new Map<string, Map<string, number>>();

  for (const node of nodes) {
    if (node.rate == 0 && node != startNode) continue;
    // console.log(`processing ${node.name}`);
    nodes.map((node) => (node.visited = false));
    queue = [];
    queue.push({ distance: 0, node: node });

    let currentDistances = new Map<string, number>();
    while (queue.length) {
      const pathPosition = queue.shift();
      if (pathPosition!.node.visited) continue;
      pathPosition!.node.visited = true;
      // console.log(
      //   `  distance to ${pathPosition!.node.name} is ${pathPosition!.distance}`
      // );
      if (pathPosition!.node.rate != 0 && pathPosition!.distance != 0) {
        currentDistances.set(pathPosition!.node.name, pathPosition!.distance);
      }
      for (const neighbour of pathPosition!.node.neighbours) {
        queue.push({ distance: pathPosition!.distance + 1, node: neighbour });
      }
    }

    distances.set(node.name, currentDistances);
  }
}

// function permutations(elements: Array<string>) {
//   const permute = (arr: Array<string>, m: Array<string> = []) => {
//     if (arr.length === 0) {
//       let output = 0;
//       let minsLeft = 30;
//       for (let i = 0; i < m.length; i++) {
//         minsLeft -=
//           1 + distances.get(i == 0 ? nodes[0].name : m[i - 1])!.get(m[i])!;
//         output += minsLeft * rates.get(m[i])!;
//         if (minsLeft < 0) break;
//       }
//       if (output > maxOutput) {
//         maxOutput = output;
//       }
//       console.log(m, output);
//     } else {
//       for (let i = 0; i < arr.length; i++) {
//         let curr = arr.slice();
//         let next = curr.splice(i, 1);
//         permute(curr.slice(), m.concat(next));
//       }
//     }
//   };
//   permute(elements);
// }

function searchPath() {
  let queue: Array<PathElement> = [];

  for (let key of distances.get(nodes[0].name)!.keys()) {
    let elapsed = 1 + distances.get(nodes[0].name)!.get(key)!;
    queue.push({
      node: key,
      elapsed: elapsed,
      output: rates.get(key)! * (minutes - elapsed),
      visited: [key],
    });
  }

  while (queue.length) {
    // console.log(queue);

    let element = queue.shift();
    // console.log(element!.output, JSON.stringify(element!.visited));
    runs.push({ output: element!.output, path: [...element!.visited] });
    if (element!.output > maxOutput) {
      maxOutput = element!.output;
    }
    for (let key of distances.get(element!.node)!.keys()) {
      if (element!.visited.includes(key)) continue;
      let elapsed =
        1 + distances.get(element!.node)!.get(key)! + element!.elapsed;
      if (elapsed > minutes) {
        // console.log("elapsed", key, element!.visited, element!.elapsed);
        continue;
      }
      queue.push({
        node: key,
        elapsed: elapsed,
        output: element!.output + rates.get(key)! * (minutes - elapsed),
        visited: [...element!.visited, key],
      });
    }
  }
}

async function main() {
  parseGraph();

  let first = nodes.find((node) => node.name === "AA")!;
  nodes = nodes.filter((node) => node.name !== "AA");
  nodes.unshift(first);

  // console.log(nodes);
  // console.log(rates);

  shortestPaths(nodes[0]);
  // console.log(distances);

  // const arr = Array.from(distances.keys());
  // permutations(arr.slice(-arr.length + 1));

  searchPath();
  console.log(`${runs.length} possible runs`);

  maxOutput = 0;
  for (const runPlayer1 of runs) {
    for (const runPlayer2 of runs) {
      const filteredArray = runPlayer1.path.filter((value) =>
        runPlayer2.path.includes(value)
      );
      if (filteredArray.length === 0) {
        if (runPlayer1.output + runPlayer2.output > maxOutput) {
          maxOutput = runPlayer1.output + runPlayer2.output;
          console.log(runPlayer1.path, runPlayer2.path, maxOutput);
        }
      }
    }
  }
}

main();
