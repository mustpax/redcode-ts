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

export function parse(code: string): RedcodeProgram {
  return parseRedcode(code);
}
