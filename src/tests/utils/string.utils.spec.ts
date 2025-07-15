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

  describe("isNullOrEmpty", () => {
    it("should return true for null", () => {
      expect(StringUtils.isNullOrEmpty(null)).toBeTruthy();
    });
    it("should return true for undefined", () => {
      expect(StringUtils.isNullOrEmpty(undefined)).toBeTruthy();
    });
    it("should return true for empty string", () => {
      expect(StringUtils.isNullOrEmpty("")).toBeTruthy();
    });
    it("should return true for whitespace string", () => {
      expect(StringUtils.isNullOrEmpty("   ")).toBeTruthy();
    });
    it("should return false for non-empty string", () => {
      expect(StringUtils.isNullOrEmpty("Hello")).toBeFalsy();
    });
    it("should return false for non-empty string with whitespace", () => {
      expect(StringUtils.isNullOrEmpty("  Hello  ")).toBeFalsy();
    });
  });

  describe("isNotNullOrEmpty", () => {
    it("should return false for null", () => {
      expect(StringUtils.isNotNullOrEmpty(null)).toBeFalsy();
    });
    it("should return false for undefined", () => {
      expect(StringUtils.isNotNullOrEmpty(undefined)).toBeFalsy();
    });
    it("should return false for empty string", () => {
      expect(StringUtils.isNotNullOrEmpty("")).toBeFalsy();
    });
    it("should return false for whitespace string", () => {
      expect(StringUtils.isNotNullOrEmpty("   ")).toBeFalsy();
    });
    it("should return true for non-empty string", () => {
      expect(StringUtils.isNotNullOrEmpty("Hello")).toBeTruthy();
    });
    it("should return true for non-empty string with whitespace", () => {
      expect(StringUtils.isNotNullOrEmpty("  Hello  ")).toBeTruthy();
    });
  });

  describe("toUpperCaseFirst", () => {
    it("should capitalize first character", () => {
      expect(StringUtils.toUpperCaseFirst("hello")).toBe("Hello");
    });
    it("should not change already capitalized string", () => {
      expect(StringUtils.toUpperCaseFirst("HELLO")).toBe("HELLO");
    });
    it("should not change string starting with number", () => {
      expect(StringUtils.toUpperCaseFirst("1hello")).toBe("1hello");
    });
    it("should not change string starting with space", () => {
      expect(StringUtils.toUpperCaseFirst(" hello")).toBe(" hello");
    });
    it("should return empty string for empty input", () => {
      expect(StringUtils.toUpperCaseFirst("")).toBe("");
    });
    it("should return null for null input", () => {
      expect(StringUtils.toUpperCaseFirst(null)).toBeNull();
    });
  });

  describe("toLowerCaseFirst", () => {
    it("should lowercase first character", () => {
      expect(StringUtils.toLowerCaseFirst("Hello")).toBe("hello");
    });
    it("should not change already lowercase string", () => {
      expect(StringUtils.toLowerCaseFirst("hELLO")).toBe("hELLO");
    });
    it("should not change string starting with number", () => {
      expect(StringUtils.toLowerCaseFirst("1Hello")).toBe("1Hello");
    });
    it("should not change string starting with space", () => {
      expect(StringUtils.toLowerCaseFirst(" Hello")).toBe(" Hello");
    });
    it("should return empty string for empty input", () => {
      expect(StringUtils.toLowerCaseFirst("")).toBe("");
    });
    it("should return null for null input", () => {
      expect(StringUtils.toLowerCaseFirst(null)).toBeNull();
    });
  });

  describe("replaceAll", () => {
    it("should replace all occurrences of substring", () => {
      expect(StringUtils.replaceAll("hello world", "l", "L")).toBe(
        "heLLo worLd"
      );
    });
    it("should replace all occurrences of multiple characters", () => {
      expect(StringUtils.replaceAll("banana", "na", "NA")).toBe("baNANA");
    });
    it("should return unchanged string if no match", () => {
      expect(StringUtils.replaceAll("hello", "x", "y")).toBe("hello");
    });
    it("should return empty string for empty input", () => {
      expect(StringUtils.replaceAll("", "l", "L")).toBe("");
    });
    it("should return null for null input", () => {
      expect(StringUtils.replaceAll(null, "l", "L")).toBeNull();
    });
  });

  describe("capitalizeWords", () => {
    it("should capitalize each word", () => {
      expect(StringUtils.capitalizeWords("hello world")).toBe("Hello World");
    });
    it("should preserve existing case after first letter", () => {
      expect(StringUtils.capitalizeWords("hELLo wORLd")).toBe("HELLo WORLd");
    });
    it("should not change numbers in words", () => {
      expect(StringUtils.capitalizeWords("1hello 2world")).toBe(
        "1hello 2world"
      );
    });
    it("should preserve spaces", () => {
      expect(StringUtils.capitalizeWords("  hello  world  ")).toBe(
        "  Hello  World  "
      );
    });
    it("should return empty string for empty input", () => {
      expect(StringUtils.capitalizeWords("")).toBe("");
    });
    it("should return null for null input", () => {
      expect(StringUtils.capitalizeWords(null)).toBeNull();
    });
  });

  describe("toKebabCase", () => {
    it("should convert camelCase to kebab-case", () => {
      expect(StringUtils.toKebabCase("HelloWorld")).toBe("hello-world");
    });
    it("should convert lowerCamelCase to kebab-case", () => {
      expect(StringUtils.toKebabCase("helloWorld")).toBe("hello-world");
    });
    it("should convert spaces to kebab-case", () => {
      expect(StringUtils.toKebabCase("hello world")).toBe("hello-world");
    });
    it("should convert underscores to kebab-case", () => {
      expect(StringUtils.toKebabCase("hello_world")).toBe("hello-world");
    });
    it("should return empty string for empty input", () => {
      expect(StringUtils.toKebabCase("")).toBe("");
    });
    it("should return null for null input", () => {
      expect(StringUtils.toKebabCase(null)).toBeNull();
    });
  });

  describe("escapeHtml", () => {
    it("should escape HTML special characters", () => {
      expect(StringUtils.escapeHtml("<div>Hello</div>")).toBe(
        "&lt;div&gt;Hello&lt;/div&gt;"
      );
    });
    it("should escape ampersand", () => {
      expect(StringUtils.escapeHtml("a & b")).toBe("a &amp; b");
    });
    it("should escape quotes", () => {
      expect(StringUtils.escapeHtml('"test"')).toBe("&quot;test&quot;");
    });
    it("should return empty string for empty input", () => {
      expect(StringUtils.escapeHtml("")).toBe("");
    });
    it("should return null for null input", () => {
      expect(StringUtils.escapeHtml(null)).toBeNull();
    });
  });

  describe("reverse", () => {
    it("should reverse string", () => {
      expect(StringUtils.reverse("hello")).toBe("olleh");
    });
    it("should reverse numbers string", () => {
      expect(StringUtils.reverse("123")).toBe("321");
    });
    it("should reverse single character", () => {
      expect(StringUtils.reverse("a")).toBe("a");
    });
    it("should return empty string for empty input", () => {
      expect(StringUtils.reverse("")).toBe("");
    });
    it("should return null for null input", () => {
      expect(StringUtils.reverse(null)).toBeNull();
    });
  });

  describe("containsIgnoreCase", () => {
    it("should find substring case-insensitive", () => {
      expect(
        StringUtils.containsIgnoreCase("Hello World", "hello")
      ).toBeTruthy();
    });
    it("should find uppercase substring case-insensitive", () => {
      expect(
        StringUtils.containsIgnoreCase("Hello World", "WORLD")
      ).toBeTruthy();
    });
    it("should not find non-existing substring", () => {
      expect(StringUtils.containsIgnoreCase("Hello World", "foo")).toBeFalsy();
    });
    it("should return false for empty input", () => {
      expect(StringUtils.containsIgnoreCase("", "hello")).toBeFalsy();
    });
    it("should return false for null input", () => {
      expect(StringUtils.containsIgnoreCase(null, "hello")).toBeFalsy();
    });
  });

  describe("truncate", () => {
    it("should truncate string with ellipsis", () => {
      expect(StringUtils.truncate("Hello World", 5)).toBe("Hello...");
    });
    it("should not truncate if length is sufficient", () => {
      expect(StringUtils.truncate("Hello World", 20)).toBe("Hello World");
    });
    it("should use custom ellipsis", () => {
      expect(StringUtils.truncate("Hello World", 5, "~")).toBe("Hello~");
    });
    it("should return empty string for empty input", () => {
      expect(StringUtils.truncate("", 5)).toBe("");
    });
    it("should return null for null input", () => {
      expect(StringUtils.truncate(null, 5)).toBeNull();
    });
  });

  describe("splitBySeparator", () => {
    it("should split and trim by comma", () => {
      expect(StringUtils.splitBySeparator("a,b, c ,d", ",")).toEqual([
        "a",
        "b",
        "c",
        "d",
      ]);
    });
    it("should split and trim by semicolon", () => {
      expect(StringUtils.splitBySeparator("a; b; c", ";")).toEqual([
        "a",
        "b",
        "c",
      ]);
    });
    it("should split and trim by space", () => {
      expect(StringUtils.splitBySeparator("a b  c", " ")).toEqual([
        "a",
        "b",
        "c",
      ]);
    });
    it("should return empty array for empty input", () => {
      expect(StringUtils.splitBySeparator("", ",")).toEqual([]);
    });
    it("should return empty array for null input", () => {
      expect(StringUtils.splitBySeparator(null, ",")).toEqual([]);
    });
  });

  describe("toSnakeCase", () => {
    it("should convert camelCase to snake_case", () => {
      expect(StringUtils.toSnakeCase("helloWorld")).toBe("hello_world");
    });
    it("should convert PascalCase to snake_case", () => {
      expect(StringUtils.toSnakeCase("HelloWorld")).toBe("hello_world");
    });
    it("should convert spaces to snake_case", () => {
      expect(StringUtils.toSnakeCase("hello world")).toBe("hello_world");
    });
    it("should convert hyphens to snake_case", () => {
      expect(StringUtils.toSnakeCase("hello-world")).toBe("hello_world");
    });
    it("should return empty string for empty input", () => {
      expect(StringUtils.toSnakeCase("")).toBe("");
    });
    it("should return null for null input", () => {
      expect(StringUtils.toSnakeCase(null)).toBeNull();
    });
  });

  describe("toPascalCase", () => {
    it("should convert snake_case to PascalCase", () => {
      expect(StringUtils.toPascalCase("hello_world")).toBe("helloWorld");
    });
    it("should convert kebab-case to PascalCase", () => {
      expect(StringUtils.toPascalCase("hello-world")).toBe("helloWorld");
    });
    it("should convert spaces to PascalCase", () => {
      expect(StringUtils.toPascalCase("hello world")).toBe("helloWorld");
    });
    it("should convert camelCase to PascalCase", () => {
      expect(StringUtils.toPascalCase("helloWorld")).toBe("helloWorld");
    });
    it("should return empty string for empty input", () => {
      expect(StringUtils.toPascalCase("")).toBe("");
    });
    it("should return null for null input", () => {
      expect(StringUtils.toPascalCase(null)).toBeNull();
    });
  });

  describe("unescapeHtml", () => {
    it("should unescape HTML special characters", () => {
      expect(StringUtils.unescapeHtml("&lt;div&gt;Hello&lt;/div&gt;")).toBe(
        "<div>Hello</div>"
      );
    });
    it("should unescape ampersand", () => {
      expect(StringUtils.unescapeHtml("a &amp; b")).toBe("a & b");
    });
    it("should unescape quotes", () => {
      expect(StringUtils.unescapeHtml("&quot;test&quot;")).toBe('"test"');
    });
    it("should return empty string for empty input", () => {
      expect(StringUtils.unescapeHtml("")).toBe("");
    });
    it("should return null for null input", () => {
      expect(StringUtils.unescapeHtml(null)).toBeNull();
    });
  });

  describe("truncateAtWord", () => {
    it("should truncate at word boundary with ellipsis", () => {
      expect(StringUtils.truncateAtWord("Hello World", 7)).toBe("Hello...");
    });
    it("should not truncate if length is sufficient", () => {
      expect(StringUtils.truncateAtWord("Hello World", 20)).toBe("Hello World");
    });
    it("should return ellipsis for very short length", () => {
      expect(StringUtils.truncateAtWord("Hello World", 3)).toBe("Hel...");
    });
    it("should return empty string for empty input", () => {
      expect(StringUtils.truncateAtWord("", 5)).toBe("");
    });
    it("should return null for null input", () => {
      expect(StringUtils.truncateAtWord(null, 5)).toBeNull();
    });
  });

  describe("startsWith", () => {
    it("should return true for matching prefix", () => {
      expect(StringUtils.startsWith("Hello World", "Hello")).toBeTruthy();
    });
    it("should return false for case-sensitive mismatch", () => {
      expect(StringUtils.startsWith("Hello World", "hello")).toBeFalsy();
    });
    it("should return false for non-matching prefix", () => {
      expect(StringUtils.startsWith("Hello World", "World")).toBeFalsy();
    });
    it("should return false for empty input", () => {
      expect(StringUtils.startsWith("", "Hello")).toBeFalsy();
    });
    it("should return false for null input", () => {
      expect(StringUtils.startsWith(null, "Hello")).toBeFalsy();
    });
  });

  describe("endsWith", () => {
    it("should return true for matching suffix", () => {
      expect(StringUtils.endsWith("Hello World", "World")).toBeTruthy();
    });
    it("should return false for case-sensitive mismatch", () => {
      expect(StringUtils.endsWith("Hello World", "world")).toBeFalsy();
    });
    it("should return false for non-matching suffix", () => {
      expect(StringUtils.endsWith("Hello World", "Hello")).toBeFalsy();
    });
    it("should return false for empty input", () => {
      expect(StringUtils.endsWith("", "World")).toBeFalsy();
    });
    it("should return false for null input", () => {
      expect(StringUtils.endsWith(null, "World")).toBeFalsy();
    });
  });

  describe("wordCount", () => {
    it("should count words in string", () => {
      expect(StringUtils.wordCount("Hello World")).toBe(2);
    });
    it("should count words with extra spaces", () => {
      expect(StringUtils.wordCount("  Hello   World  ")).toBe(2);
    });
    it("should count single word", () => {
      expect(StringUtils.wordCount("Hello")).toBe(1);
    });
    it("should return 0 for empty input", () => {
      expect(StringUtils.wordCount("")).toBe(0);
    });
    it("should return 0 for null input", () => {
      expect(StringUtils.wordCount(null)).toBe(0);
    });
  });

  describe("removeWhitespace", () => {
    it("should remove all whitespace", () => {
      expect(StringUtils.removeWhitespace("Hello World")).toBe("HelloWorld");
    });
    it("should remove multiple spaces", () => {
      expect(StringUtils.removeWhitespace("  Hello  World  ")).toBe(
        "HelloWorld"
      );
    });
    it("should remove spaces between characters", () => {
      expect(StringUtils.removeWhitespace("H e l l o")).toBe("Hello");
    });
    it("should return empty string for empty input", () => {
      expect(StringUtils.removeWhitespace("")).toBe("");
    });
    it("should return null for null input", () => {
      expect(StringUtils.removeWhitespace(null)).toBeNull();
    });
  });

  describe("replaceFirst", () => {
    it("should replace first occurrence of substring", () => {
      expect(StringUtils.replaceFirst("hello hello", "ll", "LL")).toBe(
        "heLLo hello"
      );
    });
    it("should return unchanged string if no match", () => {
      expect(StringUtils.replaceFirst("hello", "x", "y")).toBe("hello");
    });
    it("should return empty string for empty input", () => {
      expect(StringUtils.replaceFirst("", "ll", "LL")).toBe("");
    });
    it("should return null for null input", () => {
      expect(StringUtils.replaceFirst(null, "ll", "LL")).toBeNull();
    });
  });

  describe("normalizeWhitespace", () => {
    it("should normalize multiple spaces", () => {
      expect(StringUtils.normalizeWhitespace("  Hello   World  ")).toBe(
        "Hello World"
      );
    });
    it("should normalize tabs", () => {
      expect(StringUtils.normalizeWhitespace("Hello\tWorld")).toBe(
        "Hello World"
      );
    });
    it("should normalize newlines", () => {
      expect(StringUtils.normalizeWhitespace("Hello\nWorld")).toBe(
        "Hello World"
      );
    });
    it("should return empty string for empty input", () => {
      expect(StringUtils.normalizeWhitespace("")).toBe("");
    });
    it("should return null for null input", () => {
      expect(StringUtils.normalizeWhitespace(null)).toBeNull();
    });
  });

  describe("indexOfIgnoreCase", () => {
    it("should find substring case-insensitive", () => {
      expect(StringUtils.indexOfIgnoreCase("Hello World", "world")).toBe(6);
    });
    it("should find uppercase substring case-insensitive", () => {
      expect(StringUtils.indexOfIgnoreCase("Hello World", "WORLD")).toBe(6);
    });
    it("should return -1 for non-existing substring", () => {
      expect(StringUtils.indexOfIgnoreCase("Hello World", "foo")).toBe(-1);
    });
    it("should return -1 for empty input", () => {
      expect(StringUtils.indexOfIgnoreCase("", "hello")).toBe(-1);
    });
    it("should return -1 for null input", () => {
      expect(StringUtils.indexOfIgnoreCase(null, "hello")).toBe(-1);
    });
  });
});
