import {expect} from 'chai';

import Hera, {schema} from '../src/';

test('any type', () => {
  @schema({ title: null })
  class Post extends Hera {}

  expect(new Post({ title: 'test' }).title).to.eq('test');
  expect(new Post({ title: true }).title).to.eq(true);
});

test('string', () => {
  @schema({ title: String })
  class Post extends Hera {}

  expect(new Post({ title: 'test' }).title).to.eq('test');
  expect(() => new Post({ title: false })).to.throw();
  expect(() => new Post({ title: null })).to.throw();
});

test('number', () => {
  @schema({ title: Number })
  class Post extends Hera {}

  expect(new Post({ title: 3 }).title).to.eq(3);
  expect(() => new Post({ title: false })).to.throw();
  expect(() => new Post({ title: null })).to.throw();
});

test('boolean', () => {
  @schema({ title: Boolean })
  class Post extends Hera {}

  expect(new Post({ title: true }).title).to.eq(true);
  expect(() => new Post({ title: 'str' })).to.throw();
  expect(() => new Post({ title: null })).to.throw();
});

test('object', () => {
  @schema({ title: Object })
  class Post extends Hera {}

  expect(new Post({ title: { foo: true } }).title).to.deep.eq({ foo: true });
  expect(() => new Post({ title: 'str' })).to.throw();
  expect(() => new Post({ title: null })).to.throw();
});

test('array', () => {
  @schema({ title: Array })
  class Post extends Hera {}

  expect(new Post({ title: [1] }).title[0]).to.deep.eq(1);
  expect(() => new Post({ title: 'str' })).to.throw();
  expect(() => new Post({ title: null })).to.throw();
});

test('classes', () => {
  @schema({ name: String })
  class Author extends Hera {}

  @schema({ author: Author })
  class Post extends Hera {}

  const post = new Post({ author: { name: 'John' } });
  expect(post.author).to.be.instanceof(Author);
  expect(post.author.name).to.eq('John');
});

test('array of classes with primitive type', () => {
  @schema({ authors: [String] })
  class Post extends Hera {}

  const post = new Post({ authors: [1, 2, 3] });

  expect(post.authors).to.be.an.array;
  expect(post.authors).to.deep.equal(['1', '2', '3']);
});

test('array of classes with another record', () => {
  @schema({ name: String })
  class Author extends Hera {}

  @schema({ authors: [Author] })
  class Post extends Hera {}

  const post = new Post({ authors: [{ name: 'test' }] });

  expect(post.authors).to.be.an.array;
  expect(post.authors[0]).to.be.instanceof(Author);
  expect(post.authors[0].name).to.eq('test');
});

test('optional', () => {
  @schema({ title: [String, null] })
  class Post extends Hera {}

  expect(new Post({ title: null }).title).to.eq(null);
});

test('one type or another type', () => {
  @schema({ title: [String, Number] })
  class Post extends Hera {}

  expect(new Post({ title: 'test' }).title).to.eq('test');
  expect(new Post({ title: 3 }).title).to.eq(3);

  expect(() => new Post({ title: false })).to.throw();
  expect(() => new Post({ title: {} })).to.throw();
});
