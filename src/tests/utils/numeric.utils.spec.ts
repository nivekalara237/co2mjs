import { NumericUtils } from "../../lib";

describe("NumericUtils", () => {
  describe("Is Negative Number", () => {
    it("should be negative when number", () => {
      expect(NumericUtils.isNegative(-1)).toBeTruthy();
    });
    it("should be negative when bigint", () => {
      expect(NumericUtils.isNegative(-589n)).toBeTruthy();
    });
    it("shouldn't be negative when number", () => {
      expect(NumericUtils.isNegative(1)).toBeFalsy();
    });
    it("shouldn't be negative when bigint", () => {
      expect(NumericUtils.isNegative(589n)).toBeFalsy();
    });
  });

  describe("Sanitise", () => {
    it("should return NaN for non number", () => {
      expect(NumericUtils.sanitise("NaN")).toEqual(NaN);
    });
    it("should return sanitized number", () => {
      expect(NumericUtils.sanitise(NaN)).toEqual(NaN);
      expect(NumericUtils.sanitise(3)).toEqual(3);
    });
  });

  describe("Is Infinity", () => {
    it("should be infinite", () => {
      expect(NumericUtils.isInfinity(Infinity)).toBeTruthy();
      expect(NumericUtils.isInfinity(10e897987079879)).toBeTruthy();
    });
    it("shouldn't be infinite", () => {
      expect(NumericUtils.isInfinity(7868)).toBeFalsy();
    });
  });

  describe("Is SafeBigint", () => {
    it("shouldn't be a safe bigint - Infinity", () => {
      expect(NumericUtils.isSafeBigint(Infinity)).toBeFalsy();
    });
    it("shouldn't be a safe bigint - NaN", () => {
      expect(NumericUtils.isSafeBigint(NaN)).toBeFalsy();
    });
    it("shouldn't be a safe bigint - too big number (invalid)", () => {
      expect(NumericUtils.isSafeBigint(10e897987079879)).toBeFalsy();
    });
    it("shouldn't be a safe bigint - it is a number", () => {
      expect(NumericUtils.isSafeBigint(7868)).toBeFalsy();
    });
    it("should be a safe bigint", () => {
      expect(NumericUtils.isSafeBigint(0n)).toBeTruthy();
      expect(NumericUtils.isSafeBigint(980809808n)).toBeTruthy();
      expect(NumericUtils.isSafeBigint(10 + Math.pow(2, 53))).toBeTruthy();
    });
  });

  describe("is Numeric", () => {
    it("should not a numeric - string provided", () => {
      expect(NumericUtils.isSafeNumber("yes")).toBeFalsy();
    });
    it("should not a numeric - boolean provided", () => {
      expect(NumericUtils.isSafeNumber(true)).toBeFalsy();
    });
    it("should not a numeric - object provided", () => {
      expect(NumericUtils.isSafeNumber({ name: true })).toBeFalsy();
    });
    it("should not a numeric - function provided", () => {
      expect(NumericUtils.isSafeNumber((): number => 3)).toBeFalsy();
    });
    it("should not a numeric - bigint provided", () => {
      expect(NumericUtils.isSafeNumber((): number => 3)).toBeFalsy();
    });
    it("should not numeric - infinite number provided(1)", () => {
      expect(NumericUtils.isSafeNumber(Infinity)).toBeFalsy();
    });
    it("should not a numeric - infinite number provided(2)", () => {
      expect(NumericUtils.isSafeNumber(12e1000)).toBeFalsy();
    });
    it("should not a safe numeric - number provided", () => {
      expect(NumericUtils.isSafeNumber(Math.pow(2, 53) + 1)).toBeFalsy();
    });
    it("should not a safe numeric - big provided", () => {
      expect(NumericUtils.isSafeNumber(989808n)).toBeFalsy();
    });
    it("should a safe numeric - number provided (1)", () => {
      expect(NumericUtils.isSafeNumber(Math.pow(2, 53) - 1)).toBeTruthy();
    });
    it("should a safe numeric - number provided (2)", () => {
      expect(NumericUtils.isSafeNumber(98)).toBeTruthy();
    });
  });

  describe("Rounding Number", () => {
    describe("Simple", () => {
      it("should round positive integer - OK", () => {
        expect(NumericUtils.round(12)).toEqual(12);
      });
      it("should round negative integer - OK", () => {
        expect(NumericUtils.round(-12)).toEqual(-12);
      });
      it("should round positive decimal (up)- OK", () => {
        expect(NumericUtils.round(12.7709)).toEqual(13);
      });
      it("should round negative decimal (up)- OK", () => {
        expect(NumericUtils.round(-12.7709)).toEqual(-13);
      });
      it("should round positive decimal (down)- OK", () => {
        expect(NumericUtils.round(12.1709)).toEqual(12);
      });
      it("should round negative decimal (down)- OK", () => {
        expect(NumericUtils.round(-12.1709)).toEqual(-12);
      });
    });

    describe("Half Even rounding", () => {
      it("should rounded a positive decimal with scale (half up) - OK", () => {
        expect(NumericUtils.round(12.7766, 2)).toEqual(12.78);
        expect(NumericUtils.round(12.999976, 2)).toEqual(13.0);
      });

      it("should rounded a nagative decimal with scale (half up) - OK", () => {
        expect(NumericUtils.round(-12.7766, 2)).toEqual(-12.78);
        expect(NumericUtils.round(-12.999976, 2)).toBe(-13.0);
      });

      it("should rounded a positive decimal with scale (half down) - OK", () => {
        expect(NumericUtils.round(12.7146, 2)).toEqual(12.71);
      });

      it("should rounded a negative decimal with scale (half down) - OK", () => {
        expect(NumericUtils.round(-12.7146, 2)).toEqual(-12.71);
      });
      it("should rounded a positive decimal with scale (2) - OK", () => {
        expect(NumericUtils.round(12.72, 2)).toEqual(12.72);
      });
      it("should rounded a positive decimal with scale (2) - OK", () => {
        expect(NumericUtils.round(-12.72, 2)).toEqual(-12.72);
      });
    });

    describe("Half Up rounding", () => {
      it("should rounded up a positive number - zero", () => {
        expect(NumericUtils.round(15.78, 2, "up")).toEqual(15.78);
        expect(NumericUtils.round(15.78, 3, "up")).toEqual(15.78);
      });
      it("should rounded up a nagative number - zero", () => {
        expect(NumericUtils.round(-15.78, 2, "up")).toEqual(-15.78);
        expect(NumericUtils.round(-15.78, 3, "up")).toEqual(-15.78);
      });
      it("should rounded up a positive number", () => {
        expect(NumericUtils.round(15.781098, 2, "up")).toEqual(15.79);
        expect(NumericUtils.round(15.789098, 2, "up")).toEqual(15.79);
        expect(
          NumericUtils.round(15.7890000000000000000000000098, 2, "up")
        ).toEqual(15.79);
      });
      it("should rounded up a negative number", () => {
        expect(NumericUtils.round(-15.781098, 2, "up")).toEqual(-15.79);
        expect(NumericUtils.round(-15.789098, 2, "up")).toEqual(-15.79);
        expect(
          NumericUtils.round(-15.7890000000000000000000000098, 2, "up")
        ).toEqual(-15.79);
      });
    });

    describe("Half Down rounding", () => {
      it("should rounded down a positive number", () => {
        expect(NumericUtils.round(15.789009, 2, "down")).toEqual(15.78);
        expect(NumericUtils.round(15.78, 3, "down")).toEqual(15.78);
      });
      it("should rounded down a negative number", () => {
        expect(NumericUtils.round(-15.789009, 2, "down")).toEqual(-15.78);
        expect(NumericUtils.round(-15.78, 3, "down")).toEqual(-15.78);
      });
    });
  });

  describe("Math Rounding", () => {
    describe("Scale Floor", () => {
      it("should scale positive number", () => {
        expect(NumericUtils.scaling(12.07879, 2, "floor")).toEqual(12.07);
        expect(NumericUtils.scaling(12.07179, 2, "floor")).toEqual(12.07);
      });
      it("should scale negative number", () => {
        expect(NumericUtils.scaling(-12.07879, 2, "floor")).toEqual(-12.08);
        expect(NumericUtils.scaling(-12.0706, 2, "floor")).toEqual(-12.08);
        expect(NumericUtils.scaling(-12.07, 2, "floor")).toEqual(-12.07);
      });
    });
  });
});
