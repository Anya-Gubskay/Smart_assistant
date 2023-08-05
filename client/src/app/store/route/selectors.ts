import {AppState} from '../rootReducer';
import {RouterReducerState} from '@ngrx/router-store';
import {createSelector, MemoizedSelector} from '@ngrx/store';
import {path} from 'lodash/fp';
import {Params, Route} from '@angular/router';

function getRouterChildrenProperty(depth: number, property: string): string[] {
	return ['state', 'root', ...(Array(depth).fill('firstChild') as string[]), property];
}

export namespace RouterSelectors {
	export const getState = (state: AppState): RouterReducerState => state.router;

	export const getRouterPath = createSelector(getState, (routerState: RouterReducerState) => {
		const urlPath = path(['state', 'url'], routerState);
		// Removed leading slash
		return urlPath && urlPath.substr(1);
	});

	export const getRouterParams = (depth: number): MemoizedSelector<AppState, Params> =>
		createSelector(
			getState,
			(routerState) => {
        return path(getRouterChildrenProperty(depth, 'params'), routerState) as Params
      });
      

	export const getRouterConfig = (depth: number): MemoizedSelector<AppState, Route> =>
		createSelector(
			getState,
			(routerState) => path(getRouterChildrenProperty(depth, 'routeConfig'), routerState) as Route
		);
}
