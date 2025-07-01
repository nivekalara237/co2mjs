
export class ObjectUtils {
  public static getIfNull<T>(value: T, _default: T): T {
    return this.isNullOrUndefined(value) ? _default : value;
  }

  public static isNullOrUndefined = <T>(obj: T): boolean => {
    return this.isNull(obj) || this.isUndefined(obj);
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

  public static appendDefined<T extends Record<string, any>>(
      obj: T,
      childKey: string,
      childValue: any
  ): T | undefined {
    // Early return for invalid parent object
    if (obj === null || obj === undefined) {
      return undefined;
    }

    // Skip if key or value are invalid
    if (childKey === null || childKey === undefined || childValue === null || childValue === undefined) {
      return obj;
    }

    // Handle special cases for primitive values
    let processedValue: any;
    switch (typeof childValue) {
      case "boolean":
        processedValue = Boolean(childValue);
        break;
      case "bigint":
        processedValue = BigInt(childValue);
        break;
      case "number":
        processedValue = Number(childValue);
        break;
      case "string":
        processedValue = String(childValue);
        break;
      case "function":
      case "symbol":
        // Direct assignment for functions and symbols
        obj[childKey as keyof T] = childValue;
        return obj;
      case "object":
        // Handle Date, RegExp, etc. as special cases if needed
        processedValue = childValue;
        break;
      default:
        processedValue = childValue;
    }

    // Safely assign the value without JSON parsing
    return {
      ...obj,
      [childKey]: processedValue
    };
  }

  public static isDeepEqual = (obj1: any, obj2: any, visited = new WeakMap()): boolean => {
    // Handle null and undefined cases
    if (obj1 === null || obj1 === undefined) {
      return obj2 === null || obj2 === undefined;
    }
    if (obj2 === null || obj2 === undefined) {
      return false;
    }

    // Handle primitive types
    if (obj1 === obj2) return true;

    const primitives = ["string", "boolean", "number", "bigint", "symbol"];
    const type1 = typeof obj1;
    const type2 = typeof obj2;

    if (primitives.includes(type1) || primitives.includes(type2)) {
      return obj1 === obj2;
    }

    // Only use WeakMap for object types
    if (type1 === 'object' || type2 === 'object') {
      // Handle circular references
      // With this:
      if (visited.has(obj1)) return visited.get(obj1) === obj2;
      if (visited.has(obj2)) return false; // obj2 hasn't been visited yet
      visited.set(obj1, obj2);
      visited.set(obj2, obj1); // Bidirectional mapping
    }


    // Handle functions
    if (type1 === 'function' || type2 === 'function') {
      return obj1.toString() === obj2.toString();
    }

    // Handle arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) return false;
      return obj1.every((elem, index) => this.isDeepEqual(elem, obj2[index], visited));
    }

    // Handle dates
    if (obj1 instanceof Date && obj2 instanceof Date) {
      return obj1.getTime() === obj2.getTime();
    }

    // Handle regexp
    if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
      return obj1.toString() === obj2.toString();
    }

    // Handle maps
    if (obj1 instanceof Map && obj2 instanceof Map) {
      if (obj1.size !== obj2.size) return false;
      for (const [key, val] of obj1) {
        if (!obj2.has(key) || !this.isDeepEqual(val, obj2.get(key), visited)) {
          return false;
        }
      }
      return true;
    }

    // Handle sets
    if (obj1 instanceof Set && obj2 instanceof Set) {
      if (obj1.size !== obj2.size) return false;
      const arr1 = Array.from(obj1);
      const arr2 = Array.from(obj2);
      return this.isDeepEqual(arr1.sort(), arr2.sort(), visited);
    }

    // Handle objects (including non-enumerable properties)
    const objKeys1 = [...Object.keys(obj1), ...Object.getOwnPropertySymbols(obj1)];
    const objKeys2 = [...Object.keys(obj2), ...Object.getOwnPropertySymbols(obj2)];

    if (objKeys1.length !== objKeys2.length) {
      return false;
    }

    // Check if all keys exist in both objects (order doesn't matter)
    for (const key of objKeys1) {
      if (!objKeys2.includes(key)) {
        return false;
      }
    }

    // Compare all properties (including symbols)
    for (const key of objKeys1) {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (!this.isDeepEqual(value1, value2, visited)) {
        return false;
      }
    }

    // Compare prototypes
    if (Object.getPrototypeOf(obj1) !== Object.getPrototypeOf(obj2)) {
      return false;
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

  /**
   * Checks if the value is a plain JavaScript object (not null, not an array, etc.).
   *
   * @example
   * // Example usage:
   * ObjectUtils.isPlainObject({}); // true
   * ObjectUtils.isPlainObject([]); // false
   * ObjectUtils.isPlainObject(null); // false
   * ObjectUtils.isPlainObject(1); // false
   * ObjectUtils.isPlainObject(false); // false
   * ObjectUtils.isPlainObject("string"); // false
   *
   * @param obj - The value to check
   * @returns `true` if the value is a plain object, `false` otherwise
   */
  public static isPlainObject(obj: any): boolean {
    return obj !== null && typeof obj === 'object' &&
        Object.getPrototypeOf(obj) === Object.prototype;
  }

  /**
   * Checks if the value is a JavaScript primitive (string, number, boolean, etc.).
   *
   * @example
   * // Example usage:
   * ObjectUtils.isPrimitive("test"); // true
   * ObjectUtils.isPrimitive(123); // true
   * ObjectUtils.isPrimitive({}); // false
   *
   * @param value - The value to check
   * @returns `true` if the value is a primitive, `false` otherwise
   */
  public static isPrimitive(value: any): boolean {
    return value !== Object(value);
  }

  /**
   * Creates a deep clone of the provided object, handling Dates, RegExps, and circular references.
   *
   * @example
   * // Example usage:
   * const original = { a: 1, b: { c: 2 } };
   * const cloned = ObjectUtils.deepClone(original);
   *
   * @template T - The type of the object to clone
   * @param obj - The object to clone
   * @param visited
   * @returns A deep clone of the object
   */
  public static deepClone<T>(obj: T, visited = new WeakMap()): T {
    if (this.isNullOrUndefined(obj) || typeof obj !== 'object') return obj;

    //Handle circular reference

    if (visited.has(obj)) {
      return visited.get(obj);
    }

    if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
    if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as unknown as T;

    if (Array.isArray(obj)) {
      return obj.map(item => this.deepClone(item)) as unknown as T;
    }

    // Create new object/array and store in WeakMap
    const clone: any = Array.isArray(obj) ? [] : {} as T;
    visited.set(obj, clone);

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clone[key as keyof T] = this.deepClone(obj[key as keyof T], visited);
      }
    }
    return clone;
  }

  /**
   * Performs a deep merge of two objects, recursively combining their properties.
   *
   * @example
   * // Example usage:
   * const merged = ObjectUtils.mergeDeep(
   *   { a: 1, b: { c: 2 } },
   *   { b: { d: 3 }, e: 4 }
   * ); // { a: 1, b: { c: 2, d: 3 }, e: 4 }
   *
   * @template T - Type of first object
   * @template U - Type of second object
   * @param target - The target object
   * @param source - The source object to merge
   * @returns A new object containing merged properties
   */
  public static mergeDeep<T extends object, U extends object>(target: T, source: U): T & U {
    const output = { ...target } as Record<string, any>;

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key as keyof U];
        const targetValue = target[key as unknown as keyof T];

        if (this.isPlainObject(sourceValue) && this.isPlainObject(targetValue)) {
          output[key] = this.mergeDeep(targetValue as object, sourceValue as object);
        } else if (sourceValue !== undefined) {
          output[key] = sourceValue;
        }
      }
    }

    return output as T & U;
  }

  /**
   * Creates an object composed of the picked object properties.
   *
   * @example
   * // Example usage:
   * const result = ObjectUtils.pick(
   *   { a: 1, b: 2, c: 3 },
   *   ['a', 'c']
   * ); // { a: 1, c: 3 }
   *
   * @template T - The source object type
   * @template K - The keys to pick
   * @param obj - The source object
   * @param keys - The property keys to pick
   * @returns The new object with picked properties
   */
  public static pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    return keys.reduce((acc, key) => {
      if (key in obj) {
        acc[key] = obj[key];
      }
      return acc;
    }, {} as Pick<T, K>);
  }

  /**
   * Creates an object with all but the omitted properties.
   *
   * @example
   * // Example usage:
   * const result = ObjectUtils.omit(
   *   { a: 1, b: 2, c: 3 },
   *   ['b']
   * ); // { a: 1, c: 3 }
   *
   * @template T - The source object type
   * @template K - The keys to omit
   * @param obj - The source object
   * @param keys - The property keys to omit
   * @returns The new object without omitted properties
   */
  public static omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const copy = { ...obj };
    keys.forEach(key => delete copy[key]);
    return copy;
  }

  /**
   * Gets the value at path of object, returns undefined if path doesn't exist.
   *
   * @example
   * // Example usage:
   * const value = ObjectUtils.getPropertyByPath<number>(
   *   { a: { b: { c: 123 } } },
   *   'a.b.c'
   * ); // 123
   *
   * @template T - The expected return type
   * @param obj - The object to query
   * @param path - The path of the property to get
   * @returns The resolved value or undefined
   */
  public static getPropertyByPath<T>(obj: any, path: string): T | undefined {
    return path.split('.').reduce((acc, part) =>
        acc && acc[part] !== undefined ? acc[part] : undefined, obj);
  }

  /**
   * Creates a new object with the same keys as the original, but with values transformed by the mapper function.
   *
   * @example
   * // Example usage:
   * const result = ObjectUtils.mapValues(
   *   { a: 1, b: 2 },
   *   (value) => value * 2
   * ); // { a: 2, b: 4 }
   *
   * @template T - The source object type
   * @template V - The mapped value type
   * @param obj - The source object
   * @param mapper - The mapping function (value, key) => newValue
   * @returns The new object with mapped values
   */
  public static mapValues<T extends object, V>(
      obj: T,
      /* eslint-disable no-unused-vars */
      mapper: (value: T[keyof T], key: keyof T) => V
  ): Record<keyof T, V> {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key as keyof T] = mapper(obj[key as keyof T], key as keyof T);
      return acc;
    }, {} as Record<keyof T, V>);
  }

  /**
   * Creates a new object with only the properties that satisfy the predicate.
   *
   * @example
   * // Example usage:
   * const result = ObjectUtils.filterValues(
   *   { a: 1, b: 2, c: 3 },
   *   (value) => value > 1
   * ); // { b: 2, c: 3 }
   *
   * @template T - The source object type
   * @param obj - The source object
   * @param predicate - The filter function (value, key) => boolean
   * @returns The new filtered object
   */
  public static filterValues<T extends object>(
      obj: T,
      predicate: (value: T[keyof T], key: keyof T) => boolean
  ): Partial<T> {
    return Object.keys(obj).reduce((acc, key) => {
      if (predicate(obj[key as keyof T], key as keyof T)) {
        acc[key as keyof T] = obj[key as keyof T];
      }
      return acc;
    }, {} as Partial<T>);
  }

  /**
   * Performs a shallow equality check between two objects (compares first level properties).
   *
   * @example
   * // Example usage:
   * ObjectUtils.shallowEqual({ a: 1 }, { a: 1 }); // true
   * ObjectUtils.shallowEqual({ a: 1 }, { a: "1" }); // false
   * ObjectUtils.shallowEqual({ a: {} }, { a: {} }); // false (references differ)
   *
   * @param objA - First object to compare
   * @param objB - Second object to compare
   * @param strict - in strict mode
   * @returns `true` if objects are shallowly equal
   */
  public static shallowEqual(objA: any, objB: any, strict = false): boolean {
    if (strict) return objA === objB;
    if (Object.is(objA, objB)) return true;

    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
      return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;

    // Check each key
    for (let i = 0; i < keysA.length; i++) {
      const key = keysA[i];
      if (
          !Object.prototype.hasOwnProperty.call(objB, key) ||
          objA[key] !== objB[key]  // Strict equality check
      ) {
        return false;
      }
    }

    return true;
  }

  /**
   * Returns an object containing only the properties that differ between two objects.
   *
   * @example
   * // Example usage:
   * const diff = ObjectUtils.diffObjects(
   *   { a: 1, b: 2, c: 3 },
   *   { a: 1, b: 20, c: 3 }
   * ); // { b: 20 }
   *
   * @template T - The object type
   * @param obj1 - Original object
   * @param obj2 - Comparison object
   * @returns Object containing only differing properties
   */
  public static diffObjects<T extends object>(obj1: T, obj2: T): Partial<T> {
    return Object.keys(obj1).reduce((acc, key) => {
      if (!Object.is(obj1[key], obj2[key])) {
        acc[key as keyof T] = obj2[key as keyof T];
      }
      return acc;
    }, {} as Partial<T>);
  }

  /**
   * Safely attempts to parse a JSON string, returning the original string if parsing fails.
   *
   * @example
   * // Example usage:
   * ObjectUtils.tryParseJSON('{"a":1}'); // { a: 1 }
   * ObjectUtils.tryParseJSON('invalid'); // 'invalid'
   *
   * @param str - The string to parse
   * @returns Parsed object or original string
   */
  public static tryParseJSON(str: string): any {
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  }

  /**
   * Creates a read-only proxy that prevents modifications to the object and its nested properties.
   *
   * @example
   * // Example usage:
   * const immutable = ObjectUtils.createImmutableProxy({ a: 1 });
   * immutable.a = 2; // Throws "Cannot modify immutable object"
   *
   * @template T - The object type
   * @param obj - The object to make immutable
   * @returns Immutable proxy version of the object
   */
  public static createImmutableProxy<T extends object>(obj: T): T {
    return new Proxy(obj, {
      get(target, prop) {
        const value = target[prop as keyof T];
        return typeof value === 'object' && value !== null
            ? this.createImmutableProxy(value)
            : value;
      },
      set() {
        throw new Error('Cannot modify immutable object');
      },
      deleteProperty() {
        throw new Error('Cannot modify immutable object');
      }
    });
  }

  /**
   * Flattens a nested object into a single level with dot-notated keys.
   *
   * @example
   * // Example usage:
   * const flattened = ObjectUtils.flattenObject({
   *   a: 1,
   *   b: { c: 2, d: { e: 3 } }
   * }); // { 'a': 1, 'b.c': 2, 'b.d.e': 3 }
   *
   * @param obj - The object to flatten
   * @param delimiter - The separator to use (default: '.')
   * @returns Flattened object
   */
  public static flattenObject(obj: object, delimiter = '.'): Record<string, any> {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.entries(this.flattenObject(value, delimiter))
            .forEach(([nestedKey, nestedValue]) => {
              acc[`${key}${delimiter}${nestedKey}`] = nestedValue;
            });
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);
  }
}
