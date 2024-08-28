import { DateAndTimeUtils } from "../../lib";

describe("DateAndTimeUtils", () => {
  it("should linearized time", () => {
    expect(DateAndTimeUtils.linearisedTime("01:00:00")).toEqual("3600s");
  });

  it("should linearized malformated time", () => {
    expect(DateAndTimeUtils.linearisedTime("03:23:34:89")).toEqual("");
  });

  it("should linearized undefined time", () => {
    expect(DateAndTimeUtils.linearisedTime(undefined)).toEqual(undefined);
  });
});
