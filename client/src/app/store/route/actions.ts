import {Action} from '@ngrx/store';
import {NavigationExtras, Params, QueryParamsHandling} from '@angular/router';
import { ActionWithPayload, getActionDescription } from '../store.helper';

export namespace RouterActions {
	const moduleName = 'Router';
	const getDesc = (id: string, desc: string) => getActionDescription(moduleName, id, desc);

	export const TYPES = {
		GO: getDesc('', 'Go'),

		SET_PARAM: getDesc('', 'Param set'),
	};

	export class RouterGo implements Action {
		readonly type = TYPES.GO;

		constructor(
			public url: string,
			public extras?: NavigationExtras,
		) {}
	}

	export class SetQueryParams implements Action {
		readonly type = TYPES.SET_PARAM;
    
		constructor(public payload: Params, public queryParamsHandling: QueryParamsHandling = 'merge') {}
	}
}
