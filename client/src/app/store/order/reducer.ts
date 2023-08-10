import {LoadingStatus} from 'src/app/shared/interfaces/common.interface';
import {status} from 'src/app/shared/constants/common.constats';
import {OrderActions} from './actions';
import {getDataLoaderReducer} from '../store.helper';
import {Order} from 'src/app/shared/entities/order.entity';

export interface OrderState {
	orders: Order.OrderByCategory[] | null;
	ordersLoadingStatus: LoadingStatus;
}

const initialState: OrderState = {
	orders: [],
	ordersLoadingStatus: status.default,
};

export function orderReducer(state: OrderState = initialState, action: any): OrderState {
	switch (action.type) {
		case OrderActions.TYPES.GET_ORDER.REQUESTED:
		case OrderActions.TYPES.GET_ORDER.SUCCEEDED:
		case OrderActions.TYPES.GET_ORDER.FAILED:
			return getDataLoaderReducer(OrderActions.TYPES.GET_ORDER, 'orders', state, action);
		case OrderActions.TYPES.CLEAR_MODULE:
			return JSON.parse(JSON.stringify(initialState)) as OrderState;
		default:
			return state;
	}
}
