import {AssortimentActions} from './actions';
import {getDataLoaderReducer} from '../store.helper';
import {LoadingStatus} from 'src/app/shared/interfaces/common.interface';
import {status} from 'src/app/shared/constants/common.constats';
import {Categories} from 'src/app/shared/entities/categories.entity';
import {Positions} from 'src/app/shared/entities/positions.entity';
import {cloneDeep} from 'lodash';
import {set} from 'lodash/fp';

export interface AssortimentState {
	categories: Categories.Category[];
	categoriesLoadingStatus: LoadingStatus;
	category: Categories.Category | null;
	categoryLoadingStatus: LoadingStatus;
	positions: Positions.PositionByCategory[];
	positionsLoadingStatus: LoadingStatus;
}

const initialState: AssortimentState = {
	categories: [],
	categoriesLoadingStatus: status.default,
	category: null,
	categoryLoadingStatus: status.default,
	positions: [],
	positionsLoadingStatus: status.default,
};

export function assortimentReducer(state: AssortimentState = initialState, action: any): AssortimentState {
	switch (action.type) {
		case AssortimentActions.TYPES.GET_CATEGORIES.REQUESTED:
		case AssortimentActions.TYPES.GET_CATEGORIES.SUCCEEDED:
		case AssortimentActions.TYPES.GET_CATEGORIES.FAILED:
			return getDataLoaderReducer(AssortimentActions.TYPES.GET_CATEGORIES, 'categories', state, action);
		case AssortimentActions.TYPES.GET_CATEGORY.REQUESTED:
		case AssortimentActions.TYPES.GET_CATEGORY.SUCCEEDED:
		case AssortimentActions.TYPES.GET_CATEGORY.FAILED:
			return getDataLoaderReducer(AssortimentActions.TYPES.GET_CATEGORY, 'category', state, action);
		case AssortimentActions.TYPES.ADD_CATEGORY.SUCCEEDED:
			return set('category', action.payload.data, state);
		case AssortimentActions.TYPES.DELETE_CATEGORY.SUCCEEDED:
			const categories = cloneDeep(state.categories);
			let indexCategory = categories.findIndex((item) => item._id === action.payload.data.id);
			categories.splice(indexCategory, 1);
			return set('categories', categories, state);

		case AssortimentActions.TYPES.GET_POSITIONS_BY_CATEGORY.REQUESTED:
		case AssortimentActions.TYPES.GET_POSITIONS_BY_CATEGORY.SUCCEEDED:
		case AssortimentActions.TYPES.GET_POSITIONS_BY_CATEGORY.FAILED:
			return getDataLoaderReducer(AssortimentActions.TYPES.GET_POSITIONS_BY_CATEGORY, 'positions', state, action);
		case AssortimentActions.TYPES.ADD_POSITION_FOR_CATEGORY.SUCCEEDED:
			const clonePositions = cloneDeep(state.positions);
			clonePositions.push(action.payload.data);
			return set('positions', clonePositions, state);

		case AssortimentActions.TYPES.UPDATE_POSITION_FOR_CATEGORY.SUCCEEDED:
			const cloneCategories = cloneDeep(state.positions);
			let index = cloneCategories.findIndex((item) => item._id === action.payload.data._id);
			cloneCategories[index] = action.payload.data;
			return set('positions', cloneCategories, state);

		case AssortimentActions.TYPES.DELETE_POSITION_FOR_CATEGORY.SUCCEEDED:
			const positions = cloneDeep(state.positions);
			let indexPos = positions.findIndex((item) => item._id === action.payload.data.id);
			positions.splice(indexPos, 1);
			return set('positions', positions, state);

		case AssortimentActions.TYPES.CLEAR_MODULE:
			return JSON.parse(JSON.stringify(initialState)) as AssortimentState;
		default:
			return state;
	}
}
