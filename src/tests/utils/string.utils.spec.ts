import { StringUtils } from "../../lib";

describe("StringUtils", () => {
  describe("isEmpty", () => {
    it("should check empty string [OK]", () => {
      expect(StringUtils.isEmpty("TRUE")).toBeFalsy();
    });
    it("should check empty string [KO: null]", () => {
      expect(StringUtils.isEmpty(null)).toBeTruthy();
    });
    it("should check empty string [KO: undefined]", () => {
      expect(StringUtils.isEmpty(undefined)).toBeTruthy();
    });
    it("should check empty string [KO: blank]", () => {
      expect(StringUtils.isEmpty("")).toBeTruthy();
      expect(StringUtils.isEmpty(" ")).toBeTruthy();
    });
  });

  describe("xPAD", () => {
    it("should pad string in the right side", () => {
      expect(StringUtils.rightPad(null)).toEqual(null);
      expect(StringUtils.rightPad("1", "0", 3)).toEqual("100");
      expect(StringUtils.rightPad(null, "0", 3)).toEqual("000");
      expect(StringUtils.rightPad(undefined, "0", 3)).toEqual("000");
      expect(StringUtils.rightPad("", "0", 3)).toEqual("000");
      expect(StringUtils.rightPad("3001", "0", 3)).toEqual("3001");
    });
    it("should pad string in the left side", () => {
      expect(StringUtils.leftPad(null)).toEqual(null);
      expect(StringUtils.leftPad("1", "0", 3)).toEqual("001");
      expect(StringUtils.leftPad("81", "0", 3)).toEqual("081");
      expect(StringUtils.leftPad("27981", "0", 3)).toEqual("27981");
    });

    it("should pad string in the left size: null string provided against repeat > 0", () => {
      expect(StringUtils.leftPad(null, "0", 3)).toEqual("000");
    });

    it("should pad string in the left size: undefined string provided against repeat > 0", () => {
      expect(StringUtils.leftPad(undefined, "0", 3)).toEqual("000");
    });

    it("should pad string in the left size: empty string provided against repeat > 0", () => {
      expect(StringUtils.leftPad("", "0", 3)).toEqual("000");
    });
  });

  describe("startsWithAny", () => {
    it("should verify if string start by any of", () => {
      expect(StringUtils.startsWithAny(null)).toBeFalsy();
      expect(StringUtils.startsWithAny(null, "kev")).toBeFalsy();
      expect(StringUtils.startsWithAny("")).toBeFalsy();
      expect(StringUtils.startsWithAny("the apple")).toBeFalsy();
    });
    it("should verify if string start by any of", () => {
      expect(StringUtils.startsWithAny("the apple", "an")).toBeFalsy();
      expect(StringUtils.startsWithAny("the apple", "the", "an")).toBeTruthy();
    });
  });

  describe("trimRight", () => {
    it("should trim undefined in the rigth side", () => {
      expect(StringUtils.trimRight(null)).toEqual(null);
      expect(StringUtils.trimRight(undefined)).toEqual(undefined);
    });
    it("should trim space string in the rigth side: no chars specified", () => {
      expect(StringUtils.trimRight(" the apple ")).toEqual(" the apple");
      expect(StringUtils.trimRight("    the apple    ")).toEqual(
        "    the apple"
      );
      expect(StringUtils.trimRight("    the apple  \n" + "  ")).toEqual(
        "    the apple"
      );
    });
    it("should trim char string in the rigth side: chars specified", () => {
      expect(StringUtils.trimRight("aa the apple a", "a")).toEqual(
        "aa the apple "
      );
      expect(StringUtils.trimRight("aaa the appleaaaa", "a")).toEqual(
        "aaa the apple"
      );
      expect(StringUtils.trimRight("    the apple  aaaa", "a")).toEqual(
        "    the apple  "
      );
    });
  });

  describe("trimLeft", () => {
    it("should trim undefined in the left side", () => {
      expect(StringUtils.trimLeft(null)).toEqual(null);
      expect(StringUtils.trimLeft(undefined)).toEqual(undefined);
    });
    it("should trim space string in the left side: no chars specified", () => {
      expect(StringUtils.trimLeft(" the apple ")).toEqual("the apple ");
      expect(StringUtils.trimLeft("    the apple    ")).toEqual(
        "the apple    "
      );
      expect(StringUtils.trimLeft("  " + " \n\t  the apple  ")).toEqual(
        "the apple  "
      );
    });
    it("should trim char string in the left side: chars specified", () => {
      expect(StringUtils.trimLeft("aa the apple a", "a")).toEqual(
        " the apple a"
      );
      expect(StringUtils.trimLeft("aaathe apple a", "a")).toEqual(
        "the apple a"
      );
      expect(StringUtils.trimLeft("aaaa    the apple", "a")).toEqual(
        "    the apple"
      );
    });
  });

  describe("trim", () => {
    it("should trim undefined string", () => {
      expect(StringUtils.trim(null)).toEqual(null);
      expect(StringUtils.trim(undefined)).toEqual(undefined);
    });
    it("should trim string: default (space)", () => {
      expect(StringUtils.trim("  . true .  ")).toEqual(". true .");
      expect(StringUtils.trim("  \n \t . true . \n \t   ")).toEqual(". true .");
    });
    it("should trim string: char specified", () => {
      expect(StringUtils.trim("000true", "0")).toEqual("true");
      expect(StringUtils.trim("000 true", "0")).toEqual(" true");
      expect(StringUtils.trim("000true0000", "0")).toEqual("true");
    });
  });

  it("should concat strings", () => {
    expect(StringUtils.concat("the", " ", "green ", "apple")).toEqual(
      "the green apple"
    );
  });

  describe("Concat many strings", () => {
    it.each`
      str1         | str2         | mores                               | expected
      ${null}      | ${null}      | ${[]}                               | ${""}
      ${null}      | ${undefined} | ${[]}                               | ${""}
      ${undefined} | ${undefined} | ${[]}                               | ${""}
      ${null}      | ${"I"}       | ${[" ", "am"]}                      | ${"I am"}
      ${undefined} | ${"I"}       | ${[" ", "am", ", You", " ", "are"]} | ${"I am, You are"}
      ${"I AM"}    | ${", "}      | ${["YOU ARE", ", ", "HE/SHE IS"]}   | ${"I AM, YOU ARE, HE/SHE IS"}
    `(
      "concat $str1 with $str2 and $mores should expected $expected",
      ({ str1, str2, mores, expected }) => {
        expect(StringUtils.concat(str1, str2, ...mores)).toEqual(expected);
      }
    );
    it.each([
      [null, null, ""],
      [null, undefined, ""],
      [undefined, undefined, ""],
      [null, "I", " ", "am", "I am"],
      [undefined, "I", " ", "am", ", You", " ", "are", "I am, You are"],
      ["I AM", ", ", "YOU ARE", ", ", "HE/SHE IS", "I AM, YOU ARE, HE/SHE IS"],
    ])("Concatenating %o", (str1: string, str2: string, ...args: string[]) => {
      const mores = args.splice(0, args.length - 1);
      const expected = args.at(0);
      expect(StringUtils.concat(str1, str2, ...mores)).toEqual(expected);
    });
  });

  it("should capitalized string", () => {
    expect(StringUtils.capitalisedFirst("the apples")).toEqual("The apples");
    expect(StringUtils.capitalisedFirst("  a")).toEqual("A");
    expect(StringUtils.capitalisedFirst(" A")).toEqual("A");
    expect(StringUtils.capitalisedFirst("Ab")).toEqual("Ab");
    expect(StringUtils.capitalisedFirst(null)).toEqual(null);
  });

  describe("stringify", () => {
    it("should stringify undefined value", () => {
      expect(StringUtils.stringify(undefined)).toEqual(null);
      expect(StringUtils.stringify(null)).toEqual(null);
    });
    it("should stringify an integer value", () => {
      expect(StringUtils.stringify(12)).toEqual("12");
      expect(StringUtils.stringify(-12)).toEqual("-12");
    });
    it("should stringify a bigint value", () => {
      expect(StringUtils.stringify(9789707070709707708n)).toEqual(
        "9789707070709707708"
      );
    });
    it("should stringify a float value", () => {
      expect(StringUtils.stringify(8767.9987)).toEqual("8767.9987");
    });
    it("should stringify a string value", () => {
      expect(StringUtils.stringify("the apples")).toEqual("the apples");
    });
    it("should stringify a boolean value", () => {
      expect(StringUtils.stringify(true)).toEqual("true");
    });
    it("should stringify a object value", () => {
      expect(StringUtils.stringify({ name: "apple", weight: 67 })).toEqual(
        '{"name":"apple","weight":67}'
      );
    });
    it("should stringify a function value", () => {
      expect(StringUtils.stringify(() => 1)).toEqual(undefined);
    });
  });

  describe("Size", () => {
    it("should calculate size of string", () => {
      expect(StringUtils.size("Hello")).toEqual(5);
      expect(StringUtils.size("Hello ")).toEqual(6);
    });
    it("should calculate size of empty string", () => {
      expect(StringUtils.size("")).toEqual(0);
    });
    it("should calculate size of blank string", () => {
      expect(StringUtils.size(" ")).toEqual(1);
    });
    it("should calculate size of null string", () => {
      expect(StringUtils.size(null)).toEqual(0);
    });
    it("should calculate size of undefined string", () => {
      expect(StringUtils.size(undefined)).toEqual(0);
    });
  });

  describe("To LowerCase", () => {
    it("should convert empty string to lower case", () => {
      expect(StringUtils.lowerCase("")).toEqual("");
      expect(StringUtils.lowerCase(null)).toEqual(null);
      expect(StringUtils.lowerCase(undefined)).toEqual(undefined);
    });

    it("should convert string to lower case", () => {
      expect(StringUtils.lowerCase("AbCa23")).toEqual("abca23");
    });
  });

  describe("To UpperCase", () => {
    it("should convert empty string to upper case", () => {
      expect(StringUtils.upperCase("")).toEqual("");
      expect(StringUtils.upperCase(null)).toEqual(null);
      expect(StringUtils.upperCase(undefined)).toEqual(undefined);
    });

    it("should convert string to upper case", () => {
      expect(StringUtils.upperCase("AbCa 23")).toEqual("ABCA 23");
    });
  });

  describe("is All Lowercase", () => {
    it("should check if empty string is all lower case", () => {
      expect(StringUtils.isAllLowerCase("")).toBeTruthy();
      expect(StringUtils.isAllLowerCase(null)).toBeTruthy();
      expect(StringUtils.isAllLowerCase(undefined)).toBeTruthy();
    });

    it("should check if string is not totally lower", () => {
      expect(StringUtils.isAllLowerCase("abcZ")).toBeFalsy();
      expect(StringUtils.isAllLowerCase("987987Za")).toBeFalsy();
    });

    it("should check if string is totally lower", () => {
      expect(StringUtils.isAllLowerCase("abc")).toBeTruthy();
      expect(StringUtils.isAllLowerCase("987987za")).toBeTruthy();
    });
  });

  describe("is All Alphabetic Lowercase", () => {
    it("should check if empty string is all alphabetic lower case", () => {
      expect(StringUtils.isAllAlphabeticLowerCase("")).toBeTruthy();
      expect(StringUtils.isAllAlphabeticLowerCase(null)).toBeTruthy();
      expect(StringUtils.isAllAlphabeticLowerCase(undefined)).toBeTruthy();
    });

    it("should check if string is not totally alphabetic lower", () => {
      expect(StringUtils.isAllAlphabeticLowerCase("abcZ")).toBeFalsy();
      expect(StringUtils.isAllAlphabeticLowerCase("abc1")).toBeFalsy();
      expect(StringUtils.isAllAlphabeticLowerCase("abc efg")).toBeFalsy();
    });

    it("should check if string is totally alphabetic lower", () => {
      expect(StringUtils.isAllAlphabeticLowerCase("abc")).toBeTruthy();
      expect(StringUtils.isAllAlphabeticLowerCase("987987za")).toBeFalsy();
    });
  });

  describe("is All Alphabetic Uppercase", () => {
    it("should check if empty string is all alphabetic upper case", () => {
      expect(StringUtils.isAllAlphabeticUpperCase("")).toBeTruthy();
      expect(StringUtils.isAllAlphabeticUpperCase(null)).toBeTruthy();
      expect(StringUtils.isAllAlphabeticUpperCase(undefined)).toBeTruthy();
    });

    it("should check if string is not totally alphabetic upper", () => {
      expect(StringUtils.isAllAlphabeticUpperCase("ABCz")).toBeFalsy();
      expect(StringUtils.isAllAlphabeticUpperCase("ABC1")).toBeFalsy();
      expect(StringUtils.isAllAlphabeticUpperCase("ABC EFG")).toBeFalsy();
    });

    it("should check if string is totally alphabetic upper", () => {
      expect(StringUtils.isAllAlphabeticUpperCase("ABC")).toBeTruthy();
      expect(StringUtils.isAllAlphabeticUpperCase("987987ZA")).toBeFalsy();
    });
  });
});
