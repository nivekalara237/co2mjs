import { random, randomInteger } from "../../lib/utils/cryptographically";

describe("Cryptographically ", () => {
  it("should generate secured random int", () => {
    expect(random()).not.toBeNull();
    expect(() => {
      const i = random();
      return i >= 0 && i < 1;
    }).toBeTruthy();
  });

  it("should generate an secured integer", () => {
    expect(randomInteger(3)).not.toBeNull();
    expect(randomInteger(12)).not.toBeNull();
    expect(randomInteger(32)).not.toBeNull();
    expect(randomInteger(64)).not.toBeNull();
    expect(randomInteger(1029)).not.toBeNull();
    expect(randomInteger(189023)).not.toBeNull();
    expect(randomInteger(3) < 3).toBeTruthy();
  });

  it("should throw error during generation of random integer", () => {
    expect(() => randomInteger(-1)).toThrow();
    expect(() => randomInteger(908080980800890898970)).toThrow();
  });
});
