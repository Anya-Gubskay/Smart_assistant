import {createSelector} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';
import {path} from 'lodash/fp';
import {Params} from '@angular/router';
import {RouterSelectors} from './selectors';

export namespace RouterParamsSelectors {
	/**
	 * Query params
	 */

	export const getUrlQueryParams = createSelector(
		RouterSelectors.getState,
		(routerState: RouterReducerState) =>
			path(['state', 'root', 'queryParams'], routerState) || {}
	);

	export const getSelectedItmeId = createSelector(
		RouterSelectors.getRouterParams(2),
		(params: Params) => params?.id
	);

	/**
	 * Collections
	 */

	export const getCalendarUrlParams = createSelector(
		RouterSelectors.getRouterParams(6),
		(params: Params) => params // todo andrei: replace "Params" with actual interface
	);

	export const getAppContainerUrlParams = createSelector(
		RouterSelectors.getRouterParams(3),
		(params: Params) => params // todo andrei: replace "Params" with actual interface
	);

	export const getUrlParams = createSelector(
		RouterSelectors.getRouterParams(6),
		(params: Params) => params // todo andrei: replace "Params" with actual interface
	);

	/**
	 * Exact properties
	 */
	// export const getSelectedScheduleId = createSelector(getAppContainerUrlParams, (urlParams) =>
	// 	getStringValueWithWhiteSpaceFromUrl(urlParams?.scheduleId as string)
	// );
}
