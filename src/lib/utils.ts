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
export const compareNumbers: Comparator<number> = (a, b) => a - b;
export const compareStrings: Comparator<string> = (a, b) => a.localeCompare(b);

export function sorted<T>(arr: T[], comparator: Comparator<T>): boolean {
  if (arr.length < 2) {
    return true;
  } else {
    // The slice excludes the last index
    return arr.slice(1).every((val, index) => comparator(val, arr[index]) > -1);
  }
}

export function longestNumber(arr: number[]): number {
  if (!arr.length) {
    return 0;
  }

  return arr.reduce((highest, value) => {
    if (!isFinite(value) || !value) {
      return 0;
    }

    const { length } = String(value);

    if (length > highest) {
      return length;
    } else {
      return highest;
    }
  }, 0);
}

// TODO(mark 2026-11-17): How to properly handle negative numbers?
export function toStrings(arr: number[]): string[] {
  const longest = longestNumber(arr);

  return arr.map((value) => {
    if (!isFinite(value) || !value) {
      value = 0;
    }

    return String(Math.abs(value)).padStart(longest, '0');
  });
}

export function toNumbers(arr: string[]): number[] {
  return arr.flat().map(Number);
}

export function digitAt(value: string, position: number): number {
  return Number(value.at(position) ?? 0);
}
