import { ThrowableUtils } from "./throwable.utils";
import { getRandomValues } from "node:crypto";

export type TypedIntArray =
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint16Array
  | Uint32Array;
export type TypedFloatArray = Float32Array | Float64Array;
export type TypedBigIntArray = BigInt64Array | BigUint64Array;
export type TypedArray = TypedIntArray | TypedFloatArray | TypedBigIntArray;

export const bytesToInteger = (bytes: TypedIntArray) => {
  const binary = Array.from(bytes)
    .map((byte) => byte.toString(2).padStart(8, "0"))
    .join("");
  return parseInt(binary, 2);
};

export const random = (): number => {
  const randomUint32Values = new Uint32Array(1);
  getRandomValues(randomUint32Values);
  const u32Max = 0xffffffff;
  return randomUint32Values[0]! / (u32Max + 1);
};

/**
 * @ref https://pilcrow.vercel.app/blog/random-values-typescript
 * @param max the max value
 */
export const randomInteger = (max: number): number => {
  if (max < 0 || Number.MAX_SAFE_INTEGER < max) {
    ThrowableUtils.raise(
      "Argument 'max' must be an integer greater than or equal to 0"
    );
  }
  const bitLength = (max - 1).toString(2).length;
  const shift = bitLength % 8;
  const bytes = new Uint8Array(Math.ceil(bitLength / 8));

  getRandomValues(bytes);

  if (shift !== 0) {
    bytes[0] &= (1 << shift) - 1;
  }

  let result = bytesToInteger(bytes);

  while (result > max - 1) {
    getRandomValues(bytes);
    if (shift !== 0) {
      bytes[0] &= (1 << shift) - 1;
    }
    result = bytesToInteger(bytes);
  }
  return result;
};
