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
 * bubblesort() Method
 * =============================================================================
 */

tape('bubblesort()', assert => {
    const victim = comparison;

    assert.plan(3);
    assert.equal(typeof srtr.bubblesort, 'function');
    assert.deepEqual(srtr.bubblesort(scramble.array(victim)), presorted);
    assert.deepEqual(victim, comparison);
});

/**
 * bogosort() Method
 * =============================================================================
 */

tape('bogosort()', assert => {
    const victim = ['Y', 'O', 'L', 'O'];
    const comparison = ['Y', 'O', 'L', 'O'];
    const sorted = ['L', 'O', 'O', 'Y'];

    assert.plan(3);
    assert.equal(typeof srtr.bogosort, 'function');
    assert.deepEqual(srtr.bogosort(victim), sorted);
    assert.deepEqual(victim, comparison);
});

/**
 * radixsort() Method
 * =============================================================================
 */

tape('radixsort()', assert => {
    const victim = comparison;

    assert.plan(3);
    assert.equal(typeof srtr.radixsort, 'function');
    assert.deepEqual(srtr.radixsort(scramble.array(victim)), presorted);
    assert.deepEqual(victim, comparison);
});
