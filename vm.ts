import {
  instructionToString,
  lineToString,
  type Instruction,
  type RedcodeProgram,
} from "./redcode";

export function runProgram(program: RedcodeProgram) {
  const memory = program.map((line) => line.instruction).filter((i) => i);
  let pc = 0;

  while (pc < program.length) {
    const instruction = memory[pc];
    if (instruction) {
      console.log(instructionToString(instruction));
    }
    pc++;
  }
}
