import assert from "node:assert";
import test from "node:test";

import { isTest } from "../src/lib/index.js";


test("test", () => {
  const check = isTest('TEST')

  assert.equal(check, true);
});
