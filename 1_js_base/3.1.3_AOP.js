/**
 * AOP：面向切面编程
 *
 * 像监控、异常处理可以抽离出来，通过AOP动态织入业务逻辑模块
 */

function log() {
  console.log("this is a log");
}

Function.prototype.before = function (beforeFn) {
  const _self = this;
  console.log(this);
  return function () {
    beforeFn.apply(this, arguments);
    return _self.apply(this, arguments);
  };
};

Function.prototype.after = function (afterFn) {
  const _self = this;
  return function () {
    const res = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return res;
  };
};

const logAOP = log
  .before(() => {
    console.log("before");
  })
  .after(() => {
    console.log("after");
  });

logAOP();
