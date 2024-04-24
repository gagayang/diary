// 业务模型： Vechile / Car / Bus具体业务逻辑忽略不计，弄清楚继承/多态关系关系就行，重点在泛型
import List from './List'
import LinkedList from './2LinkedList';
import ArrayList from './2ArrayList';
import { getSourceMapRange } from 'typescript';
class Vechile {
  static count: number = 3;
  public brand: string;// 品牌
  public vechileNo: string;// 车牌号
  public days: number;// 租赁天数
  public total: number = 0;// 支付的租赁总费用
  public deposit: number;// 押金
  constructor(brand_: string, vechileNo_: string, days_: number, deposit_: number) {
    this.brand = brand_;
    this.vechileNo = vechileNo_;

    this.days = days_;
    this.deposit = deposit_;
    console.log("constructor Vechile=>this.brand:", this.brand)
  }
  // 计算租赁车的价格 ( calculateRent)
  public calculateRent() {
    console.log("calculateRent来自Vechile=>this.brand:", this.brand)

    console.log(this.brand + " 车牌号为:" + this.vechileNo + "开始被租");
    return 0;
  }
  //支付押金的方法( payDesposit)
  payDesposit() {
    console.log(this.brand + " 车牌号为:" + this.vechileNo + " 支付了:" + this.deposit);
  }

  //  安全检测方法（safeShow)
  public safeShow() {
    console.log("车规则....");
    console.log(this.brand + " 车牌号为:" + this.vechileNo + " 违规了:");
  }

}

class Car extends Vechile {
  // public brand: string = "nobrand"
  public type: string;//车的型号
  constructor(brand_: string, vechileNo_: string, days_: number,
    deposit_: number, type_: string) {
    //  Vechile.call(this,brand_, vechileNo_, days_, total_, deposit_)
    super(brand_, vechileNo_, days_, deposit_);
    this.type = type_;

  }
  // 根据车的型号来获取租用一天该型号车的租金
  public getPriceByType() {
    let rentMoneyByDay: number = 0;//每天的租金
    if (this.type === "普拉多巡洋舰") {
      rentMoneyByDay = 800;
    } else if (this.type === "凯美瑞旗舰版") {
      rentMoneyByDay = 400;
    } else if (this.type === "威驰智行版") {
      rentMoneyByDay = 200;
    }
    return rentMoneyByDay;
  }

  public calculateRent() {//方法重写 [override]
    // this.safeShow();// 寄生组合继承模式 middle()
    super.calculateRent();  //=Vechile.prototype.calculateRent.call(this)
    console.log("Car:", Car.count)
    console.log("this.brand:", this.brand)
    this.total += this.days * this.getPriceByType();
    return this.total;
  }
  checkIsWeigui(isOverWeight: boolean) {
    if (isOverWeight) {
      this.total += this.total + 500;
    }
  }
}

class Bus extends Vechile {
  public seatNum: number // 座位数
  constructor(brand_: string, vechileNo_: string, days_: number,
    deposit_: number, seatNum_: number) {
    //  Vechile.call(this,brand_, vechileNo_, days_, total_, deposit_)
    super(brand_, vechileNo_, days_, deposit_);//使用父类的构造函数的好处
    this.seatNum = seatNum_;
    if (this.seatNum > 200) {
      throw new Error("座位数不能超过200");
    }
  }

  public getPriceBySeatNum() { //计算租赁价格
    let rentMoneyByDay: number = 0;//每天的租金
    if (this.seatNum <= 16) {
      rentMoneyByDay = 800;
    } else if (this.seatNum > 16) {
      rentMoneyByDay = 1600;
    }
    return rentMoneyByDay;
  }
  public calculateRent() {

    super.calculateRent();
    this.total += this.days * this.getPriceBySeatNum();
    return this.total;
  }
  checkIsOverNum(isOverWeight: boolean) {
    if (isOverWeight) {
      this.total += this.total + 2000;
    }
  }
}

class Truck extends Vechile {
  ton!: number // 座位数
  constructor(brand_: string, type_: string,
    days_: number, deposit_: number, ton_: number) {
    super(brand_, type_, days_, deposit_);
    this.ton = ton_;
    if (this.ton < 300 || this.ton > 2000) {
      throw new Error("吨数在300-2000吨之间");
    }
  }

  checkIsOverWeight(isOverWeight: boolean) {
    if (isOverWeight) {
      console.log("超载了");
      this.total += this.total + 2000;
    }
    return this.total;
  }

  getPriceByTon() {//计算租赁价格
    let rentMoneyByDay: number = 0;//每天的租金
    if (this.ton <= 500) {//500吨
      rentMoneyByDay = 750;
    } else if (this.ton > 500) {
      rentMoneyByDay = 1350;
    }
    return rentMoneyByDay;
  }
  public calculateRent() {
    this.total += this.getPriceByTon() * this.days;
    console.log("卡车:", this.total);
    return this.total;
  }
  public calDesposit() {
    return this.deposit;

  }
}

// 这里开始是重点
class Customer {
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
  public rent<T extends object>(list: List<T>) {
    let lasttotal = 0;
    for (let i = 0; i < list.size(); i++) {
      let something = list.get(i);
      lasttotal += (something as any).calculateRent();
    }
    return lasttotal;
  }

}

// 多态体现在： 1.父类对象变量可以接受任何它的子类对象
//  2. 接口类型对象变量可以接受任何它的实现类的对象

//let vechileArray: Vechile[] = []
/**
 * 1、下面这种写法得益于多态，因为LinkedList是List的实现
 * 2、并且结构性很好，比如这里把LinkedList改成ArrayList，以下就让增删改牛逼的LinkedList换成了查询牛逼的ArrayList，业务价值发生了很大变化
 *    但是只需要这里把LinkedList改成ArrayList就行，所有的实现方法都不用动，这就是实现List的好处
*/
let vechileList: List<Vechile> = new LinkedList<Vechile>();
let bus: Vechile = new Bus("大巴", "京3A556", 3, 50000, 67);
vechileList.add(bus);
vechileList.add(new Truck("大卡车", "京7A556", 2, 60000, 1500));
let cust = new Customer();
// 这里rent方法是泛型，一般我们是建议class里面有泛型约束，这个class也是泛型才比较标准（这里只让rent泛型了，但是class不是泛型）
let lasttotal = cust.rent<Vechile>(vechileList);
//let lasttotal = cust.rent(vechileList); // 如果不写<Vechile>，那就只能依靠入参vechileList来推导了
console.log("lasttotal:", lasttotal)

export { }


function fn3(a: string, b: string): string;
function fn3(a: number, b: number): number;
function fn3(a: number | string, b: number | string): number | string {
  if (typeof a === 'number' && typeof b == 'number') {
    return a * b
  } else {
    return a + b
  }
}
const d = fn3('d', '5');
console.log(d)