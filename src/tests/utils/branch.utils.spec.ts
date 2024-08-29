import { BranchUtils } from "../../lib/utils/branch.utils";

describe("BranchUtils", () => {
  it("should check if a value is between two number", () => {
    expect(BranchUtils.betweenRangeNumber(5, 3, 8)).toBeTruthy();
    expect(BranchUtils.betweenRangeNumber(3, 3, 8)).toBeTruthy();
    expect(BranchUtils.betweenRangeNumber(8, 3, 8)).toBeTruthy();
    expect(BranchUtils.betweenRangeNumber(12, 3, 8)).toBeFalsy();
  });
});
