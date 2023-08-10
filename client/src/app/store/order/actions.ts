import {Action} from '@ngrx/store';
import {
	ActionWithPayload,
	getActionDescription,
	getModuleDataLoadingActionsCreator,
} from '../store.helper';
import {Order} from 'src/app/shared/entities/order.entity';

export namespace OrderActions {
	const moduleName = 'Order';
	const createDataLoadingActions = getModuleDataLoadingActionsCreator(moduleName);
	const getDesc = (desc: string) => getActionDescription(moduleName, '', desc);

	export const TYPES = {
		GET_ORDER: createDataLoadingActions('get order'),
		ADD_ORDER: createDataLoadingActions('add order'),
		CLEAR_MODULE: getDesc('clear module'),
	};

	export class GetOrder implements Action {
		public type = TYPES.GET_ORDER.REQUESTED;
	}

	export class AddOrder extends ActionWithPayload<{order: Order.OrderByCategory}> {
		override type = TYPES.ADD_ORDER.REQUESTED;
	}

	export class ClearePage implements Action {
		readonly type = TYPES.CLEAR_MODULE;
	}
}
