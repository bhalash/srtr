import { describe, it, expect } from 'vitest';

import { bubblesort } from './bubblesort';

describe('bubblesort', () => {
  it('should be a function', () => {
    expect(typeof bubblesort).toBe('function');
  });
});
