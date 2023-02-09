import ReactLynx, { Component } from '@byted-lynx/react-runtime';
import { view } from '@i18n-ecom/lynx-bridge';
import { ReactNode } from 'react';
import PromotionCenter from './App';
// import { Init } from '@components/init';
export default class IndexPage extends Component {
  componentDidHide(): void {}

  componentDidShow(): void {}

  componentDidMount(): void {
    console.log('123321');
  }

  render(): ReactNode {
    // return <Init renderer={PromotionCenter} />;
    return <view>hahah</view>
  }
}
