type promiseFuncType = (...args: any[]) => any
class ShopCartService {
  public productname: string;
  public count: number;
  constructor() {

  }
  addShopCart() {
    console.log("增加商品:", this.productname + ":数量:", this.count)
  }
}
class Promise {
  constructor() {
    return this
  }
  static Promise(promiseFunc2: promiseFuncType): void {
    promiseFunc2("sucess", "fail");
    //return this
  }
  buy() {
    console.log("buy")
  }
  static ShowResult(promiseFunc3: promiseFuncType, errorCode: string) { }
}
let shopCartService = new ShopCartService()
shopCartService.productname = "牙膏"
shopCartService.count = 70
// 泛型工厂函数类型constructorFuncType
type constructorFuncType<T = any> = new (...args: any[]) => T

// 构建泛型工厂函数写法1：参数类型为type定义的构造函数类型
function createInstanceFactory<T>(promiseFunc2: constructorFuncType<T>) {
  return new promiseFunc2()
}
let promise = createInstanceFactory<Promise>(Promise);
promise.buy()

let shopCartService2 = createInstanceFactory<ShopCartService>(ShopCartService);
shopCartService2.addShopCart();

// 构建泛型工厂函数写法2：参数类型为接口式的构造函数类型
interface constructorFuncinterface<T = any> {
  new(...args: any[]): T
}
//function createInstanceFactory2<T>
//(promiseFunc2: { new(...args: any[]): T }): T {
function createInstanceFactory2<T>
  (promiseFunc2: constructorFuncinterface<T>): T {
  return new promiseFunc2()
}

let promise2 = createInstanceFactory<Promise>(Promise);
promise2.buy()

// 构建泛型工厂函数写法3:参数类型为直接写出来的构造函数类型
function createInstanceFactory3<T>
  (promiseFunc2: new (...args: any[]) => T): T {
  return new promiseFunc2()
}
let promise3 = createInstanceFactory<Promise>(Promise);
promise3.buy()

export { }
