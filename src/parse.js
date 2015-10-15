import is from 'is';

import cast from './cast';
import {freeze} from './utils';

function getTypes(name, schema) {
  if (!is.array(schema[name])) {
    return [schema[name]];
  }

  if (schema[name].length === 1) {
    return [schema[name]];
  }

  return schema[name];
}

export default function parse(params, schema) {
  let ret = Object.create(null);

  Object.keys(schema).forEach((name) => {
    const types = getTypes(name, schema);
    const value = cast(params[name], types);
    ret[name] = freeze(value);
  });

  return ret;
}
