import { Comparable } from "./comparable";

export class Comparator<T extends Comparable<T>> {
  static comparing = <T extends Comparable<T>>(): Comparator<T> => {
    return null;
  };

  public thenComparing = (): Comparator<T> => {
    return null;
  };

  private _function = (a: T, b: T) => a.compareTo(b);
}
