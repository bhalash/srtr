import { beforeAll, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import {
  compareNumbers,
  compareStrings,
  digitAt,
  longestNumber,
  sorted,
  toNumbers,
  toStrings,
} from './utils';

describe('utility functions', () => {
  let numbers: number[];

  beforeAll(() => {
    numbers = faker.helpers.uniqueArray(faker.number.int, 1000);
  });

  describe('sorted', () => {
    it('should return true when the passed array is sorted', () => {
      expect(sorted(numbers, compareNumbers)).toBe(false);
      expect(sorted(numbers.toSorted(compareNumbers), compareNumbers)).toBe(true);
    });
  });

  describe('compareNumbers', () => {
    it('should compare two numbers in three-way order', () => {
      expect(compareNumbers(7, 9)).toBeLessThan(0);
      expect(compareNumbers(7, 7)).toBe(0);
      expect(compareNumbers(9, 7)).toBeGreaterThan(0);
    });
  });

  describe('compareStrings', () => {
    it('should compare two strings lexicographically', () => {
      expect(compareStrings('alpha', 'beta')).toBeLessThan(0);
      expect(compareStrings('alpha', 'alpha')).toBe(0);
      expect(compareStrings('beta', 'alpha')).toBeGreaterThan(0);
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

    it('should be a function', () => {
      expect(typeof digitAt).toBe('function');
    });

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
