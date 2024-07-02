import { ArrayUtils } from '../../src';

describe('Tests array utilities', () => {
  describe('Collection of type Set should be converted as a linear array', () => {
    it('when everything is good', () => {
      const set = new Set<number>([1, 2, 3, 4, 5, 5, 8, 1, 4]);
      const array = ArrayUtils.setToArray(set);
      expect(array).toEqual([1, 2, 3, 4, 5, 8]);
    });

    it('when collection if null or undefined', () => {
      expect(ArrayUtils.setToArray(null)).toEqual([]);
      expect(ArrayUtils.setToArray(undefined)).toEqual([]);
    });
  });

  describe('The array provided should be grouped by the specified key', () => {
    it('when OK', () => {
      const providedArray = [
        {
          name: 'John',
          role: 'C',
          key: 23,
        },
        {
          name: 'Joe',
          role: 'C',
          key: 7,
        },
        {
          name: 'Nathan',
          role: 'A',
          key: 20,
        },
        {
          name: 'Jone',
          role: 'AC',
          key: 40,
        },
        {
          name: 'Nathan',
          role: 'A',
          key: 10,
        },
      ];

      expect(ArrayUtils.groupBy(providedArray, 'role')).toEqual({
        C: [
          { name: 'John', role: 'C', key: 23 },
          { name: 'Joe', role: 'C', key: 7 },
        ],
        A: [
          { name: 'Nathan', role: 'A', key: 20 },
          { name: 'Nathan', role: 'A', key: 10 },
        ],
        AC: [{ name: 'Jone', role: 'AC', key: 40 }],
      });
    });

    it('when array is null of undefined', () => {
      expect(ArrayUtils.groupBy(null, 'key')).toEqual({});
      expect(ArrayUtils.groupBy(undefined, 'key')).toEqual({});
    });

    it('when key is null of undefined', () => {
      expect(ArrayUtils.groupBy([{ name: 'u' }], null)).toEqual({});
      expect(ArrayUtils.groupBy([{ name: 'i' }], undefined)).toEqual({});
    });
  });

  describe('should convert a any object to an array', function() {
    it("when 'any' is null or undefined", function() {
      expect(ArrayUtils.anyToArray(null)).toEqual([]);
      expect(ArrayUtils.anyToArray(undefined)).toEqual([]);
    });
    it("when 'any' is instanceOf by not array", function() {
      expect(ArrayUtils.anyToArray('one')).toEqual(['one']);
    });
    it("when 'any' is object", function() {
      expect(ArrayUtils.anyToArray({ name: 'James', born: 1234 })).toEqual([
        'James',
        1234,
      ]);
    });
  });
});
