import assert from "node:assert";
import test from "node:test";

import { isTest } from "../lib/index.js";


test("test", () => {
  const check = isTest('TEST')

  assert.equal(check, true);
});
