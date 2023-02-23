/**
 * 闭包的形成与函数的作用域以及变量的生命周期密切相关
 * 1、可以封装变量
 * 2、延续局部变量的寿命
 *
 * 变量的搜索是由内到外的，不是由外到内
 *
 * IE的COM对象的GC使用的还是引用计数法，当存在循环引用就会存在内存泄露
 * 现代浏览器多用标记清除法
 */

var func = function () {
  var a = 1;
  console.log(a);
};
func();
// 变量仅a存在于func的函数执行上下文中（变量环境中recording）
// console.log(a); // Uncaught ReferenceError ReferenceError: a is not defined

var count = (function () {
  var count = 0;
  return function () {
    ++count;
    console.log(count);
  };
})();

count();
count();
count();
