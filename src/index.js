import is from 'is';

import Kingpin from './Kingpin';

export default Kingpin;

/**
 * Schema decorator.
 *
 * @param {Object} params
 * @returns {Decorator}
 * @public
 */

export function schema(params) {
  if (!is.object(params)) {
    throw new Error('You must specify a schema');
  }

  return function(Target) {
    const schema = Target.schema || {};
    Target.schema = {...schema, ...params};
    return Target;
  };
}
