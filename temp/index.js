console.log(1)
const a = {
  data: {
    name: 'wewwe'
  },
  code: 0,
  msg: 'success'
}

window.$ = function() {

}
// http://juejin.cn/post/6854573212425814030
// http://img.alicdn.com

const s = 'http://www.baidu.com?name=账'
const b = encodeURIComponent('http://www.baidu.com?name=账')
const h = decodeURIComponent(b)
