import { ObjectUtils } from "./object.utils";

export class StringUtils {
  private static readonly BLANK_SEPARATOR = '';
  public static stringify = (s: any) => {
    if (ObjectUtils.isNullOrUndefined(s)) {
      return null;
    }
    if (typeof s === "string") {
      return s;
    }
    if (typeof s === "bigint") {
      return s.toString();
    }
    return JSON.stringify(s);
  };
  public static capitalisedFirst = (s: string) => {
    if (this.isEmpty(s)) return s;
    if (ObjectUtils.size(this.trimLeft(s)) === 1)
      return this.trimLeft(s).toUpperCase();
    s = this.trimLeft(s);
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  };

  /**
   * Concatenates multiple strings, filtering out null or undefined values.
   * The resulting strings are joined using a blank separator.
   * @example
   *  const result1 = StringUtils.concat("Hello", " ", "world", "!"); // "Hello world!"
   *  const result2 = StringUtils.concat("Java", null, " ",  "TypeScript", undefined, " ", "Python"); // "Java TypeScript Python"
   *  const result3 = StringUtils.concat(null, undefined); // ""
   *
   *
   * @param str1 - The first string to be concatenated.
   * @param str2 - The second string to be concatenated.
   * @param moreStrArgs - Additional strings to be concatenated.
   * @returns The concatenated string with non-null and non-undefined values, separated by ``.
   */
  public static concat = (str1: string, str2: string, ...moreStrArgs: string[]): string => {
    const arr = [str1, str2, ...moreStrArgs];
    const safe = [];
    for (const s of arr) {
      if (ObjectUtils.isNotNullAndNotUndefined<string>(s)) {
        safe.push(s);
      }
    }
    return safe.join(StringUtils.BLANK_SEPARATOR);
  }

  public static trim(str: string, char?: string) {
    if (ObjectUtils.isNullOrUndefined(str)) {
      return str;
    }
    if (ObjectUtils.isNullOrUndefined(char)) {
      return str.trim();
    }
    const strLeftTrimmed = this.trimLeft(str, char);
    return this.trimRight(strLeftTrimmed, char);
  }

  public static trimLeft(str: string, char?: string) {
    if (ObjectUtils.isNullOrUndefined(str)) {
      return str;
    } else if (ObjectUtils.isNullOrUndefined(char)) {
      return str.trimStart();
    } else {
      if (str.startsWith(<string>char)) {
        return this.trimLeft(str.substring(1, str.length), char);
      } else {
        return str;
      }
    }
  }

  public static trimRight(str: string, char?: string): string {
    if (ObjectUtils.isNullOrUndefined(str)) {
      return str;
    } else if (ObjectUtils.isNullOrUndefined(char)) {
      return str.trimEnd();
    } else {
      if (str.endsWith(<string>char)) {
        return this.trimRight(str.substring(0, str.length - 1), char);
      } else {
        return str;
      }
    }
  }

  static startsWithAny(str: string, ...some: string[]): boolean {
    if (ObjectUtils.isNullOrUndefined(str)) return false;
    if (some && some.length === 0) return false;
    return some.some((value) => str.startsWith(value));
  }

  static leftPad(
    str: string,
    repeatChar: string = "",
    repeatLenght: number = 0,
  ) {
    if (ObjectUtils.isNullOrUndefined(str) || ObjectUtils.isEmpty(str))
      return str;
    return str.padStart(repeatLenght + 1, repeatChar);
  }

  static rightPad(
    str: string,
    repeatChar: string = "",
    repeatLenght: number = 0,
  ) {
    if (ObjectUtils.isNullOrUndefined(str) || ObjectUtils.isEmpty(str))
      return str;
    return str.padEnd(repeatLenght + 1, repeatChar);
  }

  static isEmpty = (str: string) => !str || str.trim().length === 0;
}
