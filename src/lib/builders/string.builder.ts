import { StringUtils } from "../utils/string.utils";
import { ObjectUtils } from "../utils/object.utils";

type SupportedType = string | number | boolean;
export class StringBuilder {
  private arr: string[] = [];
  constructor(init: string = "") {
    this.arr.push(init);
  }

  /**
   * Instance new builder class
   */
  public static create = () => new StringBuilder();

  /**
   * Compute the number of fragment of string inserted,
   * /!\ : Do not confuse with string length
   */
  public size = () =>  this.arr.length;

  /**
   * Insert new string at end of existing
   * @param o the new string
   */
  public append(o: SupportedType): StringBuilder {
    if (ObjectUtils.isNotNullAndNotUndefined(o)) {
      this.arr.push(StringUtils.stringify(o) || "");
    }
    return this;
  }

  /**
   * Insert new string at start of existing
   * @param str the new string to insert
   */
  public prepend(str: SupportedType): StringBuilder {
    if (ObjectUtils.isNotNullAndNotUndefined(str)) {
      this.arr.splice(0, 0, StringUtils.stringify(str) || "");
    }
    return this;
  }

  /**
   * Reverse the order of appanned fragment
   */
  public reverse(): string {
    return this.arr.reverse().join("");
  }

  /**
   * Reverse to string reconstituted
   */
  public reverseContent(): string {
    return this.arr
      .reverse()
      .map((value) => value.split("").reverse().join(""))
      .join("");
  }

  /**
   * check is the builder doesn't contain fragment
   */
  public isEmpty() {
    return (
      this.arr.map((value) => StringUtils.trim(value)).join("").length === 0
    );
  }

  /**
   * concatenated the while fragments into one fragment and return the string corresponding
   */
  public toString(): string {
    return this.arr.join("");
  }

  public join = (separator: string = "") => {
    if (this.size() === 0) {
      return "";
    }
    return this.arr.join(separator);
  }
}
