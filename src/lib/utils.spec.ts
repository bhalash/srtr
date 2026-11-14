import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { shuffle } from './utils';

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
})
