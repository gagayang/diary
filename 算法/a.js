const aab = 'aab'
function getResult(str) {
    const result = []
    const path = []
    fn(0)
    return result;
    function fn(n) {
        let s = str[n]
        while (str[n]) {
            console.log(1, n)
            let left = n - 1;
            let right = n + 1;
            if ((!str[left] || !str[right]) && str[left + 1] === str[right - 1]) {
                path.push(s)
            }
            console.log(2, n)
            if (str[left] === str[right]) {
                left--;
                right++;
                s = str[left] + s + str[right]
            } else {
                path.push(s)
                fn(n + 1)
            }
        }
    }
}
const s = getResult(aab)
console.log(s)
