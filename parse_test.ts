import { test, expect, describe } from "bun:test";
import { parse } from "./gen/redcode.js";
import { readdir, readFile } from "node:fs/promises";

describe("parse all examples", async () => {
  // read all the files in the current directory
  const files = await readdir("redcode_examples");
  for (const file of files) {
    test(file, async () => {
      const content = await readFile(`redcode_examples/${file}`, "utf8");
      const result = parse(content);
      expect(result).toMatchSnapshot();
    });
  }
});
