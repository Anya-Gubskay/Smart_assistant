export namespace AnalyticsPage {
	export interface AnalyticsChart {
		gain: number;
		order: number;
		label: string;
	}

	export interface Analytics {
		chart: AnalyticsChart[];
		average: number;
	}
}
