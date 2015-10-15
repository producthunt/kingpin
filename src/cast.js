import is from 'is';

import {isEmpty, hasEmpty, construct} from './utils';

const VALIDATORS = {
  [String]: is.string,
  [Number]: is.number,
  [Boolean]: is.boolean,
  [Array]: is.array,
  [Object]: is.object,
}

export default function cast(value, types) {
  const isOptional = hasEmpty(types);
  const castable = types.filter((type) => !isEmpty(type));
  const isAny = castable.length === 0 && isOptional;

  if (isAny || (isOptional && isEmpty(value))) {
    return value;
  }

  if (!isOptional && isEmpty(value)) {
    throw new Error('you must provide value');
  }

  for (const type of castable) {
    // array of classes
    if (is.array(type)) {
      if (!is.array(value)) continue;
      return value.map((item) => construct(type[0], item));
    }

    // basic type
    if (VALIDATORS[type]) {
      if (VALIDATORS[type](value, type)) return value;
      continue;
    }

    // class
    if (is.fn(type)) {
      return new type(value);
    }
  }

  throw new Error;
}
