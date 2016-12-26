# srtr
srtr is a collection of sort algorithms written in JavaScript in a recursive, functional style using ES6 syntax. Code examples are heavily annotated for learners and students and the merely curious alike.

[![Build Status](https://travis-ci.org/bhalash/srtr.svg?branch=master)](https://travis-ci.org/bhalash/srtr)
[![dependencies Status](https://david-dm.org/bhalash/srtr/status.svg)](https://david-dm.org/bhalash/srtr)
[![devDependencies Status](https://david-dm.org/bhalash/srtr/dev-status.svg)](https://david-dm.org/bhalash/srtr?type=dev)
[![npm version](https://badge.fury.io/js/srtr.svg)](https://badge.fury.io/js/srtr)

## Installation

    npm install srtr

## Usage

    srtr.quicksort(collection[, predicate]);
    const srtr = require('srtr');

To sort using the default predicate (lexicographic order):

    const planets = ['Kaitain', 'Geidi Prime', 'Arrakis', 'Ecaz', 'Chapterhouse'];
    srtr.quicksort(planets);
    srtr.bubblesort(planets);

An overriding predicate may be passed as a second parameter:

    const contacts = [
        { name: 'Paul', age: 15 },
        { name: 'Shaddam', age: 75 },
        { name: 'Leto', 'age: 60 }
    ];

    srtr.quicksort(contacts, (a, b) => a.age - b.age);

    srtr.bubblesort(contact, (a, b) => {
        return a.name < b.name ? -1 : a.name === b.name ? 0 : 1;
    });

### Testing

    npm run test

## Contributing
Go wild! All pull requests are welcome.

## Copyright
Copyright (c) 2016 [Mark Grealish][10]. See [LICENSE](LICENSE) for details.
