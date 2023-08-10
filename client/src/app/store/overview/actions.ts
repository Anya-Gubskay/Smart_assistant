import {Action} from '@ngrx/store';
import {getActionDescription, getModuleDataLoadingActionsCreator} from '../store.helper';

export namespace OverviewActions {
	const moduleName = 'Overview';
	const createDataLoadingActions = getModuleDataLoadingActionsCreator(moduleName);
	const getDesc = (desc: string) => getActionDescription(moduleName, '', desc);

	export const TYPES = {
		GET_DATA: createDataLoadingActions('get data'),
		CLEAR_MODULE: getDesc('clear module'),
	};

	export class GetData implements Action {
		readonly type = TYPES.GET_DATA.REQUESTED;
	}

	export class ClearePage implements Action {
		readonly type = TYPES.CLEAR_MODULE;
	}
}
