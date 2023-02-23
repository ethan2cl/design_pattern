/**
 * 鸭子类型：如果他走起来、叫起来都像鸭子，那么他就是鸭子
 *
 * 鸭子类型指导我们只关注对象的行为，而不是对象本身
 */

var duck = {
  sing: function () {
    console.log("duck sing like ga ga ga");
  },
};

var chicken = {
  sing: function () {
    console.log("chicken sing like ga ga ga");
  },
};

// 动物合唱团
function Choir() {
  this.animals = [];
}
Choir.prototype.addAnimal = function (animal) {
  this.animals.push(animal);
};
Choir.prototype.startSing = function () {
  this.animals.forEach((animal) => animal.sing());
};
const choir = new Choir();
choir.addAnimal(duck);
choir.addAnimal(chicken);

choir.startSing();
