"use strict";
// 这种就是导致运算错误
// const max = Number.MAX_SAFE_INTEGER;
// console.log(max)
// const maxBigOne = max + 1
// console.log(maxBigOne)
// const maxBigtwo = max + 2
// console.log(maxBigtwo)
// console.log(maxBigOne === maxBigtwo)
Object.defineProperty(exports, "__esModule", { value: true });
// 这种是bigint标准写法
const max = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max);
const maxBigOne = max + BigInt(1);
console.log(maxBigOne);
const maxBigtwo = max + BigInt(2);
console.log(maxBigtwo);
console.log(maxBigOne === maxBigtwo);
