import {Injectable} from '@angular/core';
import {Actions, ofType, createEffect} from '@ngrx/effects';
import {AssortimentActions} from './actions';
import {debounceTime, filter, switchMap, takeUntil, tap, withLatestFrom} from 'rxjs';
import {DEFAULT_REQUEST_DEBOUNCE_MS} from 'src/app/shared/constants/common.constats';
import {CategoriesService} from 'src/app/shared/api/categories/categories.api.service';
import {mapActions} from '../store.helper';
import {AppState} from '../rootReducer';
import {Store} from '@ngrx/store';
import {PagesSelectors} from '../route/selectors-pages';
import {RouterParamsSelectors} from '../route/selectors-params';
import {PositionsService} from 'src/app/shared/api/positions/positions.service';

@Injectable()
export class AssortimentEffects {
	getCategories$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AssortimentActions.TYPES.GET_CATEGORIES.REQUESTED),
			debounceTime(DEFAULT_REQUEST_DEBOUNCE_MS),
			switchMap(() =>
				this.categoriesApiService
					.getCategories()
					.pipe(
						mapActions(AssortimentActions.TYPES.GET_CATEGORIES),
						takeUntil(this.actions$.pipe(ofType(AssortimentActions.TYPES.CLEAR_MODULE)))
					)
			)
		)
	);

	initialCategories$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AssortimentActions.TYPES.INITIAL_CATEGORY_PAGE),
				withLatestFrom(this.store.select(PagesSelectors.getIsPageNewCategory)),
				filter(
					([, isNewPage]: [AssortimentActions.initialCategoryPage, boolean]) => !isNewPage
				),
				tap(() => this.store.dispatch(new AssortimentActions.GetCategoryById()))
			),
		{dispatch: false}
	);

	getCategoryById$ = createEffect(() =>
		this.actions$.pipe(
			ofType<AssortimentActions.GetCategoryById>(
				AssortimentActions.TYPES.GET_CATEGORY.REQUESTED
			),
			debounceTime(DEFAULT_REQUEST_DEBOUNCE_MS),
			withLatestFrom(this.store.select(RouterParamsSelectors.getSelectedItmeId)),
			switchMap(([, id]: [AssortimentActions.GetCategoryById, string]) =>
				this.categoriesApiService
					.getCategoryById(id)
					.pipe(
						mapActions(AssortimentActions.TYPES.GET_CATEGORY),
						takeUntil(this.actions$.pipe(ofType(AssortimentActions.TYPES.CLEAR_MODULE)))
					)
			)
		)
	);

	getCategoriByIdCompleted$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AssortimentActions.TYPES.GET_CATEGORY.SUCCEEDED),
				tap(() => this.store.dispatch(new AssortimentActions.GetPositionsByCategory()))
			),
		{dispatch: false}
	);

	addCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType<AssortimentActions.AddCategory>(AssortimentActions.TYPES.ADD_CATEGORY.REQUESTED),
			debounceTime(DEFAULT_REQUEST_DEBOUNCE_MS),
			switchMap((_: AssortimentActions.AddCategory) =>
				this.categoriesApiService
					.addCategory(_.payload.category)
					.pipe(
						mapActions(AssortimentActions.TYPES.ADD_CATEGORY),
						takeUntil(this.actions$.pipe(ofType(AssortimentActions.TYPES.CLEAR_MODULE)))
					)
			)
		)
	);

	updateCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType<AssortimentActions.UpdateCategory>(
				AssortimentActions.TYPES.UPDATE_CATEGORY.REQUESTED
			),
			debounceTime(DEFAULT_REQUEST_DEBOUNCE_MS),
			switchMap((_: AssortimentActions.UpdateCategory) =>
				this.categoriesApiService
					.updateCategory(_.payload.category)
					.pipe(
						mapActions(AssortimentActions.TYPES.UPDATE_CATEGORY),
						takeUntil(this.actions$.pipe(ofType(AssortimentActions.TYPES.CLEAR_MODULE)))
					)
			)
		)
	);

	deleteCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType<AssortimentActions.DeleteCategory>(
				AssortimentActions.TYPES.DELETE_CATEGORY.REQUESTED
			),
			debounceTime(DEFAULT_REQUEST_DEBOUNCE_MS),
			switchMap((_: AssortimentActions.DeleteCategory) =>
				this.categoriesApiService
					.deleteCategory(_.payload.category._id)
					.pipe(
						mapActions(AssortimentActions.TYPES.DELETE_CATEGORY),
						takeUntil(this.actions$.pipe(ofType(AssortimentActions.TYPES.CLEAR_MODULE)))
					)
			)
		)
	);

	getPositionsByCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType<AssortimentActions.GetPositionsByCategory>(
				AssortimentActions.TYPES.GET_POSITIONS_BY_CATEGORY.REQUESTED
			),
			debounceTime(DEFAULT_REQUEST_DEBOUNCE_MS),
			withLatestFrom(this.store.select(RouterParamsSelectors.getSelectedItmeId)),
			switchMap(([, idCategory]: [AssortimentActions.GetPositionsByCategory, string]) =>
				this.positionsService
					.getPositionByCategory(idCategory)
					.pipe(
						mapActions(AssortimentActions.TYPES.GET_POSITIONS_BY_CATEGORY),
						takeUntil(this.actions$.pipe(ofType(AssortimentActions.TYPES.CLEAR_MODULE)))
					)
			)
		)
	);

	addPositionForCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType<AssortimentActions.AddPosition>(
				AssortimentActions.TYPES.ADD_POSITION_FOR_CATEGORY.REQUESTED
			),
			debounceTime(DEFAULT_REQUEST_DEBOUNCE_MS),
			switchMap((_: AssortimentActions.AddPosition) =>
				this.positionsService
					.addPositionForCategory(_.payload.position)
					.pipe(
						mapActions(AssortimentActions.TYPES.ADD_POSITION_FOR_CATEGORY),
						takeUntil(this.actions$.pipe(ofType(AssortimentActions.TYPES.CLEAR_MODULE)))
					)
			)
		)
	);

	updatePositionForCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType<AssortimentActions.UpdatePosition>(
				AssortimentActions.TYPES.UPDATE_POSITION_FOR_CATEGORY.REQUESTED
			),
			debounceTime(DEFAULT_REQUEST_DEBOUNCE_MS),
			switchMap((_: AssortimentActions.UpdatePosition) =>
				this.positionsService
					.updatePositionForCategory(_.payload.position)
					.pipe(
						mapActions(AssortimentActions.TYPES.UPDATE_POSITION_FOR_CATEGORY),
						takeUntil(this.actions$.pipe(ofType(AssortimentActions.TYPES.CLEAR_MODULE)))
					)
			)
		)
	);

	deletePositionForCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType<AssortimentActions.DeletePosition>(
				AssortimentActions.TYPES.DELETE_POSITION_FOR_CATEGORY.REQUESTED
			),
			debounceTime(DEFAULT_REQUEST_DEBOUNCE_MS),
			switchMap((_: AssortimentActions.DeletePosition) =>
				this.positionsService
					.deletePositionForCategory(_.payload.position._id)
					.pipe(
						mapActions(AssortimentActions.TYPES.DELETE_POSITION_FOR_CATEGORY),
						takeUntil(this.actions$.pipe(ofType(AssortimentActions.TYPES.CLEAR_MODULE)))
					)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private store: Store<AppState>,
		private categoriesApiService: CategoriesService,
		private positionsService: PositionsService
	) {}
}
