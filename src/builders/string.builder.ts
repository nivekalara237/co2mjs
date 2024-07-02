import { StringUtils } from "../utils/string.utils";
import { ObjectUtils } from "../utils/object.utils";

export class StringBuilder {
  private str: string;
  constructor(init: string = "") {
    this.str = init || "";
  }

  public append(o: string | number | boolean): StringBuilder {
    if (ObjectUtils.isNotNullAndNotUndefined(o)){
      this.str = this.str.concat(StringUtils.stringify(o) || '');
    }
    return this;
  }

  public isEmpty() {
    return this.str.length === 0;
  }

  public toString(): string {
    return this.str;
  }
}

