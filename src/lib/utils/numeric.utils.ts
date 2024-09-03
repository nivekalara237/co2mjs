import { ObjectUtils } from "./object.utils";

export class NumericUtils {
  static BigZero = 0n;

  static isNegative = (val: number | bigint): boolean => {
    if (typeof val === "bigint") {
      return val < 0n;
    }
    return val < 0;
  };

  static sanitise = (value: any): number => {
    if (isNaN(value)) {
      return NaN;
    }
    return value;
  };
  static isInfinity = (val: any) => {
    return !Number.isFinite(val);
  };

  static isSafeBigint = (val: any): boolean => {
    if (typeof val === "number" && isNaN(val)) {
      return false;
    }

    if (typeof val === "bigint" && ObjectUtils.isNotNullAndNotUndefined(val)) {
      return true;
    }

    return (
      ObjectUtils.isNotNullAndNotUndefined(val) &&
      Infinity !== val &&
      Number(val) > Math.pow(2, 53)
    );
  };
  public static isSafeNumber = (val: any) => {
    return (
      ObjectUtils.isNotNullAndNotUndefined(val) &&
      !Array.isArray(val) &&
      typeof val !== "bigint" &&
      isFinite(val) &&
      Number(val) < Math.pow(2, 53) &&
      val - parseFloat(val) + 1 >= 0
    );
  };

  static round = (
    value: number,
    scale?: number,
    roundingMode: "up" | "down" | "half" = "half"
  ): number => {
    const isNagative = this.isNegative(value);
    if (!scale) {
      return Math.round(value);
    } else {
      if (roundingMode === "half") {
        value = Math.abs(value);
        const m = Math.pow(10, scale);
        const powered = value * m;
        const decimal = powered - Math.floor(powered);
        let poweredWithoutDecimal = powered - decimal;
        const firstDecimal = Math.floor(decimal * 10);
        if (firstDecimal === 0) {
          return ((isNagative ? -1 : 1) * poweredWithoutDecimal) / m;
        }
        if (firstDecimal >= 5) {
          poweredWithoutDecimal = poweredWithoutDecimal + 1;
        }
        return ((isNagative ? -1 : 1) * poweredWithoutDecimal) / m;
      }
      if (roundingMode === "up") {
        value = Math.abs(value);
        const m = Math.pow(10, scale);
        const powered = value * m;
        const decimal = powered - Math.floor(powered);
        if (decimal === 0) {
          return (isNagative ? -1 : 1) * value;
        }
        let poweredWithoutDecimal = powered - decimal;
        return (isNagative ? -1 : 1) * ((poweredWithoutDecimal + 1) / m);
      }

      if (roundingMode === "down") {
        value = Math.abs(value);
        const m = Math.pow(10, scale);
        const powered = value * m;
        const decimal = powered - Math.floor(powered);
        let poweredWithoutDecimal = powered - decimal;
        return (isNagative ? -1 : 1) * (poweredWithoutDecimal / m);
      }
    }
  };

  static scaling = (
    value: number,
    scale: number,
    roundingMode?:
      | "ceil"
      | "floor"
      | "half_up"
      | "half_down"
      | "round_up"
      | "round_down"
  ): number => {
    if (!scale) {
      return value;
    } else if (!roundingMode) {
      // return Math.round(value * Math.pow(10, scale)) / Math.pow(10, scale);
    } else {
      const rounded =
        Math.round(value * Math.pow(10, scale)) / Math.pow(10, scale);
      let value0 = 0;
      const isNegative = this.isNegative(value);

      if (roundingMode === "floor") {
        if (!isNegative) {
          return this.round(value, scale, "down");
        } else {
          return this.round(value, scale, "up");
        }
      }

      return undefined;
    }
  };
}
