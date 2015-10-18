import {expect} from 'chai';

import Kingpin, {schema} from '../src/';

test('clone', () => {
  @schema({ title: null })
  class Post extends Kingpin {}

  const post = new Post({ title: 'test' });
  const newPost = post.clone();

  expect(post.title).to.equal('test');
  expect(newPost.title).to.equal('test');
});
