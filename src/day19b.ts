import { readFileSync } from "fs";

const iterations = 32;

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
  max: {
    ore: number;
    clay: number;
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
let geodeSum = 0;

function readInput(): string[] {
  const fileContent = readFileSync("day19b.txt", "utf-8");
  const lines: string[] = [];
  fileContent.split(/\r?\n/).forEach((line) => {
    if (line) lines.push(line);
  });
  return lines;
}

function progress(states: Array<State>) {
  let topState = states[states.length - 1];

  // console.log(states);
  // console.log(`minute: ${topState.minute} geode: ${topState.resources.geode}`);

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

  let didBuy = false;

  if (topState.minute < iterations) {
    // buy geode robot
    if (
      topState.resources.ore >= blueprint.robotGeodeCost.ore &&
      topState.resources.obsidian >= blueprint.robotGeodeCost.obsidian
    ) {
      didBuy = true;
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
      topState.resources.clay >= blueprint.robotObsidianCost.clay &&
      topState.robots.obsidian < blueprint.max.obsidian
    ) {
      didBuy = true;
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
    if (
      topState.resources.ore >= blueprint.robotClayCost.ore &&
      topState.robots.clay < blueprint.max.clay
    ) {
      didBuy = true;
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
    if (
      topState.resources.ore >= blueprint.robotOreCost.ore &&
      topState.robots.ore < blueprint.max.ore
    ) {
      didBuy = true;
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

  if (topState.minute < iterations && didBuy == false) {
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
      max: {
        ore: Math.max(+matches![1], +matches![2], +matches![3], +matches![1]),
        clay: +matches![4],
        obsidian: +matches![6],
      },
    };
    console.log("blueprint:", blueprint);
    let state = {
      minute: 1,
      robots: { ore: 1, clay: 0, obsidian: 0, geode: 0 },
      resources: { ore: 1, clay: 0, obsidian: 0, geode: 0 },
    };
    // console.log("state:", state);
    progress([state]);
    console.log(`maxGeode ${maxGeode}`);
    if (geodeSum == 0) {
      geodeSum = maxGeode;
    } else {
      geodeSum *= maxGeode;
    }
    counter++;
  }
  console.log(`geodeSum ${geodeSum}`);
}

main();
