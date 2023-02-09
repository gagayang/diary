import '../../lepus/setup.lepus';
import ReactLynx, { Component } from '@byted-lynx/react-runtime';
import { ReactNode } from 'react';
import '@common/styles/index.common.scss?common';
import { closeSelf } from '@utils/page-tool';
import { MUXNavBar } from '@i18n-ecom/mux-lynx-components';
import { localI18n } from '@i18n-ecom/lynx-i18n/src/i18n.lepus';
import { noop } from '@i18n-ecom/lynx-utils';
import { ApiResponseError, setNativeItem } from '@i18n-ecom/lynx-bridge';
import { HAS_VIEWED_FLASH_DEAL } from './constants';
import { DataType, PromotionHomePageInfo, promotionSellerApiClient } from '@api/promotion/promotion_seller_api';
import PromotionToolCardCard from './components/promotion-tool-card';
import { dispatch, store } from '@pages/promotion/store';
import { GlobalLoadingStatus } from '@utils/constants';
import ProductInfoSkeleton from './components/skeleton';

import { MoreToolsIcon } from './images';
import { promotionLogger } from '@utils/logger';
import { performanceLogger } from '@i18n-ecom/lynx-monitor';
import { PageState } from '@components/page-state';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PromotionInfoProps {
  loadingStatus: GlobalLoadingStatus;
  error?: ApiResponseError<unknown>;
  promotionInfo?: PromotionHomePageInfo[];
}
interface PromotionInfoState {}
export default class PromotionCenter extends Component<PromotionInfoProps, PromotionInfoState> {
  constructor(props: PromotionInfoState) {
    super(props);
    promotionLogger.init('promotion_tool');
  }

  componentDidMount(): void {
    promotionSellerApiClient
      .dataReport({ data_types: [DataType.EnterPromotion] })
      .then(() => {
        setNativeItem(HAS_VIEWED_FLASH_DEAL, '1');
      })
      .catch(noop);
    this.initPromotionInfoFetch.bind(this)(true);
  }
  initPromotionInfoFetch = (withLogger = false): void => {
    dispatch.promotionInfoModel
      .fetchPromotionInfo()
      .catch(noop)
      .finally(() => {
        withLogger && performanceLogger.logFirstMeaningfulPaintFinish();
        return null;
      });
  };

  content = (promotionInfo?: PromotionHomePageInfo[]) => {
    return (
      <scroll-view id="scroll-container" className="flex-1 w-full  pt-12">
        <view className="rounded-4 mx-12 bg-color-Neutral-White flex flex-col  py-16 px-12">
          <view className="w-full">
            <text className="text-Body-15S text-color-Neutral-Text1">
              {localI18n('promotion_app_title_promotion_tools')}
            </text>
          </view>
          {promotionInfo?.length &&
            promotionInfo?.map((item: PromotionHomePageInfo, index: number) => (
              <PromotionToolCardCard key={index} promotionToolInfo={item} />
            ))}
          <view className="w-full mt-16 p-12 flex flex-row  border-05 border-color-Neutral-Line2 rounded-4">
            <view className="flex flex-col justify-center content-center mr-12">
              <svg content={MoreToolsIcon} style={{ width: '44px', height: '44px' }} />
            </view>
            <view className="flex-1 flex flex-col">
              <text className="text-Body-15S text-color-Neutral-Text4">
                {localI18n('promotion_app_promotion_tool_title_more_tools_soon')}
              </text>
              <x-text
                className="text-Caption-13R mt-4 text-color-Neutral-Text4"
                text-maxline={'2'}
                ellipsize-mode="tail"
              >
                {localI18n('promotion_app_promotion_tool_more_tools_soon_describe')}
              </x-text>
            </view>
          </view>
        </view>
      </scroll-view>
    );
  };

  render(): ReactNode {
    const { promotionInfo, ...rest } = this.props;
    return (
      <view className="h-full w-full flex flex-col bg-color-Neutral-BG-01">
        <MUXNavBar
          className="w-full flex-shrink-0"
          statusBarHeight={`${lynx.__globalProps.statusBarHeight}px`}
          title={localI18n('promotion_app_homepage_title_promotions')}
          showSeparator={false}
          startAction={{
            actionVariant: 'back',
            onClick: closeSelf,
          }}
        />
        <PageState renderer={this.content(promotionInfo)} {...rest} />
      </view>
    );
  }
}
