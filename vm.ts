import {
  instructionToString,
  type Argument,
  type Instruction,
  type RedcodeProgram,
} from "./redcode";

// We'll use this to initialize the memory
interface NormalizedInstruction {
  opcode: string;
  args: [NormalizedArgument, NormalizedArgument];
  modifier: string;
}

interface NormalizedArgument {
  value: number;
  mmode: string;
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

function emptyArg() {
  return { value: 0, mmode: "$" };
}

function normalizeArgument(
  arg: Argument | null | undefined
): NormalizedArgument {
  if (!arg) {
    return emptyArg();
  }
  return { value: arg.value, mmode: arg.mmode || "$" };
}

function normalizeInstruction(
  instruction: Instruction | null
): NormalizedInstruction {
  if (!instruction) {
    return {
      opcode: "DAT",
      args: [emptyArg(), emptyArg()],
      modifier: defaultModifiers.DAT,
    };
  }
  return {
    opcode: instruction.opcode,
    args: [
      normalizeArgument(instruction.args?.[0]),
      normalizeArgument(instruction.args?.[1]),
    ],
    modifier: defaultModifiers[instruction.opcode] ?? "F",
  };
}

export function runProgram({
  program,
  memorySize = 40,
}: {
  program: RedcodeProgram;
  memorySize?: number;
}) {
  const programInstr = program.map((line) => line.instruction).filter((i) => i);
  const memory: NormalizedInstruction[] = new Array(memorySize)
    .fill(null)
    .map((item, index) => programInstr[index] ?? item)
    .map((instr) => normalizeInstruction(instr));
  let pc = 0;

  function evaluateArgument(arg: NormalizedArgument): number {
    if (arg.mmode === "$") {
      return (pc + arg.value) % memorySize;
    }
    throw new Error(`Unsupported addressing mode: ${arg.mmode}`);
  }

  while (pc < memory.length) {
    const instruction = memory[pc];
    console.log(instructionToString(instruction));
    if (instruction.opcode === "DAT") {
      break;
    } else if (instruction.opcode === "JMP") {
      pc = evaluateArgument(instruction.args[0]);
    } else {
      pc++;
    }
  }
  console.log("stopped at address", pc, instructionToString(memory[pc]));
}
