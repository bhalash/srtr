import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { quicksort } from './quicksort';
import { compareNumbers } from './utils';

describe('quicksort', () => {
  it('should sort a known collection', () => {
    const numbers = [170, 45, 75, 25, 2, 24, 802, 66];
    expect(quicksort(numbers, compareNumbers)).toEqual([2, 24, 25, 45, 66, 75, 170, 802]);
  });

  it('should sort a large array of random numbers', () => {
    const numbers = faker.helpers.uniqueArray(faker.number.int, 1000);
    const sorted = numbers.toSorted((a, b) => a - b);
    expect(quicksort(numbers, compareNumbers)).toEqual(sorted);
  });
});
