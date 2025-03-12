import {
  instructionToString,
  type Instruction,
  type RedcodeProgram,
} from "./redcode";

// We'll use this to initialize the memory
interface NormalizedInstruction {
  opcode: string;
  args: { value: number; mmode: string }[];
  modifier: string;
}

// Default modifiers for each opcode
const defaultModifiers: Record<string, string> = {
  DAT: "F",
  MOV: "I",
  ADD: "AB",
  SUB: "AB",
  MUL: "AB",
  DIV: "AB",
  MOD: "AB",
  JMP: "B",
  JMZ: "B",
  JMN: "B",
  DJN: "B",
  CMP: "I", // CMP is an alias for SEQ
  SEQ: "I",
  SNE: "I",
  SLT: "B",
  SPL: "B",
  NOP: "F",
};

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
    } else if (instruction.opcode === "JMP") {
      pc = instruction.args?.[0]?.value ?? 0;
    } else {
      pc++;
    }
  }
  console.log("stopped at address", pc, instructionToString(memory[pc]));
}
