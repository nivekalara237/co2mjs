import { isBrowser, isNode } from "../../lib/utils/_";

describe(" Browser function testing", ()=> {
  it ("should Check browser", () => {
    expect(isBrowser()).toBeTruthy();
    expect(isNode()).toBeFalsy();
  })
})