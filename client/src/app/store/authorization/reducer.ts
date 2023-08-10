import {getDataLoaderReducer} from '../store.helper';
import {LoadingStatus} from 'src/app/shared/interfaces/common.interface';
import {AuthorizationActions} from './actions';
import {status} from 'src/app/shared/constants/common.constats';

export interface AuthorizationState {
	token: string;
	tokenLoadingStatus: LoadingStatus;
}

const initialState: AuthorizationState = {
	token: '',
	tokenLoadingStatus: status.default,
};

const TYPES = AuthorizationActions.TYPES;

export function authorizationReducer(
	state: AuthorizationState = initialState,
	action: any
): AuthorizationState {
	switch (action.type) {
		case TYPES.REGISTRATION.REQUESTED:
		case TYPES.REGISTRATION.SUCCEEDED:
		case TYPES.REGISTRATION.FAILED:
			return getDataLoaderReducer(TYPES.REGISTRATION, 'token', state, action);

		case TYPES.LOGIN.REQUESTED:
		case TYPES.LOGIN.SUCCEEDED:
		case TYPES.LOGIN.FAILED:
			return getDataLoaderReducer(TYPES.LOGIN, 'token', state, action);
		default:
			return state;
	}
}
