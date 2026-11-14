import { Comparator, sorted, shuffle } from './utils';

/**
 * Randomly shuffle an array until it comes back sorted. The beatings will
 * continue until morale improves.
 */
export function bogosort<T>(arr: T[], comparator: Comparator<T>): T[] {
  if (sorted(arr, comparator)) {
    return arr;
  }

  return bogosort(shuffle(arr), comparator);
};
