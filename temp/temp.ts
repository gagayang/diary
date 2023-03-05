const a = 'u'
console.log(a)

const object2:any = {
  a: 1,
  b: 3
}

let h: any = {}

for (const key in object2) {
  h[key] = object2[key as keyof typeof object2]
}

object2.f = 23;

