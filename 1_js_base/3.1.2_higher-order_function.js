/**
 * 高阶函数
 * 条件：
 * 1、函数可以作为参数被传递
 * 2、函数可以作为返回值输出
 *
 * 很容易做到分离业务代码中变和不变的部分
 */
const { hr } = require("../shared");

const array = [3, 1, 2];
array.sort((a, b) => b - a);
console.log(array);

const isType = function (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === type;
  };
};

const isString = isType("String");
const isNumber = isType("Number");
console.log(isString("123"));
console.log(isNumber(123));
hr();
/**
 * 函数柯里化（部分求值）
 */

const sum = (array) => array.reduce((prev, curr) => (prev += curr), 0);

const cost = (function () {
  const args = [];
  return function () {
    if (!arguments.length) {
      console.log(sum(args));
    } else {
      Array.prototype.push.apply(args, arguments);
    }
  };
})();

cost(1);
cost(2);
cost(3);
cost();
cost(4);
cost();
hr();

/**
 * 通用化currying函数
 */
function currying(fn) {
  const args = [];
  return function () {
    if (!arguments.length) {
      return fn(args);
    } else {
      Array.prototype.push.apply(args, arguments);
      return arguments.callee;
    }
  };
}

const cost1 = currying(sum);
cost1(100);
cost1(200);
console.log(cost1());
cost1(300);
console.log(cost1());
hr();

/**
 * un-curring，泛化this的过程提取出来
 */
Function.prototype.uncurrying = function () {
  var self = this;
  return function () {
    var obj = Array.prototype.shift.call(arguments);
    return self.apply(obj, arguments);
  };
};

const push = Array.prototype.push.uncurrying();
(function () {
  push(arguments, 4);
  console.log(arguments);
})(1, 2, 3);
