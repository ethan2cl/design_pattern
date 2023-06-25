/**
 * 作用：解决两个软件实体之间不兼容的问题
 */

const BaiduMap = {
  show() {
    console.log("show baidu map");
  },
};

const GaodeMap = {
  render() {
    console.log("show gao de render");
  },
};

function Map(map) {
  this.map = map;
}

Map.prototype.render = function () {
  if (this.map.show instanceof Function) {
    return this.map.show();
  }
  return this.map.render();
};

const map = new Map(BaiduMap);
map.render();

const map1 = new Map(GaodeMap);
map1.render();
