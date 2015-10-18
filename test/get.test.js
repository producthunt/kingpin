import {expect} from 'chai';

import Kingpin, {schema} from '../src/';

test('get', () => {
  @schema({ title: null })
  class Post extends Kingpin {}

  expect(new Post({ title: 'test' }).get('title')).to.eq('test');
});
