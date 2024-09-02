import { Comparable } from "./comparable";

export class Comparator<T extends Comparable<T>> {
  static comparing = <T extends Comparable<T>>(): Comparator<T> => {
    return new Comparator<T>();
  };

  public thenComparing = (): Comparator<T> => {
    return this;
  };

  private _function = (a: T, b: T) => a.compareTo(b);
}
