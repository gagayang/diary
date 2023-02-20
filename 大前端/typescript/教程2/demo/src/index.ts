function test(id: number): string;
function test(haha: string): string {
  console.log(1)
  return '1'
}

test('34');


// any既是各种数据类型的子类也是各种数据类型的父类，以下代码TS不报错
const a:unknown = 3;
const j:any = a;
const k:unknown = j;
