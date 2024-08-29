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
      ).toEqual({ ...obj, area: 7.098098098098098e22 });
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

  // isNil(..)

  it("should void function", () => {
    expect(ObjectUtils.isNil(void 0)).toEqual(true);
  });

  it("should void function", () => {
    expect(ObjectUtils.isNil(2)).toEqual(false);
  });
});
