import { describe, it, expect } from 'vitest';

import { quicksort } from './quicksort';

describe('quicksort', () => {
  it('should be a function', () => {
    expect(typeof quicksort).toBe('function');
  });
});
