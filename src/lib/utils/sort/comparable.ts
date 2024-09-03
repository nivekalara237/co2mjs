/*eslint no-unused-vars: "off"*/
export interface Comparable<T> {
  (a: T, b: T): number;
}

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}
