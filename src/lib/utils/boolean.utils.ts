import { NumericUtils, ObjectUtils } from "../index";
import { ThrowableUtils } from "./throwable.utils";

export class BooleanUtils {
  private constructor() {}

  /**
   * Check if {@linkcode any} value is {@linkcode true},
   * handling {@linkcode null} returning {@linkcode false}
   *
   * <pre>
   *     BooleanUtils.isTrue(true)          = true
   *     BooleanUtils.isTrue("true")        = true
   *     BooleanUtils.isTrue(null)          = false
   *     BooleanUtils.isTrue(undefined)     = false
   * </pre>
   *
   * @param value the value to evaluate
   * @return boolean
   */
  public static isTrue(value: any): boolean {
    return this.safety(value);
  }

  /**
   * Check if {@linkcode any} value is not {@linkcode true},
   * handling {@linkcode null} returning {@linkcode true}
   *
   * <pre>
   *     BooleanUtils.isNotTrue(true)          = false
   *     BooleanUtils.isNotTrue("true")        = false
   *     BooleanUtils.isNotTrue(null)          = true
   *     BooleanUtils.isNotTrue(undefined)     = true
   * </pre>
   *
   * @param value the value to evaluate
   * @return boolean
   */
  public static isNotTrue(value: any): boolean {
    return !this.isTrue(value);
  }

  /**
   * Check if {@linkcode any} value is {@linkcode false},
   * handling {@linkcode null} returning {@linkcode true}
   *
   * <pre>
   *     BooleanUtils.isFalse(false)          = true
   *     BooleanUtils.isFalse("false")        = true
   *     BooleanUtils.isFalse(null)           = true
   *     BooleanUtils.isFalse(undefined)      = true
   *     BooleanUtils.isFalse(true)           = false
   * </pre>
   *
   * @param value the value to evaluate
   * @return boolean
   */
  public static isFalse(value: any) {
    return !this.safety(value);
  }

  /**
   * Check if {@linkcode any} value is not {@linkcode false},
   * handling {@linkcode null} returning {@linkcode false}
   *
   * <pre>
   *     BooleanUtils.isNotFalse(false)          = false
   *     BooleanUtils.isNotFalse("false")        = false
   *     BooleanUtils.isNotFalse(null)           = false
   *     BooleanUtils.isNotFalse(undefined)      = false
   *     BooleanUtils.isNotFalse(true)           = true
   * </pre>
   *
   * @param value the value to evaluate
   * @return boolean
   */
  public static isNotFalse(value: any) {
    return !this.isFalse(value);
  }

  public static safety(value: any) {
    return coerceBooleanProperty(value);
  }

  public static safetyElegant = (value: any) => {
    if (ObjectUtils.isNullOrUndefined(value)) {
      return false;
    }

    if (Array.isArray(value) || value.length == 0) {
      return false;
    }

    if (NumericUtils.isSafeNumber(value)) {
      return +value > 0;
    }

    if (typeof value === "string") {
      return (
        value.trim().toLowerCase() === "true" ||
        value.trim().toLowerCase() == "on"
      );
    }
  };

  /**
   * Performs an 'and' operation on a set of booleans
   *
   * <pre>
   * BooleanUtils.and(true, true, true)       = true
   * BooleanUtils.and(true, false)            = false
   * BooleanUtils.and(false, false)           = false
   * </pre>
   * @param values array of {@linkcode boolean}s
   */
  public static and = (...values: boolean[]) => {
    ThrowableUtils.requireNonEmptyArray(values, "andValues");
    if (values.length === 1 && ObjectUtils.isNullOrUndefined(values[0])) {
      ThrowableUtils.raise("The andValues must an non-empty array");
    }
    return values.every((value) => value === true);
  };

  /**
   * Performs an 'or' operation on a set of booleans,
   * handling {@linkcode null} and {@linkcode undefined} raise Error
   *
   * <pre>
   *    BooleanUtils.or(true, true, true)       = true
   *    BooleanUtils.or(true, false)            = true
   *    BooleanUtils.or(false, false, true)     = false
   *    BooleanUtils.or(false, false)           = false
   * </pre>
   * @param values array of {@linkcode boolean}s
   */
  public static or = (...values: boolean[]) => {
    ThrowableUtils.requireNonEmptyArray(values, "orValues");
    if (values.length === 1 && ObjectUtils.isNullOrUndefined(values[0])) {
      ThrowableUtils.raise("The orValues must an non-empty array");
    }
    return values.some((bool) => bool === true);
  };

  public static xor = (...values: boolean[]): boolean => {
    ThrowableUtils.requireNonEmptyArray(values, "xorValues");
    if (values.length === 1 && ObjectUtils.isNullOrUndefined(values[0])) {
      ThrowableUtils.raise("The xorValues must an non-empty array");
    }
    let xor: number = 0;
    for (let e of values) {
      xor = xor ^ this.toInt(e);
    }
    return xor === 1;
  };

  /**
   * Negates the boolean
   * <pre>
   *     BooleanUtils.negate(true)        = false
   *     BooleanUtils.negate(false)       = true
   *     BooleanUtils.negate(null)        = null
   *     BooleanUtils.negate(undefined)   = undefined
   * </pre>
   *
   * @param value the inverted of the specified value
   */
  public static negate = (value: boolean) => {
    if (ObjectUtils.isNullOrUndefined(value)) {
      return value;
    }
    return !value;
  };

  /**
   * Convert value of types {@linkcode bigint}, {@linkcode number}, {@linkcode string}, {@linkcode null}, {@linkcode undefined} to {@linkcode boolean}
   *
   * <pre>
   *     BooleanUtils.toBoolean(null)         = false
   *     BooleanUtils.toBoolean(undefined)    = false
   *     BooleanUtils.toBoolean(true)         = true
   *     BooleanUtils.toBoolean(1)            = true
   *     BooleanUtils.toBoolean(2)            = true
   *     BooleanUtils.toBoolean(0)            = false
   *     BooleanUtils.toBoolean("false")      = false
   *     BooleanUtils.toBoolean("f")          = false
   *     BooleanUtils.toBoolean("ko")         = false
   *     BooleanUtils.toBoolean("KO")         = false
   *     BooleanUtils.toBoolean("n")          = false
   *     BooleanUtils.toBoolean("no")         = false
   *     BooleanUtils.toBoolean("off")        = false
   *     BooleanUtils.toBoolean("true")       = true
   *     BooleanUtils.toBoolean("t")          = true
   *     BooleanUtils.toBoolean("y")          = true
   *     BooleanUtils.toBoolean("yes")        = true
   *     BooleanUtils.toBoolean("on")         = true
   *     BooleanUtils.toBoolean("NO")         = false
   *     BooleanUtils.toBoolean("OFF")        = false
   *     BooleanUtils.toBoolean("YES")        = true
   *     BooleanUtils.toBoolean("ON")         = true
   *     BooleanUtils.toBoolean("ok")         = true
   *     BooleanUtils.toBoolean("OK")         = true
   *     BooleanUtils.toBoolean("WRONG")      = will raise error
   * </pre>
   *
   * @param value the value converted
   */
  public static toBoolean = (
    value: boolean | bigint | number | string | null | undefined
  ) => {
    if (ObjectUtils.isNullOrUndefined(value)) {
      return false;
    } else if (typeof value === "boolean") {
      return value;
    } else if (typeof value === "number" || typeof value === "bigint") {
      return value > 0;
    } else if (typeof value === "string") {
      const _true = ["on", "yes", "y", "true", "t", "ok"].includes(
        value.toLowerCase()
      );
      const _false = ["off", "no", "n", "false", "f", "ko"].includes(
        value.toLowerCase()
      );
      if (_true) return true;
      if (_false) return false;
    }

    ThrowableUtils.raise("Illegal arguments passed.");
  };

  /**
   * Convert value to type number|bigint to {@linkcode boolean} value
   * based the {@linkcode true} and {@linkcode false} values
   *
   * <pre>
   *     BooleanUtils.numberToBoolean(3, 0, 0)          = will throw error
   *     BooleanUtils.numberToBoolean(null, null, 2)    = true
   *     BooleanUtils.numberToBoolean(null, 1, null)    = false
   *     BooleanUtils.numberToBoolean(0, 1, 0)          = false
   *     BooleanUtils.numberToBoolean(1, 1, 0)          = true
   *     BooleanUtils.numberToBoolean(3, 1,0)           = will throw error
   * </pre>
   *
   * @param value to value to be converted
   * @param trueNumber the value which will match the true value
   * @param falseNumber the value which will match the false value
   * @throws Error Illegal Arguments
   * @throws Error Value no match none specified value
   */
  public static numberToBoolean = (
    value: number,
    trueNumber: number,
    falseNumber: number
  ) => {
    if (trueNumber === falseNumber) {
      ThrowableUtils.raise("Illegal(s) argument(s) passed");
    }

    if (ObjectUtils.isNullOrUndefined(value)) {
      if (ObjectUtils.isNullOrUndefined(trueNumber)) {
        return true;
      }
      if (ObjectUtils.isNullOrUndefined(falseNumber)) {
        return false;
      }
    } else if (value === trueNumber) {
      return true;
    } else if (value === falseNumber) {
      return false;
    }

    ThrowableUtils.raise("The number did not match either specified value");
  };

  /**
   * Convert value to type {@linkcode string} to {@linkcode boolean} value
   * based the {@linkcode true} and {@linkcode false} values
   *
   * <pre>
   *     BooleanUtils.stringToBoolean("ko", "ko", "ko")           = will throw error
   *     BooleanUtils.stringToBoolean(null, null, "ko")           = true
   *     BooleanUtils.stringToBoolean(null, "ok", null)           = false
   *     BooleanUtils.stringToBoolean("ko", "ok", "ko")           = false
   *     BooleanUtils.stringToBoolean("ok", "ok", "ko")           = true
   *     BooleanUtils.stringToBoolean("yes", "ok","ok")           = will throw error
   * </pre>
   *
   * @param value to value to be converted
   * @param trueStr the value which will match the true value
   * @param falseStr the value which will match the false value
   * @throws Error Illegal Arguments
   * @throws Error Value no match none specified value
   */
  public static stringToBoolean = (
    value: string,
    trueStr: string,
    falseStr: string
  ): boolean => {
    if (trueStr === falseStr) {
      ThrowableUtils.raise("Illegal(s) argument(s) passed");
    }

    if (ObjectUtils.isNullOrUndefined(value)) {
      if (ObjectUtils.isNullOrUndefined(trueStr)) {
        return true;
      }
      if (ObjectUtils.isNullOrUndefined(falseStr)) {
        return false;
      }
    } else if (value === trueStr) {
      return true;
    } else if (value === falseStr) {
      return false;
    }

    ThrowableUtils.raise("The characters did not match either specified value");
  };

  public static toInt = (value: boolean): number => {
    return value ? 1 : 0;
  };

  public static toNumber = (
    value: boolean,
    trueNumber: number,
    falseNumber: number
  ): number => {
    return value ? trueNumber : falseNumber;
  };

  public static toChars = (
    value: boolean,
    trueStr: string,
    falseStr: string
  ): string => {
    return value ? trueStr : falseStr;
  };

  public static toOnOff = (value: boolean) => {
    return value ? "ON" : "OFF";
  };

  public static toYesNo = (value: boolean) => {
    return value ? "YES" : "NO";
  };
}

export const coerceBooleanProperty = (value: any): boolean => {
  return ObjectUtils.isNotNullAndNotUndefined(value) && `${value}` !== "false";
};
