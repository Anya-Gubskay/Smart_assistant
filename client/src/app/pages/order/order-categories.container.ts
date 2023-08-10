import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {CommonModule} from '@angular/common';
import {AppState} from 'src/app/store/rootReducer';
import {AssortimentActions} from 'src/app/store/assortiment/actions';
import {AssortimentSelectors} from 'src/app/store/assortiment/selectors';
import {OrderCategoriesComponent} from './order-categories.component';
import {OrderActions} from 'src/app/store/order/actions';

@Component({
	selector: 'app-assortiment-container',
	standalone: true,
	imports: [CommonModule, OrderCategoriesComponent],
	template: `<app-order-categories
		[categories]="categories$ | async"
		[loadingStatus]="categoriesLoadingStatus$ | async"
	>
	</app-order-categories>`,
})
export class OrderCategoriesContainer implements OnInit, OnDestroy {
	categories$ = this.store.select(AssortimentSelectors.getCategories);
	categoriesLoadingStatus$ = this.store.select(AssortimentSelectors.getCategoriesLoadingStatus);

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store.dispatch(new AssortimentActions.GetCategories());
	}

	ngOnDestroy(): void {
		this.store.dispatch(new OrderActions.ClearePage());
		this.store.dispatch(new AssortimentActions.ClearePage());
	}
}
