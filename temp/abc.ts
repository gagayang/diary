interface C<S, R> {}
interface B<S, R> {
  [key: string]: C<S, R>
}
interface A<S> {
  state: S,
  action: B<S, S> // 这里不是定义的地方，只是调用的地方，所以可以重复
}
