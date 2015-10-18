import {Map} from 'immutable';
import {freeze, toJSDeep, setProp} from './utils';
import parse from './parse';

export default class Kingpin {
  static from(object) {
    if (object instanceof this) {
      return object;
    }

    if (object.toJS) {
      object = object.toJS();
    }

    return new this(object);
  }

  constructor(params) {
    this.__params = params;
    const attrs = parse(params || {}, this.constructor.schema);
    Object.keys(attrs).forEach((name) => setProp(this, name));
    this._map = Map(attrs);
    Object.freeze(this);
  }

  get(name) {
    return this._map.get(name);
  }

  set(key, value) {
    const newMap = this._map.set(key, value);
    return this.constructor.from(newMap);
  }

  has(key) {
    return this.constructor.schema.hasOwnProperty(key);
  }

  remove(key) {
    const newMap = this._map.remove(key);
    return new this.constructor(newMap);
  }

  toJS() {
    return toJSDeep(this._map);
  }

  clone() {
    return new this.constructor(this.toJS());
  }

  merge(attrs = {}) {
    return new this.constructor({ ...this.toJS(), ...attrs });
  }
}
