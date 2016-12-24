'use strict';
/* eslint no-magic-numbers: "off" */

const Srtr = function() {};

/**
 * Default predicate which performs lexicographic three-way comparison of two
 * values. The is the fundamental building block of most sorting algorithms:
 *
 * @example
 *
 *      A < B // -1
 *      A = B //  0
 *      A > B //  1
 *
 * A value above 0 indicates that A < B, and a sort operation then occurs. When
 * dealing with numbers, three-way comparisons can be shorted by the subtraction
 * of the second number from the first.
 *
 * Ruby's spaceship (<=>) typifies a three-way comparison:
 *
 * @example
 *
 *      7 <=> 9 // -1
 *      7 <=> 7 //  0
 *      9 <=> 7 //  1
 *
 * @private
 * @see https://en.wikipedia.org/wiki/Three-way_comparison
 * @param {number} current - Current value in collection.
 * @param {number} next - Next, comparison value in collection.
 * @return {number} - Next value subtracted from current.
 */

function spaceship(current, next) {
    return current < next ? -1 : current === next ? 0 : 1;
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
 *
 * @public
 * @see https://en.wikipedia.org/wiki/Quicksort
 * @param {array} collection - Unsorted collecton.
 * @return {array} collection - Sorted collecton.
 */

Srtr.prototype.quicksort = function(collection, predicate = spaceship) {
    if (collection.length < 2) {
        return collection;
    }

    const pivot = collection[collection.length >> 1];

    return [
        ...this.quicksort(collection.filter(element => predicate(element, pivot) < 0), predicate),
        ...collection.filter(element => predicate(element, pivot) === 0),
        ...this.quicksort(collection.filter(element => predicate(element, pivot) > 0), predicate)
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
 * @param {function} predicate - Predicate function to test values.
 * @return {array} collection - Sorted collection.
 */

Srtr.prototype.bubblesort = function(collection, predicate = spaceship) {
    if (collection.length < 2) {
        return collection;
    }

    let sorted = true;
    collection = collection.slice();

    for (let index of collection.keys()) {
        if (parseInt(predicate(collection[index], collection[index + 1])) > 0) {
            [collection[index], collection[index + 1]] = [collection[index + 1], collection[index]];
            sorted = false;
        }
    }

    if (sorted) {
        return collection;
    } else {
        return this.bubblesort(collection, predicate);
    }
};

module.exports = Object.create(Srtr.prototype);
