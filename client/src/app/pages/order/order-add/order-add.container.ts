import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {CommonModule} from '@angular/common';
import {AppState} from 'src/app/store/rootReducer';
import {AssortimentActions} from 'src/app/store/assortiment/actions';
import {OrderAddComponent} from './order-add.component';
import {AssortimentSelectors} from 'src/app/store/assortiment/selectors';
import {OrderActions} from 'src/app/store/order/actions';
import {Order} from 'src/app/shared/entities/order.entity';

@Component({
	selector: 'app-order-add-container',
	standalone: true,
	imports: [CommonModule, OrderAddComponent],
	template: `<app-order-add
		[positions]="positions$ | async"
		[positionsLoadingStatus]="positionsLoadingStatus$ | async"
		(addOrder)="onAddOrder($event)"
	>
	</app-order-add>`,
})
export class OrderAddContainer implements OnInit, OnDestroy {
	positions$ = this.store.select(AssortimentSelectors.getPositions);
	positionsLoadingStatus$ = this.store.select(AssortimentSelectors.getPositionsLoadingStatus);

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store.dispatch(new AssortimentActions.GetPositionsByCategory());
	}

	public onAddOrder(order: Order.OrderByCategory): void {
		this.store.dispatch(new OrderActions.AddOrder({order}));
	}

	ngOnDestroy(): void {
		this.store.dispatch(new AssortimentActions.ClearePage());
	}
}
