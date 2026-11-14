import { describe, it, expect } from 'vitest';

import { bogosort } from './bogosort';

describe('bogosort', () => {
  it('should be a function', () => {
    expect(typeof bogosort).toBe('function');
  });
});
