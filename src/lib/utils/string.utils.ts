import { ObjectUtils } from "./object.utils";

export class StringUtils {
  private static readonly BLANK_SEPARATOR = "";
  private static readonly BLANK: string = " ";
  private static readonly EMPTY: string = "";
  /**
   * Converts a value to its string representation.
   * - If the value is `null` or `undefined`, returns `null`.
   * - If the value is already a string, it returns the string.
   * - If the value is a `bigint`, it converts it to a string.
   * - Otherwise, it converts the value to a JSON string.
   *
   * @param {any} s - The value to be converted to a string.
   * @returns {string | null} - The string representation of the value or `null` if the value is `null` or `undefined`.
   *
   * @example
   * StringUtils.stringify("Hello"); // "Hello"
   * StringUtils.stringify(123); // "123"
   * StringUtils.stringify(true); // "true"
   * StringUtils.stringify(null); // null
   * StringUtils.stringify(undefined); // null
   * StringUtils.stringify(123n); // "123"
   * StringUtils.stringify({ name: "John" }); // '{"name":"John"}'
   */
  public static stringify = (s: any): string | null => {
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

  /**
   * Capitalizes the first letter of the string and converts the rest to lowercase.
   * If the string is empty or only contains one character, it returns the string as is.
   *
   * @param {string} s - The input string to be capitalized.
   * @returns {string} - The string with the first letter capitalized and the rest in lowercase.
   *
   * @example
   * StringUtils.capitalisedFirst("hello"); // "Hello"
   * StringUtils.capitalisedFirst("HELLO"); // "Hello"
   * StringUtils.capitalisedFirst("h"); // "H"
   * StringUtils.capitalisedFirst(""); // ""
   */
  public static capitalisedFirst = (s: string): string => {
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
  public static concat = (
    str1: string,
    str2: string,
    ...moreStrArgs: string[]
  ): string => {
    const arr = [str1, str2, ...moreStrArgs];
    const safe = [];
    for (const s of arr) {
      if (ObjectUtils.isNotNullAndNotUndefined<string>(s)) {
        safe.push(s);
      }
    }
    return safe.join(StringUtils.BLANK_SEPARATOR);
  };

  /**
   * Trims unwanted characters from both ends of a string. If no specific character is provided, it trims whitespace by default.
   *
   * @example
   * // Example 1: Trim whitespace (default behavior)
   * const result1 = StringUtils.trim("  Hello world  "); // "Hello world"
   *
   * @example
   * // Example 2: Trim specific character
   * const result2 = StringUtils.trim("--Hello world--", "-"); // "Hello world"
   *
   * @example
   * // Example 3: Handle null or undefined input
   * const result3 = StringUtils.trim(null); // null
   * const result4 = StringUtils.trim(undefined); // undefined
   *
   *
   * @param str - The string to be trimmed.
   * @param char - (Optional) The character to be removed from both ends of the string. If not provided, whitespace is trimmed.
   * @returns The trimmed string, or the original string if it is null or undefined.
   */
  public static trim = (str: string, char?: string) => {
    if (ObjectUtils.isNullOrUndefined(str)) {
      return str;
    }
    if (ObjectUtils.isNullOrUndefined(char)) {
      return str.trim();
    }
    const strLeftTrimmed = this.trimLeft(str, char);
    return this.trimRight(strLeftTrimmed, char);
  };

  /**
   * Removes a specific character from the start (left side) of a string.
   * If no character is provided, it trims leading whitespace by default.
   *
   * @example
   * // Example 1: Trim leading whitespace (default behavior)
   * const result1 = StringUtils.trimLeft("   Hello world"); // "Hello world"
   *
   * @example
   * // Example 2: Trim a specific character
   * const result2 = StringUtils.trimLeft("--Hello world--", "-"); // "Hello world--"
   *
   * @example
   * // Example 3: Handle null or undefined input
   * const result3 = StringUtils.trimLeft(null); // null
   * const result4 = StringUtils.trimLeft(undefined); // undefined
   *
   * @example
   * // Example 4: Character not found at the start
   * const result5 = StringUtils.trimLeft("Hello - world", "-"); // "Hello - world"
   *
   *
   * @param str - The string to be trimmed.
   * @param char - (Optional) The character to remove from the start of the string. If not provided, leading whitespace is removed.
   * @returns The string with the specified character removed from the start, or the original string if it is null or undefined.
   */
  public static trimLeft = (str: string, char?: string): string => {
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
  };

  /**
   * Alias for the `trimLeft` method. Removes a specific character from the start (left side) of a string.
   * If no character is provided, trims leading whitespace by default.
   *
   * @example
   * // Example 1: Trim leading whitespace (default behavior)
   * const result1 = StringUtils.trimLeading("   Hello world"); // "Hello world"
   *
   * @example
   * // Example 2: Trim a specific character
   * const result2 = StringUtils.trimLeading("--Hello world--", "-"); // "Hello world--"
   *
   * @example
   * // Example 3: Handle null or undefined input
   * const result3 = StringUtils.trimLeading(null); // null
   * const result4 = StringUtils.trimLeading(undefined); // undefined
   *
   * @param str - The string to be trimmed.
   * @param char - (Optional) The character to remove from the start of the string. If not provided, leading whitespace is removed.
   * @returns The string with the specified character removed from the start, or the original string if it is null or undefined.
   */
  public static trimLeading = (str: string, char?: string): string => {
    return this.trimLeft(str, char);
  };

  /**
   * Removes a specific character from the end (right side) of a string.
   * If no character is provided, it trims trailing whitespace by default.
   *
   * @example
   * // Example 1: Trim trailing whitespace (default behavior)
   * const result1 = StringUtils.trimRight("Hello world   "); // "Hello world"
   *
   * @example
   * // Example 2: Trim a specific character
   * const result2 = StringUtils.trimRight("--Hello world--", "-"); // "--Hello world"
   *
   * @example
   * // Example 3: Handle null or undefined input
   * const result3 = StringUtils.trimRight(null); // null
   * const result4 = StringUtils.trimRight(undefined); // undefined
   *
   * @example
   * // Example 4: Character not found at the end
   * const result5 = StringUtils.trimRight("Hello world", "-"); // "Hello world"
   *
   *
   * @param str - The string to be trimmed.
   * @param char - (Optional) The character to remove from the end of the string. If not provided, trailing whitespace is removed.
   * @returns The string with the specified character removed from the end, or the original string if it is null or undefined.
   */

  public static trimRight = (str: string, char?: string): string => {
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
  };

  /**
   * Alias for the `trimRight` method. Removes a specific character from the end (right side) of a string.
   * If no character is provided, trims trailing whitespace by default.
   *
   * @param str - The string to be trimmed.
   * @param char - (Optional) The character to remove from the end of the string. If not provided, trailing whitespace is removed.
   * @returns The string with the specified character removed from the end, or the original string if it is null or undefined.
   *
   * @example
   * // Example 1: Trim trailing whitespace (default behavior)
   * const result1 = StringUtils.trimTrailing("Hello world   "); // "Hello world"
   *
   * @example
   * // Example 2: Trim a specific character
   * const result2 = StringUtils.trimTrailing("--Hello world--", "-"); // "--Hello world"
   *
   * @example
   * // Example 3: Handle null or undefined input
   * const result3 = StringUtils.trimTrailing(null); // null
   * const result4 = StringUtils.trimTrailing(undefined); // undefined
   */
  public static trimTrailing = (str: string, char?: string): string => {
    return this.trimRight(str, char);
  };

  /**
   * Checks if the given string starts with any of the specified prefixes.
   *
   * @example
   * // Example 1: String starts with one of the prefixes
   * const result1 = StringUtils.startsWithAny("Hello world", "He", "Hi"); // true
   *
   * @example
   * // Example 2: String does not start with any of the prefixes
   * const result2 = StringUtils.startsWithAny("Hello world", "Hi", "Lo"); // false
   *
   * @example
   * // Example 3: Handle null or undefined string input
   * const result3 = StringUtils.startsWithAny(null, "Hi", "He"); // false
   * const result4 = StringUtils.startsWithAny(undefined, "Hi", "He"); // false
   *
   * @param str - The string to be checked.
   * @param some - A list of prefixes to check.
   * @returns `true` if the string starts with any of the specified prefixes, otherwise `false`.
   */
  static startsWithAny(str: string, ...some: string[]): boolean {
    if (ObjectUtils.isNullOrUndefined(str)) return false;
    if (some && some.length === 0) return false;
    return some.some((value) => str.startsWith(value));
  }

  /**
   * Pads the left side of the string with the specified character until the string reaches the desired length.
   * If the string is null, undefined, or empty, it returns the string padded with the specified character.
   * If no character is specified, it returns the string as-is.
   *
   * @example
   * // Example 1: Pad the string with spaces to a total length of 10 using StringUtils.leftPad
   * const result1 = StringUtils.leftPad("Hello", " ", 10); // "     Hello"
   *
   * @example
   * // Example 2: Pad the string with a specific character ('*') to a total length of 10 using StringUtils.leftPad
   * const result2 = StringUtils.leftPad("Hello", "*", 10); // "*****Hello"
   *
   * @example
   * // Example 3: Handle null or undefined input, returning the padded string using StringUtils.leftPad
   * const result3 = StringUtils.leftPad(null, "*", 10); // "**********"
   * const result4 = StringUtils.leftPad(undefined, "*", 10); // "**********"
   *
   * @example
   * // Example 4: Handle empty string input, returning the padded string using StringUtils.leftPad
   * const result5 = StringUtils.leftPad("", "*", 10); // "**********"
   *
   * @param str - The string to be padded.
   * @param repeatChar - The character to pad the string with (default is an empty string).
   * @param repeatLength - The total length of the string after padding (default is 0).
   * @returns The padded string, or the original string if it is null, undefined, or empty.
   */
  public static leftPad = (
    str: string,
    repeatChar: string = "",
    repeatLength: number = 0
  ): string => {
    if (ObjectUtils.isNullOrUndefined(str) || this.size(str) === 0) {
      if (repeatChar === "") {
        return str;
      }
      return repeatChar.repeat(repeatLength);
    }
    return str.padStart(repeatLength, repeatChar);
  };

  /**
   * Pads the right side of the string with the specified character until the string reaches the desired length.
   * If the string is null, undefined, or empty, it returns the string padded with the specified character.
   * If no character is specified, it returns the string as-is.
   *
   * @example
   * // Example 1: Pad the string with spaces to a total length of 10 using StringUtils.rightPad
   * const result1 = StringUtils.rightPad("Hello", " ", 10); // "Hello     "
   *
   * @example
   * // Example 2: Pad the string with a specific character ('*') to a total length of 10 using StringUtils.rightPad
   * const result2 = StringUtils.rightPad("Hello", "*", 10); // "Hello*****"
   *
   * @example
   * // Example 3: Handle null or undefined input, returning the padded string using StringUtils.rightPad
   * const result3 = StringUtils.rightPad(null, "*", 10); // "**********"
   * const result4 = StringUtils.rightPad(undefined, "*", 10); // "**********"
   *
   * @example
   * // Example 4: Handle empty string input, returning the padded string using StringUtils.rightPad
   * const result5 = StringUtils.rightPad("", "*", 10); // "**********"
   *
   * @param str - The string to be padded.
   * @param repeatChar - The character to pad the string with (default is an empty string).
   * @param repeatLength - The total length of the string after padding (default is 0).
   * @returns The padded string, or the original string if it is null, undefined, or empty.
   */
  static rightPad = (
    str: string,
    repeatChar: string = "",
    repeatLength: number = 0
  ): string => {
    if (ObjectUtils.isNullOrUndefined(str) || this.size(str) === 0) {
      return repeatChar === "" ? str : repeatChar.repeat(repeatLength);
    }
    return str.padEnd(repeatLength, repeatChar);
  };

  /**
   * Checks if the provided string is empty or contains only whitespace.
   *
   * @example
   * // Example 1: Check if the string is empty or contains only whitespace
   * const result1 = StringUtils.isEmpty("  "); // true
   * const result2 = StringUtils.isEmpty("Hello"); // false
   * const result3 = StringUtils.isEmpty(""); // true
   * const result4 = StringUtils.isEmpty(null); // true
   * const result5 = StringUtils.isEmpty(undefined); // true
   *
   * @param str - The string to be checked.
   * @returns `true` if the string is empty or contains only whitespace, `false` otherwise.
   */
  static isEmpty = (str: string) => !str || str.trim().length === 0;

  /**
   * Checks if the provided string has no length or contains only whitespace.
   *
   * @example
   * // Example 1: Check if the string has no length or contains only whitespace
   * const result1 = StringUtils.hasLength("  "); // false
   * const result2 = StringUtils.hasLength("Hello"); // false
   * const result3 = StringUtils.hasLength(""); // false
   * const result4 = StringUtils.hasLength(null); // true
   * const result5 = StringUtils.hasLength(undefined); // true
   *
   * @param str - The string to be checked.
   * @returns `true` if the string is empty or contains only whitespace, `false` otherwise.
   */
  static hasLength = (str: string) => !str || str.trim().length === 0;

  /**
   * Returns the length of the provided string, or 0 if the string is null or undefined.
   *
   * @example
   * // Example 1: Get the length of a string
   * const result1 = StringUtils.size("Hello"); // 5
   * const result2 = StringUtils.size(""); // 0
   * const result3 = StringUtils.size(null); // 0
   * const result4 = StringUtils.size(undefined); // 0
   *
   * @param str - The string whose length is to be calculated.
   * @returns The length of the string, or `0` if the string is null or undefined.
   */
  static size = (str: string) =>
    ObjectUtils.isNullOrUndefined(str) ? 0 : str.length;

  static lowerCase = (str: string) => {
    if (this.isEmpty(str)) return str;
    return str.toLowerCase();
  };

  static isAllAlphabeticLowerCase = (str: string) => {
    if (this.isEmpty(str)) return true;
    const regx = /^[a-z]+$/;
    return regx.test(str);
  };

  static isAllAlphabeticUpperCase = (str: string) => {
    if (this.isEmpty(str)) return true;
    return /^[A-Z]+$/.test(str);
  };

  static isAllLowerCase = (str: string) => {
    if (this.isEmpty(str)) return true;
    for (let char of str.split(this.EMPTY)) {
      if (char !== char.toLowerCase()) {
        return false;
      }
    }
    return true;
  };

  static upperCase = (str: string) => {
    if (this.isEmpty(str)) return str;
    return str.toUpperCase();
  };
}
