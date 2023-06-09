const order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay) {
    console.log("500定金预购,获得200优惠券");
  } else {
    return "next";
  }
};

const order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay) {
    console.log("200定金预购,获得50优惠券");
  } else {
    return "next";
  }
};

const orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log("普通购买");
  } else {
    console.log("手机库存不足");
  }
};

Function.prototype.after = function (fn) {
  const self = this;
  return function () {
    const ret = self.apply(this, arguments);
    if (ret === "next") {
      return fn.apply(this, arguments);
    }
  };
};

const order = order500.after(order200).after(orderNormal);
order(1, true, 500);
order(2, true, 200);
