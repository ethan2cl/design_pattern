/**
 * 给对象动态添加职责的方式称为装饰着模式
 */
let a = function () {
  console.log(1);
};

const _a = a;

a = function () {
  _a();
  console.log(2);
};

a();

// AOP装饰函数
Function.prototype.before = function (fn) {
  const self = this;
  return function () {
    fn.apply(this, arguments);
    return self.apply(this, arguments);
  };
};

Function.prototype.after = function (fn) {
  const self = this;
  return function () {
    const ret = self.apply(this, arguments);
    fn.apply(this, arguments);
    return ret;
  };
};

const test = function () {
  console.log("this is a test!");
};
const aop = test
  .before(function () {
    console.log("before test");
  })
  .after(function () {
    console.log("after test");
  });

aop();
