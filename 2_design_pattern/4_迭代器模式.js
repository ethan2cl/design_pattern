/**
 * 迭代器模式：提供一种方法，顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示
 *
 * 聚合对象：指一个对象包含其他对象
 */
const { hr } = require("../shared");
// js内部实现的迭代器 通过修改【Symbol.iterator] 方法
const str = {
  a: 1,
  b: 2,
};

str[Symbol.iterator] = function () {
  const that = this;
  const keys = Object.keys(that);
  const len = keys.length;
  let n = 0;
  return {
    next() {
      return n < len
        ? {
            value: that[keys[n++]] + 100,
            done: false,
          }
        : { done: true };
    },
  };
};
for (let s of str) {
  console.log(s);
}

hr();
