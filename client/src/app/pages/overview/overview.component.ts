import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {CardReviewComponent} from 'src/app/shared/components/card-review/card-review.component';
import {LoaderComponent} from 'src/app/shared/components/loader/loader/loader.component';
import {TooltipDirective} from 'src/app/shared/components/tooltip/tooltip/directives/tooltip/tooltip-directive';
import {
	TooltipPosition,
	TooltipTheme,
} from 'src/app/shared/components/tooltip/tooltip/directives/tooltip/tooltip.enum';
import {TooltipSettings} from 'src/app/shared/components/tooltip/tooltip/directives/tooltip/tooltip.interface';
import {OverviewPage} from 'src/app/shared/entities/overview.entity';
import {LoadingStatus} from 'src/app/shared/interfaces/common.interface';
import {SharedModule} from 'src/app/shared/shared.module';

@Component({
	selector: 'app-overview',
	standalone: true,
	imports: [CardReviewComponent, SharedModule, TooltipDirective, LoaderComponent],
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
	@Input() data!: OverviewPage.Overview | null;
	@Input() loadingStatus!: LoadingStatus | null;

	public date!: string;
	public readonly CONFIG_REVENUE = OverviewPage.ConfigRevenue;
	public readonly CONFIG_ORDERS = OverviewPage.ConfigOrders;
	public readonly TOOLTIP_SETTINGS: TooltipSettings = {
		position: TooltipPosition.RIGHT,
		theme: TooltipTheme.DARK,
		showDelay: 100,
		title: `The "Overview" page will show the dynamics of sales for the current day.`,
	};

	ngOnInit(): void {
		this.date = moment().format('DD.MM.YYYY');
	}
}
