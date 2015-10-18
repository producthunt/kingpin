import is from 'is';

import cast from './cast';

/**
 * Return all types for the given schema property.
 *
 * @param {String} name
 * @param {Object} schema
 * @returns {Array}
 * @private
 */

function getTypes(name, schema) {
  if (!is.array(schema[name])) {
    return [schema[name]];
  }

  if (schema[name].length === 1) {
    return [schema[name]];
  }

  return schema[name];
}

/**
 * Parse `params` for given `schema`.
 *
 * @param {Object} params
 * @param {Object} schema
 * @returns {Object}
 * @public
 */

export default function parse(params, schema) {
  let ret = Object.create(null);

  Object.keys(schema).forEach((name) => {
    const types = getTypes(name, schema);
    ret[name] = cast(params[name], types, name);
  });

  return ret;
}
