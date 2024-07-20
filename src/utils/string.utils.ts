import { ObjectUtils } from "./object.utils";

export class StringUtils {
  public static stringify = (s: any) => {
    if (ObjectUtils.isNullOrUndefined(s)) {
      return null;
    }
    if(typeof s === 'string') {
      return s;
    }
    if (typeof s === "bigint") {
      return s.toString()
    }
    return JSON.stringify(s);
  };
  public static capitalisedFirst = (s: string) => {
    if (this.isEmpty(s)) return s;
    if (ObjectUtils.size(this.trimLetf(s)) === 1)
      return this.trimLetf(s).toUpperCase();
    s = this.trimLetf(s);
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  };

  public static concat(str1: string, str2: string, ...moreStrArgs: string[]) {
    return str1.concat(...[str2, ...moreStrArgs]);
  }

  public static trim(str: string, char?: string) {
    if (ObjectUtils.isNullOrUndefined(str)) {
      return str;
    }
    if (ObjectUtils.isNullOrUndefined(char)) {
      return str.trim();
    }
    const strLeftTrimmed = this.trimLetf(str, char);
    return this.trimRight(strLeftTrimmed, char);
  }

  public static trimLetf(str: string, char?: string) {
    if (ObjectUtils.isNullOrUndefined(str)) {
      return str;
    } else if (ObjectUtils.isNullOrUndefined(char)) {
      return str.trimStart();
    } else {
      if (str.startsWith(<string>char)) {
        return this.trimLetf(str.substring(1, str.length), char);
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
    return some.some(value => str.startsWith(value));
  }

  static leftPad(
    str: string,
    repeatChar: string = '',
    repeatLenght: number = 0,
  ) {
    if (ObjectUtils.isNullOrUndefined(str) || ObjectUtils.isEmpty(str))
      return str;
    return str.padStart(repeatLenght + 1, repeatChar);
  }

  static rightPad(
    str: string,
    repeatChar: string = '',
    repeatLenght: number = 0,
  ) {
    if (ObjectUtils.isNullOrUndefined(str) || ObjectUtils.isEmpty(str))
      return str;
    return str.padEnd(repeatLenght + 1, repeatChar);
  }

  static isEmpty = (str: string) => !str || str.trim().length === 0;
}
