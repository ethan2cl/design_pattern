/**
 * 多态：同一操作对于不同的对象产生不同的结果
 * ex：两只动物，一只鸭子，一只鸡，同时做出“叫”的操作，一只“嘎嘎嘎”，一只“咯咯咯”
 *
 * 思想：将“做什么”和“谁去做”分离
 *
 * Java通过向上转型实现多态
 */

var makeSound = function (animal) {
  animal.sound();
};

var Duck = function () {};
Duck.prototype.sound = function () {
  console.log("ga ga ga");
};
var Chicken = function () {};
Chicken.prototype.sound = function () {
  console.log("ge ge ge");
};

makeSound(new Duck());
makeSound(new Chicken());
