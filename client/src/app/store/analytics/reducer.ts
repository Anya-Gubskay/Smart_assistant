import {LoadingStatus} from 'src/app/shared/interfaces/common.interface';
import {status} from 'src/app/shared/constants/common.constats';
import {Order} from 'src/app/shared/entities/order.entity';
import {AnalyticsActions} from './actions';
import {getDataLoaderReducer} from '../store.helper';
import { AnalyticsPage } from 'src/app/shared/entities/analytics.entity';

export interface AnalyticsState {
	data: AnalyticsPage.Analytics | null;
	dataLoadingStatus: LoadingStatus;
}

const initialState: AnalyticsState = {
	data: null,
	dataLoadingStatus: status.default,
};

export function analyticsReducer(state: AnalyticsState = initialState, action: any): AnalyticsState {
	switch (action.type) {
		case AnalyticsActions.TYPES.GET_DATA.REQUESTED:
		case AnalyticsActions.TYPES.GET_DATA.SUCCEEDED:
		case AnalyticsActions.TYPES.GET_DATA.FAILED:
			return getDataLoaderReducer(AnalyticsActions.TYPES.GET_DATA, 'data', state, action);
		case AnalyticsActions.TYPES.CLEAR_MODULE:
			return JSON.parse(JSON.stringify(initialState)) as AnalyticsState;
		default:
			return state;
	}
}
