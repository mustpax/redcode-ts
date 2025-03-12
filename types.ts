export interface Argument {
  mmode: string | null;
  value: number;
}

export interface Instruction {
  args: [Argument | null, Argument | null];
  modifier: string | null;
  opcode: string;
}

export interface Line {
  comment: string | null;
  instruction: Instruction | null;
}

export type RedcodeProgram = Line[];
