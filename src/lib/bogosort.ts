import { Comparator, sorted, scramble } from './utils';

/**
 * Randomly scramble a collection until it comes back sorted. The beatings will
 * continue until morale improves.
 */
export function bogosort<T>(collection: T[], comparator: Comparator<T>): T[] {
  if (sorted(collection, comparator)) {
    return collection;
  }

  return bogosort(scramble(collection), comparator);
};
