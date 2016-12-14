'use strict';

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
 * @param {number} value - Current value in collection.
 * @param {number} comparison - Comparison value in collection.
 * @return {number} - Next value subtracted from current.
 */

function spaceship(value, comparison) {
    return value < comparison ? -1 : value === comparison ? 0 : 1;
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

Srtr.prototype.quicksort = function(collection, predicate = spaceship) {
    /* eslint no-magic-numbers: "off" */
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
 * TODO: Document this for newbies.
 *
 * @public
 * @see https://en.wikipedia.org/wiki/Bubble_sort
 * @param {array} collection - Unsorted collection
 * @param {function} predicate - Predicate function to test values.
 * @return {array} collection - Sorted collection.
 */

Srtr.prototype.bubblesort = function(collection, predicate = spaceship) {
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
