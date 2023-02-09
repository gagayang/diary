# 导读

从本章节开始，我们将会把 TypeScript 与 React 相结合，介绍如何在 React 项目中将类型的作用发挥到极致，使我们日常的代码逻辑更加严谨，开发效率事半功倍。

这一节我们会从 React 里的一个核心概念“组件”开始，让大家对 React 的类型，以及运用有一个初步的了解。

# React组件

React 有两种方式创建组件

* 创建一个继承于 `React.Component` 的 `class`
* 创建一个返回 `JSX.Element` 的 `function`

我们先来创建一个最简单的 React 函数组件

```ts
const Comp = (props) =>{
    return <div>{props.title}</div>
}
```

TypeScript 可以将这个函数推导成为 `(title:any)=>JSX.Element` ，尽管这个函数看似已经可以使用，但我们并没有在类型层面约束这个函数，如果函数接收的title是一个对象，或者返回值被修改为非 `JSX.Element` 类型，很可能就会出现预期之外的渲染异常。

那么我们来为这个函数加上类型，让它成为一个合法的 React 组件

```ts
const Comp = (props:{title:string}):JSX.Element => {
    return <div>{props.title}</div>
}
```

React 为此也为函数组件专门提供了一个类型 `React.FC`（即 FunctionComponent 的缩写）。

# React.FC

先使用 `FC` 来定义我们的 `Comp` 组件

```ts
type IProps = {
    title:string
}
const Comp:React.FC<IProps> = (props) => {
    return <div>{props.title}</div>
}
```

那我们来具体看看 `React.FC` 的定义

```ts
type FC<P = {}> = FunctionComponent<P>;
interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}
type PropsWithChildren<P> = P & { children?: ReactNode | undefined }
```

可以看到 `FC` 又名 `FunctionComponent` ，用 `interface` 来描述的函数类型，增加了个一个默认的属性 `children` ，且有四个属性:

* **propTypes** : 用于限制组件 `Props` 的类型，使用 TypeScript 后意义不大。
* **contextTypes** : 用于限制组件 `Content` 的类型，使用 TypeScript 后意义不大。
* **defaultProps** : 默认值，`Partial<P>` 不限制哪个属性必须给默认值。
* **displayName** : 一个简单的 `string`。
* **函数类型** : 入参 `Props` 为 `P & { children?: ReactNode | undefined }` ，返回一个 `ReactElement`。

```ts
// JSX.Element 其实继承于 React.ReactElement
namespace JSX {
    interface Element extends React.ReactElement<any, any> { }
}
```

根据 `FC` 的定义，我们可以推测出 `FC` 与普通函数组件类型的区别

## FC与普通函数组件的区别

1. **children**

一个明显的区别是，`FC` 组件给了一个默认的 `children` 作为 `props`。那么会导致以下一个问题

```ts
 // FC不报错 不符合预期
const Comp1:React.FC = () => <div>Comp1</div>
// 无报错
const Main1 = () => (
    <Comp1>
        <div>children</div>
    </Comp1>
)
// 普通函数组件报错 符合预期
const Comp2 = ():JSX.Element => <div>Comp2</div>
// Type '{ children: Element; }' has no properties in common with type 'IntrinsicAttributes'.
const Main2 = () => (
    <Comp2>
        <div>children</div>
    </Comp2>
)
```

显然 `<div>children</div>` 是一段无效代码，但是 `React.FC` 由于存在默认的 `children`，TypeScript 在静态类型检查阶段没有发现这段代码无用，从而没有报错。

这种情况下，如果我们的组件不接受 `children`，我们可以使用 `React.VFC` 来解决这个问题。

```ts
type VFC<P = {}> = VoidFunctionComponent<P>;

interface VoidFunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}
```

`@types/react` 18 版本之后 `FC` 去除了默认 `children`，类型与 `VFC` 一致。

2. **defaultProps**

我们一般可以通过 `defaultProps` 给予属性默认值。

而在 `React.FC` 中，由于 `React.FC` 类型中的 `defaultProps` 是可选属性，所以如果一个属性是必填的，就算他有默认值，TypeScript 也会给到一个报错

```ts
 // 普通函数 (不报错) 符合预期
type ICompProps = {
  title: string;
};
const NormalComp = (props: ICompProps) => <div>{props.title}</div>;
NormalComp.defaultProps = {
  title: 'hello',
};
const NormalMain = (): JSX.Element => <NormalComp />;

// React.FC (报错) 不符合预期
const Comp: React.FC<ICompProps> = (props) => <div>{props.title}</div>;
Comp.defaultProps = {
  title: 'hello',
};
// Property 'title' is missing in type '{}' but required in type 'ICompProps'.
const Main = (): JSX.Element => <Comp />;
```

3. **组件泛型**

因为 TypeScript 可根据传入的实际值解析泛型类型，大部分代码可复用的情况下，将参数变成泛型后，不同类型的入参可复用同一组件，不用为新类型新写一个组件。

我们可以看到下面的这个例子，组件存在泛型 `T`，可以根据 `list` 的类型去推断出 `render` 函数中参数 `item` 的类型。这样就又可以把列表通用逻辑封装起来，还可以用 TypeScript 来规范类型。

```ts
interface Props<T> {
  list: T[];
  render: (item: T, index: number) => React.ReactNode;
}
function List<T>(props: Props<T>) {
  const { list, render } = props;
  // 列表中其他逻辑...
  return <div>{list.map(render)}</div>;
}
type UserInfo = {
  name: string;
  age: number;
};
const list: UserInfo[] = [];
const Main = () => {
  // 可以根据list的类型，推断出render里item的类型
  return <List list={list} render={(item) => <div>{item.name}</div>} />;
};
```

不过如果使用了 `React.FC`，就没有接收组件泛型的地方，则无法使用到组件泛型的特性了。

# Component

同样我们再来看看 `React.Component` 的类型定义。

从下面的类型可以看出 `Component` 类型继承 `ComponentLifecycle`，增加了组件生命周期的类型，并且有着静态属性与一系列内置属性。

从 `Component` 的类型定义中，可以看出这是 TypeScript 给我们带来的又一个好处，类型完整的代码库，可以很清晰的从类型去看出用法。

```ts
interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> { }
class Component<P, S> {
    static contextType?: Context<any>;
    context: any;
    constructor(props: Readonly<P> | P);
    constructor(props: P, context: any);
    setState<K extends keyof S>(
        state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
        callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
    render(): ReactNode;
    readonly props: Readonly<P> & Readonly<{ children?: ReactNode }>;
    state: Readonly<S>;
    refs: {[key: string]: ReactInstance};
}
```

* props: 泛型 `P` 与 `children` 的联合类型，`props` 与 `props` 的属性都只读，不可修改
* state: 泛型 `S`，属性只读，不可修改
* render: 返回 `ReactNode`
* refs: 一个 value 为 React 实例的对象
* setState: 接收泛型 `K`，可以传一个函数，也可以直接传对象。
  * 函数的入参是上一次的 `state`，以及 `props`，函数返回值必须存在泛型 `K`，或者返回完整的 `State` 类型又或者是 `null`。
  * 对象必须存在泛型 `K`，或者返回完整的 `State` 类型又或者是 `null`。
* forceUpdate: 接收一个函数
* contextType: 静态属性，接收一个 Context

```ts
type IProps = {
  name: string;
};
type IState = {
  title: string;
};
class Greeting extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    // IState类型
    this.state = {
      title: 'title',
    };
  }
  render() {
    // props为 IProps类型
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## LifeCycle

从LifeCycle的类型可以看到 `React.Component` 目前所有可用的生命周期，以及一目了然哪些属于新生命周期，哪些属于废弃生命周期。

```ts
interface ComponentLifecycle<P, S, SS = any> extends NewLifecycle<P, S, SS>, DeprecatedLifecycle<P, S> {
    componentDidMount?(): void;
    shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: ErrorInfo): void;
}
 interface NewLifecycle<P, S, SS> {
    getSnapshotBeforeUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>): SS | null;
    componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void;
}
interface DeprecatedLifecycle<P, S> {
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
    UNSAFE_componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
    componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
    UNSAFE_componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
}
```

**常驻生命周期**

* [componentDidMount](https://react.docschina.org/docs/react-component.html#componentdidmount):
  * 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。
  * 无入参、无返回值
* [componentWillUnmount](https://react.docschina.org/docs/react-component.html#componentwillunmount):
  * 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作。
  * 无入参、无返回值
* [shouldComponentUpdate](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate):
  * 根据 `shouldComponentUpdate()` 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。
  * 接收新 `props` & `state` & `context`，返回布尔值
* [componentDidCatch](https://react.docschina.org/docs/react-component.html#componentdidcatch):
  * 此生命周期在后代组件抛出错误后被调用。
  * 接收 `Error` 与 `ErrorInfo`，无返回值

**新生命周期**

* [componentDidUpdate](https://react.docschina.org/docs/react-component.html#componentdidupdate):
  * `componentDidUpdate()` 会在更新后会被立即调用。首次渲染不会执行此方法。
  * 第三个参数的类型是 `getSnapshotBeforeUpdate` 的返回值类型

**待废弃生命周期**

* [componentWillMount](https://react.docschina.org/docs/react-component.html#unsafe_componentwillmount):
  * 在挂载之前被调用。
  * 无入参、无返回值
* [componentWillReceiveProps](https://react.docschina.org/docs/react-component.html#unsafe_componentwillreceiveprops):
  * 会在已挂载的组件接收新的 props 之前被调用
  * 接收新 `props` 与新 `context`，无返回值
* [componentWillUpdate](https://react.docschina.org/docs/react-component.html#unsafe_componentwillupdate):
  * 当组件收到新的 props 或 state 时，会在渲染之前调用
  * 接收新 `props`、新 `state`、新 `context`，无返回值

# 总结

本章主要讲了 `React` 组件的类型，普通函数组件与 `React.FC` 的定义与区别，以及 `React.Component` 中的属性定义和生命周期。在日常工作中，我们也可以根据具体场景以及 `React.FC` 的特性，去选择是否使用 `React.FC` 为我们提供便利。
