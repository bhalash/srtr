import { Comparator, sorted } from './utils';

/**
 * Use iterative bubble sort to reorder a collection.
 *
 * A bubble sort slowyly causes higher elements to "bubble" from the start or
 * the array, to the end, over multiple successive passes.
 *
 *  1. If the current index value is higher than its right-hand neigbour, swap
 *     their positions in the collection.
 *  2. Repeat this action until the end of the array is reached.
 *  3. If the array is dirty, repeat this.
 *  4. Continue successive passes until an iteration reaches the end without
 *     swapping any values.
 *
 * @example
 *
 *       ↓
 *      [0, 10, 2, 7, 5, 1, 9]
 *          ↓
 *      [0, 10, 2, 7, 5, 1, 9]
 *             ↓
 *      [0, 2, 10, 7, 5, 1, 9]
 *                ↓
 *      [0, 2, 7, 10, 5, 1, 9]
 *
 * @public
 * @see https://en.wikipedia.org/wiki/Bubble_sort
 * @param {array} collection - Unsorted collection
 * @param {function} comparator - Predicate function to test values.
 * @return {array} collection - Sorted collection.
 */
export function bubblesort<T>(collection: T[], comparator: Comparator<T>): T[] {
  if (sorted(collection, comparator)) {
    return collection;
  }

  let copy = [...collection];

  for (let index = 0; index < copy.length - 1; index++) {
    if (comparator(copy[index], copy[index + 1]) > 0) {
      [copy[index], copy[index + 1]] = [copy[index + 1], copy[index]];
    }
  }

  return bubblesort(copy, comparator);
};
