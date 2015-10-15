import {expect} from 'chai';

import Hera, {schema} from '../src/';

test('get', () => {
  @schema({ title: null })
  class Post extends Hera {}

  expect(new Post({ title: 'test' }).get('title')).to.eq('test');
});
