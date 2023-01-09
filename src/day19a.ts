import { readFileSync } from "fs";

const iterations = 24;

interface Blueprint {
  robotOreCost: {
    ore: number;
  };
  robotClayCost: {
    ore: number;
  };
  robotObsidianCost: {
    ore: number;
    clay: number;
  };
  robotGeodeCost: {
    ore: number;
    obsidian: number;
  };
}

interface State {
  minute: number;
  robots: {
    ore: number;
    clay: number;
    obsidian: number;
    geode: number;
  };
  resources: {
    ore: number;
    clay: number;
    obsidian: number;
    geode: number;
  };
}

let blueprint: Blueprint;
let maxGeode: number;
let qualitySum = 0;

function readInput(): string[] {
  const fileContent = readFileSync("day19.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function progress(states: Array<State>) {
  let topState = states[states.length - 1];

  let potential = topState.resources.geode;
  for (let i = topState.minute + 1; i <= iterations; i++) {
    potential +=
      topState.resources.geode + topState.robots.geode + (i - topState.minute);
    // console.log(`potential for minute ${i} is ${potential}`);
  }
  if (potential < maxGeode) return;

  if (topState.resources.geode > maxGeode) {
    maxGeode = topState.resources.geode;
    console.log(`minute: ${topState.minute} maxGeode: ${maxGeode}`);
    // console.log(states);
  }

  if (topState.minute < iterations) {
    // buy geode robot
    if (
      topState.resources.ore >= blueprint.robotGeodeCost.ore &&
      topState.resources.obsidian >= blueprint.robotGeodeCost.obsidian
    ) {
      progress([
        ...states,
        {
          minute: topState.minute + 1,
          robots: {
            ore: topState.robots.ore,
            clay: topState.robots.clay,
            obsidian: topState.robots.obsidian,
            geode: topState.robots.geode + 1,
          },
          resources: {
            ore:
              topState.resources.ore +
              topState.robots.ore -
              blueprint.robotGeodeCost.ore,
            clay: topState.resources.clay + topState.robots.clay,
            obsidian:
              topState.resources.obsidian +
              topState.robots.obsidian -
              blueprint.robotGeodeCost.obsidian,
            geode: topState.resources.geode + topState.robots.geode,
          },
        },
      ]);
    }
  }

  if (topState.minute < iterations - 1) {
    // buy obsidian robot
    if (
      topState.resources.ore >= blueprint.robotObsidianCost.ore &&
      topState.resources.clay >= blueprint.robotObsidianCost.clay
    ) {
      progress([
        ...states,
        {
          minute: topState.minute + 1,
          robots: {
            ore: topState.robots.ore,
            clay: topState.robots.clay,
            obsidian: topState.robots.obsidian + 1,
            geode: topState.robots.geode,
          },
          resources: {
            ore:
              topState.resources.ore +
              topState.robots.ore -
              blueprint.robotObsidianCost.ore,
            clay:
              topState.resources.clay +
              topState.robots.clay -
              blueprint.robotObsidianCost.clay,
            obsidian: topState.resources.obsidian + topState.robots.obsidian,
            geode: topState.resources.geode + topState.robots.geode,
          },
        },
      ]);
    }

    // buy clay robot
    if (topState.resources.ore >= blueprint.robotClayCost.ore) {
      progress([
        ...states,
        {
          minute: topState.minute + 1,
          robots: {
            ore: topState.robots.ore,
            clay: topState.robots.clay + 1,
            obsidian: topState.robots.obsidian,
            geode: topState.robots.geode,
          },
          resources: {
            ore:
              topState.resources.ore +
              topState.robots.ore -
              blueprint.robotClayCost.ore,
            clay: topState.resources.clay + topState.robots.clay,
            obsidian: topState.resources.obsidian + topState.robots.obsidian,
            geode: topState.resources.geode + topState.robots.geode,
          },
        },
      ]);
    }

    // buy ore robot
    if (topState.resources.ore >= blueprint.robotOreCost.ore) {
      progress([
        ...states,
        {
          minute: topState.minute + 1,
          robots: {
            ore: topState.robots.ore + 1,
            clay: topState.robots.clay,
            obsidian: topState.robots.obsidian,
            geode: topState.robots.geode,
          },
          resources: {
            ore:
              topState.resources.ore +
              topState.robots.ore -
              blueprint.robotOreCost.ore,
            clay: topState.resources.clay + topState.robots.clay,
            obsidian: topState.resources.obsidian + topState.robots.obsidian,
            geode: topState.resources.geode + topState.robots.geode,
          },
        },
      ]);
    }
  }

  if (topState.minute < iterations) {
    progress([
      ...states,
      {
        minute: topState.minute + 1,
        robots: {
          ore: topState.robots.ore,
          clay: topState.robots.clay,
          obsidian: topState.robots.obsidian,
          geode: topState.robots.geode,
        },
        resources: {
          ore: topState.resources.ore + topState.robots.ore,
          clay: topState.resources.clay + topState.robots.clay,
          obsidian: topState.resources.obsidian + topState.robots.obsidian,
          geode: topState.resources.geode + topState.robots.geode,
        },
      },
    ]);
  }
}

async function main() {
  const lines = readInput();
  let counter = 1;
  for (const line of lines) {
    const matches = line.match(
      /.+ore robot costs ([0-9]+).+clay robot costs ([0-9]+).+obsidian robot costs ([0-9]+) ore and ([0-9]+).+geode robot costs ([0-9]+) ore and ([0-9]+).+/
    );

    console.log(`run ${counter}`);
    maxGeode = 0;
    blueprint = {
      robotOreCost: { ore: +matches![1] },
      robotClayCost: { ore: +matches![2] },
      robotObsidianCost: { ore: +matches![3], clay: +matches![4] },
      robotGeodeCost: { ore: +matches![5], obsidian: +matches![6] },
    };
    console.log("blueprint:", blueprint);
    let state = {
      minute: 1,
      robots: { ore: 1, clay: 0, obsidian: 0, geode: 0 },
      resources: { ore: 1, clay: 0, obsidian: 0, geode: 0 },
    };
    // console.log("state:", state);
    progress([state]);
    console.log(`quality ${counter * maxGeode}`);
    qualitySum += counter * maxGeode;
    counter++;
  }
  console.log(`quality sum ${qualitySum}`);
}

main();
