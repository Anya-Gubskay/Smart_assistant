import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateEnum} from '../rootReducer';
import {AnalyticsState} from './reducer';

export namespace AnalyticsSelectors {
	export const getState = createFeatureSelector<AnalyticsState>(AppStateEnum.Analytics);

	export const getData = createSelector(getState, (state) => state.data);

	export const getDataLoadingStatus = createSelector(
		getState,
		(state) => state.dataLoadingStatus
	);
}
