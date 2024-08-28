import { CollectionUtils } from "../../lib";

describe("CollectionUtils", () => {
  it("should check if collection is empty: non collection", () => {
    expect(CollectionUtils.isEmpty("string")).toBeTruthy();
    expect(CollectionUtils.isEmpty(2)).toBeTruthy();
    expect(CollectionUtils.isEmpty(false)).toBeTruthy();
  });

  it("should check if collection is empty: undefined", () => {
    expect(CollectionUtils.isEmpty(null)).toBeTruthy();
    expect(CollectionUtils.isEmpty(undefined)).toBeTruthy();
  });

  it("should check if collection is empty", () => {
    expect(CollectionUtils.isEmpty([])).toBeTruthy();
    expect(CollectionUtils.isEmpty([1])).toBeFalsy();
  });

  it("should check if collection is not empty", () => {
    expect(CollectionUtils.isNotEmpty([])).toBeFalsy();
    expect(CollectionUtils.isNotEmpty([1])).toBeTruthy();
  });
});
