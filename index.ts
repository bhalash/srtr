/**
 * Default comparator which performs lexicographic three-way comparison of two
 * values. The is the fundamental building block of most sorting algorithms:
 *
 * @example
 *
 *  A < B // -1
 *  A = B //  0
 *  A > B //  1
 *
 * A value above 0 indicates that A < B, and a sort operation then occurs. When
 * dealing with numbers, three-way comparisons can be shorted by the subtraction
 * of the second number from the first.
 *
 * Ruby's spaceship (<=>) offers a shorthand for three-way comparison:
 *
 * @example
 *
 *  7 <=> 9 // -1
 *  7 <=> 7 //  0
 *  9 <=> 7 //  1
 */

export type Comparator<T = unknown> = (a: T, b: T) => number;

export const spaceship: Comparator<number> = (a: number, b: number) => b - a;

/**
 * Return a random value up to max.
 */
export function random(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * Scramble the order of elements in an array.
 *
 * Strings (and numbers cast as strings) are passed to this function to be
 * scrambled.
 */
export function scramble<T>(collection: T[]): T[] {
  if (collection.length < 2) {
    return collection;
  }

  let copy = [...collection],
  index = copy.length,
  rand = random(index);

  while (--index > 0) {
    [copy[index], copy[rand]] = [copy[rand], copy[index]];
  }

  return copy;
}

/**
 * Test if a collection is sorted.
 */
export function sorted<T>(collection: T[], comparator: Comparator<T>): boolean {
  if (collection.length < 2) {
    return true;
  }

  return collection.slice(0, -1).every((element, index) => {
    return comparator(element, collection[index + 1]) < 1;
  });
}

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

export function quicksort<T>(collection: T[], comparator: Comparator<T>): T[] {
  if (collection.length < 2) {
    return collection;
  }

  const pivot = collection[collection.length >> 1];

  return [
    ...quicksort(collection.filter(element => comparator(element, pivot) < 0), comparator),
    ...collection.filter(element => comparator(element, pivot) === 0),
    ...quicksort(collection.filter(element => comparator(element, pivot) > 0), comparator)
  ];
};

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
