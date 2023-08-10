import {Component, Input} from '@angular/core';
import {SharedModule} from '../../shared.module';
import {OverviewPage} from '../../entities/overview.entity';

@Component({
	selector: 'app-card-review',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './card-review.component.html',
	styleUrls: ['./card-review.component.scss'],
})
export class CardReviewComponent {
	@Input() data!: OverviewPage.OverviewItem | undefined;
	@Input() config!: OverviewPage.Config;
}
