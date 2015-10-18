# Kingpin

Better Immutable.js Records

## Installation

Install via npm as a dependency:

```shell
$ npm install kingpin --save
```

## Getting Started

#### Complete example

```js
import Kingpin, {schema} from 'kingpin';

@schema({ name: String })
class Author extends Kingpin {
  firstName() {
    return this.name.split(' ')[0];
  }
}

@schema({
  title: String,
  user: [Object, null],
  authors: Array(Author),
  createdAt: Date,
})
class Post extends Kingpin {
}

@schema({
  title: [String, null] // make the title optional
})
class GamePost extends Post {
}

const gamePost = new GamePost({
  title: 'GTA',
  user: null, // optional
  authors: [{ name: 'John Doe' }],
  createdAt: '2015-01-01',
});

console.log(gamePost.title); // => GTA
console.log(gamePost.user); // => null
console.log(gamePost.createdAt); // => Thu Jan 01 2015 02:00:00 GMT+0200 (EET)
console.log(gamePost.authors[0].firstName()); // => John
```

## Development

```js
$ npm install
```

#### Tests

```js
$ npm test
```

## License

MIT (Product Hunt Inc.)
