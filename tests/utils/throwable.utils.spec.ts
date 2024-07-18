import {ThrowableUtils} from "../../src/utils/throwable.utils";

describe("Throwable utils: tests", ()=>{
    it("should the argument be null and throw an exception", ()=> {
        expect(() => ThrowableUtils.requireNonNull(null, "fruit")).toThrow("The fruit must not be a null value");
        expect(() => ThrowableUtils.requireNonNull(null)).toThrow("The value must not be a null value");
    })

    it("should the argument be non null and not throw an exception", ()=> {
        expect(() => ThrowableUtils.requireNonNull(3, "fruit")).not.toThrow();
    })

    it("should the argument be empty and cause exception ", ()=> {
        expect(() => ThrowableUtils.requireNonEmptyArray(3, "fruits"))
            .toThrow("The fruits must an non-empty array");
        expect(() => ThrowableUtils.requireNonEmptyArray(null, "fruits"))
            .toThrow("The fruits must an non-empty array");
        expect(() => ThrowableUtils.requireNonEmptyArray(undefined, "fruits"))
            .toThrow("The fruits must an non-empty array");
        expect(() => ThrowableUtils.requireNonEmptyArray([]))
            .toThrow("The value must an non-empty array");
    })

    it("should the argument be empty and cause exception ", ()=> {
        expect(() => ThrowableUtils.requireNonEmptyArray([3], "fruits"))
            .not.toThrow();
    })

    it("Should the rease new error", ()=> {
        expect(()=>ThrowableUtils.raise("user not found")).toThrowError("user not found")
    })
})