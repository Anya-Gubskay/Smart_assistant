import {LoadingStatus} from 'src/app/shared/interfaces/common.interface';
import {status} from 'src/app/shared/constants/common.constats';
import {OverviewActions} from './actions';
import {getDataLoaderReducer} from '../store.helper';
import {OverviewPage} from 'src/app/shared/entities/overview.entity';

export interface OverviewState {
	data: OverviewPage.Overview | null;
	dataLoadingStatus: LoadingStatus | null;
}

const initialState: OverviewState = {
	data: null,
	dataLoadingStatus: status.default,
};

export function overviewReducer(state: OverviewState = initialState, action: any): OverviewState {
	switch (action.type) {
		case OverviewActions.TYPES.GET_DATA.REQUESTED:
		case OverviewActions.TYPES.GET_DATA.SUCCEEDED:
		case OverviewActions.TYPES.GET_DATA.FAILED:
			return getDataLoaderReducer(OverviewActions.TYPES.GET_DATA, 'data', state, action);
		case OverviewActions.TYPES.CLEAR_MODULE:
			return JSON.parse(JSON.stringify(initialState)) as OverviewState;
		default:
			return state;
	}
}
