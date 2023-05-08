/**
 * 保证一个类仅有一个实例，并提供一个全局访问点
 */
function Singleton(name) {
  this.name = name;
}

Singleton.prototype.getInstance = (function () {
  let instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  };
})();
