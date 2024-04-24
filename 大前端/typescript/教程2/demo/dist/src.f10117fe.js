// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/2LinkedList.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Node = /** @class */function () {
  function Node(prev, currentvalue, next) {
    this.prev = prev;
    this.currentvalue = currentvalue;
    this.next = next;
  }
  return Node;
}();
// LinkedList 具体实现同学们先不管，重心先放到TS泛型和多态，泛型约束上
var LinkedList = /** @class */function () {
  function LinkedList() {
    this.index = 0; // 集合大小
  }

  LinkedList.prototype.has = function (value) {
    throw new Error('Method not implemented.');
  };
  LinkedList.prototype.size = function () {
    return this.index ? this.index : 0;
  };
  LinkedList.prototype.addFirst = function (newValue) {};
  LinkedList.prototype.add = function (indexornewvalue, newValue) {
    if (newValue === void 0) {
      newValue = 0;
    }
  };
  LinkedList.prototype.checkIndex = function (index) {
    if (index >= this.index) {
      throw new Error("\u63D0\u4F9B\u7684\u7D22\u5F15\u503C\u5927\u4E8E\u5143\u7D20\u4E2A\u6570:\"this.size");
    }
  };
  LinkedList.prototype.get = function (index) {
    var t;
    return t;
  };
  LinkedList.prototype.node = function (index) {
    var t;
    return t;
  };
  LinkedList.prototype.remove = function (indexOrnodeobj) {
    var t;
    return t;
  };
  LinkedList.prototype.unlink = function (nodeRemoved) {
    return nodeRemoved;
  };
  return LinkedList;
}();
exports.default = LinkedList;
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _2LinkedList_1 = __importDefault(require("./2LinkedList"));
var Vechile = /** @class */function () {
  function Vechile(brand_, vechileNo_, days_, deposit_) {
    this.total = 0; // 支付的租赁总费用
    this.brand = brand_;
    this.vechileNo = vechileNo_;
    this.days = days_;
    this.deposit = deposit_;
    console.log("constructor Vechile=>this.brand:", this.brand);
  }
  // 计算租赁车的价格 ( calculateRent)
  Vechile.prototype.calculateRent = function () {
    console.log("calculateRent来自Vechile=>this.brand:", this.brand);
    console.log(this.brand + " 车牌号为:" + this.vechileNo + "开始被租");
    return 0;
  };
  //支付押金的方法( payDesposit)
  Vechile.prototype.payDesposit = function () {
    console.log(this.brand + " 车牌号为:" + this.vechileNo + " 支付了:" + this.deposit);
  };
  //  安全检测方法（safeShow)
  Vechile.prototype.safeShow = function () {
    console.log("车规则....");
    console.log(this.brand + " 车牌号为:" + this.vechileNo + " 违规了:");
  };
  Vechile.count = 3;
  return Vechile;
}();
var Car = /** @class */function (_super) {
  __extends(Car, _super);
  function Car(brand_, vechileNo_, days_, deposit_, type_) {
    var _this =
    //  Vechile.call(this,brand_, vechileNo_, days_, total_, deposit_)
    _super.call(this, brand_, vechileNo_, days_, deposit_) || this;
    _this.type = type_;
    return _this;
  }
  // 根据车的型号来获取租用一天该型号车的租金
  Car.prototype.getPriceByType = function () {
    var rentMoneyByDay = 0; //每天的租金
    if (this.type === "普拉多巡洋舰") {
      rentMoneyByDay = 800;
    } else if (this.type === "凯美瑞旗舰版") {
      rentMoneyByDay = 400;
    } else if (this.type === "威驰智行版") {
      rentMoneyByDay = 200;
    }
    return rentMoneyByDay;
  };
  Car.prototype.calculateRent = function () {
    // this.safeShow();// 寄生组合继承模式 middle()
    _super.prototype.calculateRent.call(this); //=Vechile.prototype.calculateRent.call(this)
    console.log("Car:", Car.count);
    console.log("this.brand:", this.brand);
    this.total += this.days * this.getPriceByType();
    return this.total;
  };
  Car.prototype.checkIsWeigui = function (isOverWeight) {
    if (isOverWeight) {
      this.total += this.total + 500;
    }
  };
  return Car;
}(Vechile);
var Bus = /** @class */function (_super) {
  __extends(Bus, _super);
  function Bus(brand_, vechileNo_, days_, deposit_, seatNum_) {
    var _this =
    //  Vechile.call(this,brand_, vechileNo_, days_, total_, deposit_)
    _super.call(this, brand_, vechileNo_, days_, deposit_) || this;
    _this.seatNum = seatNum_;
    if (_this.seatNum > 200) {
      throw new Error("座位数不能超过200");
    }
    return _this;
  }
  Bus.prototype.getPriceBySeatNum = function () {
    var rentMoneyByDay = 0; //每天的租金
    if (this.seatNum <= 16) {
      rentMoneyByDay = 800;
    } else if (this.seatNum > 16) {
      rentMoneyByDay = 1600;
    }
    return rentMoneyByDay;
  };
  Bus.prototype.calculateRent = function () {
    _super.prototype.calculateRent.call(this);
    this.total += this.days * this.getPriceBySeatNum();
    return this.total;
  };
  Bus.prototype.checkIsOverNum = function (isOverWeight) {
    if (isOverWeight) {
      this.total += this.total + 2000;
    }
  };
  return Bus;
}(Vechile);
var Truck = /** @class */function (_super) {
  __extends(Truck, _super);
  function Truck(brand_, type_, days_, deposit_, ton_) {
    var _this = _super.call(this, brand_, type_, days_, deposit_) || this;
    _this.ton = ton_;
    if (_this.ton < 300 || _this.ton > 2000) {
      throw new Error("吨数在300-2000吨之间");
    }
    return _this;
  }
  Truck.prototype.checkIsOverWeight = function (isOverWeight) {
    if (isOverWeight) {
      console.log("超载了");
      this.total += this.total + 2000;
    }
    return this.total;
  };
  Truck.prototype.getPriceByTon = function () {
    var rentMoneyByDay = 0; //每天的租金
    if (this.ton <= 500) {
      //500吨
      rentMoneyByDay = 750;
    } else if (this.ton > 500) {
      rentMoneyByDay = 1350;
    }
    return rentMoneyByDay;
  };
  Truck.prototype.calculateRent = function () {
    this.total += this.getPriceByTon() * this.days;
    console.log("卡车:", this.total);
    return this.total;
  };
  Truck.prototype.calDesposit = function () {
    return this.deposit;
  };
  return Truck;
}(Vechile);
// 这里开始是重点
var Customer = /** @class */function () {
  function Customer() {}
  // 下面被注释掉的写法，相对于下面rent的写法，他的通用性差很多，具体表现：
  /**
   * 1.rentVechile带有业务色彩，Customer可以租任何东西，所以方法名改成rent
   * 2.rentVechile是特定业务场景的普通函数，rent接受T泛型，任何东西都可租，但是又必须受到extends object的约束
   * 3.rentVechile最早写法：rentVechile(myVechileArray: Array<Vechile>),但是rent是interface的泛型约束 List<T>
   *   这种约束的好处，传进来的T可以存入只要是实现了List的数据类型都行（比如ArrayList，LinkedList），这里就是多态的价值
   * 4.泛型有个缺点，比如something再编译阶段只知道是泛型，没办法知道有calculateRent方法，所以只能用(something as any).calculateRent();过渡
   */
  // public rentVechile(myVechileArray: List<Vechile>) {
  //   let lasttotal = 0;
  //   for (let i = 0; i < myVechileArray.size(); i++) {
  //     lasttotal += myVechileArray.get(i).calculateRent();
  //   }
  //   return lasttotal;
  //   //myVechileArray.calculateRent();
  // }
  Customer.prototype.rent = function (list) {
    var lasttotal = 0;
    for (var i = 0; i < list.size(); i++) {
      var something = list.get(i);
      lasttotal += something.calculateRent();
    }
    return lasttotal;
  };
  return Customer;
}();
// 多态体现在： 1.父类对象变量可以接受任何它的子类对象
//  2. 接口类型对象变量可以接受任何它的实现类的对象
//let vechileArray: Vechile[] = []
/**
 * 1、下面这种写法得益于多态，因为LinkedList是List的实现
 * 2、并且结构性很好，比如这里把LinkedList改成ArrayList，以下就让增删改牛逼的LinkedList换成了查询牛逼的ArrayList，业务价值发生了很大变化
 *    但是只需要这里把LinkedList改成ArrayList就行，所有的实现方法都不用动，这就是实现List的好处
*/
var vechileList = new _2LinkedList_1.default();
var bus = new Bus("大巴", "京3A556", 3, 50000, 67);
vechileList.add(bus);
vechileList.add(new Truck("大卡车", "京7A556", 2, 60000, 1500));
var cust = new Customer();
// 这里rent方法是泛型，一般我们是建议class里面有泛型约束，这个class也是泛型才比较标准（这里只让rent泛型了，但是class不是泛型）
var lasttotal = cust.rent(vechileList);
//let lasttotal = cust.rent(vechileList); // 如果不写<Vechile>，那就只能依靠入参vechileList来推导了
console.log("lasttotal:", lasttotal);
function fn3(a, b) {
  if (typeof a === 'number' && typeof b == 'number') {
    return a * b;
  } else {
    return a + b;
  }
}
var d = fn3('d', '5');
console.log(d);
},{"./2LinkedList":"src/2LinkedList.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65246" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map