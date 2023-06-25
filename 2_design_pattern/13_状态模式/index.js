/**
 * 状态模式的关键是区分事物内部的状态，事物内部的“状态改变”往往会引起“行为改变”
 * 定义：允许一个对象在其内部改变时改变他的行为，对象看起来似乎修改了他的类
 */
const { hr } = require("../../shared");

const LIGHT_STATE = {
  OFF: "off light",
  WEAK: "weak light",
  STRONG: "strong light",
};

// 电灯程序
const LightSimple = function () {
  this.state = LIGHT_STATE.OFF;
};

LightSimple.prototype.pressed = function () {
  if (this.state === LIGHT_STATE.OFF) {
    this.state = LIGHT_STATE.WEAK;
  } else if (this.state === LIGHT_STATE.WEAK) {
    this.state = LIGHT_STATE.STRONG;
  } else if (this.state === LIGHT_STATE.STRONG) {
    this.state = LIGHT_STATE.OFF;
  }
};

const light = new LightSimple();
light.pressed();
light.pressed();
light.pressed();

hr();

// 使用状态模式改进
const OffLightState = function (light) {
  this.light = light;
};

OffLightState.prototype.pressed = function () {
  console.log(LIGHT_STATE.WEAK);
  this.light.setState(this.light.weakLightState);
};
const WeakLightState = function (light) {
  this.light = light;
};

WeakLightState.prototype.pressed = function () {
  console.log(LIGHT_STATE.STRONG);
  this.light.setState(this.light.strongLightState);
};
const StrongLightState = function (light) {
  this.light = light;
};

StrongLightState.prototype.pressed = function () {
  console.log(LIGHT_STATE.OFF);
  this.light.setState(this.light.offLightState);
};

const Light = function () {
  this.offLightState = new OffLightState(this);
  this.weakLightState = new WeakLightState(this);
  this.strongLightState = new StrongLightState(this);
  this.currentState = null;
};

Light.prototype.setState = function (newState) {
  this.currentState = newState;
};

Light.prototype.init = function () {
  this.currentState = this.offLightState;
};

const slight = new Light();
slight.init();
slight.currentState.pressed();
slight.currentState.pressed();
slight.currentState.pressed();
