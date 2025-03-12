import { parse as parseRedcode } from "./gen/redcode.js";

export interface Argument {
  mmode: string | null;
  value: number;
}

export interface Instruction {
  args: [Argument | null, Argument | null] | null;
  modifier: string | null;
  opcode: string;
}

export interface Line {
  comment: string | null;
  instruction: Instruction | null;
}

export type RedcodeProgram = Line[];

export function parseProgram(code: string): RedcodeProgram {
  return parseRedcode(code);
}

export function instructionToString(instruction: Instruction): string {
  return `${instruction.opcode}${
    instruction.modifier ? `.${instruction.modifier}` : ""
  } ${
    instruction.args
      ? instruction.args
          .map((arg) => {
            return arg ? `${arg.mmode || ""}${arg.value}` : "";
          })
          .join(", ")
      : ""
  }`;
}

export function lineToString(line: Line): string {
  const instr = line.instruction ? instructionToString(line.instruction) : "";
  const comment = line.comment ? `; ${line.comment}` : "";
  return `${instr}${comment}`;
}
