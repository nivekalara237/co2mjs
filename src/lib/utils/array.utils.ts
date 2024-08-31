import { ObjectUtils } from "./object.utils";
import { ThrowableUtils } from "./throwable.utils";
import { compareInt } from "./sort/helper";

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
}
