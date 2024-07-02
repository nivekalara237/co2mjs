import { NumericUtils, ObjectUtils } from "..";

export class BooleanUtils {
  
  public static isTrue(value: any) {
    return this.safety(value);
  }

  public static isFalse(value: any) {
    return !this.safety(value);
  }

  public static safety(value: any) {
    return coerceBooleanProperty(value);
  }
  

  public static safetyElegan = (value: any) => {

    if (ObjectUtils.isNullOrUndefined(value)) {
      return false;
    }

    if (Array.isArray(value) || value.length == 0) {
      return false;
    }

    if (NumericUtils.isNumeric(value)) {
      return +value > 0;
    }

    if (typeof value === 'string') {
      return (
        value.trim().toLowerCase() === 'true' ||
        value.trim().toLowerCase() == 'on'
      );
    }
  };
}


export function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}


