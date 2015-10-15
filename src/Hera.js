import {freeze} from './utils';
import parse from './parse';

function setProp(proto, name) {
  Object.defineProperty(proto, name, {
    get: function() {
      return this.get(name);
    },

    set: function() {
      throw new Error('Cannot set on an immutable object');
    }
  });
}

export default class Hera {
  constructor(params) {
    this.__params = params;
    this.__attrs = parse(params || {}, this.constructor.schema);

    Object.keys(this.__attrs).forEach((name) => setProp(this, name));
    freeze(this);
  }

  get(name) {
    return this.__attrs[name];
  }

  toJS() {
    return {...this.__params};
  }

  clone() {
    return this.constructor.new(this.toJS());
  }

  merge(attrs) {
    return this.constructor.new(this.toJS(), {...atrs});
  }
}
