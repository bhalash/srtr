'use strict';
/* eslint no-magic-numbers: "off" */

const Srtr = function() {};

/**
 * Fallback sort predicate. Perform ternary comparsion of numbers.
 *
 * TODO: Explain all this.
 * TODO: Document spaceship (<=>) operator.
 *
 * @example
 *
 *      2 <=> 3 // -1
 *      3 <=> 3 //  0
 *      3 <=> 2 //  1
 *
 * @example
 *
 *      10 - 7  //  3
 *      10 - 10 //  0
 *      10 - 13 // -3
 *
 * @private
 * @see https://en.wikipedia.org/wiki/Three-way_comparison
 * @see https://en.wikipedia.org/wiki/%3F:
 * @param {number} value - Current value in collection.
 * @param {number} comparison - Comparison value in collection.
 * @return {number} - Next value subtracted from current.
 */

function spaceship(value, comparison) {
    return value < comparison ? -1 : value === comparison ? 0 : 1;
}

/**
 * Use recursive quicksort to reorder a collection. Quicksort works by:
 *
 *  1. Identifying a pivot point (the midpoint rounded down in this case) in the
 *     array. Other implementations apply more intelligence or start at tne end.
 *  2. Think of a left-to-right arrangement:
 *        a. Values smaller than the pivot go into a new array put before the pivot.
 *        b. Values larger than the pivot go into a new array put after the pivot.
 *  3. Repeat this recursively with each sub array until arrays of a single
 *     element in size.
 *  4. Merge and return the array.
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
 * TODO: Document this for newbies.
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

    for (let index = 0; index < collection.length - 1; index++) {
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
