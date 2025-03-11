import { test, expect } from "bun:test";

test("snap", () => {
  expect("foo").toMatchSnapshot();
});
