import { Comparator } from './utils';

/**
 * Use recursive quicksort to reorder a collection. Quicksort works through a
 * three-step "divide and conqueror" mechanism:
 *
 *  1. Identify a pivot point in the array. Other implementations apply more
 *     intelligence or start at tne end, but I am happy to use the midpoint
 *     rounded down.
 *  2. Think of a left-to-right arrangement:
 *        a. Values smaller than the pivot go into a new array _before_ the pivot.
 *        c. Values equal to the pivot are joined with it in an new array.
 *        c. Values larger than the pivot go into a new array _after_ the pivot.
 *  3. Repeat steps #1 and #2 recursively with each sub array until arrays of
 *      single element in size are generated.
 *
 * Returned the merged arrays once the original is completely decomposed.
 *
 * @example
 *
 *      [0, 10, 2, 7, 5, 1, 9]
 *      ↓
 *      [0, 2, 5, 1], [7], [10, 9]
 *      ↓
 *      [0, 1], [2], [5], [7], [10, 9]
 *      ↓
 *      [0], [1], [2], [5], [7], [9], [10]
 *      ↓
 *      [0, 1, 2, 5, 7, 9, 10]
 *
 * Quicksort lives up to its name-it is quick: In the above example it takes only
 * four passes to sort the entire array.
 */

export function quicksort<T>(arr: T[], comparator: Comparator<T>): T[] {
  if (arr.length < 2) {
    return arr;
  }

  const pivot = arr[arr.length >> 1];

  return [
    ...quicksort(arr.filter(element => comparator(element, pivot) < 0), comparator),
    ...arr.filter(element => comparator(element, pivot) === 0),
    ...quicksort(arr.filter(element => comparator(element, pivot) > 0), comparator)
  ];
};
