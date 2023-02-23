/**
 * 原型模式不只是一种设计模式，更是一种编程泛型
 *
 * 如果需要一个和某个对象一模一样的对象，可以使用原型模式
 */

var Plane = function (blood = 100) {
  this.blood = blood;
  this.attackLevel = 1;
  this.defenseLevel = 1;
};

var plane = new Plane();
plane.blood = 500;
plane.attackLevel = 2;
plane.defenseLevel = 2;

var clonePlane =
  Object.create(plane) ||
  // 兼容不支持Object.create的浏览器
  function (obj) {
    var F = function () {};
    F.prototype = obj.__proto__;
    return new F();
  };

console.log(plane);
console.log(`clonePlane:`, clonePlane);
console.log(clonePlane.__proto__);
console.log(clonePlane.__proto__ === plane);
console.log("================");

/**
 * 手写一下new操作符的实现
 * @returns
 */
function myNew() {
  const obj = Object.create(null);
  // 获取构造函数及其参数
  const [constructor, ...params] = arguments;
  obj.__proto__ = constructor.prototype;
  const result = constructor.apply(obj, params);
  return result instanceof Object ? result : obj;
}

var planeTwo = myNew(Plane, 300);
planeTwo.blood = 200;
console.log(planeTwo);
