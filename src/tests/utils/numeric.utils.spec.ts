import { NumericUtils } from "../../lib"

describe('Numeric Utils', () => {
    describe(" Is ODD", ()=>{
        it("should check that 23 and -3 are odd", () => {
            expect(NumericUtils.isOdd(23)).toBe(true);
            expect(NumericUtils.isOdd(-3)).toBe(true);
        })
        it("should check that 2, -2 and 0 are not odd", () => {
            expect(NumericUtils.isOdd(2)).toBe(false);
            expect(NumericUtils.isOdd(-2)).toBe(false);
            expect(NumericUtils.isOdd(0)).toBe(false);
        })
    })
    describe(" Is EVEN", ()=>{
        it("should check that 10,-4 and 0 are even", () => {
            expect(NumericUtils.isEven(10)).toBe(true);
            expect(NumericUtils.isEven(-4)).toBe(true);
            expect(NumericUtils.isEven(0)).toBe(true);
        })
        it("should check that 13 and -21 are not even", () => {
            expect(NumericUtils.isEven(13)).toBe(false);
            expect(NumericUtils.isEven(-21)).toBe(false);
        })
    })

    xdescribe("isNumeric", ()=> {
        it("should check that 2 is at numeric type", ()=>{
            expect(NumericUtils.isNumeric(2)).toBeTruthy();
        })
        it("should check that \"2\" is at numeric type", ()=>{
            expect(NumericUtils.isNumeric("2")).toBeFalsy();
        })
        it("should check that false is at numeric type", ()=>{
            expect(NumericUtils.isNumeric(false)).toBeFalsy();
        })
        it("should check that \"str\" is at numeric type", ()=>{
            expect(NumericUtils.isNumeric("str")).toBeFalsy();
        })
    })

    describe("Max number", () => {
        it("shoud retrieve max value in value", ()=>{
            expect(NumericUtils.max([2,8,5,1,2,0,2,2,9,6,9,3,4])).toBe(9);
        })

        it("shoud return undefined max: empty array", ()=>{
            expect(NumericUtils.max([])).toBeUndefined();
        })

        it("shoud return undefined max: undefined array", ()=>{
            expect(NumericUtils.max(undefined)).toBeUndefined();
        })

        it("shoud return undefined max: undefined array", ()=>{
            expect(NumericUtils.max(null)).toBeUndefined();
        })
    })

    describe("Min number", () => {
        it("shoud retrieve min value in value", ()=>{
            expect(NumericUtils.min([2,8,5,1,2,0,2,2,9,-8,6,9,3,4])).toBe(-8);
        })

        it("shoud return undefined min: empty array", ()=>{
            expect(NumericUtils.min([])).toBeUndefined();
        })

        it("shoud return undefined min: undefined array", ()=>{
            expect(NumericUtils.min(undefined)).toBeUndefined();
        })

        it("shoud return undefined min: undefined array", ()=>{
            expect(NumericUtils.min(null)).toBeUndefined();
        })
    })

    describe("Square",() => {
        it.each([
            [undefined, undefined],
            [null, undefined],
            [-2, 4],
            [0, 0],
            [2, 4],
            [5, 25],
        ])("should compute squart of %p. Expecting %p", (arg, exp: number | undefined)=>{
            expect(NumericUtils.square(<number>arg)).toBe(exp);
        })
    })
})



describe("Statistic Utils", ()=> {
    describe("Average", ()=> {
        it.each([
            [null, undefined],
            [undefined, undefined],
            [[], undefined],
            [[null], undefined],
            [[null,undefined, undefined, null], undefined],
            [[10,30,20,50,10], 24],
            [[10,30,20,null,50,10], 24],
            [[10,30,20,undefined,50,10], 24]
        ])("Should compute Average of %p and expecting %p", (arr: any, exp)=>{
            expect(NumericUtils.statistics.average(arr)).toBe(exp);
        })
    })
})