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

export function lineToString(line: Line): string {
  const instr = line.instruction
    ? `${line.instruction.opcode}${
        line.instruction.modifier ? `.${line.instruction.modifier}` : ""
      } ${
        line.instruction.args
          ? line.instruction.args
              .map((arg) => {
                return arg ? `${arg.mmode || ""}${arg.value}` : "";
              })
              .join(", ")
          : ""
      }`
    : "";
  const comment = line.comment ? `; ${line.comment}` : "";
  return `${instr}${comment}`;
}
