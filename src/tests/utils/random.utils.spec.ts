import { RandomUtils } from "../../lib";
describe("Random Utils Tests", () => {
  it("should get random boolean", () => {
    expect(() => RandomUtils.nextBoolean()).not.toThrow();
    expect(RandomUtils.nextBoolean()).not.toBeNull();
    expect(RandomUtils.nextBoolean()).not.toBeUndefined();
  });

  it("should generate an int number randomly", () => {
    expect(Number.isInteger(RandomUtils.nextInt())).toBeTruthy();
  });

  it("should generate an octal decimal value", () => {
    expect(Number.isInteger(RandomUtils.nextOctal())).toBeTruthy();
    expect([0, 1, 2, 3, 4, 5, 6, 7]).toContain(RandomUtils.nextOctal());
  });

  it("should generate a hexadecimal value", () => {
    expect(RandomUtils.nextHex()).not.toBeNull();
    expect("0123456789ABCDEF".split("")).toContain(RandomUtils.nextHex());
  });

  it("should generate a random string without throwing error", () => {
    expect(RandomUtils.chars(10)).toHaveLength(10);
    expect(RandomUtils.chars(1024)).not.toBeNull();
    expect(RandomUtils.chars(10000)).not.toBeNull();
  });

  it("should throw error when generating a random string", () => {
    expect(() => RandomUtils.chars(0)).toThrow("The length must higher than 0");
    expect(() => RandomUtils.chars(-2)).toThrow(
      "The length must higher than 0",
    );
  });

  it("should generate a secure random string", () => {
    expect(RandomUtils.secureChars(12)).not.toBeNull();
    expect(RandomUtils.secureChars(64)).not.toBeNull();
    expect(RandomUtils.secureChars(258)).not.toBeNull();
    expect(RandomUtils.secureChars(1024)).not.toBeNull();
    expect(RandomUtils.secureChars(12)).toHaveLength(12);
  });

  it("should throw error when generating bytes", () => {
    expect(() => RandomUtils.rangeBytes(-6, { min: 2, max: 9 })).toThrow(
      "byteLength must between 1 and 2^53 − 1",
    );
    expect(() =>
      RandomUtils.rangeBytes(Number.MAX_VALUE + 8, { min: 2, max: 9 }),
    ).toThrow("byteLength must between 1 and 2^53 − 1");
    expect(() => RandomUtils.rangeBytes(12, { min: 2, max: 2 })).toThrow(
      "The min and max must be different value",
    );
    expect(() => RandomUtils.rangeBytes(12, { min: 4, max: 1 })).toThrow(
      "The max must be greater than min",
    );
  });

  it("should generate bytes array based range value", () => {
    const buff = RandomUtils.rangeBytes(5, { min: 5, max: 9 });
    const arr = new Uint32Array(buff);
    expect(arr.length).toEqual(5);
    expect(() => {
      return arr.every((value) => [5, 6, 7, 8].includes(value));
    }).toBeTruthy();
  });
});
