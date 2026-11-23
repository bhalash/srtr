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
function msdRadixSort(arr: number[], position = 0, longest = 0): number[] {
  // Strings are normalised to the longest value by this point. If position is
  // beyond the length of the first item, then we've descended as far as we
  // need, and the array is already sorted.
  if (arr.length < 2 || position > longest) {
    return arr;
  }

  const buckets: Record<number, number[]> = {};

  arr.forEach((value) => {
    const digit = digitAt(value, position, longest);
    buckets[digit] ??= [];
    buckets[digit].push(value);
  });

  return Object.values(buckets).flatMap((bucket) => {
    return msdRadixSort(bucket, position + 1, longest);
  });
}

// TODO(mark 2026-11-21): doc
export function radixsort(arr: number[]): number[] {
  const { longest, negative, positive } = toBuckets(arr);
  const startPosition = 0;

  const sorted = [
    ...msdRadixSort(negative, startPosition, longest).reverse(),
    ...msdRadixSort(positive, startPosition, longest),
  ];

  return sorted;
}

// TODO(mark 2026-11-21): doc
export function digitAt(
  value: number,
  position: number,
  longest: number = 0,
): number {
  if (!isFinite(value) || !value) {
    return 0;
  }

  // Use the absolute value because Radix sort works with positive numbers.
  const stringified = String(Math.abs(value)).padStart(longest, '0');
  return Number(stringified.at(position) ?? 0);
}

export interface Buckets {
  longest: number;
  negative: number[];
  positive: number[];
}

// TODO(mark 2026-11-21): doc
export function toBuckets(arr: number[]): Buckets {
  const negative: number[] = [];
  const positive: number[] = [];
  let longest = 0;

  arr.forEach((value) => {
    if (isFinite(value) && value) {
      const stringified = String(value);

      if (stringified.length > longest) {
        longest = stringified.length;
      }
    } else {
      longest ||= 1;
    }

    if (value < 0) {
      negative.push(value);
    } else {
      positive.push(value);
    }
  });

  return { longest, positive, negative };
}
