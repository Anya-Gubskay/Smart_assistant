import {set} from 'lodash/fp';
import {ActionWithObjectPayload} from '../store.helper';
import {AuthorizationActions} from '../authorization/actions';
import {AssortimentActions} from '../assortiment/actions';

export interface TopProgressBarState {
	isVisible: boolean;
}

export const initialTopProgressBarState: TopProgressBarState = {
	isVisible: false,
};

export function topProgressBarReducers(state = initialTopProgressBarState, action: any): TopProgressBarState {
	switch (action.type) {
		case AuthorizationActions.TYPES.REGISTRATION.REQUESTED:
		case AuthorizationActions.TYPES.LOGIN.REQUESTED:
		case AssortimentActions.TYPES.ADD_CATEGORY.REQUESTED:
			return set('isVisible', true, state);

		case AuthorizationActions.TYPES.REGISTRATION.SUCCEEDED:
		case AuthorizationActions.TYPES.REGISTRATION.FAILED:
		case AuthorizationActions.TYPES.LOGIN.SUCCEEDED:
		case AuthorizationActions.TYPES.LOGIN.FAILED:
		case AssortimentActions.TYPES.ADD_CATEGORY.SUCCEEDED:
		case AssortimentActions.TYPES.ADD_CATEGORY.FAILED:
			return set('isVisible', false, state);
		default:
			return state;
	}
}
