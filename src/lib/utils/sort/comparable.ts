/*eslint no-unused-vars: "off"*/
export interface Comparable<T> {
  apply(a: T, b: T): -1 | 0 | 1;
}
