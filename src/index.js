import is from 'is';

import {freeze} from './utils';
import Hera from './Hera';

export default Hera;

export function schema(params) {
  if (!is.object(params)) {
    throw new Error('You must specify a schema');
  }

  return function(Target) {
    const schema = Target.schema || {};
    Target.schema = {...schema, ...params};
    freeze(Target.schema);
    return Target;
  };
}
