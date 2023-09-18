import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Chart, ChartModule} from 'angular-highcharts';
import {LoaderComponent} from 'src/app/shared/components/loader/loader/loader.component';
import {AnalyticsPage} from 'src/app/shared/entities/analytics.entity';
import {LoadingStatus} from 'src/app/shared/interfaces/common.interface';
import {AnalyticsChart} from './analytics-chart.namespace';

@Component({
	selector: 'app-analytics',
	standalone: true,
	imports: [CommonModule, ChartModule, LoaderComponent],
	templateUrl: './analytics.component.html',
	styleUrls: ['./analytics.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsComponent implements OnChanges {
	@Input() data!: AnalyticsPage.Analytics | null;
	@Input() loadingStatus!: LoadingStatus | null;

	public chartRevenue!: Chart;
	public chartOrder!: Chart;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes?.data?.currentValue) {
			this.сreateCharts();
		}
	}

	private сreateCharts(): void {
		this.chartRevenue = new Chart(
			AnalyticsChart.getChartOptions(this.data?.chart, AnalyticsChart.gainConfig)
		);
		this.chartOrder = new Chart(
			AnalyticsChart.getChartOptions(this.data?.chart, AnalyticsChart.orderConfig)
		);
	}
}
