import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AssortimentState} from './reducer';
import {AppStateEnum} from '../rootReducer';

export namespace AssortimentSelectors {
	export const getState = createFeatureSelector<AssortimentState>(AppStateEnum.Assortiment);

	export const getCategories = createSelector(getState, (state) => state.categories);

	export const getCategoriesLoadingStatus = createSelector(
		getState,
		(state) => state.categoriesLoadingStatus
	);

	export const getCategory = createSelector(getState, (state) => state.category);

	export const getCategoryLoadingStatus = createSelector(
		getState,
		(state) => state.categoryLoadingStatus
	);

	export const getPositions = createSelector(getState, (state) => state.positions);

	export const getPositionsLoadingStatus = createSelector(
		getState,
		(state) => state.positionsLoadingStatus
	);
}
