import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthorizationState} from './reducer';
import {AppStateEnum} from '../rootReducer';

export namespace AuthorizationSelectors {
	export const getState = createFeatureSelector<AuthorizationState>(AppStateEnum.Authorization);

	export const getToken = createSelector(getState, (state) => state.token);

	export const getLoadingStatus = createSelector(getState, (state) => state.tokenLoadingStatus);
}
