import {expect} from 'chai';

import Kingpin, {schema} from '../src/';

test('remove', () => {
  @schema({ title: null })
  class Post extends Kingpin {}

  const post = new Post({ title: 'test' });
  const newPost = post.remove('title');

  expect(post.title).to.equal('test');
  expect(newPost.title).to.not.exist;
});
