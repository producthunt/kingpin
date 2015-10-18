import {Map} from 'immutable';

import {toJSDeep, setProp} from './utils';
import parse from './parse';

/**
 * Base class.
 */

export default class Kingpin {

  /**
   * Create a new instance from another instance of the current class,
   * immutable structure or a plain JS object.
   *
   * @returns {Kingpin}
   * @public
   * @static
   */

  static from(object) {
    if (object instanceof this) {
      return object;
    }

    if (object.toJS) {
      object = object.toJS();
    }

    return new this(object);
  }

  /**
   * Constructor.
   *
   * @param {Object} params
   */

  constructor(params) {
    this.__params = params;
    const attrs = parse(params || {}, this.constructor.schema);
    Object.keys(attrs).forEach((name) => setProp(this, name));
    this._map = Map(attrs);
    Object.freeze(this);
  }

  /**
   * Return the value of `key`.
   *
   * @returns {Mixed}
   * @public
   */

  get(key) {
    return this._map.get(key);
  }

  /**
   * Set `value` to `key` and return a new record.
   *
   * @param {String} key
   * @param {Mixed} value
   * @returns {Kingpin}
   * @public
   */

  set(key, value) {
    const newMap = this._map.set(key, value);
    return this.constructor.from(newMap);
  }

  /**
   * Check if the record has `key`.
   *
   * @param {String} key
   * @returns {Boolean}
   * @public
   */

  has(key) {
    return this.constructor.schema.hasOwnProperty(key);
  }

  /**
   * Remove `key` from map.
   *
   * @param {String} key
   * @returns {Kingpin}
   * @public
   */

  remove(key) {
    const newMap = this._map.remove(key);
    return this.constructor.from(newMap);
  }

  /**
   * Convert the record to plain JS object.
   *
   * @returns {Object}
   * @public
   */

  toJS() {
    return toJSDeep(this._map);
  }

  /**
   * toJSON
   *
   * @return {Object}
   * @public
   */

  toJSON() {
    return this.toJS();
  }

  /**
   * Clone the record.
   *
   * @returns {Kingpin}
   * @public
   */

  clone() {
    return new this.constructor(this.toJS());
  }

  /**
   * Merge the reccord with `attrs`.
   *
   * @param {Object} attrs
   * @returns {Kingpin}
   * @public
   */

  merge(attrs = {}) {
    if (attrs.toJS) attrs = attrs.toJS();
    return new this.constructor({ ...this.toJS(), ...attrs });
  }
}
