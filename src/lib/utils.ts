export type Comparator<T = unknown> = (a: T, b: T) => number;

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
export const compareNumbers: Comparator<number> = (a: number, b: number) => b - a;

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
