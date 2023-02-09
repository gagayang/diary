# 导读

本节我们将对工作中 React 常用的 API、合成事件等内置的类型进行讲解，让大家对 React 里的类型有一个更加深刻认识。

# API

## 组件

**React.Componet**

【React类型基础 - 组件】章节对 `React.Component` 有了一定的介绍。

**React.PureComponent**

> `React.Component` 并未实现 `shouldComponentUpdate()`，而 `React.PureComponent` 中以浅层对比 prop 和 state 的方式来实现了该函数。

```ts
class PureComponent<P = {}, S = {}, SS = any> extends Component<P, S, SS> { }
```

`PureComponent` 的类型与 `Component` 保持一致，用法也基本一致。

**React.memo**

> 如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 `React.memo` 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

```ts
function memo<P extends object>(
    Component: FunctionComponent<P>,
    propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
): NamedExoticComponent<P>;
function memo<T extends ComponentType<any>>(
    Component: T,
    propsAreEqual?: (prevProps: Readonly<ComponentProps<T>>, nextProps: Readonly<ComponentProps<T>>) => boolean
): MemoExoticComponent<T>;
```

从类型可以看出，`memo` 对 `Component` 属性的类型，进行了重载，当 `Component` 是 `React.FC` 时，取出了 `FC` 的泛型 `P`，将 `P` 作为 `propsAreEqual` 的参数类型。那如果我们没有为函数组件声明为 `React.FC` 类型，`memo` 就会通过 `ComponentProps<T>` 的方式去读取组件的 `props`。

**使用示例:**

```ts
type IProps = {
  title: string;
};
function MyComponent(props: IProps) {
  return <div>{props.title}</div>;
}
const MyComp: React.FC<IProps> = (props) => <div>{props.title}</div>;
 // prev: Readonly<IProps> 
React.memo(MyComponent, (prev, next) => {});
 // prev: Readonly<IProps> 
React.memo(MyComp, (prev, next) => {});
 // 当然我们也可以指定泛型来约束参数类型
```

我们会发现 `memo` 的两种重载中 `prev` 的值都是一致的。是因为之前提过的在 `@types/react18`中，去除了FC里默认的 `children`。

如果是 17 版本的 `@types/react`，prev类型就会是 `Readonly<React.PropsWithChildren<IProps>>`

## 创建React元素

**React.createElement**

> 使用 [JSX](https://zh-hans.reactjs.org/docs/introducing-jsx.html) 编写的代码将会被转换成使用 `React.createElement()` 的形式。如果使用了 JSX 方式，那么一般来说就不需要直接调用 `React.createElement()`。

```ts
function createElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
    type: keyof ReactHTML,
    props?: ClassAttributes<T> & P | null,
    ...children: ReactNode[]): DetailedReactHTMLElement<P, T>;
interface DetailedReactHTMLElement<P extends HTMLAttributes<T>, T extends HTMLElement> extends DOMElement<P, T> {
    type: keyof ReactHTML;
}
function createElement<P extends {}>(
    type: FunctionComponent<P> | ComponentClass<P> | string,
    props?: Attributes & P | null,
    ...children: ReactNode[]): ReactElement<P>;
// 省略很多类型，...
```

`createElement` 根据 `jsx` 中不同的类型来决定生成的元素类型。接收原生 dom 就会返回 `DOMElement` 类型，接受React组件就会返回 `ReactElement` 类型。

日常开发中基本不会直接用到 `React.createElement`，这里就不展示用法了，感兴趣的话可以看下 `React.createElement` 具体实现

[https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts)

## 转换元素

**React.cloneElement**

> 以 `element` 元素为样板克隆并返回新的 React 元素。`config` 中应包含新的 props，`key` 或 `ref`。返回元素的 `props` 是将新的 `props` 与原始元素的 `props` 浅层合并后的结果。

```ts
function cloneElement<P>(
    element: ReactElement<P>,
    props?: Partial<P> & Attributes,
    ...children: ReactNode[]): ReactElement<P>;
function cloneElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
    element: DetailedReactHTMLElement<P, T>,
    props?: P,
    ...children: ReactNode[]): DetailedReactHTMLElement<P, T>;
// 省略一大堆类型
```

可以看出 `React.cloneElement` 根据接收的 `element` 类型，返回相同类型的 `element`，与预期的行为是一致的。

**使用示例:**

```javascript
type IProps = {
  title?: string;
};
const MyComp: React.FC<IProps> = (props) => {
  return <div>{props.title||''}</div>;
};
 // const cloneElement: React.FunctionComponentElement<IProps> 
const cloneElement = React.cloneElement<IProps>(<MyComp />, { title: 'title' });
```

**React.isValidElement**

> 验证对象是否为 React 元素，返回值为 `true` 或 `false`。

```javascript
 function isValidElement<P>(object: {} | null | undefined): object is ReactElement<P>;
```

`isValidElement` 接收一个对象，通过类型谓词 `is` 关键字，将明确的 `ReactElement<P>` 类型返回到条件为 `true` 的代码块中。

**使用示例:**

```javascript
render() {
    const { content } = this.props;
    return React.isValidElement(content)) ? content : <div class="text-message">{content}</div>
}
```

**React.Children**

> `React.Children` 提供了用于处理 `this.props.children` 不透明数据结构的实用方法。

```javascript
  interface ReactChildren {
    map<T, C>(children: C | C[], fn: (child: C, index: number) => T):
      C extends null | undefined ? C : Array<Exclude<T, boolean | null | undefined>>;
    forEach<C>(children: C | C[], fn: (child: C, index: number) => void): void;
    count(children: any): number;
    only<C>(children: C): C extends any[] ? never : C;
    toArray(children: ReactNode | ReactNode[]): Array<Exclude<ReactNode, boolean | null | undefined>>;
  }
```

`ReactChildren` 上有5个方法，入参都为 `children`，`children` 可能为一个元素，也可能为数组。

**使用示例:**

```javascript
const MyComp: React.FC<IProps> = props => {
  const { children } = props;
   // 从类型可以看出 map接收children与一个处理函数fn， 返回一个fn的返回值T类型的数组
  // const res: JSX.Element[] | null | undefined
  const res = React.Children.map(children, item => {
    return <div>123</div>;
  });
  
  React.Children.forEach(children, item => {
   // children的类型不确定，所以item的类型是所有可能的ReactNode类型
  // item: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactPortal | null | undefined
  });
   // 返回children的数量，为number类型
  // const num: number
  const num = React.Children.count(children);
   // 将 children 转化为数组
  // const array: (React.ReactChild | React.ReactFragment | React.ReactPortal)[]
  const array = React.Children.toArray(children);
  try {
    // only<C>(children: C): C extends any[] ? never : C;
     // children只有一项是会返回children，否则报错，类型则体现为never
    const only = React.Children.only(children);
  } catch (e) {
    console.log(e);
  }
  return res?.length ? res : <div>123</div>;
};
```

## Refs

**React.createRef**

> `React.createRef` 创建一个能够通过 ref 属性附加到 React 元素的 ref。

```html
function createRef<T>(): RefObject<T>;
interface RefObject<T> {
    readonly current: T | null;
}
```

`createRef` 可以通过泛型 `T` 设置返回值的 current 属性的类型。

**使用示例:**

```javascript
class MyComponent extends React.Component {
  inputRef: React.RefObject<HTMLInputElement>;
  constructor(props) {
    super(props);
 // createRef的泛型是为了限制 this.inputRef 的类型
 // 上面已经给了 this.inputRef 明确的类型，所以这里可以不用给泛型
    this.inputRef = React.createRef();
  }
  render() {
    return <input type="text" ref={this.inputRef} />;
  }
  componentDidMount() {
    this.inputRef?.current?.focus();
  }
}
```

**React.forwardRef**

> `React.forwardRef` 会创建一个 React 组件，这个组件能够将其接受的 [ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 属性转发到其组件树下的另一个组件中。

```javascript
function forwardRef<T, P = {}>(render: ForwardRefRenderFunction<T, P>): 
    ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
  
interface ForwardRefRenderFunction<T, P = {}> {
    (props: PropsWithChildren<P>, ref: ForwardedRef<T>): ReactElement | null;
    displayName?: string | undefined;
    defaultProps?: never | undefined;
    propTypes?: never | undefined;
}
type ForwardedRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null;
```

`React.forwardRef` 接收一个函数 `render`，`render` 的入参类型会根据 `forwardRef` 传入的泛型决定，并返回一个新的 React 组件。

**使用示例:**

```javascript
type IProps = {
    title: string
}
const FancyButton = React.forwardRef<HTMLButtonElement, IProps>((props, ref) => (
  // props: React.PropsWithChildren<IProps>
  // ref: React.ForwardedRef<HTMLButtonElement>
  <button type="submit" ref={ref} className="FancyButton">
    {props.title}
  </button>
));
 // FancyButton的ref接收React.Ref<HTMLButtonElement>类型
 // 所以这里也要给确定的泛型来保证ref的类型
const ref = React.createRef<HTMLButtonElement>();
const comp = <FancyButton title="CLICK" ref={ref} />;
```

由于 `ref` 可以接收函数，所以 `ref` 不止是 `MutableRefObject<T>` 类型，还可以是 `(instance: T | null) => void`，也就组合成了 `React.ForwardedRef<T>` 类型。

## Suspense

**React.lazy、React.Suspense**

> `React.lazy()` 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件。
>
> `React.Suspense` 可以指定加载指示器（loading indicator），以防其组件树中的某些子组件尚未具备渲染条件

```javascript
function lazy<T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>
): LazyExoticComponent<T>;
const Suspense: ExoticComponent<SuspenseProps>;
interface SuspenseProps {
    children?: ReactNode;
    fallback: NonNullable<ReactNode> | null;
}
```

从类型可以看出 `lazy` 接收一个返回的类型是 `Promise<{default:T}>` 的函数。`Suspense` 的特别之处是有个 `props` 为 `fallback`，我们来看看这两个方法的使用。

**使用示例:**

```javascript
const OtherComponent = React.lazy(() => import('./OtherComponent'));
function MyComponent() {
  return (
    // 显示 <Spinner> 组件直至 OtherComponent 加载完成
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

类型相关的部分比较简单明了，这里就不做过多描述了。

# 合成事件

> React 通过将事件 normalize 以让他们在不同浏览器中拥有一致的属性。

React中合成事件非常多，我们先从日常工作中比较常用的例子入手，比如遇到以下场景

```javascript
function Example() {
  const handleChange = (e) => {
    // e: any
    console.log(e.target);
  };
  return <input onChange={handleChange} />;
}
```

在 `handleChange` 中 `e` 的类型是 `any`，那么这时候我们就可以给到 React 中合成事件的类型 `React.ChangeEvent<HTMLInputElement>`来标定 `onChange`事件 回调中参数 `e`的类型。我们来看看 `ChangeEvent`的定义。

```javascript
const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
};
 // 也可以限制函数的类型
 const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target);
 };
```

```ts
interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
}
interface SyntheticEvent<T = Element, E = Event> extends BaseSyntheticEvent<E, EventTarget & T, EventTarget> { }
interface BaseSyntheticEvent<E = object, C = any, T = any> {
    nativeEvent: E;
    currentTarget: C;
    target: T;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
    timeStamp: number;
    type: string;
}
```

`ChangeEvent` 接收一个泛型，来更严格的限制属性的类型。`ChangeEvent` 除了有 target 属性外，还继承于 `SyntheticEvent`。

`SyntheticEvent` 是浏览器的原生事件的跨浏览器包装器。我们可以看到除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，也可以通过 `nativeEvent` 去调用浏览器原生的属性和方法。

不同的事件则可以使用对应的合成事件接口

```html
  type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>;
  type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent<T>>;
  type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
  type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
  type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
  type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
  type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;
  type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
  type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
  type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
  type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
  type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
  type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>;
  type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>;
```

# 其他

## ReactElement 与 ReactNode

很多同学在开发的时候会搞不清楚 `ReactElement` 与 `ReactNode` 的区别，其实从类型就可以看出，`ReactElement` 指的是一个有效的 `jsx` 元素，比如 `createElement` 的返回值就是 `ReactElement` 类型，而 `ReactNode` 还包含了 `boolean`，`null`，`undefined`，`string` 等一切可以作为节点的类型。

```go
interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
}
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
type ReactChild = ReactElement | ReactText;
```

# 总结

本节对 React 中常用的 `API`，事件等类型进行了一系列讲解，希望读者通过本章的学习后，可以对 `React` 的类型系统有更深刻的认识，使用内置 `API`时，可以不再通过 `any` 去解决报错，遇到事件的时候，可以选择符合预期的事件类型，并传入正确的泛型。
