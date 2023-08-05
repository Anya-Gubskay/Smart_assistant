import {Options} from 'highcharts';
import {COLOR} from 'src/app/shared/constants/common.constats';
import {AnalyticsPage} from 'src/app/shared/entities/analytics.entity';

export namespace AnalyticsChart {
	enum KeyProperty {
		Gain = 'gain',
		Order = 'order',
	}

	interface Config {
		label: string;
		color: string;
		property: KeyProperty;
	}

	export const gainConfig: Config = {
		label: 'Revenue',
		color: COLOR.revenue,
		property: KeyProperty.Gain,
	};

	export const orderConfig: Config = {
		label: 'Orders',
		color: COLOR.orders,
		property: KeyProperty.Order,
	};

	export function getChartOptions(
		data: AnalyticsPage.AnalyticsChart[] = [],
		config: Config
	): Options {
		return {
			chart: {
				type: 'spline',
			},
			title: {
				text: config.label,
				style: {
					color: config.color,
				},
			},
			credits: {
				enabled: false,
			},
			xAxis: {
				categories: data.map((i) => i.label),
			},
			yAxis: {
				title: {
					text: config.label,
				},
				labels: {
					format: '{value}',
				},
			},
			tooltip: {
				shared: true,
			},
			series: [
				{
					type: 'spline',
					name: config.label,
					data: data.map((item) => item[config.property]),
					color: config.color,
				},
			],
		};
	}
}
