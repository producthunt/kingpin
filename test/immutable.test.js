import {expect} from 'chai';

import Kingpin, {schema} from '../src/';

test('immutable props', () => {
  @schema({ title: String })
  class Post extends Kingpin {}

  const post = new Post({ title: 'test' });
  expect(() => post.title = 3).to.throw();
  expect(() => post.other = 3).to.throw();
});
