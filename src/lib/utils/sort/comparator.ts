import { Comparable } from "./comparable";
import { compareInt } from "./helper";

export class Comparator implements Comparable<number> {
  apply(a: number, b: number): -1 | 0 | 1 {
    return compareInt(a, b);
  }
}
