import { COLOR } from "../constants/common.constats";

export namespace OverviewPage {
  export interface OverviewItem  {
    percent: number;
    compare: number;
    todayday: number;
    isHigher: boolean;
  }

  export interface Overview {
    gain: OverviewItem;
    orders: OverviewItem;
  }

  export interface Config {
    title: string;
    unit: string;
    description: string;
    color: string;
  }

  export const ConfigRevenue: Config = {
      title: 'Revenue',
      unit: '$',
      description:'Your business revenue yesterday',
      color: COLOR.revenue
  }

  export const ConfigOrders: Config = {
    title: 'Orders',
    unit: 'ord.',
    description: 'The number of orders yesterday is',
    color: COLOR.orders
}
}
