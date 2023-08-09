import {set} from 'lodash/fp';
import {AuthorizationActions} from '../authorization/actions';
import {AssortimentActions} from '../assortiment/actions';
import {OrderActions} from '../order/actions';

export interface TopProgressBarState {
	isVisible: boolean;
}

export const initialTopProgressBarState: TopProgressBarState = {
	isVisible: false,
};

export function topProgressBarReducers(
	state = initialTopProgressBarState,
	action: any
): TopProgressBarState {
	switch (action.type) {
		case AuthorizationActions.TYPES.REGISTRATION.REQUESTED:
		case AuthorizationActions.TYPES.LOGIN.REQUESTED:
		case AssortimentActions.TYPES.ADD_CATEGORY.REQUESTED:
		case AssortimentActions.TYPES.ADD_POSITION_FOR_CATEGORY.REQUESTED:
		case OrderActions.TYPES.ADD_ORDER.REQUESTED:
			return set('isVisible', true, state);

		case AuthorizationActions.TYPES.REGISTRATION.SUCCEEDED:
		case AuthorizationActions.TYPES.REGISTRATION.FAILED:
		case AuthorizationActions.TYPES.LOGIN.SUCCEEDED:
		case AuthorizationActions.TYPES.LOGIN.FAILED:
		case AssortimentActions.TYPES.ADD_CATEGORY.SUCCEEDED:
		case AssortimentActions.TYPES.ADD_CATEGORY.FAILED:
		case AssortimentActions.TYPES.ADD_POSITION_FOR_CATEGORY.SUCCEEDED:
		case AssortimentActions.TYPES.ADD_POSITION_FOR_CATEGORY.FAILED:
		case OrderActions.TYPES.ADD_ORDER.SUCCEEDED:
		case OrderActions.TYPES.ADD_ORDER.FAILED:
			return set('isVisible', false, state);
		default:
			return state;
	}
}
