/**
 * this
 * 1、作为对象的方法调用
 * 2、作为普通函数调用
 * 3、构造器调用
 * 4、apply、call
 *
 * 总结：谁调用 指向谁
 */

const { hr } = require("../shared");

// 1、作为对象的方法调用
var obj = {
  a: 1,
  getA: function () {
    console.log(this === obj);
    console.log(this.a);
  },
};
obj.getA();
hr();

// 2、作为普通函数调用
name = "global"; // 未声明的变量默认用var，like var name = 'global'
function getName() {
  console.log(this.name);
}
getName();
hr();

// 3、构造器调用
function MyClass(name) {
  this.name = name;
}
var obj = new MyClass("ethan");
console.log(obj.name);
hr();

// 4、apply、call
var o1 = {
  name: "ethan",
  getName(name = "") {
    console.log(this.name + name);
  },
};
var o2 = {
  name: "ethan001",
};
o1.getName();
// params should be array
o1.getName.apply(o2, [" apply"]);
o1.getName.call(o2, " call");
o1.getName.bind(o2, " bind")();
hr();

// 自己实现apply bind call
Function.prototype.myApply = function (context, args) {
  context = context || window;
  const key = Symbol();
  context[key] = this;
  const result = context[key](args);
  delete context[key];
  return result;
};

Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

Function.prototype.myBind = function (context, ...args) {
  context = context || window;
  const that = this;

  return function (...newArgs) {
    const key = Symbol();
    context[key] = that;
    const result = context[key](...args, ...newArgs);
    delete context[key];
    return result;
  };
};

o1.getName.apply(o2, [" myApply"]);
o1.getName.myCall(o2, " myCall");
o1.getName.myBind(o2, " myBind")();
