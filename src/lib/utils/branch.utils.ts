export class BranchUtils {
  public static betweenRangeNumber = (
    value: number,
    min: number,
    max: number,
  ): boolean => {
    return value <= max && value >= min;
  };
}
