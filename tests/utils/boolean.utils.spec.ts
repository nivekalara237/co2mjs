import { BooleanUtils } from "../../src";


describe('Test boolean utilities', () => {
  it('should check truthy', function() {
    expect(BooleanUtils.safetyElegan('True')).toBeTruthy();
    expect(BooleanUtils.safetyElegan('true')).toBeTruthy();
    expect(BooleanUtils.safetyElegan('TRUE')).toBeTruthy();
    expect(BooleanUtils.safetyElegan('on')).toBeTruthy();
    expect(BooleanUtils.safetyElegan('1')).toBeTruthy();
    expect(BooleanUtils.safetyElegan(1)).toBeTruthy();
    expect(BooleanUtils.safetyElegan(3)).toBeTruthy();
  });
  it('should check falsy', function() {
    expect(BooleanUtils.safetyElegan('False')).toBeFalsy();
    expect(BooleanUtils.safetyElegan('false')).toBeFalsy();
    expect(BooleanUtils.safetyElegan('FALSE')).toBeFalsy();
    expect(BooleanUtils.safetyElegan('off')).toBeFalsy();
    expect(BooleanUtils.safetyElegan('0')).toBeFalsy();
    expect(BooleanUtils.safetyElegan(0)).toBeFalsy();
  });
});
