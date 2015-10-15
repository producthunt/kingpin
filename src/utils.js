import is from 'is';

export function isEmpty(value) {
  return is.undef(value) || is.nil(value);
}

export function hasEmpty(types) {
  return types.indexOf(null) !== -1 || types.indexOf(undefined) !== -1;
}

export function freeze(o) {
  Object.freeze(o);

  if (!o) return o;

  var oIsFunction = typeof o === "function";
  var hasOwnProp = Object.prototype.hasOwnProperty;

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (hasOwnProp.call(o, prop)
    && (oIsFunction ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments' : true )
    && o[prop] !== null
    && (typeof o[prop] === "object" || typeof o[prop] === "function")
    && !Object.isFrozen(o[prop])) {
      freeze(o[prop]);
    }
  });

  return o;
}

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
