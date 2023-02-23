/**
 * 封装：目的是将信息隐藏
 * js通过变量的作用域来实现封装特性，而且只能模拟 private 和 public
 *
 * ES6提供的class中也可以声明private变量，如#name，实力对象及子类无法访问
 */
var myObject = (function () {
  var _name = "ethan";

  return {
    getName: function () {
      return _name;
    },
  };
})();

console.log(myObject.getName());
