![1713792512172](image/导学/1713792512172.png)

![1713792604340](image/导学/1713792604340.png)

![1713792680099](image/导学/1713792680099.png)

大致顺序：

![1713792728239](image/vue3新变化/1713792728239.png)

MVC在IOS和前端中比较多的体现，在传统的js操作中，也可以理解成MVC：

一下截图的model可以是简单的counter，也可以是服务端返回大量数据

![1713795008497](image/vue3新变化/1713795008497.png)

vue强调的是MVVM模型，其实VM就是vue，vue在view和model中起到了中转的作用，controller的作用。

![1713795127947](image/vue3新变化/1713795127947.png)

## template属性：

![1713795360415](image/vue3新变化/1713795360415.png)

关于第二种方式，其实是在html中写了template标签，难道浏览器就不渲染template中的内容吗？不会

![1713795524020](image/vue3新变化/1713795524020.png)

## data属性：

![1713795696382](image/vue3新变化/1713795696382.png)

## methods属性：

![1713795814097](image/vue3新变化/1713795814097.png)

this是和运行时绑定的，谁调用这个函数，this就指向谁（隐式绑定），但是是箭头函数，不存在绑定的情况，所以肩头函数中的this会忘外层作用域找，如果往外一层就是window了，那这箭头函数中的this就是window了。

如果是function定义的函数，是可以通过bind显示绑定，箭头函数肯定是绑不了的

Vue3源码绑定methods的过程：

![1713967338814](image/vue3新变化/1713967338814.png)

其他：

![1713795864385](image/vue3新变化/1713795864385.png)

vue3源码调试方式：

其实和上面vue2的源码调试一样

1、下载对应版本tag

2、install

3、可能需要本地git init，然后在commit一下

4、dev脚本中添加--sourcemap

5、yarn dev

6、在vue/examples中新建demo，引入vue（packages/vue/dist/vue.golbal.js）

# 额外：

![1713968123138](image/vue3新变化/1713968123138.png)

# 根元素改动：

![1713969904451](image/vue3新变化/1713969904451.png)

# 指令：

## v-once：

![1713968691966](image/vue3新变化/1713968691966.png)

## v-text：

```js
 <template id="my-app">
    <h2 v-text="message"></h2>
    <h2>{{message}}</h2>
  </template>
```

第二行和第三行等价，第三行更灵活方便

## v-html：

```js
//msg: '<span style="color:red; background: blue;">哈哈哈</span>'
<template id="my-app">
    <div>{{msg}}</div>
    <div v-html="msg"></div>
  </template>
```

第三行和第四行等价，第三行更灵活方便

## v-pre:

![1713968901818](image/vue3新变化/1713968901818.png)

## v-cloak:

```html
<style>
    [v-cloak] {
      display: none;
    }
  </style>
...

<template id="my-app">
    <h2 v-cloak>{{message}}</h2>
  </template>
```

防止屏闪

## v-bind：（高频）

面试/6、vue/vue3-codewhy/课堂/code/01_Learn_Vue3/03_v-bind和v-on

## v-on：

![1713971372559](image/vue3新变化/1713971372559.png)

# 课程概览：

课程视频大概内容节奏：

### 1-6

集虽然用的vue3创建App实例，但是都是在回归一些vue2的语法

### 7-9

主要是从0到1讲webpack5配置出来一个vue dev/prod环境

### 10

vuecli vite [讲了vuecli的原理]， 不依赖构建工具， 让浏览器直接跑es module是可以的，但是这里举例引入lodash-es，会引发几百个网络请求，所以vite也就解决这些问题的

vite配置很少，比如用了less，只要安装less就行，不用配置，用post-css，只需要配置postcss.config.js就能启动这个这插件，可见vite配置极其简单（内部是esbuild）

vite是通过本地connect库（不是koa）搭建了一个服务器，当我们代码中写了ts，less语法代码，发起请求还是这个类型的代码，然后在服务器上把ts和less文件的内容转换成了es module类型的内容，然后返回给浏览器，浏览器支持es module，那肯定就正常展示了

![1714132218769](image/vue3新变化/1714132218769.png)

最后 npx vite build打包产出dist，然后通过npx vite preview就能预览dist产物

demo： 面试/6、vue/vue3-codewhy/课堂/code/02_Learn_Webpack/10_vite的基本使用

讲了下esbuild相对于babel的优势

![1714133668319](image/vue3新变化/1714133668319.png)

### 11

讲组建通信

特殊值通过props传递注意点：

![1714135132758](image/vue3新变化/1714135132758.png)

![1714135283460](image/vue3新变化/1714135283460.png)

当然这种继承是可以控制的：

![1714135648459](image/vue3新变化/1714135648459.png)

demo: 面试/6、vue/vue3-codewhy/课堂/code/03_learn_component/src/03_父组件传递子组件

vue3 在做emit的时候， 加了一个emits提前注册的操作，并且可以对参数进行验证：

```js
<script>
  export default {
    // emits: ["add", "sub", "addN"],
    // 对象写法的目的是为了进行参数的验证
    emits: {
      add: null,
      sub: null,
      addN: (num, name, age) => {
        console.log(num, name, age);
        if (num > 10) {
          return true
        }
        return false;
      }
    },
    data() {
      return {
        num: 0
      }
    },
    methods: {
      increment() {
        console.log("+1");
        this.$emit("add");
      },
      decrement() {
        console.log("-1");
        this.$emit("sub");
      },
      incrementN() {
        this.$emit('addN', this.num, "why", 18);
      }
    }
  }
</script>
```

### 12

非父子组件通信

1、Provide/Inject （官方给他取了一个别名 lang range props，就是多层传递）

demo： 面试/6、vue/vue3-codewhy/课堂/code/03_learn_component/src/06_Provide和Inject使用

```js
// a.vue 
provide() { // 这里可以是对象，也可以是函数，最好写成函数
      return {
        name: "why",
        age: 18,
        length: computed(() => this.names.length) // ref对象 .value
      }
    },
    data() {
      return {
        names: ["abc", "cba", "nba"]
      }
    },
// b.vue
<template>
  <div>
    HomeContent: {{name}} - {{age}} - {{length.value}}
  </div>
</template>

<script>
  export default {
    inject: ["name", "age", "length"],
  }
</script>
```

2、Mitt全局事件总线（vue2版本的new Vue()方式在Vue3中不能用了)）

![1714137414430](image/vue3新变化/1714137414430.png)

![1714137697945](image/vue3新变化/1714137697945.png)

3、vuex最后讲

讲了插槽、具名插槽

插槽作用域：

![1714138826128](image/vue3新变化/1714138826128.png)

作用域插槽：

有点绕，demo：面试/6、vue/vue3-codewhy/课堂/code/03_learn_component/src/10_作用域插槽使用

其实就是父通过props传给子，再通过子的slot的props传给使用插槽的地方，使用的地方要加一层template，并通过随便命名一个变量在v-slot中就能拿到变量

demo：

```js
 <show-names :names="names">
      <template v-slot="coderwhy">
        <button>{{coderwhy.item}}-{{coderwhy.index}}</button>
      </template>
    </show-names>
```

![1714139402305](image/vue3新变化/1714139402305.png)

![1714139430441](image/vue3新变化/1714139430441.png)

## 13 

动态组件component， 比如一个tab组件，就可以用v-if去判断用哪个组件，也可以通过动态组件：

```js
<keep-alive include="home,about">
      <component :is="currentTab"
                 name="coderwhy"
                 :age="18"
                 @pageClick="pageClick">
      </component>
    </keep-alive>
<script>
  import Home from './pages/Home.vue';
  import About from './pages/About.vue';
  import Category from './pages/Category.vue';

  export default {
    components: { // 这里注册了动态组件可以用的组件
      Home,
      About,
      Category
    },
    data() {
      return {
        tabs: ["home", "about", "category"],
        currentTab: "home"
      }
    },
    methods: {
      itemClick(item) {
        this.currentTab = item;
      },
      pageClick() {
        console.log("page内部发生了点击");
      }
    }
  }
</script>
  
```

keep alive：

```js
 <!-- 2.动态组件 -->
    <keep-alive include="home,about">
      <component :is="currentTab"
                 name="coderwhy"
                 :age="18"
                 @pageClick="pageClick">
      </component>
    </keep-alive>
```

![1714291527033](image/vue3新变化/1714291527033.png)

异步组件：

```js
// 通过import函数导入的模块, 后续webpack对其进行打包的时候就会进行分包的操作
// import("./12_异步组件的使用/utils/math").then((res) => {
//   console.log(res.sum(20, 30))
// })

// vue中defineAsyncComponent基于webpack import的实现
  import { defineAsyncComponent } from 'vue';

  import Home from './Home.vue';
  import Loading from './Loading.vue';

  // import AsyncCategory from './AsyncCategory.vue';
  const AsyncCategory = defineAsyncComponent(() => import("./AsyncCategory.vue"))


//详细配置
 const AsyncCategory = defineAsyncComponent({
    loader: () => import("./AsyncCategory.vue"),
    loadingComponent: Loading,
    // errorComponent,
    // 在显示loadingComponent组件之前, 等待多长时间
    delay: 2000,
    /**
     * err: 错误信息,
     * retry: 函数, 调用retry尝试重新加载
     * attempts: 记录尝试的次数
     */
    onError: function(err, retry, attempts) {

    }
  })
```

defineAsyncComponent的组件会在webpack打包时候被单独打包，他就是基于webpack的import实现的

一般分包都是通过路由去按照页面维度去分，如果需要按照组件维度去分才这么做，很少这么做。


Suspense 

借鉴了react的思想

![1714292666399](image/vue3新变化/1714292666399.png)

```js
 <suspense>
      <template #default>
        <async-category></async-category>
      </template>
      <template #fallback>
        <loading></loading>
      </template>
    </suspense>
```

suspense  代替了loadingComponent


refs:获取实例

```js
<nav-bar ref="navBar"></nav-bar>
//...
methods: {
      btnClick() {
        console.log(this.$refs.title);

        console.log(this.$refs.navBar.message);
        this.$refs.navBar.sayHello();

        // $el
        console.log(this.$refs.navBar.$el);
      }
    }
```

获取组件的另外一种方式：

![1714294120768](image/vue3新变化/1714294120768.png)


生命周期

![1714294474944](image/vue3新变化/1714294474944.png)


v-model：组件上使用v-model：这种写法只是更加优雅：

app.vue:

```js
<template>
  <div>
    <!-- <input v-model="message">
    <input :value="message" @input="message = $event.target.value"> -->

    <!-- 组件上使用v-model -->
    <!-- <hy-input v-model="message"></hy-input> -->
    <!-- <hy-input :modelValue="message" @update:model-value="message = $event"></hy-input> -->

    <!-- 绑定两个v-model -->
    <hy-input v-model="message" v-model:title="title"></hy-input>

    <h2>{{message}}</h2>
    <h2>{{title}}</h2>
  </div>
</template>

<script>
  import HyInput from './HyInput.vue';

  export default {
    components: {
      HyInput
    },
    data() {
      return {
        message: "Hello World",
        title: "哈哈哈"
      }
    }
  }
</script>

<style scoped>

</style>
```

HyInput2.vue:

```vue
<template>
  <div>
    <!-- 1.默认绑定和事件处理 -->
    <!-- <button @click="btnClick">hyinput按钮</button>
    <h2>HyInput的message: {{modelValue}}</h2> -->

    <!-- 2.通过input -->
    <!-- <input :value="modelValue" @input="btnClick"> -->

    <!-- 3.绑定到props中是不对的 和props同名了，肯定不行，可以结合下面的computed属性来实现-->
    <!-- <input v-model="modelValue"> -->

    <!-- 4. -->
    <input v-model="value">

  </div>
</template>

<script>
  export default {
    props: {
      modelValue: String
    },
    emits: ["update:modelValue"],
    computed: {
      value: {
        set(value) {
          this.$emit("update:modelValue", value);
        },
        get() {
          return this.modelValue;
        }
      }
    },
    methods: {
      btnClick(event) {
        this.$emit("update:modelValue", event.target.value);
      }
    }
  }
</script>

<style scoped>

</style>
```

HyInput.vue:

```js
<template>
  <div>
    <input v-model="value">
    <input v-model="why">
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: String,
      title: String 
    },
    emits: ["update:modelValue", "update:title"],
    computed: {
      value: {
        set(value) {
          this.$emit("update:modelValue", value);
        },
        get() {
          return this.modelValue;
        }
      },
      why: {
        set(why) {
          this.$emit("update:title", why);
        },
        get() {
          return this.title;
        }
      }
    }
  }
</script>

<style scoped>

</style>
```


## 14

动画

```js
<transition name="why">
      <h2 v-if="isShow">Hello World</h2>
    </transition>
<style scoped>
  .why-enter-from,
  .why-leave-to {
    opacity: 0;
  }

  .why-enter-to, 
  .why-leave-from {
    opacity: 1;
  }

  .why-enter-active,
  .why-leave-active {
    transition: opacity 2s ease;
  }
</style>
```


## 15

compostion api （VCA)就是拿来替代minxin的

![1714297714673](image/vue3新变化/1714297714673.png)

比如两边都定义了methods，都会执行,全局的mixin，主要挂载到App就行，比minxin更早的是extends，一样的用法，只是更早的api，在早期的vue2中extends用的多

在vue2中写的data、mixin、methos等等，统一叫做options api，而这些选项都会写到setup中去，类型react的useEffect

setup中不能使用this

![1714307554476](image/vue3新变化/1714307554476.png)

```js
<template>
  <div>
    <h2>{{title}}</h2>
  </div>
</template>
<script>
  export default {
    // setup(props, context) {
    setup(props, {attrs, slots, emit}) {
      console.log(props.message);
      console.log(attrs.id, attrs.class);
      console.log(slots);
      console.log(emit);

      return {
        title: "Hello Home",
        counter: 100
      }
    }
  }
</script>
```

简单说下setup执行过程，其实是在【实例产生后】（网上说没实例化，所以setup没this)，调用setup并把props和context作为参数传递给setup（等于没说-_-)

setup返回的数据可以在template中使用，但是如果我们更新了比如title，UI是不更新的，因为titile就是一个普通变量，不具有响应式

reactive：让数据在页面上具有响应式：

```js
<template>
  <div>
    Home Page
    <h2>{{message}}</h2>
    <h2>当前计数: {{state.counter}}</h2>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
  import { reactive } from 'vue';

  export default {
    props: {
      message: {
        type: String,
        required: true
      }
    },
    setup() {
// 不能给reactive直接传string、boolean等简单数据类型
      const state = reactive({
        counter: 100
      })

      // 局部函数
      const increment = () => {
        state.counter++;
        console.log(state.counter);
      }

      return {
        state,
        increment
      }
    }
  }
</script>

<style scoped>

</style>
```

上面因为只有一个变量，搞一个state就比较麻烦，所以当只有一个变量 的时候，可以使用ref：

```js
<template>
  <div>
    Home Page
    <h2>{{message}}</h2>
    <!-- 当我们在template模板中使用ref对象, 它会自动进行解包 -->
    <h2>当前计数: {{counter}}</h2>
    <button @click="increment">+1</button>

    <show-message :message="counter"></show-message>
  </div>
</template>

<script>
  import { ref } from 'vue';

  export default {
    props: {
      message: {
        type: String,
        required: true
      }
    },
    setup() {
      // counter编程一个ref的可响应式的引用
      // counter = 100;
      let counter = ref(100);

      // 局部函数
      const increment = () => {
        counter.value++; // setup中必须通过xx.value进行复制，template中不用谢value（自动解包)
        console.log(counter.value);
      }

      return {
        counter,
        increment
      }
    }
  }
</script>

<style scoped>

</style>
```

![1714309664402](image/vue3新变化/1714309664402.png)

ref只能是浅层解包，比如const r = ref(100) , UI上直接写r就能拿到100，但是如果是如下，返回info，页面上就只能通过info.counter.value去拿值，不能被自动解包，reactive就可以自动解包

```js
 let counter = ref(100);

      const info = {
        counter
      }
return {
	info
}
```

readonly原理：

![1714310078134](image/vue3新变化/1714310078134.png)

```js
setup() {
      // 1.普通对象
      const info1 = {name: "why"};
      const readonlyInfo1 = readonly(info1);

      // 2.响应式的对象reactive
      const info2 = reactive({
        name: "why"
      })
      const readonlyInfo2 = readonly(info2);

      // 3.响应式的对象ref
      const info3 = ref("why");
      const readonlyInfo3 = readonly(info3);

      const updateState = () => {
        // readonlyInfo3.value = "coderwhy"
        info3.value = "coderwhy";
      }

      return {
        updateState,
      }
    }
```


![1714310281199](image/vue3新变化/1714310281199.png)

![1714310312889](image/vue3新变化/1714310312889.png)

![1714310353958](image/vue3新变化/1714310353958.png)



16

继续compostion 

=

=
