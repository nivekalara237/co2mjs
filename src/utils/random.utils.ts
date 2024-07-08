
export class RandomUtils {
    public static nextBoolean = (): boolean => {
        return Math.random() >= 0.5;
    };
}