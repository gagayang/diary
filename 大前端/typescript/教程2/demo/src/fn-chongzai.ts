function quickSort(arr: string[]): string[]
function quickSort(arr: number[]): number[]
function quickSort(arr: any[]): any[] {
  if (arr.length < 2) { return arr }
  var left = [];
  var right = [];
  var mid = arr.splice(Math.floor(arr.length / 2), 1)[0];
  console.log("mid:", mid)
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < mid) {
      left.push(arr[i]);
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(mid, quickSort(right))
}

//   中文排序
// function sortChinese(arr: string[]): string[] {
function sortChinese<T extends string>(arr: T[]): T[] { // 更优，只能传string或者string的子类
  return arr.sort(function (firstnum, secondnum) {
    return (firstnum as any).localeCompare(secondnum, "zh-CN")
  })
}

// 判断数组中是否有中文元素
function isChinese(arr: string[]): boolean {
  var pattern1 = /[\u4e00-\u9fa5]+/g;
  return arr.some((item) => {
    return pattern1.test(item as any)
  })
}

//// (2). 字符串自排序
function strSelfSort(str: string, count: number = 5): string {
  // (1) 字符串拆分成数组
  let strArray = str.split('');
  // (2) 数组进行使用快速排序算法来排序
  let strSortArray = quickSort(strArray);
  // (3) 重新把排好序的数组连接成一个字符串返回
  let strResult = strSortArray.join('');
  return strResult.length > 10 ? strResult.substr(0, count) + "..." : strResult;
}

// function sort(data: string) : string
function sort<T>(data: T) : T
function sort(data: any): any {
  if (typeof data === 'string') {
    return strSelfSort(data)
  } else if (data instanceof Array) {
    if (isChinese(data)) {
      return sortChinese(data);
    } else {
      let newArr = data.map(item => {
        return typeof item === 'string' ? strSelfSort(item) : item
      })
      return quickSort(newArr);
    }
  }
}

const bs = 'bac';
const b = sort<string>(bs);

const a = ['3','出','b'];


const as = sort(a);

const c = [{a: 1}, {b: 3}]

const cs = sort(c);
console.log(cs); // [ { b: 3 }, { a: 1 } ]

