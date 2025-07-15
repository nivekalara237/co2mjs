export class HtmlUtils {
  /**
   * Escapes HTML special characters in a string.
   *
   * @example
   * HtmlUtils.escapeHtml("<div>Hello & World</div>"); // "&lt;div&gt;Hello &amp; World&lt;/div&gt;"
   * HtmlUtils.escapeHtml("a & b"); // "a &amp; b"
   * HtmlUtils.escapeHtml(null); // null
   *
   * @param str - The input string.
   * @returns The escaped string or null if input is null/undefined.
   */
  static escapeHtml(str: string | null | undefined): string | null {
    if (str == null) return null;
    const escapeMap: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return str.replace(/[&<>"']/g, (match) => escapeMap[match]);
  }

  /**
   * Unescapes HTML special characters in a string.
   *
   * @example
   * HtmlUtils.unescapeHtml("&lt;div&gt;Hello &amp; World&lt;/div&gt;"); // "<div>Hello & World</div>"
   * HtmlUtils.unescapeHtml("a &amp; b"); // "a & b"
   * HtmlUtils.unescapeHtml(null); // null
   *
   * @param str - The input string.
   * @returns The unescaped string or null if input is null/undefined.
   */
  static unescapeHtml(str: string | null | undefined): string | null {
    if (str == null) return null;
    const unescapeMap: Record<string, string> = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'",
    };
    return str.replace(
      /&amp;|&lt;|&gt;|&quot;|&#39;/g,
      (match) => unescapeMap[match]
    );
  }

  /**
   * Removes all HTML tags from a string, leaving plain text.
   *
   * @example
   * HtmlUtils.stripHtmlTags("<p>Hello <b>World</b></p>"); // "Hello World"
   * HtmlUtils.stripHtmlTags("<div>Test</div>"); // "Test"
   * HtmlUtils.stripHtmlTags(null); // null
   *
   * @param str - The input string.
   * @returns The string with HTML tags removed or null if input is null/undefined.
   */
  static stripHtmlTags(str: string | null | undefined): string | null {
    if (str == null) return null;
    return str.replace(/<[^>]+>/g, "");
  }

  /**
   * Sanitizes HTML by removing potentially dangerous tags and attributes.
   *
   * @example
   * HtmlUtils.sanitizeHtml("<p>Hello <script>alert('xss')</script></p>"); // "<p>Hello </p>"
   * HtmlUtils.sanitizeHtml("<div onclick='malicious()'>Test</div>"); // "<div>Test</div>"
   * HtmlUtils.sanitizeHtml(null); // null
   *
   * @param str - The input string.
   * @returns The sanitized string or null if input is null/undefined.
   */
  static sanitizeHtml(str: string | null | undefined): string | null {
    if (str == null) return null;
    // Remove script, style, and potentially dangerous attributes
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/\bon\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]*)/gi, "");
  }

  /**
   * Encodes HTML entities in a string (extended set beyond basic escape).
   *
   * @example
   * HtmlUtils.encodeHtmlEntities("© 2023"); // "&copy; 2023"
   * HtmlUtils.encodeHtmlEntities("a & b"); // "a &amp; b"
   * HtmlUtils.encodeHtmlEntities(null); // null
   *
   * @param str - The input string.
   * @returns The string with extended HTML entities encoded or null if input is null/undefined.
   */
  static encodeHtmlEntities(str: string | null | undefined): string | null {
    if (str == null) return null;
    const entities: Record<string, string> = {
      "©": "&copy;",
      "®": "&reg;",
      "™": "&trade;",
      "€": "&euro;",
      "£": "&pound;",
      "¥": "&yen;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return str.replace(/[©®™€£¥&<>"']/g, (match) => entities[match]);
  }

  /**
   * Decodes HTML entities in a string (extended set).
   *
   * @example
   * HtmlUtils.decodeHtmlEntities("&copy; 2023"); // "© 2023"
   * HtmlUtils.decodeHtmlEntities("a &amp; b"); // "a & b"
   * HtmlUtils.decodeHtmlEntities(null); // null
   *
   * @param str - The input string.
   * @returns The string with HTML entities decoded or null if input is null/undefined.
   */
  static decodeHtmlEntities(str: string | null | undefined): string | null {
    if (str == null) return null;
    const entities: Record<string, string> = {
      "&copy;": "©",
      "&reg;": "®",
      "&trade;": "™",
      "&euro;": "€",
      "&pound;": "£",
      "&yen;": "¥",
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'",
    };
    return str.replace(
      /&copy;|&reg;|&trade;|&euro;|&pound;|&yen;|&amp;|&lt;|&gt;|&quot;|&#39;/g,
      (match) => entities[match]
    );
  }

  /**
   * Checks if a string contains valid HTML.
   *
   * @example
   * HtmlUtils.isValidHtml("<p>Hello</p>"); // true
   * HtmlUtils.isValidHtml("<p>Hello</div>"); // false
   * HtmlUtils.isValidHtml(null); // false
   *
   * @param str - The input string.
   * @returns True if the string is valid HTML, false otherwise.
   */
  static isValidHtml(str: string | null | undefined): boolean {
    throw new Error("Not yet implemented");
  }

  /**
   * Extracts plain text from HTML content.
   *
   * @example
   * HtmlUtils.extractTextFromHtml("<p>Hello <b>World</b></p>"); // "Hello World"
   * HtmlUtils.extractTextFromHtml("<div>Test</div>"); // "Test"
   * HtmlUtils.extractTextFromHtml(null); // null
   *
   * @param str - The input string.
   * @returns The plain text extracted from HTML or null if input is null/undefined.
   */
  static extractTextFromHtml(str: string | null | undefined): string | null {
    throw new Error("Not yet implemented");
  }

  /**
   * Replaces all occurrences of a specific HTML tag with another tag.
   *
   * @example
   * HtmlUtils.replaceHtmlTag("<b>Hello</b>", "b", "strong"); // "<strong>Hello</strong>"
   * HtmlUtils.replaceHtmlTag("<p>Test</p>", "p", "div"); // "<div>Test</div>"
   * HtmlUtils.replaceHtmlTag(null, "p", "div"); // null
   *
   * @param str - The input string.
   * @param oldTag - The HTML tag to replace (without <>).
   * @param newTag - The new HTML tag to use (without <>).
   * @returns The string with replaced tags or null if input is null/undefined.
   */
  static replaceHtmlTag(
    str: string | null | undefined,
    oldTag: string,
    newTag: string
  ): string | null {
    if (str == null) return null;
    const regex = new RegExp(`<(/?)${oldTag}\\b([^>]*)>`, "gi");
    return str.replace(regex, `<$1${newTag}$2>`);
  }

  /**
   * Extracts the content between a specific HTML tag.
   *
   * @example
   * HtmlUtils.getHtmlTagContent("<p>Hello World</p>", "p"); // "Hello World"
   * HtmlUtils.getHtmlTagContent("<div>Test</div>", "div"); // "Test"
   * HtmlUtils.getHtmlTagContent(null, "p"); // null
   *
   * @param str - The input string.
   * @param tag - The HTML tag to extract content from (without <>).
   * @returns The content inside the specified tag or null if input is null/undefined or tag not found.
   */
  static getHtmlTagContent(
    str: string | null | undefined,
    tag: string
  ): string | null {
    if (str == null) return null;
    const regex = new RegExp(`<${tag}\\b[^>]*>(.*?)</${tag}>`, "i");
    const match = str.match(regex);
    return match ? match[1] : null;
  }
}
