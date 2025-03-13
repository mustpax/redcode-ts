import { test, expect, describe } from "bun:test";
import { parse } from "./gen/redcode.js";
import { readdir, readFile } from "node:fs/promises";
import type { RedcodeProgram } from "./redcode.js";
import { assert } from "typia";
import { runProgram } from "./vm.js";

describe("parse all examples", async () => {
  // read all the files in the current directory
  const files = await readdir("redcode_examples");
  for (const file of files) {
    const content = await readFile(`redcode_examples/${file}`, "utf8");
    const result = parse(content);
    test(`${file} - snapshot`, async () => {
      expect(result).toMatchSnapshot();
    });
    test(`${file} - type`, async () => {
      const type = assert<RedcodeProgram>(result);
    });
    test(`${file} - run`, async () => {
      const memory = runProgram({
        program: result,
        memorySize: 40,
        trace: true,
      });
      expect(memory).toMatchSnapshot();
    });
  }
});
