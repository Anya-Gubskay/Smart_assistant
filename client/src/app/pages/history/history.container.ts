import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {CommonModule} from '@angular/common';
import {AppState} from 'src/app/store/rootReducer';
import {AssortimentActions} from 'src/app/store/assortiment/actions';
import {OrderActions} from 'src/app/store/order/actions';
import {HistoryComponent} from './history.component';
import {OrderSelectors} from 'src/app/store/order/selectors';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
	selector: 'app-history-container',
	standalone: true,
	imports: [CommonModule, HistoryComponent],
	template: `<app-history [orders]="orders$ | async" [loadingStatus]="loadingStatus$ | async">
	</app-history>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryContainer implements OnInit, OnDestroy {
	public orders$ = this.store.select(OrderSelectors.getOrders);
	public loadingStatus$ = this.store.select(OrderSelectors.getOrdersLoadingStatus);

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store.dispatch(new OrderActions.GetOrder());
	}

	ngOnDestroy(): void {
		this.store.dispatch(new AssortimentActions.ClearePage());
		this.store.dispatch(new OrderActions.ClearePage());
	}
}
