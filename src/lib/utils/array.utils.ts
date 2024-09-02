import { ObjectUtils } from "./object.utils";
import { ThrowableUtils } from "./throwable.utils";
import { compareInt } from "./sort/helper";
import { IndexOutOfBoundsException } from "../exceptions/index-out-of-bounds.exception";
import { Comparator } from "./sort/comparator";
import { Comparable } from "./sort/comparable";

export class ArrayUtils {
  public static setToArray = (set: Set<any> | any): any[] => {
    if (ObjectUtils.isNullOrUndefined(set)) return [];
    return Array.from(set);
  };

  public static groupBy = (
    array: any[] | any,
    key: string
  ): { [k: string]: any[] } => {
    if (
      ObjectUtils.isNullOrUndefined(array) ||
      ObjectUtils.isNullOrUndefined(key)
    ) {
      return {};
    }
    return array.reduce(
      (
        accumulator: { [x: string]: any },
        items: { [x: string]: string | number }
      ) => (
        (accumulator[items[key]] = [...(accumulator[items[key]] || []), items]),
        accumulator
      ),
      {}
    );
  };

  public static anyToArray = <R>(value: any): R[] => {
    if (ObjectUtils.isNullOrUndefined(value)) {
      return [];
    }

    if (Array.isArray(value)) {
      return [...value].map((v) => v as R);
    }

    if (typeof value === "object") {
      return Object.values(value).map((v) => v as R);
    }

    return [value];
  };

  static sortInt = (array: number[], reverse?: boolean) => {
    ThrowableUtils.requireNonNull(array, "array");
    return array.sort((a, b) => (reverse ? b - a : a - b));
  };

  static sortString = (
    array: string[],
    config?: {
      reverse?: boolean;
      ignoreCase?: boolean;
    }
  ) => {
    ThrowableUtils.requireNonNull(array, "array");
    const sensitive = (s: string) => (config?.ignoreCase ? s.toLowerCase() : s);
    return array.sort((a, b) =>
      config?.reverse
        ? sensitive(b).localeCompare(sensitive(a))
        : sensitive(a).localeCompare(sensitive(b))
    );
  };

  static sort = <T extends object>(
    array: Array<T>,
    key: string,
    config?: { reverse?: boolean; ignoreCase?: boolean; strict?: boolean }
  ) => {
    ThrowableUtils.requireNonNull(array, "array");
    ThrowableUtils.requireNonNull(key, "key");

    if (
      !Array.isArray(array) ||
      (Array.of(...array).length > 0 && typeof array[0] !== "object")
    ) {
      ThrowableUtils.raise("Invalid Array of object type");
    }

    return array.sort((a: T, b: T) => {
      if (config?.strict && typeof a[key] !== typeof b[key]) {
        ThrowableUtils.raise(
          `Incompatibility with the values of key provider: first arg type=${typeof a[key]} and second arg type=${typeof b[key]}`
        );
      }
      if (
        ["number", "bigint"].includes(typeof a[key]) &&
        ["number", "bigint"].includes(typeof b[key])
      ) {
        const aNum: number | bigint = a[key];
        const bNum: number | bigint = b[key];
        return config?.reverse
          ? compareInt(bNum, aNum)
          : compareInt(aNum, bNum);
      }

      if (typeof a[key] === "string" && typeof b[key] === "string") {
        return config?.reverse
          ? b[key].localeCompare(a[key])
          : a[key].localeCompare(b[key]);
      }

      ThrowableUtils.raise(
        `Incompatibility with the values of key provider: first arg type=${typeof a[key]} and second arg type=${typeof b[key]}`
      );
    });
  };

  /*eslint no-unused-vars: "off"*/
  static sortable = <T extends Comparable<T>>(
    array: Array<T>,
    comparator: Comparator<T>
  ): Array<T> => {
    return null;
  };

  static distinct = <T>(array: T[], byKey?: string) => {
    if (ObjectUtils.isNullOrUndefined(array)) {
      ThrowableUtils.raise("The array must be defined");
    }
    if (array.length === 0) {
      return [];
    }

    const distinct: T[] = [];

    for (let i = 0; i < array.length; i++) {
      const value = array[i];
      if (byKey) {
        if (distinct.findIndex((v) => v[byKey] === value[byKey]) > -1) {
          continue;
        }
      } else {
        if (distinct.indexOf(value) > -1) continue;
      }
      distinct.push(value);
    }
    return distinct;
  };

  /**
   * Clone all elements inside new array
   *
   * <pre>
   *     ArrayUtils.safeCopy(null)            = []
   *     ArrayUtils.safeCopy(undefined)       = []
   *     ArrayUtils.safeCopy([2,3])           = [2,3]
   * </pre>
   *
   * @param array the array to clone
   * @return the safe array cloned
   */
  static safeCopy = (array: unknown[]): unknown[] => {
    return ObjectUtils.isNullOrUndefined(array) ? [] : [...array];
  };

  /**
   * Add the given element at the end of the new (copy) array
   *
   * <pre>
   *     Arrays.insert(null, 3)        = [3]
   *     Arrays.insert(undefined, 3)   = [3]
   *     Arrays.insert(['yes'], 'no')  = ['yes', 'no']
   * </pre>
   *
   * @param array the array to add the element to
   * @param item the new element to add
   * @return A new array containing the existing elements plus the new element
   * @since v1.0.8
   */
  static insert = (array: unknown[], item: unknown): unknown[] => {
    const newArray = this.copyArrayAndGrowByOne(array);
    newArray[newArray.length - 1] = item;
    return newArray;
  };

  /**
   * Copies the given array and adds the given element at the beginning of the new array.
   *
   * <pre>
   *     ArrayUtils.insertFirst(null, "banana") = ["banana"]
   *     ArrayUtils.insertFirst(["apple","orange"], "banana") = ["banana","apple","orange"]
   * </pre>
   * @param array the array to add the element to
   * @param item the element to add
   * @return a new array containing the existing elements plus the new element
   * @since v1.0.8
   */
  static insertFirst = (array: unknown[], item: unknown): unknown[] => {
    return this.insertAt(array, 0, item);
  };

  /**
   * Copies the given array and adds the given element at the ending of the new array.
   *
   * <pre>
   *     ArrayUtils.insertFirst(null, "banana") = ["banana"]
   *     ArrayUtils.insertFirst(["apple","orange"], "banana") = ["apple","orange","banana"]
   * </pre>
   * @param array the array to add the element to
   * @param item the element to add
   * @return a new array containing the existing elements plus the new element
   * @since v1.0.8
   */
  static insertEnd = (array: unknown[], item: unknown): unknown[] => {
    return this.insert(array, item);
  };

  /**
   * Add the given element at specified position
   *
   * <pre>
   *     ArrayUtils.insertAt(null, 0, 1)        = [1]
   *     ArrayUtils.insertAt(null, 1, 1)        = throw Error
   *     ArrayUtils.insertAt([], 0, 1)          = [1]
   *     ArrayUtils.insertAt([1,2,3,4], 2, 8)   = [1,2,8,3,4]
   *     ArrayUtils.insertAt([1,2,3,4], 5, 8)   = throw Error
   *     ArrayUtils.insertAt([2], -1, 1)        = throw Error
   * </pre>
   *
   * @param array the array to add the element to
   * @param index the position of the new element
   * @param item the new element to inserted at #index position
   * @return A new array containing the existing elements and the new element
   * @throws IndexOutOfBoundsException if the index is out of range (index &lt; 0 || index &gt; array.length).
   * @since v1.0.8
   */
  static insertAt = (
    array: unknown[],
    index: number,
    item: unknown
  ): unknown[] => {
    const newArray = this.copyArrayAndGrowByOneAtIndex(array, index);
    newArray[index] = item;
    return newArray;
  };

  /**
   * Adds all the elements of the given arrays into a new array.
   *
   * <pre>
   *     ArrayUtils.insertAll([2,3], null) === [2,3]
   *     ArrayUtils.insertAll([2,3], undefined) === [2,3]
   *     ArrayUtils.insertAll([2,3], [9]) === [2,3,9]
   * </pre>
   *
   * @param array the first array whose elements are added to the new array
   * @param items the second array whose elements are added to the new array
   * @since v1.0.8
   */
  static insertAll = (array: unknown[], items: unknown[]): unknown[] => {
    const copyArray = this.safeCopy(array);
    if (ObjectUtils.isNullOrUndefined(items)) {
      return copyArray;
    }
    const copyItems = this.safeCopy(items);
    return [...copyArray, ...copyItems];
  };

  private static copyArrayAndGrowByOne = (initArray: any[]) => {
    if (ObjectUtils.isNullOrUndefined(initArray)) {
      return [null];
    }
    return [...initArray, null];
  };

  private static copyArrayAndGrowByOneAtIndex = (
    initArray: any[],
    index: number
  ) => {
    if (index < 0 || (ObjectUtils.isNullOrUndefined(initArray) && index > 0)) {
      ThrowableUtils.raise(
        new IndexOutOfBoundsException("The index is out of the bounds")
      );
    }
    if (ObjectUtils.isNullOrUndefined(initArray)) {
      return [null];
    }

    if (index > initArray.length) {
      ThrowableUtils.raise(
        new IndexOutOfBoundsException("The index is out of the bounds")
      );
    }

    const newArr = [];
    for (let i = 0; i < initArray.length; i++) {
      if (i === index) {
        newArr.push(null);
      }
      newArr.push(initArray[i]);
    }

    return newArr;
  };
}
