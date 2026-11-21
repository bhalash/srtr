import { beforeAll, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { compareNumbers, compareStrings, sorted } from './utils';

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
});
