import ReactLynx, { Component } from '@byted-lynx/react-runtime';
import { ReactNode } from 'react';
import { dispatch, store } from '@pages/promotion/store';

export interface ConnectProps {
  [x: string]: unknown;
  mapStateToProps: unknown;
  mapDispatchToProps: unknown;
  renderer: React.ElementType;
}

export interface ConnectState {
  stateData: unknown;
}

export class Connect extends Component<ConnectProps, ConnectState> {
  constructor(props: ConnectProps) {
    super(props);
    // this.state = {
    //   stateData: {},
    // };
  }

  componentDidHide(): void {}

  componentDidShow(): void {}

  componentDidMount(): void {
    const { mapStateToProps, mapDispatchToProps } = this.props;
    this.setState({
      stateData: mapStateToProps(globalThis.store.getState().promotionInfoModel),
      dispathObj: mapDispatchToProps(dispatch),
    });
  }

  render(): ReactNode {
    const { renderer: R, mapStateToProps, mapDispatchToProps, ...rest } = this.props;
    const { stateData, dispathObj } = this.state;
    return <R {...(stateData || {})} {...(dispathObj || {})} {...rest} />;
  }
}
