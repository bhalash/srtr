import { describe, it, expect } from 'vitest';

import { bogosort } from './bogo.sort';

describe('bogosort', () => {
  it('should be a function', () => {
    expect(typeof bogosort).toBe('function');
  });
});
