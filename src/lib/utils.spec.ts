import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { compareNumbers, compareStrings, random, shuffle, sorted } from './utils';

describe('utility functions', () => {
  let arr: number[];

  beforeEach(() => {
    arr = faker.helpers.uniqueArray(faker.number.int, 15);
  });

  describe('shuffle', () => {
    it('should shuffle the input array', () => {
      const shuffled = shuffle(arr);
      expect(shuffled).not.toEqual(arr);
      expect(shuffled.toSorted()).toEqual(arr.toSorted());
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

  describe('random', () => {
    it('should return a value less than maxValue', () => {
      const value = random(100);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(100);
    });
  });

  describe('sorted', () => {
    it('should return true when the passed array is sorted', () => {
      expect(sorted([1, 2, 3], compareNumbers)).toBe(true);
      expect(sorted([3, 2, 1], compareNumbers)).toBe(false);
    });
  });
});
