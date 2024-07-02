import { ObjectUtils } from "./object.utils";

export class CollectionUtils {

  public static isEmpty = (arr: any) => !Array.isArray(arr) || ObjectUtils.isNullOrUndefined(arr) || arr.length === 0;

  public static isNotEmpty = (arr: any) => !this.isEmpty(arr);
}
