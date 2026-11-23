import { beforeAll, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { digitAt, radixsort, toBuckets } from './radixsort';

describe('Radix Sort', () => {
  let numbers: number[];

  beforeAll(() => {
    numbers = faker.helpers.shuffle([
      ...faker.helpers.uniqueArray(faker.number.int, 500).map((n) => -n),
      ...faker.helpers.uniqueArray(faker.number.int, 500),
    ]);
  });

  describe('radixsort', () => {
    it('should sort a known collection of positive numbers', () => {
      const positives = [170, 45, 75, 25, 2, 24, 802, 66];
      expect(radixsort(positives)).toEqual([2, 24, 25, 45, 66, 75, 170, 802]);
    });

    it('should sort a known collection of negative numbers', () => {
      const negatives = [-170, -45, -75, -25, -2, -24, -802, -66];
      expect(radixsort(negatives)).toEqual([-802, -170, -75, -66, -45, -25, -24, -2]);
    });

    it('should not mutate the original collection', () => {
      const copy = [...numbers];
      const sorted = radixsort(numbers);
      expect(numbers).toEqual(copy);
      expect(sorted).not.toEqual(numbers);
      expect(sorted).not.toEqual(copy);
    });

    it('should sort a large array of positive and negative numbers', () => {
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

  describe('digitAt', () => {
    const value = 17532;

    it('should be the digit at the given position, based on the most-significant digit', () => {
      expect(digitAt(value, 0)).toBe(1);
      expect(digitAt(value, 1)).toBe(7);
      expect(digitAt(value, 2)).toBe(5);
      expect(digitAt(value, 3)).toBe(3);
      expect(digitAt(value, 4)).toBe(2);
    });

    it('should cast negative numbers as positive', () => {
      expect(digitAt(-value, 0)).toBe(1);
      expect(digitAt(-value, 1)).toBe(7);
      expect(digitAt(-value, 2)).toBe(5);
      expect(digitAt(-value, 3)).toBe(3);
      expect(digitAt(-value, 4)).toBe(2);
    });

    it('should be 0 when there is no matching digit', () => {
      expect(digitAt(value, 9999)).toBe(0);
      expect(digitAt(value, -999)).toBe(0);
    });

    it('should be 0 when the longest parameter is longer than the number', () => {
      expect(digitAt(value, 0)).toBe(1);
      expect(digitAt(value, 0, 9999)).toBe(0);
      expect(digitAt(value, 1)).toBe(7);
      expect(digitAt(value, 1, 9999)).toBe(0);
    });
  });

  describe('toBuckets', () => {
    it('should separate negative and positive numbers into buckets', () => {
      expect(toBuckets([-2, 0, 3])).toEqual({
        longest: 2,
        negative: [-2],
        positive: [0, 3],
      });
    });

    it('should find the longest value in the input array', () => {
      expect(toBuckets([12, 3456, -7, 890]).longest).toBe(4);
    });

    it('should have 0 longest for an empty array', () => {
      expect(toBuckets([])).toEqual({
        longest: 0,
        negative: [],
        positive: [],
      });
    });

    it('should use length 1 for NaN values', () => {
      expect(toBuckets([Number.NaN]).longest).toBe(1);
    });

    it('should use length 1 for Infinite values', () => {
      expect(toBuckets([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]).longest).toBe(1);
    });

    it('should use length 1 for null and undefined values', () => {
      expect(toBuckets([null, undefined] as any).longest).toBe(1);
    });

    it('should put null, undefined and NaN values into the appropriate buckets', () => {
      expect(toBuckets([null, undefined, Number.NaN] as unknown as number[])).toEqual({
        longest: 1,
        negative: [],
        positive: [null, undefined, Number.NaN],
      });
    });
  });
});
