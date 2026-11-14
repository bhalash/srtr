import { Comparator, sorted, scramble } from './utils';

/**
 * Randomly scramble an array until it comes back sorted. The beatings will
 * continue until morale improves.
 */
export function bogosort<T>(arr: T[], comparator: Comparator<T>): T[] {
  if (sorted(arr, comparator)) {
    return arr;
  }

  return bogosort(scramble(arr), comparator);
};
