/**
 * 定义：使多个对象都有机会处理请求，从而避免了请求的发送者和接收者的耦合关系，
 *  将这些对象连成一条链条，并沿着链条传递请求，知道有个对象处理了它为止。
 */
/**
 * 经典优惠券问题，假设一个售卖手机的网站，缴纳500定金会收到200元优惠券，100定金获得50元优惠元，
 * 普通用户无优惠券，好需要保证足够的库存
 */
// orderType: 1:500 2:200 3:普通用户
// pay：是否支付定金
// stock：手机库存

// 初级写法
const order = function (orderType, pay, stock) {
  if (orderType === 1) {
    if (pay) {
      console.log("500定金预购,获得200优惠券");
    } else {
      if (stock > 0) {
        console.log("普通购买");
      } else {
        console.log("手机库存不足");
      }
    }
  } else if (orderType === 2) {
    if (pay) {
      console.log("200定金预购,获得50优惠券");
    } else {
      if (stock > 0) {
        console.log("普通购买");
      } else {
        console.log("手机库存不足");
      }
    }
  } else if (orderType === 3) {
    if (stock > 0) {
      console.log("普通购买");
    } else {
      console.log("手机库存不足");
    }
  }
};

order(1, true, 500);
const { hr } = require("../../shared");
hr();

// 使用职责链重构
const order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay) {
    console.log("500定金预购,获得200优惠券");
  } else {
    order200(orderType, pay, stock);
  }
};
const order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay) {
    console.log("200定金预购,获得50优惠券");
  } else {
    orderNormal(orderType, pay, stock);
  }
};
const orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log("普通购买");
  } else {
    console.log("手机库存不足");
  }
};

order500(1, true, 500);
order500(1, false, 500);
order500(2, true, 500);
order500(2, false, 500);
order500(3, false, 0);
hr();
/**
 * 这样耦合很高，后续如果要再加一个300定金的需要改动order500、order200两个函数，不方便新增、删除节点
 */
const Chain = function (fn) {
  this.fn = fn;
  this.next = null;
};

Chain.prototype.setNext = function (next) {
  return (this.next = next);
};

Chain.prototype.execute = function () {
  const ret = this.fn.apply(this, arguments);
  if (ret === "next") {
    return this.next && this.next.execute.apply(this.next, arguments);
  }
};

const order5002 = function (orderType, pay, stock) {
  console.log("orderType5002", orderType);
  if (orderType === 1 && pay) {
    console.log("500定金预购,获得200优惠券");
  } else {
    return "next";
  }
};
const order2002 = function (orderType, pay, stock) {
  if (orderType === 2 && pay) {
    console.log("200定金预购,获得50优惠券");
  } else {
    return "next";
  }
};
const orderNormal2 = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log("普通购买");
  } else {
    console.log("手机库存不足");
  }
};

const chain500 = new Chain(order5002);
const chain200 = new Chain(order2002);
const chainNormal = new Chain(orderNormal2);
chain500.setNext(chain200).setNext(chainNormal);
chain500.execute(1, true, 500);
chain500.execute(2, true, 200);
