import { ArrayUtils } from "../../../lib";
import { Comparator } from "../../../lib/utils/sort/comparator";
import { Comparable } from "../../../lib/utils/sort/comparable";

class Example implements Comparable<Example> {
  name: string;
  id: number;
  role?: string;

  compareTo(a: Example): number {
    return this.name.localeCompare(a.name);
  }
}

describe("Sort", () => {
  it('should ""', () => {
    ArrayUtils.sortable<Example>(
      [],
      Comparator.comparing().thenComparing().thenComparing()
    );
  });
});
