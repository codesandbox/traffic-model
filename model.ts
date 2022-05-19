/**
 * Probability of x VMs spawning in this minute
 */
const VM_PROB_MINUTE = 1;
/**
 * Range of VMs to spawn in a minute
 */
const VM_MULT = [5, 10];
/**
 * Hibernation time of a VM in minutes
 */
const VM_HIBERNATION_MINUTES = 5;
/**
 * How long there's activity on a VM (range)
 */
const VM_HIBERNATION_ACTIVITY_TIME_RANGE = [0, 60];

/**
 * Minutes to run the simulation
 */
const MAX_MINUTE = 60 * 24;

// Clear console
console.log("\x1Bc");

class Vm {
  isActive = true;
  iterations = 0;
  endActivityTime: number;

  constructor() {
    this.endActivityTime = Math.floor(
      VM_HIBERNATION_ACTIVITY_TIME_RANGE[0] +
        (VM_HIBERNATION_ACTIVITY_TIME_RANGE[1] -
          VM_HIBERNATION_ACTIVITY_TIME_RANGE[0]) *
          Math.random()
    );
  }

  public revolution() {
    this.iterations++;

    if (this.iterations >= this.endActivityTime) {
      this.isActive = false;
    }

    if (this.iterations - this.endActivityTime >= VM_HIBERNATION_MINUTES) {
      return false;
    }

    return true;
  }
}

let vms: Vm[] = [];
const results: number[] = [];

for (let i = 0; i < MAX_MINUTE; i++) {
  vms = vms.filter((vm) => vm.revolution());
  if (Math.random() < VM_PROB_MINUTE) {
    const vmCount = Math.floor(
      VM_MULT[0] + (VM_MULT[1] - VM_MULT[0]) * Math.random()
    );
    for (let j = 0; j < vmCount; j++) {
      vms.push(new Vm());
    }
  }

  results.push(vms.length);

  if (i % 60 == 0) {
    console.log(
      `${((i / 60 + "").length === 1 ? "0" : "") + i / 60}:  (${vms.length})`
    );
  }
}

console.log("Maximum VM count: " + Math.max(...results));

const resultsAfterHour = results.slice(60);
console.log(
  "Mean VM count: " +
    resultsAfterHour.reduce((p, n) => p + n, 0) / resultsAfterHour.length
);
