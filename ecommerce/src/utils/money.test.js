import { expect, it, describe } from "vitest";
import { formatMoney } from "./money";

//  a group of test is call test suit
// like in this code
//  the test are related to formatMoney
describe("formatMoeny", () => {
  it("foramts 1999 cents as 19.99", () => {
    expect(formatMoney(1999)).toBe("$19.99");
  });

  it("displays two decimals", () => {
    expect(formatMoney(1090)).toBe("$10.90");
    expect(formatMoney(100)).toBe("$1.00");
  });
});
