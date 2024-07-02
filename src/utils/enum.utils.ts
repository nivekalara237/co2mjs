export class EnumUtils {
  protected static getValueStringByKey<TypeEnum>(
    enumType: TypeEnum,
    keyString: string,
  ): string {
    const indexOf = Object.keys(enumType as object).indexOf(keyString);
    return Object.values(enumType as object)[indexOf];
  }

  public static getEnumValueByValueString<TypeEnum>(
    _enum: TypeEnum,
    value: string,
  ): TypeEnum {
    return Object.values(_enum as object).find((v, k) => (v as string) === value);
  }

  static getEnumTypeByValueString<TypeEnum>(
    _enum: TypeEnum,
    valueString: string,
  ): TypeEnum {
    const indexValue = Object.values(_enum as object).indexOf(valueString);
    return <TypeEnum>(<unknown>Object.keys(_enum as object)[indexValue]);
  }
}
