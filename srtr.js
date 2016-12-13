'use strict';

const Srtr = function() {};

/**
 * Private fallback predicate for bubble sort function.
 *
 * TODO: Explain the subtraction.
 *
 * @example
 *
 *      10 - 7  //  3
 *      10 - 10 //  0
 *      10 - 13 // -3
 *
 * @private
 * @param {number} current
 * @param {number} next
 * @return {number} - Next value subtracted from current.
 */

function bubblePredicate(current, next) {
    return current - next;
}

/**
 * Use recursive quicksort to reorder a collection.
 *
 * TODO: Document this for newbies.
 *
 * @public
 * @see https://en.wikipedia.org/wiki/Quicksort
 * @param {array} collection - Unsorted collecton.
 * @return {array} collection - Sorted collecton.
 */

Srtr.prototype.quicksort = function(collection) {
    /* eslint no-magic-numbers: "off" */
    if (collection.length < 2) {
        return collection;
    }

    const pivot = collection[collection.length >> 1];

    return [
        ...this.quicksort(collection.filter(element => element < pivot)),
        ...collection.filter(element => element === pivot),
        ...this.quicksort(collection.filter(element => element > pivot))
    ];
};

/**
 * Use iterative bubble sort to reorder a collection.
 *
 * TODO: Document this for newbies.
 * TODO: Document spaceship (<=>) operator.
 *
 * @example
 *
 *      2 <=> 3 // -1
 *      3 <=> 3 //  0
 *      3 <=> 2 //  1
 *
 * @public
 * @see https://en.wikipedia.org/wiki/Bubble_sort
 * @see https://en.wikipedia.org/wiki/Three-way_comparison
 * @param {array} collection - Unsorted collection
 * @param {function} predicate - Predicate function to test values.
 * @return {array} collection - Sorted collection.
 */

Srtr.prototype.bubblesort = function(collection, predicate = bubblePredicate) {
    collection = collection.slice();

    for (let index = 0; index < collection.length - 1; index++) {
        if (parseInt(predicate(collection[index], collection[index + 1])) > 0) {
            [collection[index], collection[index + 1]] = [collection[index + 1], collection[index]];
            index = 0;
        }
    }

    return collection;
};

module.exports = Object.create(Srtr.prototype);
