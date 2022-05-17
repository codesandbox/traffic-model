const VM_PROB_MINUTE = 0.6;
const VM_HIBERNATION_MINUTES = 5;
const VM_HIBERNATION_ACTIVITY_TIME_RANGE = [0, 60];

const MAX_MINUTE = 60 * 24;

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

    if (this.iterations - this.endActivityTime >= 5) {
      return false;
    }

    return true;
  }
}

let vms: Vm[] = [];

for (let i = 0; i < MAX_MINUTE; i++) {
  vms = vms.filter((vm) => vm.revolution());
  if (Math.random() < VM_PROB_MINUTE) {
    vms.push(new Vm());
  }

  if (i % 60 == 0) {
    console.log(
      `${((i / 60 + "").length === 1 ? "0" : "") + i / 60}: ${".".repeat(
        vms.length
      )} (${vms.length})`
    );
  }
}
