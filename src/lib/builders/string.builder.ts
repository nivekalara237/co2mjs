import { StringUtils } from "../utils/string.utils";
import { ObjectUtils } from "../utils/object.utils";

type SupportedType = string | number | boolean;

export class StringBuilder {
  private arr: string[] = [];

  constructor(init?: string) {
    if (init) {
      this.arr.push(init);
    }
  }

  public append(o: SupportedType): StringBuilder {
    if (ObjectUtils.isNotNullAndNotUndefined(o)) {
      this.arr.push(StringUtils.stringify(o) || "");
    }
    return this;
  }

  public prepend(str: SupportedType): StringBuilder {
    if (ObjectUtils.isNotNullAndNotUndefined(str)) {
      this.arr.splice(0, 0, StringUtils.stringify(str) || "");
    }
    return this;
  }

  public reverse(): string {
    return this.arr.reverse().join("");
  }

  public reverseContent(): string {
    return this.arr
      .reverse()
      .map((value) => value.split("").reverse().join(""))
      .join("");
  }

  public isEmpty() {
    return (
      this.arr.map((value) => StringUtils.trim(value)).join("").length === 0
    );
  }

  public toString(): string {
    return this.arr.join("");
  }

  public build = (separator?: string) => {
    return this.arr.join(separator ?? "");
  };

  public segments = () => this.arr;

  public size = () => this.arr.length;

  public contentSize = () => this.toString().length;
}
