import { ThrowableUtils } from "../../lib";
import { IndexOutOfBoundsException } from "../../lib/exceptions/index-out-of-bounds.exception";

describe("Throwable utils: tests", () => {
  it("should the argument be null and throw an exception", () => {
    expect(() => ThrowableUtils.requireNonNull(null, "fruit")).toThrow(
      "The fruit must not be a null value"
    );
    expect(() => ThrowableUtils.requireNonNull(null)).toThrow(
      "The value must not be a null value"
    );
  });

  it("should the argument be non null and not throw an exception", () => {
    expect(() => ThrowableUtils.requireNonNull(3, "fruit")).not.toThrow();
  });

  it("should the argument be empty and cause exception ", () => {
    expect(() => ThrowableUtils.requireNonEmptyArray(3, "fruits")).toThrow(
      "The fruits must an non-empty array"
    );
    expect(() => ThrowableUtils.requireNonEmptyArray(null, "fruits")).toThrow(
      "The fruits must an non-empty array"
    );
    expect(() =>
      ThrowableUtils.requireNonEmptyArray(undefined, "fruits")
    ).toThrow("The fruits must an non-empty array");
    expect(() => ThrowableUtils.requireNonEmptyArray([])).toThrow(
      "The value must an non-empty array"
    );
  });

  it("should the argument be empty and cause exception ", () => {
    expect(() =>
      ThrowableUtils.requireNonEmptyArray([3], "fruits")
    ).not.toThrow();
  });

  it("Should the rease new error", () => {
    expect(() => ThrowableUtils.raise("user not found")).toThrowError(
      "user not found"
    );
    expect(() =>
      ThrowableUtils.raise(new IndexOutOfBoundsException("Index"))
    ).toThrow("Index");
  });

  it("should check if value is error of type Error", () => {
    expect(ThrowableUtils.isError(new Error())).toBeTruthy();
  });

  it("should check if value is error of type TypeError", () => {
    expect(ThrowableUtils.isError(new TypeError("errors"))).toBeTruthy();
  });

  it("should check if value is error of type URIError", () => {
    expect(ThrowableUtils.isError(new URIError("errors"))).toBeTruthy();
  });

  it("should check if value is error of type ReferenceError", () => {
    expect(ThrowableUtils.isError(new ReferenceError("errors"))).toBeTruthy();
  });

  it("should check if value is error of type RangeError", () => {
    expect(ThrowableUtils.isError(new RangeError("errors"))).toBeTruthy();
  });

  it("should check if value is error of type EvalError", () => {
    expect(ThrowableUtils.isError(new EvalError("errors"))).toBeTruthy();
  });

  it("should check if value is error of type SyntaxError", () => {
    expect(ThrowableUtils.isError(new SyntaxError("errors"))).toBeTruthy();
  });

  it("should check if value is error of non Error", () => {
    expect(ThrowableUtils.isError(new Object(""))).toBeFalsy();
  });

  it("should check if value is error of non Error", () => {
    expect(ThrowableUtils.isError("Error")).toBeFalsy();
  });
});
