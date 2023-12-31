import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'src/app/shared/shared.module';
import {LoadingStatus} from 'src/app/shared/interfaces/common.interface';
import {Categories} from 'src/app/shared/entities/categories.entity';
import {LoaderComponent} from 'src/app/shared/components/loader/loader/loader.component';
import {SearchComponent} from 'src/app/shared/components/search/search.component';
import {FilterItemsByParamsPipe} from 'src/app/shared/pipes/filter-items-by-string.pipe';
import {AppNoDataComponent} from 'src/app/shared/components/no-data/no-data.component';

@Component({
	selector: 'app-order-categories',
	standalone: true,
	imports: [
		CommonModule,
		SharedModule,
		RouterModule,
		LoaderComponent,
		SearchComponent,
		FilterItemsByParamsPipe,
		AppNoDataComponent,
	],
	templateUrl: './order-categories.component.html',
	styleUrls: ['./order-categories.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCategoriesComponent {
	@Input() categories!: Categories.Category[] | null;
	@Input() loadingStatus!: LoadingStatus | null;
	public searchQuery = '';
}
