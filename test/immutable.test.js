import {expect} from 'chai';

import Kingpin, {schema} from '../src/';

test('immutable props', () => {
  @schema({ title: String })
  class Post extends Kingpin {}

  const post = new Post({ title: 'test' });
  expect(() => post.title = 3).to.throw();
  expect(() => post.other = 3).to.throw();
});

test('immutable members', () => {
  class Other {
    setFoo() {
      this.foo = 3;
    }
  }

  class Author {
    constructor(name) {
      this.name = name;
      this.other = new Other;
    }
  }

  @schema({ arr: [Author] })
  class Post extends Kingpin {}

  const post = new Post({ arr: ['test'] });

  expect(() => post.arr[0].other.setFoo()).to.throw();

  expect(() => post.arr.push(3)).to.throw();
  expect(() => post.arr = 3).to.throw();
  expect(() => post.arr[0].name = 3).to.throw();
});
