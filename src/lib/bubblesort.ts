import { Comparator, sorted } from './utils';

/**
 * Use iterative bubble sort to reorder an array.
 *
 * A bubble sort slowyly causes higher elements to "bubble" from the start or
 * the array, to the end, over multiple successive passes.
 *
 *  1. If the current index value is higher than its right-hand neigbour, swap
 *     their positions in the array.
 *  2. Repeat this action until the end of the array is reached.
 *  3. If the array is dirty, repeat this.
 *  4. Continue successive passes until an iteration reaches the end without
 *     swapping any values.
 *
 * @example
 *
 *   ↓
 *  [0, 10, 2, 7, 5, 1, 9]
 *      ↓
 *  [0, 10, 2, 7, 5, 1, 9]
 *         ↓
 *  [0, 2, 10, 7, 5, 1, 9]
 *            ↓
 *  [0, 2, 7, 10, 5, 1, 9]
 *
 * @see https://en.wikipedia.org/wiki/Bubble_sort
 */
export function bubblesort<T>(arr: T[], comparator: Comparator<T>): T[] {
  if (sorted(arr, comparator)) {
    return arr;
  }

  let copy = [...arr];

  for (let index = 0; index < copy.length - 1; index++) {
    if (comparator(copy[index], copy[index + 1]) > 0) {
      [copy[index], copy[index + 1]] = [copy[index + 1], copy[index]];
    }
  }

  return bubblesort(copy, comparator);
};
