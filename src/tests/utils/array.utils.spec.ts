import { ArrayUtils } from "../../lib";

describe("Tests array utilities", () => {
  describe("Collection of type Set should be converted as a linear array", () => {
    it("when everything is good", () => {
      const set = new Set<number>([1, 2, 3, 4, 5, 5, 8, 1, 4]);
      const array = ArrayUtils.setToArray(set);
      expect(array).toEqual([1, 2, 3, 4, 5, 8]);
    });

    it("when collection if null or undefined", () => {
      expect(ArrayUtils.setToArray(null)).toEqual([]);
      expect(ArrayUtils.setToArray(undefined)).toEqual([]);
    });
  });

  describe("The array provided should be grouped by the specified key", () => {
    it("when OK", () => {
      const providedArray = [
        {
          name: "John",
          role: "C",
          key: 23,
        },
        {
          name: "Joe",
          role: "C",
          key: 7,
        },
        {
          name: "Nathan",
          role: "A",
          key: 20,
        },
        {
          name: "Jone",
          role: "AC",
          key: 40,
        },
        {
          name: "Nathan",
          role: "A",
          key: 10,
        },
      ];

      expect(ArrayUtils.groupBy(providedArray, "role")).toEqual({
        C: [
          { name: "John", role: "C", key: 23 },
          { name: "Joe", role: "C", key: 7 },
        ],
        A: [
          { name: "Nathan", role: "A", key: 20 },
          { name: "Nathan", role: "A", key: 10 },
        ],
        AC: [{ name: "Jone", role: "AC", key: 40 }],
      });
    });

    it("when array is null of undefined", () => {
      expect(ArrayUtils.groupBy(null, "key")).toEqual({});
      expect(ArrayUtils.groupBy(undefined, "key")).toEqual({});
    });

    it("when key is null of undefined", () => {
      expect(ArrayUtils.groupBy([{ name: "u" }], null)).toEqual({});
      expect(ArrayUtils.groupBy([{ name: "i" }], undefined)).toEqual({});
    });
  });

  describe("should convert a any object to an array", function () {
    it("when 'any' is null or undefined", function () {
      expect(ArrayUtils.anyToArray(null)).toEqual([]);
      expect(ArrayUtils.anyToArray(undefined)).toEqual([]);
    });
    it("when 'any' is instanceOf by not array", function () {
      expect(ArrayUtils.anyToArray("one")).toEqual(["one"]);
    });
    it("when 'any' is object", function () {
      expect(ArrayUtils.anyToArray({ name: "James", born: 1234 })).toEqual([
        "James",
        1234,
      ]);
    });
  });

  describe("Sort Number", () => {
    it("should provide undefined array", () => {
      expect(() => ArrayUtils.sortInt(null)).toThrow(
        "The array must not be a null value"
      );
    });
    it("should sort array provided", () => {
      expect(ArrayUtils.sortInt([2, 3, 0, 1, 8, 1])).toEqual([
        0, 1, 1, 2, 3, 8,
      ]);
    });
    it("should reverse sort array provided", () => {
      expect(ArrayUtils.sortInt([2, 3, 0, 1, 8, 1], true)).toEqual([
        8, 3, 2, 1, 1, 0,
      ]);
    });
  });

  describe("Sort String", () => {
    it("should provide undefined array", () => {
      expect(() => ArrayUtils.sortString(null)).toThrow(
        "The array must not be a null value"
      );
    });
    it("should sort array provided", () => {
      expect(ArrayUtils.sortString(["a", "b", "z", "d", "8", "a"])).toEqual([
        "8",
        "a",
        "a",
        "b",
        "d",
        "z",
      ]);
    });
    it("should reverse sort array provided", () => {
      expect(
        ArrayUtils.sortString(["a", "b", "z", "d", "8", "a"], { reverse: true })
      ).toEqual(["z", "d", "b", "a", "a", "8"]);
    });
    it("should reverse and ignore case sort array provided", () => {
      expect(
        ArrayUtils.sortString(["a", "b", "Z", "d", "8", "A"], {
          reverse: true,
          ignoreCase: true,
        })
      ).toEqual(["Z", "d", "b", "a", "A", "8"]);
    });
    it("should ignore case sort array provided", () => {
      expect(
        ArrayUtils.sortString(["a", "b", "Z", "d", "8", "A"], {
          reverse: true,
          ignoreCase: true,
        })
      ).toEqual(["Z", "d", "b", "a", "A", "8"]);
    });
  });

  describe("Sort Object", () => {
    it("should sort null array", () => {
      expect(() => ArrayUtils.sort<{ id: string }>(null, "id")).toThrow(
        "The array must not be a null value"
      );
    });
    it("should sort undefined array by key", () => {
      expect(() => ArrayUtils.sort<{ id: string }>(undefined, "id")).toThrow(
        "Invalid Array of object type"
      );
    });
    it("should sort non object array by key", () => {
      expect(() => ArrayUtils.sort<any>([2, "id"], "id")).toThrow(
        "Invalid Array of object type"
      );
    });
    it("should sort non array of objects by key '(2)'", () => {
      expect(() => ArrayUtils.sort<any>([], "id")).not.toThrow();
    });
    it("should sort array of objects by key - (integer) DESC", () => {
      expect(
        ArrayUtils.sort<{ id: number; name: string }>(
          [
            {
              id: 3,
              name: "John",
            },
            {
              id: 1,
              name: "Joe",
            },
            {
              id: 2,
              name: "Alex",
            },
          ],
          "id"
        )
      ).toEqual([
        {
          id: 1,
          name: "Joe",
        },
        {
          id: 2,
          name: "Alex",
        },
        {
          id: 3,
          name: "John",
        },
      ]);
    });
    it("should sort array of objects by key - (integer) ASC", () => {
      expect(
        ArrayUtils.sort<{ id: number; name: string }>(
          [
            {
              id: 3,
              name: "John",
            },
            {
              id: 1,
              name: "Joe",
            },
            {
              id: 2,
              name: "Alex",
            },
          ],
          "id",
          {
            reverse: true,
          }
        )
      ).toEqual([
        {
          id: 3,
          name: "John",
        },
        {
          id: 2,
          name: "Alex",
        },
        {
          id: 1,
          name: "Joe",
        },
      ]);
    });
    it("should sort array of objects by key - (string) DESC and ignore case", () => {
      expect(
        ArrayUtils.sort<{ id: number; name: string }>(
          [
            {
              id: 3,
              name: "JoHn",
            },
            {
              id: 1,
              name: "Joe",
            },
            {
              id: 2,
              name: "Alex",
            },
          ],
          "name",
          {
            reverse: false,
            ignoreCase: true,
          }
        )
      ).toEqual([
        {
          id: 2,
          name: "Alex",
        },
        {
          id: 1,
          name: "Joe",
        },
        {
          id: 3,
          name: "JoHn",
        },
      ]);
    });

    it("should throw error due to strict mode", () => {
      expect(() =>
        ArrayUtils.sort<{ id: number; name: any }>(
          [
            {
              id: 3,
              name: "JoHn",
            },
            {
              id: 1,
              name: 3,
            },
          ],
          "name",
          {
            reverse: false,
            ignoreCase: true,
            strict: true,
          }
        )
      ).toThrow(
        "Incompatibility with the values of key provider: first arg type=number and second arg type=string"
      );
    });
  });

  describe("Distinct", () => {
    it("should throw error", () => {
      expect(() => ArrayUtils.distinct<number>(null)).toThrow(
        "The array must be defined"
      );
      expect(() => ArrayUtils.distinct<number>(undefined)).toThrow(
        "The array must be defined"
      );
    });
    it("should distinct array items", () => {
      expect(ArrayUtils.distinct<number>([2, 3, 2, 5])).toEqual([2, 3, 5]);
    });
    it("should distinct empty array", () => {
      expect(ArrayUtils.distinct<number>([])).toEqual([]);
    });
    it("should distinct array items - string", () => {
      expect(ArrayUtils.distinct<string>(["2", "3", "2", "5"])).toEqual([
        "2",
        "3",
        "5",
      ]);
    });
    it("should distinct array items - object", () => {
      expect(
        ArrayUtils.distinct<{ id: number; name: string }>(
          [
            {
              id: 2,
              name: "joe",
            },
            {
              id: 1,
              name: "joe",
            },
            {
              id: 3,
              name: "john",
            },
          ],
          "name"
        )
      ).toEqual([
        {
          id: 2,
          name: "joe",
        },
        {
          id: 3,
          name: "john",
        },
      ]);
    });
  });
});
