export class NumericUtils {
  public static isNumeric = (val: any) => {
    return !Array.isArray(val) && val - parseFloat(val) + 1 >= 0;
  };
}
