import {
  instructionToString,
  lineToString,
  type Instruction,
  type RedcodeProgram,
} from "./redcode";

export function runProgram(program: RedcodeProgram) {
  const memorySize = 40;
  const programInstr = program.map((line) => line.instruction).filter((i) => i);
  const memory = new Array<Instruction>(memorySize)
    .fill({
      opcode: "DAT",
      args: null,
      modifier: null,
    })
    .map((item, index) => programInstr[index] ?? item);
  let pc = 0;

  while (pc < memory.length) {
    const instruction = memory[pc];
    console.log(instructionToString(instruction));
    if (instruction.opcode === "DAT") {
      break;
    }
    pc++;
  }
  console.log("stopped at address", pc, instructionToString(memory[pc]));
}
