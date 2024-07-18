import {RandomUtils} from "../../src/utils/random.utils";

describe("Random Utils Tests", ()=> {
    it('should get random boolean', () => {
        expect(() => RandomUtils.nextBoolean()).not.toThrow();
        expect(RandomUtils.nextBoolean()).not.toBeNull();
        expect(RandomUtils.nextBoolean()).not.toBeUndefined();
    });
})