import { coerceBooleanProperty } from "./boolean.utils";

export class ObjectUtils {
  public static getIfNull<T>(value: T, _default: T): T {
    return this.isNullOrUndefined(value) ? _default : value;
  }

  public static isNullOrUndefined = <T>(obj: T): boolean => {
    return this.isNull(obj) || this.isUndefined(obj);
  };

  public static isNotNullAndNotUndefined = <T>(obj: T): boolean => {
    return !this.isNullOrUndefined(obj);
  }

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

    if (typeof obj === 'object') {
      return Object.keys(<object>obj).length === 0;
    }

    if (typeof obj === 'string') {
      return obj.length === 0;
    }

    if (typeof obj === 'function') {
      return false;
    }
    return !obj;
  }

  public static appendDefined<T>(obj: T, childKey: string, childValue: any) {
    if (
      this.isNullOrUndefined(childValue) ||
      this.isNullOrUndefined(childKey)
    ) {
      return obj;
    }
    let value = childValue;
    switch (typeof childValue) {
      case 'boolean':
        value = coerceBooleanProperty(childValue);
        break;
      case 'bigint':
        value = BigInt(value);
        break;
      case 'number':
        value = Number(value);
        break;
      case 'function':
      case 'symbol':
      case 'undefined':
        value = childValue;
        break;
      case 'object':
        value = JSON.stringify(childValue);
        break;
      case 'string':
        value = `"${childValue}"`;
        break;
      default:
        value = childValue;
    }
    return Object.assign(<object>obj, JSON.parse(`{"${childKey}":${childValue}}`));
  }

  public static isDeepEqual = (obj1: any, obj2: any): boolean => {
    if (obj1 === null && obj2 === null) return true;
    if (obj1 === obj2) return true;

    if (typeof obj1 === 'string' && typeof obj2 === 'string') {
      return obj1 === obj2;
    }

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) return false;
      return obj1.every((elem, index) => {
        return this.isDeepEqual(elem, obj2[index]);
      });
    }

    if (
      !(
        typeof obj1 === 'object' &&
        typeof obj2 === 'object' &&
        this.isUndefined(obj1) &&
        this.isUndefined(obj2) !== null
      )
    ) {
      return false;
    }

    const objKeys1 = Object.keys(obj1);
    const objKeys2 = Object.keys(obj2);
    if (objKeys1.length !== objKeys2.length) return false;
    for (var key of objKeys1) {
      const value1 = obj1[key];
      const value2 = obj2[key];
      const isObjects = this.isObject(value1) && this.isObject(value2);
      if (
        (isObjects && !this.isDeepEqual(value1, value2)) ||
        (!isObjects && value1 !== value2)
      ) {
        return false;
      }
    }
    return true;
  };

  public static isObject = (object: any) => {
    return object != null && typeof object === 'object';
  };

  public static isNotEmpty<T>(obj: T): boolean {
    return !ObjectUtils.isEmpty(obj);
  }

  public static size = (s: any): number => {
    if (this.isNullOrUndefined(s)) return 0;
    if (Array.isArray(s)) return s.length;
    switch (typeof s) {
      case 'string':
        return s.length;
      case 'object': {
        const keys = Object.keys(s);
        return keys.length;
      }
      default: 
        return 0;
    }
  };
}
