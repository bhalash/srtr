/* eslint no-magic-numbers: "off" */

const tape = require('tape');
const scramble = require('wordscramble');
const srtr = require('../');

const comparison = [2, 0, 1, 5, 7, 9, 2, 1, 0, 1, 9, 1];
const presorted = [0, 0, 1, 1, 1, 1, 2, 2, 5, 7, 9, 9];

/**
 * quicksort() Method
 * =============================================================================
 */

tape('quicksort()', assert => {
    const victim = comparison;

    assert.plan(3);
    assert.equal(typeof srtr.quicksort, 'function');
    assert.deepEqual(srtr.quicksort(scramble.array(victim)), presorted);
    assert.deepEqual(victim, comparison);
});

/**
 * quicksort() Method
 * =============================================================================
 */

tape('bubblesort()', assert => {
    const victim = comparison;

    assert.plan(3);
    assert.equal(typeof srtr.bubblesort, 'function');
    assert.deepEqual(srtr.bubblesort(scramble.array(victim)), presorted);
    assert.deepEqual(victim, comparison);
});
