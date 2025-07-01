import { ObjectUtils } from "../../lib";

describe("ObjectUtils", () => {
  it("should check if object is null of undefined", () => {
    expect(ObjectUtils.isNullOrUndefined(undefined)).toBeTruthy();
    expect(ObjectUtils.isNullOrUndefined(null)).toBeTruthy();
    expect(ObjectUtils.isNullOrUndefined({})).toBeFalsy();
  });

  it("should return default if null", () => {
    expect(ObjectUtils.getIfNull<string>(null, "no")).toEqual("no");
  });

  it("should return default if null", () => {
    expect(ObjectUtils.getIfNull<string>("yes", "no")).toEqual("yes");
  });

  describe("isEmpty", () => {
    it("should check if null or undefined is empty", () => {
      expect(ObjectUtils.isEmpty(undefined)).toBeTruthy();
      expect(ObjectUtils.isEmpty(undefined)).toBeTruthy();
    });
    it("should check if array is empty", () => {
      expect(ObjectUtils.isEmpty([])).toBeTruthy();
      expect(ObjectUtils.isEmpty([1])).toBeFalsy();
    });

    it("should check if string is empty", () => {
      expect(ObjectUtils.isEmpty("")).toBeTruthy();
      expect(ObjectUtils.isEmpty(" ")).toBeFalsy();
      expect(ObjectUtils.isEmpty("the apples")).toBeFalsy();
    });

    it("should check if function is empty", () => {
      expect(ObjectUtils.isEmpty(() => {})).toBeFalsy();
    });

    it("should check if something else is empty", () => {
      expect(ObjectUtils.isEmpty(1)).toBeFalsy();
      expect(ObjectUtils.isEmpty(true)).toBeFalsy();
    });
  });

  describe("appendDefined", () => {
    it("should append undefined child name to objet", () => {
      const obj = { weight: "apples" };
      expect(ObjectUtils.appendDefined(obj, undefined, "apples")).toBe(obj);
      expect(ObjectUtils.appendDefined(obj, null, "apples")).toBe(obj);
    });
    it("should append undefined child value to objet", () => {
      const obj = { weight: "apples" };
      expect(ObjectUtils.appendDefined(obj, "name", undefined)).toBe(obj);
    });

    it("should append child to undefined objet", () => {
      expect(
        ObjectUtils.appendDefined(undefined, "name", "apples"),
      ).toBeUndefined();
      expect(ObjectUtils.appendDefined(null, "name", "apples")).toBeUndefined();
    });

    it("should append undefined child to objet", () => {
      const obj = { weight: "apples" };
      expect(ObjectUtils.appendDefined(obj, undefined, "apples")).toBe(obj);
      expect(ObjectUtils.appendDefined(obj, null, "apples")).toBe(obj);
    });

    it("should append boolean child to objet", () => {
      const obj = { weight: "apples" };
      expect(ObjectUtils.appendDefined(obj, "circle", true)).toEqual({
        ...obj,
        circle: true,
      });
    });

    it("should append bigint child to objet", () => {
      const obj = { weight: "apples" };
      expect(
        ObjectUtils.appendDefined(obj, "area", 70980980980980980898008n),
      ).toEqual({ ...obj, area: 70980980980980980898008n });
    });

    it("should append number child to objet", () => {
      const obj = { weight: "apples" };
      expect(ObjectUtils.appendDefined(obj, "area", 9)).toEqual({
        ...obj,
        area: 9,
      });
    });

    /*it('should append function child to objet', () => {
            const obj = {weight: "apples"};
            expect(ObjectUtils.appendDefined(obj, "details", function () {
                return "The appels details.."
            })).toEqual({...obj, details:  function () {
                    return "The appels details.."
                }})
        });

        it('should append symbol child to objet', () => {
            const obj = {weight: "apples"};
            expect(ObjectUtils.appendDefined(obj, "sym", Symbol(7)).toEqual({...obj, details: ""}))
        });*/

    it("should append string child to objet", () => {
      const obj = { weight: "apples" };
      expect(ObjectUtils.appendDefined(obj, "desc", "fruit")).toEqual({
        ...obj,
        desc: "fruit",
      });
    });

    it("should append object child to objet", () => {
      const obj = { weight: "apples" };
      expect(
        ObjectUtils.appendDefined(obj, "category", { name: "fruit" }),
      ).toEqual({ ...obj, category: { name: "fruit" } });
    });
  });

  it("should check value is an object type", () => {
    expect(ObjectUtils.isObject(null)).toBeFalsy();
    expect(ObjectUtils.isObject(undefined)).toBeFalsy();
    expect(ObjectUtils.isObject(1)).toBeFalsy();
    expect(ObjectUtils.isObject(true)).toBeFalsy();
    expect(ObjectUtils.isObject([{ name: "apples" }])).toBeFalsy();
    expect(ObjectUtils.isObject("string")).toBeFalsy();
  });

  it("should check value is an object type", () => {
    expect(ObjectUtils.isObject({})).toBeTruthy();
    expect(ObjectUtils.isObject({ name: "apple" })).toBeTruthy();
    expect(ObjectUtils.isObject(new Object({ name: "apple" }))).toBeTruthy();
  });

  it("should check if value is not empty", () => {
    expect(ObjectUtils.isNotEmpty(null)).toBeFalsy();
    expect(ObjectUtils.isNotEmpty(undefined)).toBeFalsy();
  });

  it("should check if value is not empty", () => {
    expect(ObjectUtils.isNotEmpty(1)).toBeTruthy();
    expect(ObjectUtils.isNotEmpty(true)).toBeTruthy();
    expect(ObjectUtils.isNotEmpty([{ name: "apples" }])).toBeTruthy();
    expect(ObjectUtils.isNotEmpty("string")).toBeTruthy();
    expect(ObjectUtils.isNotEmpty({ name: "apple" })).toBeTruthy();
  });

  it("should compute the size of undefined value", () => {
    expect(ObjectUtils.size(undefined)).toEqual(0);
    expect(ObjectUtils.size(null)).toEqual(0);
  });

  it("should compute the size of value of type array", () => {
    expect(ObjectUtils.size([])).toEqual(0);
    expect(ObjectUtils.size([1, "name"])).toEqual(2);
  });

  it("should compute the size of value of type object", () => {
    expect(ObjectUtils.size({})).toEqual(0);
    expect(ObjectUtils.size({ name: "apples", weight: 89.78 })).toEqual(2);
  });

  it("should compute the size of value of type string", () => {
    expect(ObjectUtils.size("")).toEqual(0);
    expect(ObjectUtils.size("  ")).toEqual(2);
    expect(ObjectUtils.size("the apples")).toEqual(10);
  });

  it("should compute the size of boolean,bigint,number,etc", () => {
    expect(ObjectUtils.size(true)).toEqual(0);
    expect(ObjectUtils.size(2)).toEqual(0);
    expect(ObjectUtils.size(2n)).toEqual(0);
    expect(ObjectUtils.size(2.9)).toEqual(0);
    expect(ObjectUtils.size(() => {})).toEqual(0);
  });

  describe(" - Deep Equal", () => {
    it("all args should null", () => {
      expect(ObjectUtils.isDeepEqual(null, null)).toEqual(true);
    });
    it("all args should strictly equal", () => {
      const arg = "yes";
      expect(ObjectUtils.isDeepEqual(arg, arg)).toEqual(true);
    });
    it("args are arrays with different size", () => {
      const arg1 = ["yes"];
      const arg2 = ["yes", "no"];
      expect(ObjectUtils.isDeepEqual(arg1, arg2)).toEqual(false);
    });
    it("args are arrays with same size but different same content", () => {
      const arg1 = ["yes", "yes"];
      const arg2 = ["yes", "no"];
      expect(ObjectUtils.isDeepEqual(arg1, arg2)).toEqual(false);
    });
    it("args are arrays with same size and the same content", () => {
      const arg1 = ["yes", "no"];
      const arg2 = ["yes", "no"];
      expect(ObjectUtils.isDeepEqual(arg1, arg2)).toEqual(true);
    });
    it("arg 1 is object arg 2 is array", () => {
      const arg1 = { id: 2 };
      const arg2 = ["yes", "no"];
      expect(ObjectUtils.isDeepEqual(arg1, arg2)).toEqual(false);
    });
    it("args are objects with different content", () => {
      const arg1 = { id: 2 };
      const arg2 = { id: 1 };
      expect(ObjectUtils.isDeepEqual(arg1, arg2)).toEqual(false);
    });
    it("args are objects with different content (2)", () => {
      const arg1 = { id: 1, name: "kevin" };
      const arg2 = { id: 1, nam: "john" };
      expect(ObjectUtils.isDeepEqual(arg1, arg2)).toEqual(false);
    });
    it("args are objects with same content", () => {
      const arg1 = { id: 1, name: "kevin" };
      const arg2 = { id: 1, name: "kevin" };
      expect(ObjectUtils.isDeepEqual(arg1, arg2)).toEqual(true);
    });
  });
  describe("ObjectUtils - Deep Equal (with deep reference)", () => {
    // Basic tests
    it("should return true for null vs null", () => {
      expect(ObjectUtils.isDeepEqual(null, null)).toEqual(true);
    });

    it("should return true for identical primitives", () => {
      const arg = "yes";
      expect(ObjectUtils.isDeepEqual(arg, arg)).toEqual(true);
    });

    it("should return false for different primitives", () => {
      expect(ObjectUtils.isDeepEqual(1, "1")).toEqual(false);
    });

    // Array tests
    it("should return false for arrays with different lengths", () => {
      const arg1 = ["yes"];
      const arg2 = ["yes", "no"];
      expect(ObjectUtils.isDeepEqual(arg1, arg2)).toEqual(false);
    });

    it("should return false for arrays with same length but different content", () => {
      const arg1 = ["yes", "yes"];
      const arg2 = ["yes", "no"];
      expect(ObjectUtils.isDeepEqual(arg1, arg2)).toEqual(false);
    });

    it("should return true for identical arrays", () => {
      const arg1 = ["yes", "no"];
      const arg2 = ["yes", "no"];
      expect(ObjectUtils.isDeepEqual(arg1, arg2)).toEqual(true);
    });

    // Object tests
    it("should return false for object vs array", () => {
      const arg1 = { id: 2 };
      const arg2 = ["yes", "no"];
      expect(ObjectUtils.isDeepEqual(arg1, arg2)).toEqual(false);
    });

    it("should return false for objects with different values", () => {
      const arg1 = { id: 2 };
      const arg2 = { id: 1 };
      expect(ObjectUtils.isDeepEqual(arg1, arg2)).toEqual(false);
    });

    it("should return false for objects with different keys", () => {
      const arg1 = { id: 1, name: "kevin" };
      const arg2 = { id: 1, nam: "john" };
      expect(ObjectUtils.isDeepEqual(arg1, arg2)).toEqual(false);
    });

    it("should return true for identical objects", () => {
      const arg1 = { id: 1, name: "kevin" };
      const arg2 = { id: 1, name: "kevin" };
      expect(ObjectUtils.isDeepEqual(arg1, arg2)).toEqual(true);
    });

    // Special object tests
    it("should compare Date objects correctly", () => {
      const date1 = new Date(2020, 0, 1);
      const date2 = new Date(2020, 0, 1);
      const date3 = new Date(2021, 0, 1);
      expect(ObjectUtils.isDeepEqual(date1, date2)).toEqual(true);
      expect(ObjectUtils.isDeepEqual(date1, date3)).toEqual(false);
    });

    it("should compare RegExp objects correctly", () => {
      const regex1 = /test/i;
      const regex2 = /test/i;
      const regex3 = /test/;
      expect(ObjectUtils.isDeepEqual(regex1, regex2)).toEqual(true);
      expect(ObjectUtils.isDeepEqual(regex1, regex3)).toEqual(false);
    });

    it("should compare Map objects correctly", () => {
      const map1 = new Map([['key1', 'value1'], ['key2', 'value2']]);
      const map2 = new Map([['key1', 'value1'], ['key2', 'value2']]);
      const map3 = new Map([['key1', 'value1']]);
      expect(ObjectUtils.isDeepEqual(map1, map2)).toEqual(true);
      expect(ObjectUtils.isDeepEqual(map1, map3)).toEqual(false);
    });

    it("should compare Set objects correctly", () => {
      const set1 = new Set([1, 2, 3]);
      const set2 = new Set([1, 2, 3]);
      const set3 = new Set([1, 2]);
      expect(ObjectUtils.isDeepEqual(set1, set2)).toEqual(true);
      expect(ObjectUtils.isDeepEqual(set1, set3)).toEqual(false);
    });

    // Circular reference tests
    it("should handle circular references", () => {
      const obj1: any = { name: "circular" };
      obj1.self = obj1;

      const obj2: any = { name: "circular" };
      obj2.self = obj2;

      console.log({ obj1 , obj2 });

      expect(ObjectUtils.isDeepEqual(obj1, obj2)).toEqual(true);
    });

    it("should detect different circular structures", () => {
      const obj1: any = { name: "circle1" };
      obj1.self = obj1;

      const obj2: any = { name: "circle2" };
      obj2.self = obj2;

      expect(ObjectUtils.isDeepEqual(obj1, obj2)).toEqual(false);
    });

    // Function tests
    it("should compare functions by their string representation", () => {
      const fn1 = () => console.log("test");
      const fn2 = () => console.log("test");
      const fn3 = () => console.log("different");
      expect(ObjectUtils.isDeepEqual(fn1, fn2)).toEqual(true);
      expect(ObjectUtils.isDeepEqual(fn1, fn3)).toEqual(false);
    });

    // Symbol tests
    it("should handle symbol properties", () => {
      const sym = Symbol('test');
      const obj1 = { [sym]: "value" };
      const obj2 = { [sym]: "value" };
      const obj3 = { [Symbol('test')]: "value" }; // Different symbol instance
      expect(ObjectUtils.isDeepEqual(obj1, obj2)).toEqual(true);
      expect(ObjectUtils.isDeepEqual(obj1, obj3)).toEqual(false);
    });

    // Prototype tests
    it("should consider prototype chains", () => {
      class TestClass {}
      const obj1 = new TestClass();
      const obj2 = new TestClass();
      const obj3 = {};
      expect(ObjectUtils.isDeepEqual(obj1, obj2)).toEqual(true);
      expect(ObjectUtils.isDeepEqual(obj1, obj3)).toEqual(false);
    });

    // Mixed structure tests
    it("should compare complex nested structures", () => {
      const obj1 = {
        name: "test",
        items: [1, 2, { key: "value" }],
        date: new Date(2020, 0, 1),
        map: new Map([['key', 'value']])
      };

      const obj2 = {
        name: "test",
        items: [1, 2, { key: "value" }],
        date: new Date(2020, 0, 1),
        map: new Map([['key', 'value']])
      };

      const obj3 = {
        name: "test",
        items: [1, 2, { key: "different" }],
        date: new Date(2020, 0, 1),
        map: new Map([['key', 'value']])
      };

      expect(ObjectUtils.isDeepEqual(obj1, obj2)).toEqual(true);
      expect(ObjectUtils.isDeepEqual(obj1, obj3)).toEqual(false);
    });
  });

  // isNil(..)

  it("should void function", () => {
    expect(ObjectUtils.isNil(void 0)).toEqual(true);
  });

  it("should void function", () => {
    expect(ObjectUtils.isNil(2)).toEqual(false);
  });

  describe('isPlainObject', () => {
    it('returns true for plain objects', () => {
      expect(ObjectUtils.isPlainObject({})).toBe(true);
    });

    it('returns false for arrays', () => {
      expect(ObjectUtils.isPlainObject([])).toBe(false);
    });

    it('returns false for null', () => {
      expect(ObjectUtils.isPlainObject(null)).toBe(false);
    });
  });

  describe('deepClone', () => {
    it('clones objects deeply', () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = ObjectUtils.deepClone(original);
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
    });

    it('handles circular references', () => {
      const obj: any = { a: 1 };
      obj.self = obj;
      const cloned = ObjectUtils.deepClone(obj);
      expect(cloned.self).toBe(cloned);
    });

    it('clones primitive values', () => {
      expect(ObjectUtils.deepClone(42)).toBe(42);
      expect(ObjectUtils.deepClone('test')).toBe('test');
      expect(ObjectUtils.deepClone(null)).toBe(null);
    });

    it('clones Date objects', () => {
      const date = new Date();
      const cloned = ObjectUtils.deepClone(date);
      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
    });

    it('should clone Date objects', () => {
      const date = new Date();
      const cloned = ObjectUtils.deepClone(date);
      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
    });

    it('should clone RegExp objects', () => {
      const regex = /test/i;
      const cloned = ObjectUtils.deepClone(regex);
      expect(cloned.toString()).toBe(regex.toString());
      expect(cloned).not.toBe(regex);
    });

    it('should clone primitive values', () => {
      expect(ObjectUtils.deepClone(123)).toBe(123);
      expect(ObjectUtils.deepClone('test')).toBe('test');
    });

    it('clones nested objects', () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = ObjectUtils.deepClone(original);
      expect(cloned).toEqual(original);
      expect(cloned.b).not.toBe(original.b);
    });

    it('handles arrays', () => {
      const arr = [1, { a: 2 }];
      const cloned = ObjectUtils.deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned[1]).not.toBe(arr[1]);
    });

    it('merges shallow properties', () => {
      const result = ObjectUtils.mergeDeep(
          { a: 1 },
          { b: 2 }
      );
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('deep merges nested objects', () => {
      const result = ObjectUtils.mergeDeep(
          { a: 1, b: { c: 2 } },
          { b: { d: 3 }, e: 4 }
      );
      expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 });
    });

    it('overwrites primitive values', () => {
      const result = ObjectUtils.mergeDeep(
          { a: 1, b: 'original' },
          { b: 'new', c: 3 }
      );
      expect(result).toEqual({ a: 1, b: 'new', c: 3 });
    });

    it('handles null/undefined values', () => {
      const result = ObjectUtils.mergeDeep(
          { a: 1, b: null },
          { b: undefined, c: 3 }
      );
      expect(result).toEqual({ a: 1, b: null, c: 3 });
    });
  });

  describe('pick', () => {
    it('returns object with picked properties', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(ObjectUtils.pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('returns empty object for no keys', () => {
      expect(ObjectUtils.pick({ a: 1 }, [])).toEqual({});
    });
  });


  describe('getPropertyByPath', () => {
    const testObj = {
      a: {
        b: {
          c: 123,
          arr: [{ id: 1 }, { id: 2 }]
        }
      }
    };

    it('should return nested value', () => {
      expect(ObjectUtils.getPropertyByPath(testObj, 'a.b.c')).toBe(123);
    });

    it('should return undefined for invalid path', () => {
      expect(ObjectUtils.getPropertyByPath(testObj, 'a.x.y')).toBeUndefined();
    });

    it('should handle array indices', () => {
      expect(ObjectUtils.getPropertyByPath(testObj, 'a.b.arr.0.id')).toBe(1);
    });
  });
  describe('omit', () => {
    const testObj = { a: 1, b: 2, c: 3 };

    it('should exclude specified keys', () => {
      expect(ObjectUtils.omit(testObj, ['b'])).toEqual({ a: 1, c: 3 });
    });

    it('should return original object when no keys specified', () => {
      expect(ObjectUtils.omit(testObj, [])).toEqual(testObj);
    });

    it('should handle non-existent keys', () => {
      expect(ObjectUtils.omit(testObj, ['x' as keyof typeof testObj])).toEqual(testObj);
    });
  });
  describe('tryParseJSON', () => {
    it('should parse valid JSON', () => {
      expect(ObjectUtils.tryParseJSON('{"a":1}')).toEqual({ a: 1 });
    });

    it('should return string for invalid JSON', () => {
      expect(ObjectUtils.tryParseJSON('invalid')).toBe('invalid');
    });

    it('should handle empty string', () => {
      expect(ObjectUtils.tryParseJSON('')).toBe('');
    });
  });
  describe('isPrimitive', () => {
    it('should return true for primitives', () => {
      expect(ObjectUtils.isPrimitive(123)).toBe(true);
      expect(ObjectUtils.isPrimitive('test')).toBe(true);
      expect(ObjectUtils.isPrimitive(true)).toBe(true);
      expect(ObjectUtils.isPrimitive(null)).toBe(true);
    });

    it('should return false for objects', () => {
      expect(ObjectUtils.isPrimitive({})).toBe(false);
      expect(ObjectUtils.isPrimitive([])).toBe(false);
      expect(ObjectUtils.isPrimitive(() => {})).toBe(false);
    });
  });

  describe('ObjectUtils Advanced Functions', () => {
    describe('mapValues', () => {
      it('transforms object values', () => {
        const result = ObjectUtils.mapValues(
            { a: 1, b: 2 },
            (v) => v * 2
        );
        expect(result).toEqual({ a: 2, b: 4 });
      });

      it('preserves keys', () => {
        const result = ObjectUtils.mapValues(
            { a: 1, b: 2 },
            (_, k) => k
        );
        expect(result).toEqual({ a: 'a', b: 'b' });
      });
    });

    describe('filterValues', () => {
      it('filters object properties', () => {
        const result = ObjectUtils.filterValues(
            { a: 1, b: 2, c: 3 },
            (v) => v > 1
        );
        expect(result).toEqual({ b: 2, c: 3 });
      });
    });

    describe('shallowEqual', () => {
      it('compares primitives', () => {
        expect(ObjectUtils.shallowEqual(1, 1)).toBe(true);
        expect(ObjectUtils.shallowEqual(1, '1')).toBe(false);
      });

      it('compares object references', () => {
        const obj = {};
        expect(ObjectUtils.shallowEqual(obj, obj)).toBe(true);
        expect(ObjectUtils.shallowEqual(obj, obj, true)).toBe(true);
        expect(ObjectUtils.shallowEqual({a:2}, {})).toBe(false);
        expect(ObjectUtils.shallowEqual({a:2}, {a:2})).toBe(true);
      });
    });

    describe('diffObjects', () => {
      it('returns differing properties', () => {
        const diff = ObjectUtils.diffObjects(
            { a: 1, b: 2 },
            { a: 1, b: 3 }
        );
        expect(diff).toEqual({ b: 3 });
      });
    });

    describe('createImmutableProxy', () => {
      it('prevents modifications', () => {
        const immutable = ObjectUtils.createImmutableProxy({ a: 1 });
        expect(() => { immutable.a = 2 }).toThrow();
      });
      it('prevents delections', () => {
        const immutable = ObjectUtils.createImmutableProxy({ a: 1 });
        expect(() => { delete immutable.a }).toThrow();
      });

      it('protects nested objects', () => {
        const immutable = ObjectUtils.createImmutableProxy({ a: { b: 1 } });
        expect(() => { immutable.a.b = 2 }).toThrow();
      });
    });

    describe('flattenObject', () => {
      it('flattens nested structures', () => {
        const result = ObjectUtils.flattenObject({
          a: 1,
          b: { c: 2, d: { e: 3 } }
        });
        expect(result).toEqual({
          'a': 1,
          'b.c': 2,
          'b.d.e': 3
        });
      });
    });
  });
});
