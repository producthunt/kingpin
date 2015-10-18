import {expect} from 'chai';

import Kingpin, {schema} from '../src/';

test('merge', () => {
  @schema({ title: null })
  class Post extends Kingpin {}

  const post = new Post({ title: 'test' });
  const newPost = post.merge({ title: 'other' });

  expect(newPost.title).to.equal('other');
});
