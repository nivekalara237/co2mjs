import { coerceBooleanProperty } from "./boolean.utils";

export class ObjectUtils {
  public static getIfNull<T>(value: T, _default: T): T {
    return this.isNullOrUndefined(value) ? _default : value;
  }

  public static isNullOrUndefined = <T>(obj: T): boolean => {
    return this.isNull(obj) || this.isUndefined(obj);
  };

  public static anyNullOrUndefined = (...objs: any[]): boolean => {
    // if ()
    // return this.isNull(obj) || this.isUndefined(obj);
    throw new Error("Not implemented!");
  };

  public static isNotNullAndNotUndefined = <T>(obj: T): boolean => {
    return !this.isNullOrUndefined(obj);
  };

  public static isNull<T>(obj: T): boolean {
    return obj === null;
  }

  public static isUndefined<T>(obj: T): boolean {
    return obj === undefined;
  }

  public static isEmpty<T>(obj: T): boolean {
    if (this.isNullOrUndefined(obj)) {
      return true;
    }
    if (Array.isArray(obj)) {
      return obj.length === 0;
    }

    if (typeof obj === "object") {
      return Object.keys(<object>obj).length === 0;
    }

    if (typeof obj === "string") {
      return obj.length === 0;
    }

    if (typeof obj === "function") {
      return false;
    }
    return !obj;
  }

  public static addEntry = <T>(obj: T, key: string, value: any): T => {
    if (this.isNullOrUndefined(obj)) return undefined;
    if (this.isNullOrUndefined(key)) return obj;
    obj[key] = value;
    return obj;
  };

  public static appendChild<T>(obj: T, childKey: string, childValue: any) {
    if (this.isNullOrUndefined(obj)) return undefined;
    if (
      this.isNullOrUndefined(childValue) ||
      this.isNullOrUndefined(childKey)
    ) {
      return obj;
    }
    const child = {};
    let value = childValue;
    switch (typeof childValue) {
      case "boolean":
        value = coerceBooleanProperty(childValue);
        break;
      case "bigint":
        value = BigInt(value);
        break;
      case "number":
        value = Number(value);
        break;
      case "function":
      case "symbol":
      case "string":
      case "object":
      case "undefined":
        obj[childKey] = value;
        return obj;
      default:
        value = childValue;
        break;
    }
    child[childKey] = value;
    return Object.assign(obj, child);
  }

  public static isDeepEqual = (obj1: any, obj2: any): boolean => {
    if (obj1 === null && obj2 === null) return true;
    if (obj1 === obj2) return true;
    const primitives = ["string", "boolean", "number", "bigint"];
    if (primitives.includes(typeof obj1) && primitives.includes(typeof obj2)) {
      return obj1 === obj2;
    }

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) return false;
      return obj1.every((elem, index) => {
        return this.isDeepEqual(elem, obj2[index]);
      });
    }

    const objKeys1 = Object.keys(obj1);
    const objKeys2 = Object.keys(obj2);

    if (
      objKeys1.length !== objKeys2.length ||
      objKeys1.join() !== objKeys2.join()
    ) {
      return false;
    }

    for (const key of objKeys1) {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (!this.isDeepEqual(value1, value2)) {
        return false;
      }
    }
    return true;
  };

  public static isObject = (object: any) => {
    return (
      object != null && !Array.isArray(object) && typeof object === "object"
    );
  };

  public static isNotEmpty<T>(obj: T): boolean {
    return !ObjectUtils.isEmpty(obj);
  }

  public static size = (s: any): number => {
    if (this.isNullOrUndefined(s)) return 0;
    if (Array.isArray(s)) return s.length;
    switch (typeof s) {
      case "string":
        return s.length;
      case "object": {
        const keys = Object.keys(s);
        return keys.length;
      }
      default:
        return 0;
    }
  };

  public static isNil = (value: any) => {
    if (value === void 0) {
      return true;
    }
    return this.isNullOrUndefined(value);
  };

  static has = (obj: any, hasKeyValue: string) => {
    // if (this.isNullOrUndefined(obj))
  }

  //   anyNullOrUndefined = (...objs: any[]): boolean : check at least one is null or undefined
  // has<T>(obj: T, propertyName: string): check if obj has property of name provided

}
