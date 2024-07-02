
export class BooleanUtils {
  
  public static isTrue(value: any) {
    return this.safety(value);
  }

  public static isFalse(value: any) {
    return !this.safety(value);
  }

  public static safety(value: any) {
    return coerceBooleanProperty(value);
  }
}


export function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}
