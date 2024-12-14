import { NumericUtils } from "../../lib";

describe("Numeric Utils", () => {
  describe(" Is ODD", () => {
    it("should check that 23 and -3 are odd", () => {
      expect(NumericUtils.isOdd(23)).toBe(true);
      expect(NumericUtils.isOdd(-3)).toBe(true);
    });
    it("should check that 2, -2 and 0 are not odd", () => {
      expect(NumericUtils.isOdd(2)).toBe(false);
      expect(NumericUtils.isOdd(-2)).toBe(false);
      expect(NumericUtils.isOdd(0)).toBe(false);
    });
  });
  describe(" Is EVEN", () => {
    it("should check that 10,-4 and 0 are even", () => {
      expect(NumericUtils.isEven(10)).toBe(true);
      expect(NumericUtils.isEven(-4)).toBe(true);
      expect(NumericUtils.isEven(0)).toBe(true);
    });
    it("should check that 13 and -21 are not even", () => {
      expect(NumericUtils.isEven(13)).toBe(false);
      expect(NumericUtils.isEven(-21)).toBe(false);
    });
  });

  xdescribe("isNumeric", () => {
    it("should check that 2 is at numeric type", () => {
      expect(NumericUtils.isNumeric(2)).toBeTruthy();
    });
    it('should check that "2" is at numeric type', () => {
      expect(NumericUtils.isNumeric("2")).toBeFalsy();
    });
    it("should check that false is at numeric type", () => {
      expect(NumericUtils.isNumeric(false)).toBeFalsy();
    });
    it('should check that "str" is at numeric type', () => {
      expect(NumericUtils.isNumeric("str")).toBeFalsy();
    });
  });

  describe("Max number", () => {
    it("shoud retrieve max value in value", () => {
      expect(NumericUtils.max([2, 8, 5, 1, 2, 0, 2, 2, 9, 6, 9, 3, 4])).toBe(9);
    });

    it("shoud return undefined max: empty array", () => {
      expect(NumericUtils.max([])).toBeUndefined();
    });

    it("shoud return undefined max: undefined array", () => {
      expect(NumericUtils.max(undefined)).toBeUndefined();
    });

    it("shoud return undefined max: undefined array", () => {
      expect(NumericUtils.max(null)).toBeUndefined();
    });
  });

  describe("Min number", () => {
    it("shoud retrieve min value in value", () => {
      expect(
        NumericUtils.min([2, 8, 5, 1, 2, 0, 2, 2, 9, -8, 6, 9, 3, 4])
      ).toBe(-8);
    });

    it("shoud return undefined min: empty array", () => {
      expect(NumericUtils.min([])).toBeUndefined();
    });

    it("shoud return undefined min: undefined array", () => {
      expect(NumericUtils.min(undefined)).toBeUndefined();
    });

    it("shoud return undefined min: undefined array", () => {
      expect(NumericUtils.min(null)).toBeUndefined();
    });
  });

  describe("Square", () => {
    it.each([
      [undefined, undefined],
      [null, undefined],
      [-2, 4],
      [0, 0],
      [2, 4],
      [5, 25],
    ])(
      "should compute squart of %p. Expecting %p",
      (arg, exp: number | undefined) => {
        expect(NumericUtils.square(<number>arg)).toBe(exp);
      }
    );
  });

  describe("Is Natural number", () => {
    it.each([
      [1, true],
      [0, true],
      [1.0, true],
      [-12, true],
      [0.1, false],
      [-1.02, false],
      [Math.PI, false],
      [NaN, false],
      [null, false],
      [undefined, false],
      [Infinity, false],
      [-Infinity, false],
    ])(" the number %p is natural number : %p", (num, exp) => {
      expect(NumericUtils.isNatural(num)).toBe(exp);
    });
  });

  describe("The GCD (PCDG) of two natural number", () => {
    it.each([
      [36, 60, 12],
      [60, 36, 12],
      [42, 63, 21],
      [357, 561, 51],
      [49, 7, 7],
      [9, 3, 3],
      [18, 45, 9],
      [2967, 798, 3],
      [34, 58, 2],
      [6, 8, 2],
      [0, 8, 8],
      [3, 0, 3],
    ])("The gcd(%p, %p) is %p", (arg1, arg2, exp) => {
      expect(NumericUtils.gcd(arg1, arg2)).toEqual(exp);
    });

    it.each([
      [-1, 67, "The first number must be a natural and positive number"],
      [8, -7, "The second number must be a natural and positive number"],
      [0, 0, "At least one number must be defined"],
    ])("gcp(%p, %p) should raised error `%p`", (a, b, msg) => {
      expect(() => NumericUtils.gcd(a, b)).toThrow(msg);
    });
  });

  describe("The LCM (PPCM) of two natural number", () => {
    it.each([
      [54, 45, 270],
      [13, 2, 26],
      [41, 4, 164],
      [67, 15, 1005],
      [89, 3, 267],
      [89, 74, 6586],
      [0, 74, 0],
      [34, 0, 0],
    ])("The lcm(%p, %p) is %p", (arg1, arg2, exp) => {
      expect(NumericUtils.lcm(arg1, arg2)).toEqual(exp);
    });

    it.each([
      [-1, 67, "The first number must be a natural and positive number"],
      [8, -7, "The second number must be a natural and positive number"],
      [0, 0, "At least one number must be defined"],
    ])("The lcm(%p, %p) should raise error %p", (a, b, msg) => {
      expect(() => NumericUtils.lcm(a, b)).toThrow(msg);
    });
  });

  describe("Prime number", () => {
    it("should be primes number", () => {
      expect(NumericUtils.arePrime(13, 17)).toBeTruthy();
      expect(NumericUtils.arePrime(17, 13)).toBeTruthy();
    });

    it.each([
      [0, false],
      [1, false],
      [2, true],
      [3, true],
      [4, false],
      [97, true],
      [100, false],
    ])("%p should be a prime number: %p", (a, exp) => {
      expect(NumericUtils.isPrime(a)).toBe(exp);
    });
  });
});

describe("Statistic Utils", () => {
  describe("Average", () => {
    it.each([
      [null, undefined],
      [undefined, undefined],
      [[], undefined],
      [[null], undefined],
      [[null, undefined, undefined, null], undefined],
      [[10, 30, 20, 50, 10], 24],
      [[10, 30, 20, null, 50, 10], 24],
      [[10, 30, 20, undefined, 50, 10], 24],
    ])("Should compute Average of %p and expecting %p", (arr: any, exp) => {
      expect(NumericUtils.statistics.average(arr)).toBe(exp);
    });
  });
});
