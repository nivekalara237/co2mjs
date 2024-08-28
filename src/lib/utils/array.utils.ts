import { ObjectUtils } from "./object.utils";

export class ArrayUtils {
  public static setToArray = (set: Set<any> | any): any[] => {
    if (ObjectUtils.isNullOrUndefined(set)) return [];
    return Array.from(set);
  };

  public static groupBy = (
    array: any[] | any,
    key: string,
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
        items: { [x: string]: string | number },
      ) => (
        (accumulator[items[key]] = [...(accumulator[items[key]] || []), items]),
        accumulator
      ),
      {},
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
}
