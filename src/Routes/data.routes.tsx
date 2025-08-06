import MainLayout from "../components/layouts/MainLayout";
import AboutPage from "../components/pages/About";
import { HomePage } from '../pages/HomePage';
import TokenSwap from '../pages/Swaptoken';
import routesName from "./enum.routes";
import type { IRouterData } from "./type.routes";

export const routesData: IRouterData[] = [
  {
    path: routesName.ROOT,
    layout: MainLayout,
    component: () => <HomePage/>,
  },
  {
    path: routesName.ABOUT,
    layout: MainLayout,
    component: () => <AboutPage/>,
  },
  {
    path: routesName.TRADE,
    layout: MainLayout,
    component: () => <TokenSwap/>,
  },
  {
    path: routesName.SWAP,
    layout: MainLayout,
    component: () => <TokenSwap/>,
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
];