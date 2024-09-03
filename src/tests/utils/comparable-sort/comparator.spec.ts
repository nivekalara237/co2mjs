import { CompareTo } from "../../../lib/utils/sort/compare-to";
import { ArrayUtils } from "../../../lib";
import { Comparators } from "../../../lib/utils/sort/comparators";
import { SortDirection } from "../../../lib/utils/sort/comparable";

class Example implements CompareTo<Example> {
  name: string;
  age: number;
  role?: string;

  constructor(name: string, age: number, role?: string) {
    this.name = name;
    this.age = age;
    this.role = role;
  }

  public compareTo(a: Example): number {
    return this.name.localeCompare(a.name);
  }
}

describe("Sort By comparators", () => {
  it("should sort undefined or null array", () => {
    expect(() => ArrayUtils.sortBy(null, Comparators.ascending())).toThrow(
      "The array must not be a null value"
    );
    expect(() => ArrayUtils.sortBy(undefined, Comparators.ascending())).toThrow(
      "The array must be defined value"
    );
    expect(() => ArrayUtils.sortBy([], null)).toThrow(
      "The comparators must not be a null value"
    );
    expect(() => ArrayUtils.sortBy([], undefined)).toThrow(
      "The comparators must be defined value"
    );
  });

  it("should sort array using default comparator", () => {
    const arr: Example[] = [
      new Example("Alex", 78, "AnD"),
      new Example("John", 45, "JA"),
      new Example("Olyx", 28, "OD"),
      new Example("Alex", 56, "AxD"),
    ];
    const res = ArrayUtils.sortBy(arr, Comparators.comparing<Example>());
    expect(res).toEqual([
      new Example("Alex", 78, "AnD"),
      new Example("Alex", 56, "AxD"),
      new Example("John", 45, "JA"),
      new Example("Olyx", 28, "OD"),
    ]);
  });

  it("should sort array using specific comparator", () => {
    const arr: Example[] = [
      new Example("Alex", 78, "AnD"),
      new Example("John", 45, "JA"),
      new Example("Olyx", 28, "OD"),
      new Example("Alex", 56, "AxD"),
    ];
    const res = ArrayUtils.sortBy(
      arr,
      Comparators.comparing<Example>((a, b) => a.age - b.age, SortDirection.ASC)
    );
    expect(res).toEqual([
      new Example("Alex", 78, "AnD"),
      new Example("Alex", 56, "AxD"),
      new Example("John", 45, "JA"),
      new Example("Olyx", 28, "OD"),
    ]);
  });

  it("should sort array using descending comparator", () => {
    const arr: Example[] = [
      new Example("Alex", 78, "AnD"),
      new Example("John", 45, "JA"),
      new Example("Olyx", 28, "OD"),
      new Example("Alex", 56, "AxD"),
    ];
    const res = ArrayUtils.sortBy(arr, Comparators.descending<Example>());
    expect(res).toEqual([
      new Example("Alex", 78, "AnD"),
      new Example("Alex", 56, "AxD"),
      new Example("John", 45, "JA"),
      new Example("Olyx", 28, "OD"),
    ]);
  });

  it("should sort array using ascending comparator", () => {
    const arr: Example[] = [
      new Example("Alex", 78, "AnD"),
      new Example("John", 45, "JA"),
      new Example("Olyx", 28, "OD"),
      new Example("Alex", 56, "AxD"),
    ];
    const res = ArrayUtils.sortBy(arr, Comparators.ascending<Example>());
    expect(res).toEqual([
      new Example("Olyx", 28, "OD"),
      new Example("John", 45, "JA"),
      new Example("Alex", 78, "AnD"),
      new Example("Alex", 56, "AxD"),
    ]);
  });

  it("should sort array by combined field", () => {
    const arr: Example[] = [
      new Example("Alex", 78, "AnD"),
      new Example("John", 45, "JA"),
      new Example("Olyx", 28, "OD"),
      new Example("Alex", 56, "AxD"),
    ];
    const res = ArrayUtils.sortBy(
      arr,
      Comparators.comparing<Example>().thenComparing((a, b) => a.age - b.age)
    );
    expect(res).toEqual([
      new Example("Alex", 56, "AxD"),
      new Example("Alex", 78, "AnD"),
      new Example("John", 45, "JA"),
      new Example("Olyx", 28, "OD"),
    ]);
  });
});
