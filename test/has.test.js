import {expect} from 'chai';

import Kingpin, {schema} from '../src/';

test('has', () => {
  @schema({ title: null })
  class Post extends Kingpin {}

  const post = new Post({ title: 'test' });

  expect(post.has('title')).to.be.true;
  expect(post.has('other')).to.be.false;
});
