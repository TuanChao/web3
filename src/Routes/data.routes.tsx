import MainLayout from "../components/layouts/MainLayout";
import AboutPage from "../components/pages/About";
import { HomePageNew } from '../pages/HomePageNew';
// import SwapPage from '../components/Swap/SwapPage';
// import SuperSimpleSwap from '../components/Swap/SuperSimpleSwap';
// import SwapSimple from '../components/Swap/SwapSimple';
// import TestSwap from '../components/Swap/TestSwap';
// import SwapPageNew from '../components/Swap/SwapPageNew';
import SwapPageModern from '../components/Swap/SwapPageModern';
import FeaturesDemo from '../pages/FeaturesDemo';
import { Portfolio } from '../components/web3/Portfolio';
import routesName from "./enum.routes";
import type { IRouterData } from "./type.routes";

export const routesData: IRouterData[] = [
  {
    path: routesName.ROOT,
    layout: MainLayout,
    component: () => <HomePageNew/>,
  },
  {
    path: routesName.ABOUT,
    layout: MainLayout,
    component: () => <AboutPage/>,
  },
  {
    path: routesName.TRADE,
    layout: MainLayout,
    component: () => <SwapPageModern/>,
  },
  // {
  //   path: routesName.SWAP,
  //   layout: MainLayout,
  //   component: () => <PancakeSwapStyle/>,
  // },
  {
    path: '/features',
    layout: MainLayout,
    component: () => <FeaturesDemo/>,
  },
  // Placeholder components for other routes
  {
    path: routesName.EARN,
    layout: MainLayout,
    component: () => <div className="coming-soon">Earn Page - Coming Soon</div>,
  },
  {
    path: routesName.BRIDGE,
    layout: MainLayout,
    component: () => <div className="coming-soon">Bridge Page - Coming Soon</div>,
  },
  {
    path: routesName.PLAY,
    layout: MainLayout,
    component: () => <div className="coming-soon">Play Page - Coming Soon</div>,
  },
  {
    path: routesName.DASHBOARD,
    layout: MainLayout,
    component: () => (
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Portfolio />
      </div>
    ),
  },
];