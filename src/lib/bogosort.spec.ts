import { describe, expect, it } from 'vitest';

import { bogosort } from './bogosort';
import { compareNumbers } from './utils';

describe('bogosort', () => {
  describe('bogosort', () => {
    it('should sort the array of random numbers...eventually', () => {
      // I keep the sample small because it really does take agessssss.
      const numbers = [170, 45, 75, 25, 2, 24, 802, 66];
      const sorted = numbers.toSorted((a, b) => a - b);
      expect(bogosort(numbers, compareNumbers)).toEqual(sorted);
    });
  });
});
