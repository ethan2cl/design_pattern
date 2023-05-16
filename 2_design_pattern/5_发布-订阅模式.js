/**
 * 发布-订阅模式：又称观察者模式，定义了对象间的一种 一对多 的依赖关系，当一个对象的状态发生变化时
 * ，依赖他的对象都将得到通知。
 */

class MyEvent {
  cache;

  constructor() {
    this.cache = {};
  }

  subscribe(key, fn) {
    if (!this.cache[key]) {
      this.cache[key] = [fn];
    } else {
      this.cache[key].push(fn);
    }
  }

  emit(key, ...params) {
    const fns = this.cache[key];
    if (!fns) return;
    for (let i = 0; i < fns.length; i++) {
      const fn = fns[i];
      fn.apply(this, params);
    }
  }

  remove(key, fn) {
    if (!this.cache[key]) return;
    const index = this.cache[key].findIndex((_fn) => _fn === fn);
    this.cache[key].splice(index, 1);
  }
}

const e = new MyEvent();
e.subscribe("study", (name) => {
  console.log(`${name} is studying`);
});

e.subscribe("play", (name) => {
  console.log(`${name} is playing`);
});

e.emit("study", "lei cao");
e.emit("play", "lei cao");

/**
 * 观察者模式是观察者们直接依赖于一个对象，发布订阅有一个“中介”，让发布房和订阅方不用知道彼此
 * 时间接偶，对象结偶
 *
 * 问题：过度使用可能会导致整体代码错乱，不知道哪里订阅哪里发布了
 *
 */
