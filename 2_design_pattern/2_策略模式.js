/**
 * 定义一系列算法，把他们一个个的封装起来，使他们可以互相替换
 */
const strategy = {
  S: function (salary) {
    return salary * 4;
  },
  A: function (salary) {
    return salary * 3;
  },
};
