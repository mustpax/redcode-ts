import { parseProgram } from "./redcode.js";
import { runProgram } from "./vm.js";
import { readFileSync } from "node:fs";

// Get the program file path from command line arguments
const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error("Usage: bun run index.ts <program.redcode>");
  process.exit(1);
}

const programPath = args[0];

try {
  // Read and parse the program
  const programCode = readFileSync(programPath, "utf-8");
  const program = parseProgram(programCode);

  // Execute the program
  console.log(`Executing program from ${programPath}:`);
  runProgram({ program });
} catch (error: any) {
  console.error("Error:", error?.message ?? String(error));
  process.exit(1);
}
