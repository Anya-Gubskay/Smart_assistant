import { ActionWithPayload, getActionDescription, getModuleDataLoadingActionsCreator } from "../store.helper";
import {Login} from '../../shared/entities/login.entity'
import { Action } from "@ngrx/store";
export namespace AuthorizationActions {
  const moduleName = 'Authorization';
  const createDataLoadingActions = getModuleDataLoadingActionsCreator(moduleName);
	const getDesc = (desc: string) => getActionDescription(moduleName, '', desc);

  export const TYPES = {
    REGISTRATION: createDataLoadingActions('registration'),
    LOGIN: createDataLoadingActions('login')
  }

  export class Registration extends ActionWithPayload<{user: Login.User}> {
		override readonly type = TYPES.REGISTRATION.REQUESTED;
	}

  export class RegistrationCompleted implements Action {
		readonly type = TYPES.REGISTRATION.SUCCEEDED;
	}

  export class Login extends ActionWithPayload<{user: Login.User}> {
		override readonly type = TYPES.LOGIN.REQUESTED;
	}

  export class LoginCompleted extends ActionWithPayload<{token: string}> {
		override readonly type = TYPES.LOGIN.SUCCEEDED;
	}
}
