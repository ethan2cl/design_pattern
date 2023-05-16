/**
 * 模板方法模式：一种基于继承的设计模式。模板方法模式严重依赖抽象类
 *
 * 抽象类的主要作用是为它的子类定义这些公共街口
 */

function Beverage() {}

Beverage.prototype.boilWater = function () {
  console.log("boil water");
};

Beverage.prototype.brew = function () {};

Beverage.prototype.pureInCup = function () {};

Beverage.prototype.addCondiments = function () {};

// 模版方法：封装了子类的算法框架，指导子类以何种顺序去执行哪些方法
Beverage.prototype.init = function () {
  this.boilWater();
  this.brew();
  this.pureInCup();
  this.addCondiments();
};

const Coffee = function () {};
Coffee.prototype = new Beverage();
Coffee.prototype.brew = function () {
  console.log("brew coffee");
};
Coffee.prototype.pureInCup = function () {
  console.log("pure in cup");
};
Coffee.prototype.addCondiments = function () {
  console.log("add milk");
};

const coffee = new Coffee();
coffee.init();

// 不用继承的方式
const Beverage1 = function (params) {
  const boilWater = params.boilWater || function () {};
  const brew = params.brew || function () {};
  const pureInCup = params.pureInCup || function () {};
  const addCondiments = params.addCondiments || function () {};

  const F = function () {};
  F.prototype.init = function () {
    boilWater();
    brew();
    pureInCup();
    addCondiments();
  };

  return F;
};

const coffee1 = Beverage1({
  brew() {},
  pureInCup() {},
  addCondiments() {},
});

coffee1.init();
