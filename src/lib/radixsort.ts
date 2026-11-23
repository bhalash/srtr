export interface RadixParams {
  longest?: number;
  position?: number;
}

export interface RadixBuckets {
  longest: number;
  negative: number[];
  positive: number[];
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
function msdRadixSort(
  arr: number[],
  { longest = 0, position = 0 }: RadixParams = {}
): number[] {
  // Strings are normalised to the longest value by this point. If position is
  // beyond the length of the first item, then we've descended as far as we
  // need, and the array is already sorted.
  if (arr.length < 2 || position > longest) {
    return arr;
  }

  const buckets: Record<number, number[]> = {};

  arr.forEach((value) => {
    const digit = digitAt(value, { longest, position });
    buckets[digit] ??= [];
    buckets[digit].push(value);
  });

  return Object.values(buckets).flatMap((bucket) => {
    return msdRadixSort(bucket, { longest, position: position + 1 });
  });
}

/**
 * Radix sort an array per the bucketed values.
 *
 * @see msdRadixSort
 * @see toBuckets
 */
export function radixsort(arr: number[]): number[] {
  const { longest, negative, positive } = toBuckets(arr);

  const sorted = [
    ...msdRadixSort(negative, { longest, position: 0 }).reverse(),
    ...msdRadixSort(positive, { longest, position: 0 }),
  ];

  return sorted;
}

/**
 * Retrieve the digit at a given position from a digit, given leading 0 padding.
 *
 * - Convert the digit to a string.
 * - Pad it left per the longest number in the root array.
 * - Return the digit at the given position.
 *
 * It's an opinionated - and probably wrong - choice by me that I return zero
 * when given some odd value such as null, undefined, NaN, or Infinite.
 *
 * @see https://en.wikipedia.org/wiki/Radix_sort#Most_significant_digit,_forward_recursive
 */
export function digitAt(
  value: number,
  { longest = 0, position = 0 }: RadixParams = {}
): number {
  if (!isFinite(value) || !value) {
    return 0;
  }

  // Use the absolute value because Radix sort works with positive numbers.
  const stringified = String(Math.abs(value)).padStart(longest, '0');
  return Number(stringified.at(position) ?? 0);
}

/**
 * Break the array into positive and negative buckets, and figure out the
 * longest number by count of digits.
 *
 * Radix sort is designed for positive numbers, so I handle negatives by
 * inverting these and sorting them as positive. For that they have to be
 * bucketed out.
 *
 * Since the most-significant digit method pads numbers with leading zeroes per
 * the longest number, it's handy to find it here.
 *
 * @see https://en.wikipedia.org/wiki/Radix_sort#Most_significant_digit,_forward_recursive
 */
export function toBuckets(arr: number[]): RadixBuckets {
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
