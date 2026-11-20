# srtr
srtr is a collection of sort algorithms written in JavaScript in a recursive,
functional style using ES6 syntax. Code examples are heavily annotated for
learners, students and the merely curious alike.

## Installation

```sh
npm install srtr
```

## Usage

```typescript
import { quicksort } from 'srtr';

const planets = [
  'Kaitain',
  'Geidi Prime',
  'Arrakis',
  'Ecaz',
  'Chapterhouse'
];

quicksort(planets, (a, b) => a.localeCompare(b));
```

## Sort functions

The package exports four sorting functions:

### `bubblesort(array, comparator)`

Iteratively swaps adjacent values until the array is sorted. The original
array is not modified.

```typescript
import { bubblesort } from 'srtr';

// [2, 24, 25, 45, 66, 75, 170, 802]
bubblesort([170, 45, 75, 25, 2, 24, 802, 66], (a, b) => a - b);
```

### `bogosort(array, comparator)`

Repeatedly shuffles a copy of the array until a comparator reports that it is
sorted. This is an educational, probabilistic algorithm and is not suitable
for production-sized collections.

```typescript
import { bogosort } from 'srtr';

// [1, 2, 3]
bogosort([3, 1, 2], (a, b) => a - b);
```

### `quicksort(array, comparator)`

Recursively divides the array around a midpoint pivot, sorts the smaller and
larger partitions, and recombines them. The original array is not modified.

```typescript
import { quicksort } from 'srtr';

// [2, 24, 25, 45, 66, 75, 170, 802]
quicksort([170, 45, 75, 25, 2, 24, 802, 66], (a, b) => a - b);
```

### `radixsort(array)`

Forward most-significant-digit radix sorts an array of numbers. Values are
temporarily converted to 0-padded strings so that equal-width digit positions
can be distributed into buckets, then converted back to numbers.

```typescript
import { radixsort } from 'srtr';

// [2, 24, 25, 45, 66, 75, 170, 802]
radixsort([170, 45, 75, 25, 2, 24, 802, 66]);
```

### Comparators

An overriding comparator can be passed as a second parameter:

```typescript
import { quicksort } from 'srtr';

const contacts = [
  { name: 'Paul', age: 15 },
  { name: 'Shaddam', age: 75 },
  { name: 'Leto', age: 60 }
];

quicksort(contacts, (a, b) => a.age - b.age);
```

### Testing

```sh
npm run test
```

## Copyright
Copyright (c) 2026 [Mark Grealish](https://www.bhalash.com). See [LICENSE](LICENSE) for details.
