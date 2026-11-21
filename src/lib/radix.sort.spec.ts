import { beforeAll, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { digitAt, longestNumber, radixsort, toNumbers, toStrings } from './radixsort';

describe('Radix Sort', () => {
  let numbers: number[];

  beforeAll(() => {
    numbers = faker.helpers.uniqueArray(faker.number.int, 1000);
  });

  describe('radixsort', () => {
    it('should sort a known collection', () => {
      const numbers = [170, 45, 75, 25, 2, 24, 802, 66];
      expect(radixsort(numbers)).toEqual([2, 24, 25, 45, 66, 75, 170, 802]);
    });

    it('should sort a large array of random numbers', () => {
      const numbers = faker.helpers.uniqueArray(faker.number.int, 1000);
      const sorted = numbers.toSorted((a, b) => a - b);
      expect(radixsort(numbers)).toEqual(sorted);
    });

    it('should correctly sort an annoying edge case', () => {
      const numbers = [10001, 10000, 1001, 1000, 101, 100, 11, 10, 1];
      expect(radixsort(numbers)).toEqual([1, 10, 11, 100, 101, 1000, 1001, 10000, 10001]);
    });

    it('should sort arrays with identical numbers', () => {
      const numbers = [2, 0, 1, 2, 0, 1, 0, 2, 1, 0, 1, 3];
      expect(radixsort(numbers)).toEqual([0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3]);
    });

    it('should not infinitely recurse with an array full of identical numbers', () => {
      expect(() => radixsort([0, 0, 0])).not.toThrow();
      expect(() => radixsort([1, 1, 1])).not.toThrow();
      expect(() => radixsort([2, 2, 2])).not.toThrow();
    });
  });

  describe('toStrings', () => {
    it('should convert an array of numbers to 0-padded strings based on the longest value', () => {
      const stringified = toStrings(numbers);
      const longest = longestNumber(numbers);

      expect(stringified.every((value) => typeof value === 'string')).toBe(true);
      expect(stringified.every((value) => /^\d+$/.test(value))).toBe(true);
      expect(stringified.every((value) => value.length === longest)).toBe(true);
    });

    it('should substitue "0" for NaN and Infinity', () => {
      expect(toStrings([NaN, Infinity])).toEqual(['0', '0']);
    });

    it('should substitue "0" for empty values', () => {
      expect(toStrings([null, undefined] as any)).toEqual(['0', '0']);
    });
  });

  describe('toNumbers', () => {
    it('should convert an array of 0-padded strings to numbers', () => {
      const stringified = toStrings(numbers);
      expect(toNumbers(stringified)).toEqual(numbers);
    });
  });

  describe('digitAt', () => {
    const value = '017532';

    it('should be the digit at the given position, based on the most-significant digit', () => {
      expect(digitAt(value, 0)).toBe(0);
      expect(digitAt(value, 1)).toBe(1);
      expect(digitAt(value, 2)).toBe(7);
      expect(digitAt(value, 3)).toBe(5);
      expect(digitAt(value, 4)).toBe(3);
      expect(digitAt(value, 5)).toBe(2);
    });

    it('should be 0 when there is no matching digit', () => {
      expect(digitAt(value, 9999)).toBe(0);
      expect(digitAt(value, -999)).toBe(0);
    });
  });

  describe('longestNumber', () => {
    it('should be 0 for an empty array', () => {
      expect(longestNumber([])).toBe(0);
    });

    it('should be 1 for a zero-filled array', () => {
      expect(longestNumber([0, 0, 0])).toBe(0);
    });

    it('should be 0 for NaN and Infinity', () => {
      expect(longestNumber([NaN])).toBe(0);
      expect(longestNumber([Infinity])).toBe(0);
      expect(longestNumber([-Infinity])).toBe(0);
    });

    it('should be 0 for empty values', () => {
      expect(longestNumber([null] as any)).toBe(0);
      expect(longestNumber([undefined] as any)).toBe(0);
      expect(longestNumber([,] as any)).toBe(0);
    });

    it('should be 0 for sparse arrays', () => {
      expect(longestNumber([,] as any)).toBe(0);
    });

    it('should be the digit count of the largest value in the array', () => {
      expect(longestNumber([9])).toBe(1);
      expect(longestNumber([9, 19])).toBe(2);
      expect(longestNumber([9, 19, 197])).toBe(3);
      expect(longestNumber([9, 19, 197, 1975])).toBe(4);
      expect(longestNumber([9, 19, 197, 1975, 19752])).toBe(5);
      expect(longestNumber([9, 19, 197, 1975, 19752, 15378])).toBe(5);
    });
  });
});
