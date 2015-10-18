import {expect} from 'chai';

import Kingpin, {schema} from '../src/';

test('toJS', () => {
  @schema({ name: null })
  class Tag extends Kingpin {}

  @schema({ title: null, tags: Array(Tag) })
  class Post extends Kingpin {}

  const post = new Post({
    title: 'test',
    tags: [{ name: 'test' }],
  }).toJS();

  expect(post).to.be.an.object;
  expect(post.title).to.eq('test');

  expect(post.tags).to.be.an.array;
  expect(post.tags[0]).to.be.an.object;
  expect(post.tags[0].name).to.equal('test');
});
