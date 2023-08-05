import { Action } from "@ngrx/store";
import { ActionWithPayload, getActionDescription, getModuleDataLoadingActionsCreator } from "../store.helper";
import { Order } from "src/app/shared/entities/order.entity";

export namespace AnalyticsActions {
  const moduleName = 'Analytics';
  const createDataLoadingActions = getModuleDataLoadingActionsCreator(moduleName);
	const getDesc = (desc: string) => getActionDescription(moduleName, '', desc);

  export const TYPES = {
    GET_DATA: createDataLoadingActions('get data analytics'),
    CLEAR_MODULE: getDesc('clear module')
  }

  export class GetData implements Action {
		readonly type = TYPES.GET_DATA.REQUESTED;
	}

  export class ClearePage implements Action {
		readonly type = TYPES.CLEAR_MODULE;
	}
}
