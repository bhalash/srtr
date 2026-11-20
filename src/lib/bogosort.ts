import { Comparator, sorted } from './utils';

// Scramble the order of elements in an array.
function toShuffled<T>(arr: T[]): T[] {
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
 * Return a random value up to max.
 */
function random(maxValue: number): number {
  return Math.floor(Math.random() * maxValue);
}

/**
 * "Notice this rent in my garment; I am at a loss to explain its presence! I
 * am even more puzzled by the existence of the universe."
 * - Jack Vance, Tales of the Dying Earth
 *
 * Randomly shuffle a collection until it happens to be sorted.
 *
 * @example
 *
 *  [3, 1, 2]  -> not sorted, shuffle
 *  [1, 3, 2]  -> not sorted, shuffle
 *  [2, 1, 3]  -> not sorted, shuffle
 *  [1, 2, 3]  -> sorted, return
 *
 * The expected number of shuffles grows with the number of possible
 * permutations, making Bogosort impressively impractical. Even the two
 * smallest unsorted arrangements can require repeated random trials, and an
 * n-element array has n! possible permutations.
 *
 * The beatings will continue until morale improves.
 *
 * @see https://en.wikipedia.org/wiki/Bogosort
 */
export function bogosort<T>(arr: T[], comparator: Comparator<T>): T[] {
  let copy = [...arr];

  while (!sorted(copy, comparator)) {
    copy = toShuffled(copy);
  }

  return copy;
};
