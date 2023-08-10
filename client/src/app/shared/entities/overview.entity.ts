import {COLOR} from '../constants/common.constats';

export namespace OverviewPage {
	export interface OverviewItem {
		percent: number;
		compare: number;
		today: number;
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
		unit: '',
		description: 'Your business revenue today',
		color: COLOR.revenue,
	};

	export const ConfigOrders: Config = {
		title: 'Orders',
		unit: 'ord.',
		description: 'The number of orders today is',
		color: COLOR.orders,
	};
}
