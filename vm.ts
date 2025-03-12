import { lineToString, type RedcodeProgram } from "./redcode";

export function runProgram(program: RedcodeProgram) {
  const memory = new Array(10000).fill(0);
  const registers = {
    a: 0,
    b: 0,
    c: 0,
  };

  for (const line of program) {
    console.log(lineToString(line));
  }
}
