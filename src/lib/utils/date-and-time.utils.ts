import { ObjectUtils } from "./object.utils";

export class DateAndTimeUtils {
  //HH:mm:ss ==> PD<x>s
  // 01:00:20 ==> 3620s
  public static linearisedTime = (duree: string, surfix: string = "s") => {
    if (ObjectUtils.isNullOrUndefined(duree)) {
      return duree;
    }
    const regex = new RegExp(
      "^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$",
      "g",
    );
    if (!regex.test(duree)) {
      return "";
    }
    const timeArr = duree.split(":");
    const h = +timeArr[0] * (60 * 60);
    const m = +timeArr[1] * 60;
    const s = +timeArr[2];
    return h + m + s + surfix;
  };
}
