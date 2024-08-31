import { ThrowableUtils } from "./throwable.utils";
import { BranchUtils } from "./branch.utils";
import { random, randomInteger } from "./cryptographically";
import { getRandomValues } from "node:crypto";

export class RandomUtils {
  private static ALPHA_NUMERIC_CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  /**
   * Generate randomly boolean value
   * @return true/false
   */
  public static nextBoolean = (): boolean => {
    return random() >= 0.5;
  };

  /**
   * Generate a number between two values
   *
   * @param min the inclusive min value
   * @param max the exclusive max value
   * @throws throw error if min equal max
   */
  public static nextIntInside = (min: number, max: number): number => {
    if (!Number.isInteger(min) && !Number.isInteger(max)) {
      ThrowableUtils.raise("Arguments 'min' and 'max' must be an integer");
    }

    if (min === max) {
      ThrowableUtils.raise("The min and max values can't be equal");
    }
    const dataView = new Uint8Array(1);
    getRandomValues(dataView);
    const value = dataView.at(0);
    if (BranchUtils.betweenRangeNumber(value, min, max - 1)) {
      return value;
    }
    if (value < min) {
      return (value + min) % max;
    }
    return value % max;
  };

  /**
   * Generate a random integer from 0 to 9 (include)
   */
  public static nextInt = () => {
    return this.nextIntInside(0, 10);
  };

  /**
   * Generate a random hexadecimal value from 0 to F (include)
   */
  public static nextHex = () => {
    return this.secureString(1, "0123456789ABCDEF");
  };

  /**
   * Generate a random octal decimal value from 0 to 8 (exclude)
   */
  public static nextOctal = (): number => {
    return this.nextIntInside(0, 8);
  };

  /**
   * Generate a random bytes
   *
   * @param length the buffer content elements length
   * @param range the range of content item
   * @return {@linkcode Buffer}({@linkcode Uint32Array}) buffer value
   */
  public static rangeBytes = (
    length: number,
    range: { min: number; max: number },
  ): ArrayBuffer => {
    if (length <= 0 || length > Number.MAX_SAFE_INTEGER) {
      ThrowableUtils.raise(
        "byteLength must between 1 and 2^53 − 1",
        "byteLength",
      );
    }

    ThrowableUtils.requireNonNull(range);

    if (range.min === range.max) {
      ThrowableUtils.raise("The min and max must be different value");
    }

    if (range.min > range.max) {
      ThrowableUtils.raise("The max must be greater than min");
    }

    const dataView = new Uint32Array(length);
    for (let i = 0; i < length; i++) {
      dataView[i] = this.nextIntInside(range.min, range.max);
    }
    return dataView.buffer;
  };

  public static nextBytes = (byteLength: number): ArrayBuffer => {
    if (byteLength <= 0 || byteLength > Number.MAX_SAFE_INTEGER) {
      ThrowableUtils.raise(
        "byteLength must between 1 and 2^53 − 1",
        "byteLength",
      );
    }

    const buffer = new ArrayBuffer(byteLength);
    const dataView = new Uint32Array(buffer);
    for (let i = 0; i < byteLength; i++) {
      dataView[i] = randomInteger(Number.MAX_SAFE_INTEGER);
    }
    return dataView.buffer;
  };

  // ---------------- String Random ----------------

  private static secureString = (len: number, __chars: string) => {
    if (len <= 0) {
      ThrowableUtils.raise("The length must higher than 0");
    }
    let chars = [];
    for (let i = 0; i < len; i++) {
      chars.push(__chars.charAt(randomInteger(__chars.length)));
    }
    return chars.join("");
  };

  private static randomString = (len: number, __chars: string) => {
    if (len <= 0) {
      ThrowableUtils.raise("The length must higher than 0");
    }
    let chars: Array<string> = [];
    for (let i = 0; i < len; i++) {
      chars.push(__chars.charAt(Math.floor(Math.random() * __chars.length)));
    }
    return chars.join("");
  };

  /**
   * Generate a random string (unsecure)
   *
   * @param length the length of generated string
   * @throws Error throw error is length is less than 0 or equal
   */
  public static chars = (length: number) => {
    return this.randomString(length, RandomUtils.ALPHA_NUMERIC_CHARS);
  };

  /**
   * Generate a secure random string
   *
   * @param length the length of generated string
   * @throws Error throw error is length is less than 0 or equal
   */
  public static secureChars = (length: number) => {
    return this.secureString(length, RandomUtils.ALPHA_NUMERIC_CHARS);
  };
}
