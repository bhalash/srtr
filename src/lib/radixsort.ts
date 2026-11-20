import { digitAt, toNumbers, toStrings } from './utils';

/**
 * Recursively distribute an array of strings into buckets using its current
 * most-significant digit.
 */
function msdRadixSort(arr: string[], position: number = 0): string[] {
  if (arr.length < 2) {
    return arr;
  }

  const buckets: Record<number, string[]> = {};

  arr.forEach((value) => {
    const digit = digitAt(value, position);
    buckets[digit] ??= [];
    buckets[digit].push(value);
  });

  return Object.values(buckets).flatMap((bucket) => {
    return msdRadixSort(bucket, position + 1);
  });
}

/**
 * Sort an array of numbers using forward, most-significant-digit radix sort.
 * The implementation first casts every number to a 0-padded string, based on
 * the longest value in the array. Zero-padding makes every value the same
 * width so that a digit at a given position represents the same place value.
 *
 *  1. Convert the numbers into equal-width strings.
 *  2. Distribute the strings into digit buckets, starting at the leftmost
 *     digit.
 *  3. Recursively repeat bucket distribution for each remaining digit.
 *  4. Flatten the buckets to restore their sorted string order.
 *  5. Convert the padded strings back into numbers.
 *
 * @example
 *
 *                                ↓
 *  [170, 45, 75, 25, 2, 24, 802, 66]
 *                        ↓
 *  [{002, 024, 025, 045, 066, 075}  {170}  {802}]
 *                        ↓
 *  [{002, 024, 025, 045, 066, 075, 170, 802}]
 *                  ↓
 *  [2, 24, 25, 45, 66, 75, 170, 802]
 *
 * Radix sort processes digits rather than comparing whole numbers. For equal-
 * width decimal strings, its running time is approximately O(d * n), where n
 * is the number of values and d is the number of digits.
 *
 * @see https://en.wikipedia.org/wiki/Radix_sort
 */
export function radixsort(arr: number[]): number[] {
  return toNumbers(msdRadixSort(toStrings(arr)));
}
