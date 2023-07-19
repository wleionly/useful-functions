
function typeOf(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  };
}


function isNumber(num) {
  if (num == null) {
    return false;
  }
  return /^[+-]?\d+(?:\.\d+)?$/.test(num);
}


const isArray = typeOf('Array');
const isString = typeOf('String');
const isObject = typeOf('Object');
const isBoolean = typeOf('Boolean');
const isFunction = typeOf('Function');

exports.isArray = isArray;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isObject = isObject;
exports.isBoolean = isBoolean;
exports.isFunction = isFunction;

exports.getArray = getArray = (val, defaultVal) => {
  return isArray(val) ? val : defaultVal || [];
};
exports.getNumber = getNumber = (val, defaultVal) => {
  const isStrNumber = val && isString(val) && isNumber(+val);
  return isNumber(val) || isStrNumber ? +val : defaultVal || 0;
};
exports.getString = getString = (val, defaultVal) => {
  return isString(val) ? val : defaultVal || '';
};
exports.getObject = getObject = (val, defaultVal) => {
  return isObject(val) ? val : defaultVal || {};
};
exports.getBoolean = getBoolean = (val, defaultVal) => {
  return isBoolean(val) ? val : defaultVal || false;
};
exports.getFunction = getFunction = (val, defaultVal) => {
  return isFunction(val) ? val : defaultVal || function() {};
};
