# 导读

本章节将会介绍 React 中 各种 hooks 的类型，很多 hooks 都有着自己的泛型坑位，可以显式的设置来约束入参类型，也可以根据入参类型来推断。我们会对日常工作中常用的 hooks 进行类型的分析，以及使用示例讲解，让读者学完本章后，不止可以将 hooks 的类型运用的更加熟练，也可以学习到 React 是如何将泛型，重载等功能合理的运用。

# hooks

## useState

> 返回一个 state，以及更新 state 的函数。

```javascript
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
```

`useState` 对是否接收入参，进行了区分重载。

`useState` 接收一个泛型 `S`，也可以根据入参类型推断。

在不主动设置泛型 `S` 类型的情况下，那么泛型 `S` 的类型就是入参的类型或者入参的返回值类型。

如果主动设置泛型 `S`，则约束了 `useState` 入参的类型。

```javascript
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

 // str 的类型就是入参 text 的类型
// const str: string
const [str, setStr] = useState('text');

 // 如果入参是个函数，那 S 的类型就是函数的返回值。 
// const testObj: {type: string}
const [testObj, setTestObj] = useState(() => ({ type: 'test' }));

 // 如果主动传入类型，那么 S 就会以传入的类型为主
// Argument of type 'string' is not assignable to parameter of type 'number | (() => number)'.
const [data, setData] = useState<number>('0');
```

当 `useState` 没有接收入参的时候，那么就会走到重载的第二种类型，我们必须通过主动设置泛型 `S` 来规定 `useState` 的返回值，否则类型会被默认设置为 `undefined`。`undefined` 不会是我们真实的诉求，**所以当 `useState` 没有入参作为默认值的时候，我们必须显式的去设置泛型。**

```javascript
function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

 // 主动传入类型，返回值为 S | undefined
// const bol: boolean | undefined
const [bol, setBol] = useState<boolean>();

 // 不传入类型，那么返回值类型为undefined，不符合我们业务使用的预期
// const und: undefine
const [und, setUnd] = useState();
```

## useEffect

> 该 Hook 接收一个包含命令式、且可能有副作用代码的函数。

```javascript
function useEffect(effect: EffectCallback, deps?: DependencyList): void;
type EffectCallback = () => (void | Destructor);
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
type DependencyList = ReadonlyArray<any>;
```

`useEffect` 不接收泛型，函数接收两个参数，返回 `void` 类型。

第一个参数是一个函数，函数的返回值必须是 `void`，或者是 `destructor`。

第二个参数是依赖列表，数组即可。

```javascript
function useEffect(effect: EffectCallback, deps?: DependencyList): void;
 // 第一个参数可以没有返回值
useEffect(() => {
    console.log('useEffect')
}, []);

 // 第一个参数也可以是一个destructor函数
useEffect(() => {
    const fn = () => {};
        window.addEventListener('scroll', fn);
    return () => {
        window.removeEventListener('scroll', fn);
    };
}, []);
```

## useLayoutEffect

> 其函数签名与 `useEffect` 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，`useLayoutEffect` 内部的更新计划将被同步刷新。

```javascript
 function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void;
```

`useLayoutEffect` 与 `useEffect` 类型相同

## useContext

> 接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定。

```html
function useContext<T>(context: Context<T>): T;
```

`useContext` 接收一个泛型 `T`，返回类型为 `T` 的类型。如果不主动传入泛型 `T`，则可以通过入参 `context` 的类型去推断出 `T` 的类型。主动传入泛型 `T` 则根据 `T` 约束入参类型。

```go
function useContext<T>(context: Context<T>): T;

type IData = {
  a: number;
  b: string;
};
 // 这里指定泛型为IData
// const context: React.Context<IData>
const context = React.createContext<IData>({
  a: 1,
  b: '2',
});
 // 所以这里ctx的类型也为IData
// const ctx: IData
const ctx = useContext(context);
```

## useCallback

> 把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染的子组件时，它将非常有用。

```javascript
function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;
```

`useCallback` 接收一个函数类型的泛型 `T`，返回类型为 `T` 的类型，如果不主动传入泛型，则可以根据第一个参数 `callback` 的去推断出泛型 `T` 的类型。第二个参数是依赖列表，数组即可。主动传入泛型则根据泛型约束入参类型。

```javascript
function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;

 // 根据入参推断返回值
// const handleClick: () => void
const handleClick = useCallback(() => {
    window.close();
}, []);
  
 // 根据泛型决定入参类型 
// const handleGetRandom: () => number
const handleGetRandom = useCallback<() => number>(() => {
    return Math.random();
}, []);
```

## useMemo

> 把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

```javascript
function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
```

`useMemo` 与 `useCallback`基本类似，`useMemo` 的泛型不限制为函数。且依赖列表可为 `undefined`，这里要注意，从类型来看 `useMemo<span> </span>`的 `deps` 参数并不是可选参数，必须传值。

```javascript
function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
 // 显式传入泛型，则约束返回值格式
// const randomNumber: number
const randomNumber = useMemo<number>(() => {
    return Math.random();
  }, []);
  
 // 也可以根据函数返回值来推断类型
// const getText: string
const getText = useMemo(() => 'testText', undefined);
```

## useRef

> `useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。返回的 ref 对象在组件的整个生命周期内持续存在。

```html
function useRef<T>(initialValue: T): MutableRefObject<T>;
function useRef<T>(initialValue: T | null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;
interface MutableRefObject<T> {
    current: T;
}
interface RefObject<T> {
    readonly current: T | null;
}
```

`useRef` 对入参为 `null` 和 `undefined` 的情况进行了重载，正常情况下，接收一个泛型 `T`，`T` 可以根据入参类型推断。并会返回一个对象，该对象的 `current` 属性的类型为 `T`。

**如果不给默认值，则必须显式的传入泛型** **`T`** **，否则T的类型为** **`undefined`** **。**

**如果默认值给了** **`null`** **，那么current属性是只读属性，不可更改。**

为什么 `useRef` 需要三个重载？我们来看下我们一般使用 `useRef` 的场景就能发现端倪。

```javascript
 // 只读
// const dom: React.RefObject<HTMLDivElement>
const dom = useRef<HTMLDivElement>(null);

 // 可写
// const value: React.MutableRefObject<number>
const value = useRef<number>(0);

 // 可写
// const text: React.MutableRefObject<string | undefined>
const text = useRef<string>();
```

`useRef` 一般有两个使用场景，用来存一个 `dom` 的引用、以及保持对某个值的引用。

我们可以看到当我们存取 `dom` 的时候，一般会先赋予默认值 `null`，那么返回值就会被推断为 `RefObject<HTMLDivElement>`，在这种场景下，我们不会再去主动修改该 `ref`，所以 `current`被视为是 `readonly`。

而当我们要用 `ref` 去存储一个值的引用的时候，我们大概率会去修改这个值，所以是 `MutableRefObject<T>`。

> 所以当我们用 `ref` 存取值的时候，不可以将默认值设为 `null`。这会使我们无法修改该ref。

## useImperativeHandle

> `useImperativeHandle` 可以让你在使用 `ref` 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。`useImperativeHandle` 应当与 `forwardRef` 一起使用

```javascript
function useImperativeHandle<T, R extends T>(ref: Ref<T> | undefined, init: () => R, deps?: DependencyList): void;
```

从类型可以看出，第二个参数的返回值 `R` 继承与第一个参数的泛型 `T`，我们来举个例子看看什么意思。

```javascript
function useImperativeHandle<T, R extends T>(ref: Ref<T> | undefined, init: () => R, deps?: DependencyList): void;

type IRef = {
  handleShow: () => void;
};
type IProps = {
  title: string;
};
// IRef, IProps 设置了props与ref的类型。
const Comp = React.forwardRef<IRef, IProps>((props, ref) => {
  useImperativeHandle(
     // IRef就是useImperativeHandle的泛型T
    // ref: React.ForwardedRef<IRef>
    ref,
     // useImperativeHandle的第二个参数的返回值必须继承于IRef。 
    () => ({
      handleShow: () => {
        console.log(props.title);
      },
    }),
    [props.title]
  );
  return <div>{props.title}</div>;
});
const Main = () => {
  const ref = useRef<IRef>(null);
  useEffect(() => {
     // 这里就可以获取到 Comp 挂载到 ref 上的值
    ref.current?.handleShow();
  }, []);
  return <Comp title="title" ref={ref} />;
};
```

由于 `useImperativeHandle` 第二个参数的返回值会被挂在 `ref` 上，所以也可以理解为什么要求返回值必须继承于 `IRef`。

## useReducer

> `useState` 的替代方案。它接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 state 以及与其配套的 `dispatch` 方法。

```javascript
function useReducer<R extends Reducer<any, any>, I>(
    reducer: R,
    initializerArg: I & ReducerState<R>,
    initializer: (arg: I & ReducerState<R>) => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>];

function useReducer<R extends Reducer<any, any>, I>(
    reducer: R,
    initializerArg: I,
    initializer: (arg: I) => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>];
function useReducer<R extends Reducer<any, any>>(
    reducer: R,
    initialState: ReducerState<R>,
    initializer?: undefined
): [ReducerState<R>, Dispatch<ReducerAction<R>>];
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;
```

`useReducer` 同样根据入参类型有不同的重载处理。

我们先从 `useReducer` 的返回值看起，返回值只与第一个泛型 `R`有关，R的类型继承于 `Reducer<any,any>`。

* `ReducerState` 是通过 `infer` 获取到 `Reducer<S,A>` 中 `S` 的类型。***那么 `ReducerState<R>` 就是 `reducer` 的 `state` 类型。***
* `ReducerAction`则通过 `infer`获取到 `Reducer<S,A>`中 `A`的类型。***那么 `ReducerAction<R>` 就是 `reducer` 的 `action` 类型。***

所以 `initializerArg`，也就是初始值，必须是 `ReducerState<R>` 类型，我们看到第三条函数重载就是这个设计，当初始值是 `ReducerState<R>` 时，不需要第三个处理函数了。

那如果 `initializerArg` 不是 `ReducerState<R>` 类型怎么办呢？那就得通过 `initializer` 这个函数来将 `initializerArg` 的类型转化为 `ReducerState<R>`。也就是第二条函数重载的结果。

那如果 `initializerArg` 即是 `ReducerState<R>`，又需要一个函数去处理下怎么办呢？那就是第一条函数重载的定义。

我们继续举个例子来说明

```javascript
type IState = {
  count: number;
};
type IAction = {
  type: 'increment' | 'decrement';
  payload?: number;
};
const initialInfo: IState = {
  count: 0,
};
function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + (action?.payload || 1) };
    case 'decrement':
      return { count: state.count - (action?.payload || 1) };
    default:
      throw new Error();
  }
}
function Counter() {
   // initialInfo和state的类型都是 IState，所以不需要第三个参数去处理
   // state为reducer的state的类型
  // action为reducer的action的类型
  // const state: {count: number;}
  // const dispatch: React.Dispatch<IAction>
  const [state, dispatch] = useReducer(reducer, initialInfo);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}
```

# 总结

`hooks` 是我们现在使用 React，用到最频繁的方法。经过了对 `hooks` 的类型学习，我们会发现 `hooks` 有不少函数重载的用法，为用户不同的行为，做了各种情况的处理，通过这些类型定义，可以去推测出函数内部的实现，帮助我们我们更加正确的去使用。
