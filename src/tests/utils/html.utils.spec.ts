import { HtmlUtils } from "../../lib/utils/html.utils";

describe("HtmlUtils", () => {
  describe("escapeHtml", () => {
    it("should escape HTML special characters [OK]", () => {
      expect(HtmlUtils.escapeHtml("<div>Hello & World</div>")).toBe(
        "&lt;div&gt;Hello &amp; World&lt;/div&gt;"
      );
      expect(HtmlUtils.escapeHtml("a & b")).toBe("a &amp; b");
    });
    it("should handle null/undefined [KO]", () => {
      expect(HtmlUtils.escapeHtml(null)).toBeNull();
      expect(HtmlUtils.escapeHtml(undefined)).toBeNull();
    });
  });

  describe("unescapeHtml", () => {
    it("should unescape HTML special characters [OK]", () => {
      expect(
        HtmlUtils.unescapeHtml("&lt;div&gt;Hello &amp; World&lt;/div&gt;")
      ).toBe("<div>Hello & World</div>");
      expect(HtmlUtils.unescapeHtml("a &amp; b")).toBe("a & b");
    });
    it("should handle null/undefined [KO]", () => {
      expect(HtmlUtils.unescapeHtml(null)).toBeNull();
      expect(HtmlUtils.unescapeHtml(undefined)).toBeNull();
    });
  });

  describe("stripHtmlTags", () => {
    it("should remove all HTML tags [OK]", () => {
      expect(HtmlUtils.stripHtmlTags("<p>Hello <b>World</b></p>")).toBe(
        "Hello World"
      );
      expect(HtmlUtils.stripHtmlTags("<div>Test</div>")).toBe("Test");
    });
    it("should handle null/undefined [KO]", () => {
      expect(HtmlUtils.stripHtmlTags(null)).toBeNull();
      expect(HtmlUtils.stripHtmlTags(undefined)).toBeNull();
    });
  });

  describe("sanitizeHtml", () => {
    it("should remove dangerous tags and attributes [OK]", () => {
      expect(
        HtmlUtils.sanitizeHtml("<p>Hello <script>alert('xss')</script></p>")
      ).toBe("<p>Hello </p>");
      expect(
        HtmlUtils.sanitizeHtml("<div onclick='malicious()'>Test</div>")
      ).toBe("<div >Test</div>");
    });
    it("should handle null/undefined [KO]", () => {
      expect(HtmlUtils.sanitizeHtml(null)).toBeNull();
      expect(HtmlUtils.sanitizeHtml(undefined)).toBeNull();
    });
  });

  describe("encodeHtmlEntities", () => {
    it("should encode extended HTML entities [OK]", () => {
      expect(HtmlUtils.encodeHtmlEntities("© 2023")).toBe("&copy; 2023");
      expect(HtmlUtils.encodeHtmlEntities("a & b")).toBe("a &amp; b");
    });
    it("should handle null/undefined [KO]", () => {
      expect(HtmlUtils.encodeHtmlEntities(null)).toBeNull();
      expect(HtmlUtils.encodeHtmlEntities(undefined)).toBeNull();
    });
  });

  describe("decodeHtmlEntities", () => {
    it("should decode extended HTML entities [OK]", () => {
      expect(HtmlUtils.decodeHtmlEntities("&copy; 2023")).toBe("© 2023");
      expect(HtmlUtils.decodeHtmlEntities("a &amp; b")).toBe("a & b");
    });
    it("should handle null/undefined [KO]", () => {
      expect(HtmlUtils.decodeHtmlEntities(null)).toBeNull();
      expect(HtmlUtils.decodeHtmlEntities(undefined)).toBeNull();
    });
  });

  xdescribe("isValidHtml", () => {
    it("should validate HTML structure [OK]", () => {
      expect(HtmlUtils.isValidHtml("<p>Hello</p>")).toBe(true);
      expect(HtmlUtils.isValidHtml("<p>Hello</div>")).toBe(false);
    });
    it("should handle null/undefined [KO]", () => {
      expect(HtmlUtils.isValidHtml(null)).toBe(false);
      expect(HtmlUtils.isValidHtml(undefined)).toBe(false);
    });
  });

  xdescribe("extractTextFromHtml", () => {
    it("should extract plain text from HTML [OK]", () => {
      expect(HtmlUtils.extractTextFromHtml("<p>Hello <b>World</b></p>")).toBe(
        "Hello World"
      );
      expect(HtmlUtils.extractTextFromHtml("<div>Test</div>")).toBe("Test");
    });
    it("should handle null/undefined [KO]", () => {
      expect(HtmlUtils.extractTextFromHtml(null)).toBeNull();
      expect(HtmlUtils.extractTextFromHtml(undefined)).toBeNull();
    });
  });

  describe("replaceHtmlTag", () => {
    it("should replace HTML tags [OK]", () => {
      expect(HtmlUtils.replaceHtmlTag("<b>Hello</b>", "b", "strong")).toBe(
        "<strong>Hello</strong>"
      );
      expect(HtmlUtils.replaceHtmlTag("<p>Test</p>", "p", "div")).toBe(
        "<div>Test</div>"
      );
    });
    it("should handle null/undefined [KO]", () => {
      expect(HtmlUtils.replaceHtmlTag(null, "p", "div")).toBeNull();
      expect(HtmlUtils.replaceHtmlTag(undefined, "p", "div")).toBeNull();
    });
  });

  describe("getHtmlTagContent", () => {
    it("should extract content from HTML tag [OK]", () => {
      expect(HtmlUtils.getHtmlTagContent("<p>Hello World</p>", "p")).toBe(
        "Hello World"
      );
      expect(HtmlUtils.getHtmlTagContent("<div>Test</div>", "div")).toBe(
        "Test"
      );
    });
    it("should handle null/undefined or missing tag [KO]", () => {
      expect(HtmlUtils.getHtmlTagContent(null, "p")).toBeNull();
      expect(HtmlUtils.getHtmlTagContent(undefined, "p")).toBeNull();
      expect(HtmlUtils.getHtmlTagContent("<div>Test</div>", "p")).toBeNull();
    });
  });
});
