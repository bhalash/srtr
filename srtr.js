'use strict';

const Srtr = function() {};

/**
 * Bubble sort a collection.
 *
 * @public
 * @see https://en.wikipedia.org/wiki/Bubble_sort
 * @param {array} collection - Unsorted array.
 * @param {function} predicate - Predicate function to test values.
 * @return {array} collection - Sorted arraylike object.
 */

Srtr.prototype.bubble = function(collection, predicate) {
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
