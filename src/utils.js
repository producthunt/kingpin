import is from 'is';

/**
 * Check if `value` is null or undefined.
 *
 * @param {Mixed} value
 * @returns {Boolean}
 * @public
 */

export function isEmpty(value) {
  return is.undef(value) || is.nil(value);
}

/**
 * Check if `types` has an empty type.
 *
 * @param {Array} types
 * @returns {Boolean}
 * @public
 */

export function hasEmpty(types) {
  return types.indexOf(null) !== -1 || types.indexOf(undefined) !== -1;
}

/**
 * toJS deep.
 *
 * @param {Immutable} immutable
 * @returns {Object}
 * @public
 */

export function toJSDeep(immutable) {
  let map = immutable.toJS();

  Object.keys(map).forEach((key) => {
    if (map[key].toJS) {
      map[key] = toJSDeep(map);
    }

    if (is.array(map[key])) {
      map[key] = map[key].map((item) => {
        return toJSDeep(item);
      });
    }
  });

  return map;
}

/**
 * Construct a `fn` with `value`.
 *
 * @param {Function} fn
 * @param {Mixed} value
 * @returns {Mixed}
 * @public
 */

export function construct(fn, value) {
  if (fn === String
      || fn === Number
      || fn === Boolean
      || fn === Array
      || fn === Object
   ) {
    return fn(value);
  }

  return new fn(value);
}

/**
 * Define a property on `proto` with `name`.
 *
 * @param {Object} proto
 * @param {String} name
 * @public
 */

export function setProp(proto, name) {
  Object.defineProperty(proto, name, {
    get: function() {
      return this.get(name);
    },

    set: function() {
      throw new Error('Cannot set on an immutable object');
    }
  });
}
