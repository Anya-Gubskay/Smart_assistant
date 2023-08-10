import * as Highcharts from 'highcharts';
import {Options, Point} from 'highcharts';
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
		isCurrencyFormat: boolean;
	}

	export const gainConfig: Config = {
		label: 'Revenue',
		color: COLOR.revenue,
		property: KeyProperty.Gain,
		isCurrencyFormat: true,
	};

	export const orderConfig: Config = {
		label: 'Orders',
		color: COLOR.orders,
		property: KeyProperty.Order,
		isCurrencyFormat: false,
	};

	export function getFormatDateAndLabel(item: number, config: Config): string {
		const value = config.isCurrencyFormat ? Highcharts.numberFormat(item as number, 0) : item;
		return (config.isCurrencyFormat ? '$' + value : value) as string;
	}

	export function tooltipFormatter(this: Point): string {
		const value =
			this.series.name === 'Revenue'
				? `$${Highcharts.numberFormat(this.y as number, 0)}`
				: this.y;
		return `<span style="color:${this.color}">● </span>${this.series.name}: <b>${value}</b><br/>`;
	}

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
					formatter: function (): string {
						return getFormatDateAndLabel(this.value as number, config);
					},
				},
			},
			tooltip: {
				pointFormatter: tooltipFormatter,
				shared: true,
				useHTML: true,
			},
			series: [
				{
					type: 'spline',
					name: config.label,
					data: data.map((item) => item[config.property]),
					color: config.color,
					dataLabels: {
						enabled: true,
						formatter: function (): string {
							return getFormatDateAndLabel(this.y as number, config);
						},
					},
				},
			],
		};
	}
}
