# 导读

经过了上面几章的学习，我们对 React 中的类型都有了一定的了解，这一章我们会通过定义一个 `TodoList` 的项目的类型，来为大家讲解在真正的实战项目中，如何使用 Typescript 使我们的开发事半功倍。

# 项目描述

**需求简介**

编写一个 `TodoList` 项目，提供增加，删除 `TodoItem` 的能力，通过点击可以修改 `TodoItem` 的状态，切换 `Tab` 可以选择展示指定的 `TodoItem`。并且提供反选以及删除已完成 `TodoItem` 的能力。

**项目示例**

[https://todomvc.com/examples/react/#/](https://todomvc.com/examples/react/#/)

**需求详情(英文)**

[https://github.com/tastejs/todomvc/blob/master/app-spec.md](https://github.com/tastejs/todomvc/blob/master/app-spec.md)

# 项目实现

## TodoItem组件

那么我们首先先来定义 `TodoItem` 的结构，有三个属性，id，是否完成，以及 `TodoItem` 的具体信息。

我们就先创建了一个 `ITodoItem` 类型，并创建 `TodoItem` 的类实现 `ITodoItem` 类型。其中的逻辑处理就在于自动生成 id 属性。

```javascript
export interface ITodoItem {
  id: string
  completed: boolean
  content: string
}
class TodoItem implements ITodoItem {
   // 只读属性
  readonly id: string
  completed: boolean
  content: string
  constructor(content: string, id?: string, completed?: boolean) {
    this.id = id !== undefined ? id : _genID()
    this.completed = completed !== undefined ? completed : false
    this.content = content
  }
}
// 自动生成Id
function _genID(): string {
  return (Date.now().toString() + (Math.random() * 1000).toFixed());
}
export function createTodoItem(content: string, id?: string, completed?: boolean): ITodoItem {
  return new TodoItem(content, id, completed)
}
```

有了 `TodoItem` 的定义后，我们就可以先来书写对应的 `TodoItem` 组件。就可以先通过 `React.FC` 定义组件接收的 `props`，然后确定组件的 `state`。

**Props:**

```javascript
interface IItemPropsType {
  todoItem: ITodoItem
  changeStatus: (id: string, completed: boolean) => Promise<void>
  destroy: (id: string) => void
  changeContent: (id: string, content: string) => Promise<void>
}
```

* todoItem: `ITodoItem` 类型，用于展示 `content`，以及是否 `complete`用。
* changeStatus: `(id: string, completed: boolean) => Promise<void>`，接收 `id` 与 `completed`，`id` 用于从数组中查找该 `todoItem`，`completed` 用于修改状态。
* destroy: `(id: string) => void`，接收 `id`，用于删除相关的 `todoItem`。
* changeContent: `(id: string, content: string) => Promise<void>` 与 `changeStatus` 同理

**state:**

```go
const [inputData, setInputData] = useState<string>(content)
const [updateContent, setUpdateContent] = useState<boolean>(false)
```

* inputData: `string`，由于双击可以修改 `todoItem` 的内容，所以需要一个 `state` 去控制 `input` 框的内容
* updateContent: `boolean`，不双击的时候展示 `content`，双击的时候展示 `input` 框，该字段用于判断该展示哪一个。

**ref:**

```javascript
const inputRef = useRef<HTMLInputElement>(null)
```

* inputRef: `useRef<HTMLInputElement>(null)`，hooks那章有过讲解 `useRef` 的使用，这里是用来存储 `input` 框的 `dom` 节点，所以初始值给 `null`，泛型给到 `HTMLInputElement`。也因为 `inputRef.current` 的类型是 `HTMLInputElement`，所以我们可以使用 `inputRef.current.focus()` 来设置焦点。

**事件:**

```javascript
const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
     // HTMLInputElement.value: string
},[])
```

通过 `handleInputChange` 监听 `Input` 的输入事件，来修改 `inputData`，这里的入参 `e` 就是内置类型章节提到过的合成事件，由 `input` 框触发的 `change` 事件，所以触发的事件类型为 `React.ChangeEvent<HTMLInputElement>`。

```javascript
const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>): void => {
     // React.KeyboardEvent<HTMLInputElement>.keyCode: number
},[])
```

`handleKeyDown` 用于监听键盘事件，如果监听到回车，那么就会触发 `input` 框的 `blur` 事件，这里的 `e` 就是 `input` 框触发的键盘事件，`React.KeyboardEvent<HTMLInputElement>`，那么就可以顺利获得 `e.keyCode` 的类型。

```javascript
const updateBlur = useCallback(async () => {
},[inputData])
```

当 `input` 触发 `blur` 后，就调用 `updateBlur`，处理修改存储逻辑。这个方法没有太多的类型信息，就不多做描述了。

### 代码示例

```javascript
import React, {useEffect, useRef, useState,useCallback} from 'react'
import classNames from "classnames"
import { ITodoItem } from 'common/todoItem'
enum KeyCode {
  'Enter' = 13
}
interface IItemPropsType {
  todoItem: ITodoItem
  changeStatus: (id: string, completed: boolean) => Promise<void>
  destroy: (id: string) => void
  changeContent: (id: string, content: string) => Promise<void>
}
const TodoItem: React.FC<IItemPropsType> = (props) => {
  const { todoItem, changeStatus, destroy, changeContent } = props
  const { id, completed, content } = todoItem
  const [inputData, setInputData] = useState<string>(content)
  const [updateContent, setUpdateContent] = useState<boolean>(false)
   // 初始值给到null，就会被认定为RefObject
   // const inputRef: React.RefObject<HTMLInputElement> 
  const inputRef = useRef<HTMLInputElement>(null)
  const completedIcon = classNames('complete-icon', { 'have-completed': completed })
  const completedContent = classNames('item-content', { 'content-completed': completed })
  const handleDoubleClick = useCallback(() => {
    setUpdateContent(true)
  },[])
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value)
  },[])
  const updateBlur = useCallback(async () => {
    if (inputData) {
       // 内容改变了就看接口是否调用成功，失败就回滚input
      if (inputData !== content) {
        changeContent(id, inputData)
      }
    } else {  
      destroy(id) // input清空就删除行
    }
    setUpdateContent(false)
  },[inputData])
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>): void => {
     // React.KeyboardEvent<HTMLInputElement>.keyCode: number
    e.keyCode === KeyCode.Enter && inputRef.current?.blur()
  },[])
  useEffect(() => {
    updateContent && inputRef.current?.focus()
  }, [updateContent])
  return (
    <li className='todo-item'>
      {
          updateContent ? <input
            className='update-input'
            value={inputData}
            ref={inputRef}
            type="text"
            onBlur={updateBlur}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
          /> : <>
            <div className={completedIcon} onClick={() => { changeStatus(id, !completed) }}/>
            <p className={completedContent} onDoubleClick={handleDoubleClick}>{content}</p>
            <div className='destroy-item' onClick={() => { destroy(id) }}/>
          </>
      }
    </li>
  )
}
export default TodoItem
```

## TodoTab组件

`TodoTab` 组件是用来控制列表显示对应状态的信息，以及展示当前剩余任务数量，还可以通过点击按键，删除所有完成的任务。那么根据以上功能，我们同样用来定义这个组件需要接收的 `props`。

**props:**

```javascript
interface ITabPropsType {
  tabStatus: TabStatus
  todo: ITodoItem[]
  changeTab: (status: TabStatus) => void
  clearCompleted: () => void
}
```

* tabStatus: `TabStatus` 类型，接收当前是哪个状态
* todo: `ITodoItem[]` 类型，也就是整个 `todolist` 的类型，用于计算没完成的 `todo` 数量
* changeTab: `(status: TabStatus) => void`，`TodoTab` 是一个 `memo` 的组件，没有自己的状态，所以通过接收 `tabStatus`，以及 `changeTab`，去修改tab的状态
* clearCompleted: `() => void`，用于删除已完成的任务，由外部实现。

### 代码示例

```js
import React, {memo} from 'react'
import classNames from "classnames"
import {ITodoItem} from "../../common/todoItem"
export enum TabStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed'
}
interface ITabPropsType {
  tabStatus: TabStatus
  todo: ITodoItem[]
  changeTab: (status: TabStatus) => void
  clearCompleted: () => void
}
const TodoTab: React.FC<ITabPropsType> = (props) => {
  const { tabStatus, todo, changeTab, clearCompleted } = props
  const leftItem = todo.filter(todoItem => {
    return !todoItem.completed
  }).length
  const clearClass = classNames('clear-action', {
     // 总数 - 没做的 = 0 就隐藏 clear
    'action-hide': !(todo.length - leftItem)
  })
  return (
    <div className='todo-tab'>
      <p className='todo-left'>{leftItem} items left</p>
      <div className='tab-status'>
        <a className={`tab-item ${tabStatus === TabStatus.All && 'selected'}`} onClick={() => changeTab(TabStatus.All)}>All</a>
        <a className={`tab-item ${tabStatus === TabStatus.Active && 'selected'}`} onClick={() => changeTab(TabStatus.Active)}>Active</a>
        <a className={`tab-item ${tabStatus === TabStatus.Completed && 'selected'}`} onClick={() => changeTab(TabStatus.Completed)}>Completed</a>
      </div>
      <a className={clearClass} onClick={clearCompleted}>Clear completed</a>
    </div>
  )
}
export default memo(TodoTab)
```

## TodoList组件

那么最后我们来实现最外层控制一些的 `TodoList` 组件，该组件不接收 `props`，有三个 `state` 去控制整个 `TodoLists` 的状态

**State:**

```javascript
const [todo, setTodo] = useState<ITodoItem[]>([])
const [tabStatus, setTabStatus] = useState<TabStatus>(TabStatus.All)
const [inputData, setInputData] = useState('')
```

* todo: `ITodoItem[]`，总数据源，存有所有 `todoItem` 的信息。
* tabStatus: `TabStatus`，tab 的状态，初始值必须也为 `TabStatus` 类型，也就是 `TabStatus.All`
* inputData: `string`，React 可控组件的方式，绑定 `input` 输入框的数据。

**ref:**

```javascript
const inputRef = useRef<HTMLInputElement>(null)
```

inputRef: `useRef<HTMLInputElement>(null)`，与 `TodoItem` 里的 `ref` 基本一致，通过泛型 `HTMLInputElement` 设置了 `inputRef.current` 的类型，使得可以调用 `current` 上的 `focus` 方法

**事件:**

`TodoList` 组件同样也有对 `input` 以及 `keyboard` 事件的监听，这块合成事件的类型与 `TodoItem` 的也保持基本一致。并且每一个传入 `TodoItem` 以及 `TodoTab` 的方法，都被组件的 `props` 严格约束了类型，这样可以让我们避免非常多的低级错误。

```jsx
import React, {useState, useCallback, useEffect, useRef,useMemo} from 'react'
import classNames from "classnames"
import TodoItem from "../../components/TodoItem/TodoItem"
import TodoTab from "../../components/TodoTab/TodoTab"
import {ITodoItem, createTodoItem} from "../../common/todoItem"
enum KeyCode {
  'Enter' = 13
}
export enum TabStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed'
}
const TodoList: React.FC = () => {
  const [todo, setTodo] = useState<ITodoItem[]>([])
  const [tabStatus, setTabStatus] = useState<TabStatus>(TabStatus.All)
  const [inputData, setInputData] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const completeAll = useMemo(()=>todo.filter(todoItem => {
    return !todoItem.completed
  }).length===0,[todo])
  const toggleClass = classNames('toggle-all', {
    'completed': completeAll,
    'hideToggle': !todo.length
  })
  // 处理Input框输入事件
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {},[])
  // 更改全局状态
  const toggleCompleteAll = useCallback(async (): Promise<void> => {},[todo])
  // 处理键盘事件
  const handlerKeyDown = useCallback(async (e: React.KeyboardEvent<HTMLInputElement>) => {},[todo,inputData])
  // 删除任务
  const onDestroy = useCallback(async (id: string): Promise<void> => {}, [todo])
  // 清除所有已完成任务
  const onClearCompleted = useCallback(async (): Promise<void> => {}, [todo])
  // 改变任务状态
  const onChangeStatus = useCallback(async (id: string, completed: boolean): Promise<void> => {}, [todo])
  // 修改todoItem的内容
  const onChangeContent = useCallback(async (id: string, content: string): Promise<void> => {}, [todo])
  // 处理tab点击
  const onChangeTab = useCallback((status: TabStatus): void => {}, [tabStatus])
  // 获取list  
  const fetchList = async () => {}
  // useEffect
  useEffect(() => {
    fetchList()
  }, [])
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  // render jsx
  const renderList = () => {
    return todo.filter(todoItem => {
      if (tabStatus === TabStatus.Active) {
        return !todoItem.completed
      } else if (tabStatus === TabStatus.Completed) {
        return todoItem.completed
      }
      return true
    }).map(todoItem => {
      return (
        <TodoItem
          todoItem={todoItem}
          changeStatus={onChangeStatus}
          destroy={onDestroy}
          key={todoItem.id}
          changeContent={onChangeContent}
        />
      )
    })
  }
  return <section className='real-app'>
          <div className='todo-list-header'>
            <div className={toggleClass} onClick={toggleCompleteAll} />
            <input
              type="text"
              ref={inputRef}
              value={inputData}
              className='add-input'
              placeholder='what needs to be done?'
              onKeyDown={handlerKeyDown}
              onChange={handleInputChange}
            />
          </div>
          <ul className='todo-list-content'>{renderList()}</ul>
          {!!todo.length && (
              <div className='todo-list-footer'>
                <TodoTab tabStatus={tabStatus} todo={todo} changeTab={onChangeTab} clearCompleted={onClearCompleted}/>
              </div>
          )}
        </section>
}
export default TodoList
```

看完了 `TodoList` 组件的基本实现，我们再来细化一下 `fetchList`， `fetchList` 的作用是通过接口获取 `todoList` 的基础数据，我们先对接口返回值的结构定义为了 `IResponseType`，接收泛型 `T` 用于设置 `IResponseType` 中 `data` 的类型。

而后我们知道 `Axios` 返回的类型为 `AxiosResponse<T>` 类型，所以我们对 `axios.post` 传入泛型 `<IResponseType<ITodoItem[]>>`，这样我们就可以通过 `res.data.data` 获得 `ITodoItem[]` 类型了。

```javascript
interface IResponseType<T = any> {
  code: AppNamespace.AppStatusEnum
  data: T
  message: string
}
const URL = 'https://xxx.com/'
const GET_TODO_LIST = URL + 'todoList'
export const getTodoList = async () => {
  const res = await axios.post<IResponseType<ITodoItem[]>>(GET_TODO_LIST)
  return res.data
}
// TodoList组件
useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await getTodoList()
         // todoItem: ITodoItem
        let newTodo = res.data.map(todoItem => {
          return createTodoItem(todoItem.content, todoItem.id, todoItem.completed)
        })
        setTodo(newTodo)
      } catch (e) {
        alert(e.message)
      }
    }
    fetchList()
}, [])
```

# 总结

本章我们通过一个具体的 `TodoList` 项目中三个组件的编写，让读者对日常工作中对 React 组件、事件、hooks、请求的类型使用有了一个基本的认识。希望读者在学完了系列章节后，可以将类型合理的运用进日常工作中，让我们业务中的每个变量和属性都拥有自己明确的类型。
