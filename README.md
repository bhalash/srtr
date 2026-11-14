# srtr
srtr is a collection of sort algorithms written in JavaScript in a recursive, functional style using ES6 syntax. Code examples are heavily annotated for learners and students and the merely curious alike.

[![Build Status](https://travis-ci.org/bhalash/srtr.svg?branch=master)](https://travis-ci.org/bhalash/srtr)
[![dependencies Status](https://david-dm.org/bhalash/srtr/status.svg)](https://david-dm.org/bhalash/srtr)
[![devDependencies Status](https://david-dm.org/bhalash/srtr/dev-status.svg)](https://david-dm.org/bhalash/srtr?type=dev)
[![npm version](https://badge.fury.io/js/srtr.svg)](https://badge.fury.io/js/srtr)

## Installation

```sh
npm install srtr
```

## Usage

```typescript
import { compareStrings, quicksort } from 'srtr';

const planets = [
  'Kaitain',
  'Geidi Prime',
  'Arrakis',
  'Ecaz',
  'Chapterhouse'
];

quicksort(planets, compareStrings);
```

### Comparators

An overriding comparator can be passed as a second parameter:

```typescript
import { quicksort } from 'srtr';

const contacts = [
  { name: 'Paul', age: 15 },
  { name: 'Shaddam', age: 75 },
  { name: 'Leto', 'age: 60 }
];

quicksort(contacts, (a, b) => a.age - b.age);
```

### Testing

```sh
npm run test
```

## Contributing
Go wild! All pull requests are welcome.

## Copyright
Copyright (c) 2016 [Mark Grealish][1]. See [LICENSE](LICENSE) for details.

[1]: https://www.bhalash.com
