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
export function random(maxValue: number): number {
  return Math.floor(Math.random() * maxValue);
}

/**
 * Scramble the order of elements in an array.
 *
 * Strings (and numbers cast as strings) are passed to this function to be
 * shuffled.
 */
export function shuffle<T>(arr: T[]): T[] {
  if (arr.length < 2) {
    return arr;
  }

  let copy = [...arr],
  index = copy.length,
  rand = random(index);

  while (--index > 0) {
    [copy[index], copy[rand]] = [copy[rand], copy[index]];
  }

  return copy;
}

/**
 * Test if an array is sorted.
 *
 * The slice excludes the last index
 */
export function sorted<T>(arr: T[], comparator: Comparator<T>): boolean {
  if (arr.length < 2) {
    return true;
  } else {
    return arr.slice(1).every((val, index) => comparator(val, arr[index]) < 1);
  }
}
