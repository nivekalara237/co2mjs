import { BooleanUtils } from "../../lib";

describe("Test boolean utilities", () => {
  it("Should check isFalse", () => {
    expect(BooleanUtils.isFalse(false)).toBeTruthy();
    expect(BooleanUtils.isFalse("false")).toBeTruthy();
    expect(BooleanUtils.isFalse(null)).toBeTruthy();
    expect(BooleanUtils.isFalse(undefined)).toBeTruthy();
    expect(BooleanUtils.isFalse(true)).toBeFalsy();
  });

  it("Should check isNotFalse", () => {
    expect(BooleanUtils.isNotFalse(false)).toBeFalsy();
    expect(BooleanUtils.isNotFalse("false")).toBeFalsy();
    expect(BooleanUtils.isNotFalse(null)).toBeFalsy();
    expect(BooleanUtils.isNotFalse(undefined)).toBeFalsy();
    expect(BooleanUtils.isNotFalse(true)).toBeTruthy();
  });

  it("Should check isTrue", () => {
    expect(BooleanUtils.isTrue(true)).toBeTruthy();
    expect(BooleanUtils.isTrue("true")).toBeTruthy();
    expect(BooleanUtils.isTrue(null)).toBeFalsy();
    expect(BooleanUtils.isTrue(undefined)).toBeFalsy();
  });

  it("Should check isNotTrue", () => {
    expect(BooleanUtils.isNotTrue(true)).toBeFalsy();
    expect(BooleanUtils.isNotTrue("true")).toBeFalsy();
    expect(BooleanUtils.isNotTrue(null)).toBeTruthy();
    expect(BooleanUtils.isNotTrue(undefined)).toBeTruthy();
  });

  it("should check truthy", function () {
    expect(BooleanUtils.safetyElegant("True")).toBeTruthy();
    expect(BooleanUtils.safetyElegant("true")).toBeTruthy();
    expect(BooleanUtils.safetyElegant("TRUE")).toBeTruthy();
    expect(BooleanUtils.safetyElegant("on")).toBeTruthy();
    expect(BooleanUtils.safetyElegant("1")).toBeTruthy();
    expect(BooleanUtils.safetyElegant(1)).toBeTruthy();
    expect(BooleanUtils.safetyElegant(3)).toBeTruthy();
  });
  it("should check falsy", function () {
    expect(BooleanUtils.safetyElegant("False")).toBeFalsy();
    expect(BooleanUtils.safetyElegant("false")).toBeFalsy();
    expect(BooleanUtils.safetyElegant("FALSE")).toBeFalsy();
    expect(BooleanUtils.safetyElegant("off")).toBeFalsy();
    expect(BooleanUtils.safetyElegant("0")).toBeFalsy();
    expect(BooleanUtils.safetyElegant(0)).toBeFalsy();
  });

  it("should check safe elegant for undefined value", () => {
    expect(BooleanUtils.safetyElegant(null)).toBeFalsy();
    expect(BooleanUtils.safetyElegant(undefined)).toBeFalsy();
  });

  it("should check safe elegant for empty array value", () => {
    expect(BooleanUtils.safetyElegant([])).toBeFalsy();
  });

  it("Should throw error [and]", () => {
    expect(() => BooleanUtils.and(null)).toThrow(
      "The andValues must an non-empty array",
    );
    expect(() => BooleanUtils.and(...[])).toThrow(
      "The andValues must an non-empty array",
    );
  });

  it("Should check consistenty of [and]", () => {
    expect(BooleanUtils.and(true)).toBeTruthy();
    expect(BooleanUtils.and(true, true, true)).toBeTruthy();
    expect(BooleanUtils.and(true, true, false)).toBeFalsy();
    expect(BooleanUtils.and(true, false, false)).toBeFalsy();
    expect(BooleanUtils.and(false, false, false)).toBeFalsy();
    expect(BooleanUtils.and(false)).toBeFalsy();
  });

  it("Should check consistenty of [or]", () => {
    expect(BooleanUtils.or(true)).toBeTruthy();
    expect(BooleanUtils.or(true, true, true)).toBeTruthy();
    expect(BooleanUtils.or(true, true, false)).toBeTruthy();
    expect(BooleanUtils.or(true, false, false)).toBeTruthy();
    expect(BooleanUtils.or(false, false, false)).toBeFalsy();
    expect(BooleanUtils.or(false, false, true)).toBeTruthy();
    expect(BooleanUtils.or(false)).toBeFalsy();
  });

  it("Should throw error [or]", () => {
    expect(() => BooleanUtils.or(null)).toThrow(
      "The orValues must an non-empty array",
    );
    expect(() => BooleanUtils.or(...[])).toThrow(
      "The orValues must an non-empty array",
    );
  });

  it("Should negates the booleans", () => {
    expect(BooleanUtils.negate(true)).toBeFalsy();
    expect(BooleanUtils.negate(false)).toBeTruthy();
    expect(BooleanUtils.negate(null)).toBeNull();
    expect(BooleanUtils.negate(undefined)).toBeUndefined();
  });

  it("Should convert value of types number,bigint,string to boolean", () => {
    expect(BooleanUtils.toBoolean(true)).toBeTruthy();
    expect(BooleanUtils.toBoolean(null)).toBeFalsy();
    expect(BooleanUtils.toBoolean(undefined)).toBeFalsy();
    expect(BooleanUtils.toBoolean(0)).toBeFalsy();
    expect(BooleanUtils.toBoolean(1)).toBeTruthy();
    expect(BooleanUtils.toBoolean(2)).toBeTruthy();
    expect(BooleanUtils.toBoolean("yes")).toBeTruthy();
    expect(BooleanUtils.toBoolean("on")).toBeTruthy();
    expect(BooleanUtils.toBoolean("no")).toBeFalsy();
    expect(BooleanUtils.toBoolean("off")).toBeFalsy();
    expect(BooleanUtils.toBoolean("YES")).toBeTruthy();
    expect(BooleanUtils.toBoolean("ON")).toBeTruthy();
    expect(BooleanUtils.toBoolean("NO")).toBeFalsy();
    expect(BooleanUtils.toBoolean("OFF")).toBeFalsy();

    expect(BooleanUtils.toBoolean("FALSE")).toBeFalsy();
    expect(BooleanUtils.toBoolean("false")).toBeFalsy();
    expect(BooleanUtils.toBoolean("f")).toBeFalsy();
    expect(BooleanUtils.toBoolean("F")).toBeFalsy();
    expect(BooleanUtils.toBoolean("n")).toBeFalsy();
    expect(BooleanUtils.toBoolean("N")).toBeFalsy();
    expect(BooleanUtils.toBoolean("ko")).toBeFalsy();
    expect(BooleanUtils.toBoolean("KO")).toBeFalsy();

    expect(BooleanUtils.toBoolean("TRUE")).toBeTruthy();
    expect(BooleanUtils.toBoolean("true")).toBeTruthy();
    expect(BooleanUtils.toBoolean("t")).toBeTruthy();
    expect(BooleanUtils.toBoolean("T")).toBeTruthy();
    expect(BooleanUtils.toBoolean("y")).toBeTruthy();
    expect(BooleanUtils.toBoolean("Y")).toBeTruthy();
    expect(BooleanUtils.toBoolean("OK")).toBeTruthy();
    expect(BooleanUtils.toBoolean("ok")).toBeTruthy();

    expect(() => BooleanUtils.toBoolean("WRONG")).toThrow();
  });

  it("should convert number to boolean", () => {
    expect(() => BooleanUtils.numberToBoolean(3, 0, 0)).toThrow(
      "Illegal(s) argument(s) passed",
    );
    expect(BooleanUtils.numberToBoolean(null, null, 2)).toBeTruthy();
    expect(BooleanUtils.numberToBoolean(null, 1, null)).toBeFalsy();
    expect(BooleanUtils.numberToBoolean(0, 1, 0)).toBeFalsy();
    expect(BooleanUtils.numberToBoolean(1, 1, 0)).toBeTruthy();

    expect(() => BooleanUtils.numberToBoolean(3, 1, 0)).toThrow(
      "The number did not match either specified value",
    );
  });

  it("should convert string to boolean", () => {
    expect(() => BooleanUtils.stringToBoolean("ok", "ok", "ok")).toThrow(
      "Illegal(s) argument(s) passed",
    );
    expect(BooleanUtils.stringToBoolean(null, null, "ko")).toBeTruthy();
    expect(BooleanUtils.stringToBoolean(null, "ok", null)).toBeFalsy();
    expect(BooleanUtils.stringToBoolean("ko", "ok", "ko")).toBeFalsy();
    expect(BooleanUtils.stringToBoolean("ok", "ok", "ko")).toBeTruthy();

    expect(() => BooleanUtils.stringToBoolean("yes", "ok", "ko")).toThrow(
      "The characters did not match either specified value",
    );
  });

  it("should test xor", () => {
    expect(BooleanUtils.xor(true, true)).toBeFalsy();
    expect(BooleanUtils.xor(false, false)).toBeFalsy();
    expect(BooleanUtils.xor(true, false)).toBeTruthy();
    expect(BooleanUtils.xor(true, false, false)).toBeTruthy();
    expect(BooleanUtils.xor(true, true, true)).toBeTruthy();
    expect(BooleanUtils.xor(true, true, true, true)).toBeFalsy();
  });

  it("Should throw error [xor]", () => {
    expect(() => BooleanUtils.xor(null)).toThrow(
      "The xorValues must an non-empty array",
    );
    expect(() => BooleanUtils.xor(...[])).toThrow(
      "The xorValues must an non-empty array",
    );
  });

  it("should convert boolean to string on/off", () => {
    expect(BooleanUtils.toOnOff(true)).toEqual("ON");
    expect(BooleanUtils.toOnOff(false)).toEqual("OFF");
  });

  it("should convert boolean to string yes/no", () => {
    expect(BooleanUtils.toYesNo(true)).toEqual("YES");
    expect(BooleanUtils.toYesNo(false)).toEqual("NO");
  });

  it("should convert boolean to int 0/1", () => {
    expect(BooleanUtils.toInt(true)).toEqual(1);
    expect(BooleanUtils.toInt(false)).toEqual(0);
  });

  it("should convert boolean to specified number", () => {
    expect(BooleanUtils.toNumber(true, 5, 10)).toEqual(5);
    expect(BooleanUtils.toNumber(false, 5, 10)).toEqual(10);
  });

  it("should convert boolean to specified string", () => {
    expect(BooleanUtils.toChars(true, "yes", "no")).toEqual("yes");
    expect(BooleanUtils.toChars(false, "yes", "no")).toEqual("no");
  });
});
