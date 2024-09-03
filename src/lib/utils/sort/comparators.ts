import { CompareTo } from "./compare-to";
import { Comparable, SortDirection } from "./comparable";
import { ObjectUtils } from "../object.utils";

type ComparableDirected<T> = {
  direction: SortDirection;
  fn: Comparable<T>;
};

export class Comparators<T extends CompareTo<T>> {
  private readonly chain: ComparableDirected<T>[];

  constructor(initComparable: ComparableDirected<T>) {
    this.chain = [initComparable];
  }

  static ascending = <T extends CompareTo<T>>(comparable?: Comparable<T>) => {
    return this.getOrDefaultComparators(SortDirection.ASC, comparable);
  };

  static descending = <T extends CompareTo<T>>(comparable?: Comparable<T>) => {
    return this.getOrDefaultComparators(SortDirection.DESC, comparable);
  };

  static comparing = <T extends CompareTo<T>>(
    comparable?: Comparable<T>,
    direction?: SortDirection
  ): Comparators<T> => {
    return this.getOrDefaultComparators(
      direction ?? SortDirection.DESC,
      comparable
    );
  };

  private static getOrDefaultComparators<T extends CompareTo<T>>(
    direction: SortDirection,
    comparable?: Comparable<T>
  ) {
    if (comparable) {
      return new Comparators<T>({
        direction,
        fn: comparable,
      });
    }
    return new Comparators<T>({
      fn: (a: T, b: T) => a.compareTo(b),
      direction,
    });
  }

  public thenComparing = (
    thenCompare: Comparable<T>,
    direction: SortDirection = SortDirection.DESC
  ): Comparators<T> => {
    this.chain.push({ fn: thenCompare, direction: direction });
    return this;
  };

  public compareFn = () => {
    return (a: T, b: T) => {
      let equity: number = 0;
      let i = 0;
      const comparators = [...this.chain].filter(
        ObjectUtils.isNotNullAndNotUndefined
      );
      while (!equity && comparators.at(i)) {
        const comp = comparators.at(i++);
        equity = this.compareByDirection(comp.fn(a, b), comp.direction);
      }
      return equity;
    };
  };

  private compareByDirection = (equity: number, dir: SortDirection) => {
    return dir === SortDirection.ASC ? -equity : equity;
  };
}
