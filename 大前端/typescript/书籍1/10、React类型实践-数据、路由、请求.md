# 导读

上面几章我们对日常使用 React，会遇到的类型进行了一定的讲解，而我们工作中，仅仅 React 是无法满足我们日常工作内容的，我们还会用到 `redux` 来管理数据、`react-router` 来处理路由、以及 `axios` 来处理请求，本章就会围绕这些工具来进行类型的讲解。

# Redux

## createStore

> 创建一个包含程序完整 state 树的 Redux store 。 应用中应有且仅有一个 store。

在我们使用 `redux` 时，可以通过 `createStore`，传入 `reducer` 来创建一个 store。通过 `dispatch` 触发 `Action`，通过 `getState` 来获取最新的 `state`。

```go
import { createStore } from 'redux'
 // 必须存在type字段
type IAction = {
  type: 'ADD_TODO',
  text: string,
}
 // 必须是reducer类型，接收state与action，返回state
function todos(state: string[] = [], action: IAction) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}
 // 第一个参数是reducer
 // 第二个参数是初始值，类型被reducer的第一个参数类型限制，所以这里必须传入string[]。 
const store = createStore(todos, ['Use Redux'])

 // 必须传入IAction类型
store.dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs'
})
 // 返回state的类型
// let state: string[]
let state = store.getState()
```

其实从上面这个例子可以看出我们的代码与普通的 `JavaScript` 代码的区别仅在于给了 `todos` 的入参类型，而在我们使用 `store` 的各种方法时，可以得到类型提示来提高我们的编码效率、以及通过类型限制来避免我们错误使用。

```javascript
export declare function createStore<S, A extends Action, Ext, StateExt>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S>,
  enhancer?: StoreEnhancer<Ext>
): Store<S & StateExt, A> & Ext

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S

export interface Store<S = any, A extends Action = AnyAction> {
  dispatch: Dispatch<A>
  getState(): S
  subscribe(listener: () => void): Unsubscribe
}
```

`createStore` 第一个参数类型为 `Reducer`，`Reducer` 的入参 `state` 与 `action` 的类型 `S` 与 `A` 类型几乎控制了整个 `store` 的类型。第二个参数初始值 `preloadedState` 会被 `Reducer` 中 `state` 的类型 `S` 所限制。

`createStore` 返回是 `Store` 类型，也被 `Reducer` 的泛型 `S` 与 `A` 所约束，这也就是为什么我们使用 `dispatch` 以及获取 `state` 时，都可以拿到符合我们预期的类型。

# React-Router

> React Router 启用“客户端路由”。客户端路由允许您的应用通过链接点击更新 URL，而无需从服务器再次请求另一个文档。相反，您的应用程序可以立即呈现一些新的 UI 并使用 fetch 发出数据请求以使用新信息更新页面。

React项目一般我们都会使用 `react-router` 来做路由管理，我们先来看个简单的示例，来看看如何使用 `react-router`，以及类型在其中起到的作用。

```javascript
import {RouterProvider} from 'react-router-dom'
export interface RouterProviderProps {
    fallbackElement?: React.ReactNode;
    router: Router;
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

从示例中可以看出最外层的组件 `RouterProvider` 需要接收一个 `Router` 类型的 `props` 用于渲染页面，那我们就需要通过 `createBrowserRouter` 并传入一个 `RouteObject` 类型的数组来创建 `Router`，就可以符合 `react-router` 的预期。

```ts
import {createBrowserRouter} from 'react-router-dom'
import Root from "./routes/root";
import Dashboard from "./routes/Dashboard";
export declare function createBrowserRouter(routes: RouteObject[], opts?: {
    basename?: string;
    hydrationData?: HydrationState;
    window?: Window;
}): Router;
interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  handle?: RouteObject["handle"];
  shouldRevalidate?: ShouldRevalidateFunction;
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
```

`react-router` 还提供了将 `ReactNode` 转化为 `RouterObject` 的能力

```ts
export declare function createRoutesFromChildren(children: React.ReactNode, parentPath?: number[]): RouteObject[];
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

# Axios

> Axios 是一个基于 *promise* 网络请求库，作用于 `node.js` 和浏览器中。 它是 *isomorphic* 的(即同一套代码可以运行在浏览器和node.js中)。在服务端它使用原生 node.js `http` 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests。

## 数据请求

我们一般会通过 `axios.get` 以及 `axios.post` 去发送数据请求，由于数据的返回结果是不可控的，所以 `Typescript` 没法帮我们推断出返回值的类型，我们可以通过主动传入泛型 `T` 来控制请求的返回值类型。

```javascript
type IRes = {
    msg: string,
    status_code: number,
    data: any
};
axios.post<IRes>('xxx', {
    id: '1'
}).then(res => {
    // AxiosResponse<IRes, any>.data: IRes
    console.log(res.data)
});
```

`axios` 的请求返回结果是 `AxiosResponse` 类型，我们传入的泛型 `IRes`，对应了 `data` 的泛型T，所以当我们获取 `res.data` 时，拿到的就是 `IRes` 类型。

```ts
export interface AxiosResponse<T = any, D = any>  {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}
```

`axios` 中第二个重要的类型就是 `AxiosRequestConfig` 用于设置请求所需要的所有的配置信息，我们可以看到 `AxiosRequestConfig` 有非常多的属性，在日常工作中我们肯定没有办法对每一个工具的所有用法都了然于胸，我们可以通过对类型的查看，来获取到大部分显而易见的使用信息，比如通过 `onUploadProgress` 获取上传进度，通过 `timeout` 设置超时时间等。

同时类型也可以规范我们的用法，当我们在使用一个不符合预期的 `method` 时，类型系统可以瞬间提示给我们，而不需要我们在运行时报错后，通过debug的方式去排查。

```ts
export interface AxiosRequestConfig<D = any> {
  url?: string;
  method?: Method | string;
  baseURL?: string;
  transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
  transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
  headers?: AxiosRequestHeaders;
  params?: any;
  paramsSerializer?: (params: any) => string;
  data?: D;
  timeout?: number;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  adapter?: AxiosAdapter;
  auth?: AxiosBasicCredentials;
  responseType?: ResponseType;
  responseEncoding?: responseEncoding | string;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: ((status: number) => boolean) | null;
  maxBodyLength?: number;
  maxRedirects?: number;
  beforeRedirect?: (options: Record<string, any>, responseDetails: {headers: Record<string, string>}) => void;
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: AxiosProxyConfig | false;
  cancelToken?: CancelToken;
  decompress?: boolean;
  transitional?: TransitionalOptions;
  signal?: AbortSignal;
  insecureHTTPParser?: boolean;
  env?: {
    FormData?: new (...args: any[]) => object;
  };
}
```

## 拦截器

> 在请求或响应被 then 或 catch 处理前拦截它们。

```javascript
export interface AxiosInterceptorManager<V> {
  use<T = V>(onFulfilled?: (value: V) => T | Promise<T>, onRejected?: (error: any) => any, options?: AxiosInterceptorOptions): number;
  eject(id: number): void;
}
export class Axios {
  constructor(config?: AxiosRequestConfig);
  defaults: AxiosDefaults;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  ...
}
```

`axios` 为我们提供了拦截器的功能，我们可以通过 `use` 方法在请求发出前处理 `AxiosRequestConfig`，也可以在请求返回后对 `AxiosResponse` 进行处理。从类型也可以看出，我们的拦截器必须接收与返回的类型必须一致，如果我们将请求的 `AxiosRequestConfig` 类型改变，那 `axios` 就无法正确的发送请求。

```ts
axios.interceptors.request.use<AxiosRequestConfig>((config) => {
    // 在发送请求之前做些什么     return config;
});
```

# 总结:

在本章我们对工作中除 `React` 外的一些常用库的类型进行了讲解，我们会发现本章讲到的三个工具库的类型，基本处于开箱即用的状态，他们会去合理且准确的推断类型。当我们使用这些库的时候，很多时候只要简单的明确了入参的类型，或者传入一两个泛型，就可以让工具库推断出完整的类型，以方便我们后续使用。
