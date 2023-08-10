import {Action} from '@ngrx/store';
import {
	ActionWithPayload,
	getActionDescription,
	getModuleDataLoadingActionsCreator,
} from '../store.helper';
import {Categories} from 'src/app/shared/entities/categories.entity';
import {Positions} from 'src/app/shared/entities/positions.entity';

export namespace AssortimentActions {
	const moduleName = 'Assortiment';
	const createDataLoadingActions = getModuleDataLoadingActionsCreator(moduleName);
	const getDesc = (desc: string) => getActionDescription(moduleName, '', desc);

	export const TYPES = {
		GET_CATEGORIES: createDataLoadingActions('get categories'),
		GET_CATEGORY: createDataLoadingActions('get category'),
		ADD_CATEGORY: createDataLoadingActions('add category'),
		UPDATE_CATEGORY: createDataLoadingActions('update category'),
		DELETE_CATEGORY: createDataLoadingActions('delete category'),
		INITIAL_CATEGORY_PAGE: getDesc('initial category page'),
		GET_POSITIONS_BY_CATEGORY: createDataLoadingActions('get positions by category'),
		ADD_POSITION_FOR_CATEGORY: createDataLoadingActions('add position for category'),
		UPDATE_POSITION_FOR_CATEGORY: createDataLoadingActions('update position for category'),
		DELETE_POSITION_FOR_CATEGORY: createDataLoadingActions('delete position for category'),
		CLEAR_MODULE: getDesc('clear module'),
	};

	export class GetCategories implements Action {
		readonly type = TYPES.GET_CATEGORIES.REQUESTED;
	}

	export class GetCategoriesCompleted implements Action {
		readonly type = TYPES.GET_CATEGORIES.SUCCEEDED;
	}

	export class AddCategory extends ActionWithPayload<{category: Categories.Category}> {
		override type = TYPES.ADD_CATEGORY.REQUESTED;
	}

	export class UpdateCategory extends ActionWithPayload<{category: Categories.Category}> {
		override type = TYPES.UPDATE_CATEGORY.REQUESTED;
	}

	export class AddCategoryCompleted extends ActionWithPayload<{category: Categories.Category}> {
		override type = TYPES.ADD_CATEGORY.SUCCEEDED;
	}

	export class DeleteCategory extends ActionWithPayload<{category: Categories.Category}> {
		override type = TYPES.DELETE_CATEGORY.REQUESTED;
	}

	export class initialCategoryPage implements Action {
		readonly type = TYPES.INITIAL_CATEGORY_PAGE;
	}

	export class GetCategoryById implements Action {
		readonly type = TYPES.GET_CATEGORY.REQUESTED;
	}

	export class GetCategoryByIdCompleted implements Action {
		readonly type = TYPES.GET_CATEGORY.SUCCEEDED;
	}

	export class GetPositionsByCategory implements Action {
		readonly type = TYPES.GET_POSITIONS_BY_CATEGORY.REQUESTED;
	}

	export class AddPosition extends ActionWithPayload<{position: Positions.PositionByCategory}> {
		override type = TYPES.ADD_POSITION_FOR_CATEGORY.REQUESTED;
	}

	export class UpdatePosition extends ActionWithPayload<{
		position: Positions.PositionByCategory;
	}> {
		override type = TYPES.UPDATE_POSITION_FOR_CATEGORY.REQUESTED;
	}

	export class UpdatePositionCompleted extends ActionWithPayload<{
		position: Positions.PositionByCategory;
	}> {
		override type = TYPES.UPDATE_POSITION_FOR_CATEGORY.REQUESTED;
	}

	export class DeletePosition extends ActionWithPayload<{
		position: Positions.PositionByCategory;
	}> {
		override type = TYPES.DELETE_POSITION_FOR_CATEGORY.REQUESTED;
	}

	export class ClearePage implements Action {
		readonly type = TYPES.CLEAR_MODULE;
	}
}
