import { ObjectUtils } from "./object.utils";

export class ThrowableUtils {
  /**
   * The function check if the passed argument is non-null,
   * if so, raise an exception
   *
   * <pre>
   *     ThrowableUtils.requireNonNull(null) // will throw error
   *     ThrowableUtils.requireNonNull("yes") // will not throw error
   * </pre>
   * @param value the value to evaluate
   * @param valueName the argument name (placeholder)
   */
  public static requireNonNull = (value: any, valueName: string = "value") => {
    if (value === null) {
      throw new Error(`The ${valueName} must not be a null value`);
    }
  };

  /**
   * The function check if the passed argument is not undefined of NaN value,
   * if so, raise an exception
   *
   * <pre>
   *     ThrowableUtils.requireDefined(undefined) // will throw error
   *     ThrowableUtils.requireDefined(NaN) // will not throw error
   * </pre>
   * @param value the value to evaluate
   * @param valueName the argument name (placeholder)
   *
   * @since v1.0.8
   */
  public static requireDefined = (value: any, valueName: string = "value") => {
    if (
      value === undefined ||
      (typeof value === "number" && Number.isNaN(value))
    ) {
      throw new Error(`The ${valueName} must be defined value`);
    }
  };

  /**
   * The function check if the passed argument is array and not empty,
   * if so, raise an exception
   *
   * <pre>
   *     ThrowableUtils.requireNonEmptyArray(null) // will throw error
   *     ThrowableUtils.requireNonEmptyArray(undefined) // will throw error
   *     ThrowableUtils.requireNonEmptyArray([]) // will throw error
   *     ThrowableUtils.requireNonEmptyArray([2,"3"]) // will not throw error
   * </pre>
   * @param value the value to evaluate
   * @param valueName the argument name (placeholder)
   */
  public static requireNonEmptyArray = (
    value: any,
    valueName: string = "value"
  ) => {
    if (
      ObjectUtils.isNullOrUndefined(value) ||
      !Array.isArray(value) ||
      value.length === 0
    ) {
      throw new Error(`The ${valueName} must an non-empty array`);
    }
  };

  /**
   * This function raise new Exception
   *
   * @param messageOrErrorInstance the message error
   * @param cause the root cause of this exception
   */
  public static raise = (
    messageOrErrorInstance: string | Error,
    cause?: unknown
  ) => {
    if (messageOrErrorInstance instanceof Error) {
      messageOrErrorInstance.cause = cause;
      throw messageOrErrorInstance;
    } else {
      throw new Error(messageOrErrorInstance, cause);
    }
  };

  public static isError = (value: any) => {
    return (
      value instanceof
      (Error ||
        SyntaxError ||
        URIError ||
        ReferenceError ||
        EvalError ||
        TypeError)
    );
  };
}
