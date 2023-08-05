import {Injectable} from '@angular/core';
import {Actions, ofType, createEffect} from '@ngrx/effects';
import {debounceTime, switchMap, takeUntil, withLatestFrom} from 'rxjs';
import {DEFAULT_REQUEST_DEBOUNCE_MS} from 'src/app/shared/constants/common.constats';
import {CategoriesService} from 'src/app/shared/api/categories/categories.api.service';
import {mapActions} from '../store.helper';
import {AppState} from '../rootReducer';
import {Store} from '@ngrx/store';
import {ToastService} from 'src/app/shared/components/toast/toast-service';
import {OrderActions} from './actions';
import {PositionsService} from 'src/app/shared/api/positions/positions.service';
import {OrdersService} from 'src/app/shared/api/orders/orders.service';

@Injectable()
export class OrderEffects {
	getOrder$ = createEffect(() =>
		this.actions$.pipe(
			ofType<OrderActions.GetOrder>(OrderActions.TYPES.GET_ORDER.REQUESTED),
			debounceTime(DEFAULT_REQUEST_DEBOUNCE_MS),
			switchMap((_: OrderActions.GetOrder) =>
				this.ordersApiService.getOrders().pipe(
          mapActions(OrderActions.TYPES.GET_ORDER),
          takeUntil(this.actions$.pipe(ofType(OrderActions.TYPES.CLEAR_MODULE)))
          )
			)
		)
	);

	addOrder$ = createEffect(() =>
		this.actions$.pipe(
			ofType<OrderActions.AddOrder>(OrderActions.TYPES.ADD_ORDER.REQUESTED),
			debounceTime(DEFAULT_REQUEST_DEBOUNCE_MS),
			switchMap((_: OrderActions.AddOrder) =>
				this.ordersApiService.addOrder(_.payload.order).pipe(
          mapActions(OrderActions.TYPES.ADD_ORDER),
          takeUntil(this.actions$.pipe(ofType(OrderActions.TYPES.CLEAR_MODULE)))
          )
			)
		)
	);

	constructor(
		private actions$: Actions,
		private ordersApiService: OrdersService,
	) {}
}
