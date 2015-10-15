import {expect} from 'chai';

import Hera, {schema} from '../src/';

test('inheritance', () => {
  @schema({ title: Number })
  class BasePost extends Hera {}

  @schema({ description: String })
  class PostDesc extends BasePost {}

  @schema({ title: String, author: String })
  class Post extends PostDesc {}

  const post = new Post({
    title: 'test',
    author: 'Test',
    description: 'desc',
    other: 'foo',
  });

  expect(post.title).to.equal('test');
  expect(post.description).to.equal('desc');
  expect(post.author).to.equal('Test');
  expect(post.other).to.not.exist;
});

test('inheritance with arrays', () => {
  @schema({ title: [Number, null] })
  class BasePost extends Hera {}

  @schema({ title: [String] })
  class Post extends BasePost {}

  expect(Post.schema.title).to.deep.equal([String]);
});
