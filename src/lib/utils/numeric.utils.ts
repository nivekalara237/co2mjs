import { ArrayUtils } from "./array.utils";
import { ObjectUtils } from "./object.utils";
import { ThrowableUtils } from "./throwable.utils";


/**
 * 
 * Explication des fonctions :
 * factorial(int n) : Calcule le factoriel d'un nombre entier n.
 * isPrime(int n) : Vérifie si un nombre est premier.
 * gcd(int a, int b) : Calcule le plus grand commun diviseur (PGCD) de deux nombres.
 * lcm(int a, int b) : Calcule le plus petit commun multiple (PPCM) de deux nombres.
 * power(double base, int exponent) : Calcule la puissance d'un nombre.
 * sqrt(double number) : Calcule la racine carrée d'un nombre.
 * average(int[] numbers) : Calcule la moyenne des éléments d'un tableau d'entiers.
 * round(double value, int places) : Arrondit un nombre à un nombre de décimales spécifié.
 * isPowerOfTwo(int n) : Vérifie si un nombre est une puissance de 2.
 * sumOfDigits(int number) : Calcule la somme des chiffres d'un nombre entier.
 * log10(double number) : Calcule le logarithme en base 10 d'un nombre.
 * logBase(double number, double base) : Calcule le logarithme d'un nombre en base base.
 * abs(int number) : Retourne la valeur absolue d'un nombre entier.
 * isPerfectSquare(int n) : Vérifie si un nombre est un carré parfait.
 * convertBase(int number, int base) : Convertit un nombre entier en une autre base (2 à 36).
 * max(int[] numbers) : Retourne le plus grand élément d'un tableau d'entiers.
 * min(int[] numbers) : Retourne le plus petit élément d'un tableau d'entiers.
 * isEven(int n) : Vérifie si un nombre est pair.
 * isOdd(int n) : Vérifie si un nombre est impair.
 * square(int n) : Calcule le carré d'un nombre.
 * sum(int[] numbers) : Calcule la somme des éléments d'un tableau d'entiers.
 * sort(int[] numbers) : Trie un tableau d'entiers dans l'ordre croissant.
 * 
 */


export class NumericUtils {
  public static isNumeric = (val: any) => {
    return !Array.isArray(val) && val - parseFloat(val) + 1 >= 0;
  };

  static statistics = class {
    static average = (nums: number[]): number | undefined => {
      if(ObjectUtils.isNullOrUndefined(nums) || nums.length === 0) return undefined;
      let sum = 0;
      let len = 0;
      let isAllInvalid = true;
      for(let i = 0; i < nums.length; i++) {
        if(ObjectUtils.isNotNullAndNotUndefined(nums[i])) {
          sum+=nums[i];
          len++;
          isAllInvalid = false;
        }
      }
      return isAllInvalid ? undefined : (sum / (len === 0 ? 1: len));
    };

    static median = (nums: number[]): number | undefined => {
      return undefined;
    }

    static variance = (nums: number[]): number | undefined => {
      return undefined;
    }
  };

  static factorial = (num: number): number => {
    if(num < 0) {
      ThrowableUtils.raise("the number must be positive of zero");
    }
    if(num === 0) return 1;
    let result = 1;
    for(let i = 1; i <= num; i++) {
      result *=i;
    }
    return result;
  }

  static max = (numbers: number[]): number | undefined => {
    if(ObjectUtils.isNullOrUndefined(numbers) || numbers.length === 0) return undefined;
    let max = numbers[0];
    for(let i = 1; i < numbers.length; i++) {
      if(numbers[i] > max) {
        max = numbers[i];
      }
    }
    return max;
  };

  static min = (numbers: number[]): number | undefined => {
    if(ObjectUtils.isNullOrUndefined(numbers) || numbers.length === 0) return undefined;
    let min = numbers[0];
    for(let i = 1; i < numbers.length; i++) {
      if(numbers[i] < min) {
        min = numbers[i];
      }
    }
    return min;
  };

  static isEven = (integer: number) : boolean => integer % 2 === 0;

  static isOdd = (integer: number) : boolean => !this.isEven(integer);

  static isPrime = (integer: number): boolean => {
    if(integer <= 1) return false;
    for(let i=2; i<= Math.sqrt(integer); i++) {
      if(integer % i === 0) return false;
    }
    return true;
  }

  static arePrime = (a: number, b: number): boolean => {
    return this.gcd(a, b) === 1;
  };


  static gcd = (a: number, b: number) : number => {
    let max = Math.max(a, b);
    let min = Math.min(a, b);
    if(max % min === 0) return min;
    while(min !== 0) {
      let tmp = min;
      min = max % min;
      max = tmp;
    }
    return max;
  }


  static lcm = (a: number, b: number): number => {
    return (a * b) / this.gcd(a, b);
  }

  static square = (n: number) => {
    if(ObjectUtils.isNullOrUndefined(n)) return undefined;
    return n * n;
  };

  static power = (base: number, expo: number): number => Math.pow(base, expo);

  static round = (value: number, places: number): number => {
    const scale = this.power(10, places);
    return Math.round(value * scale) / scale;
  }

}
