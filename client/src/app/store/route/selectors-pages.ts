import {createSelector} from '@ngrx/store';
import {RouterSelectors} from './selectors';
import {Routing} from 'src/app/shared/entities/routing.entity';
import {RouterParamsSelectors} from './selectors-params';

export namespace PagesSelectors {
	export const getPageUrlWithoutStartParams = createSelector(RouterSelectors.getRouterPath, () =>
		window.location.href.split('/').slice(3).join('/')
	);

	export const getIsPageLogin = createSelector(getPageUrlWithoutStartParams, (url: string) =>
		url.startsWith(Routing.AUTH_CHILDREN?.[Routing.KeyUrl.Login].path ?? '')
	);

	export const getIsPageRegistration = createSelector(
		getPageUrlWithoutStartParams,
		(url: string) =>
			url.startsWith(Routing.AUTH_CHILDREN?.[Routing.KeyUrl.Registration].path ?? '')
	);

	export const getIsPageOrder = createSelector(getPageUrlWithoutStartParams, (url: string) => {
		return url.startsWith(Routing.MAIN_CHILDREN?.[Routing.KeyUrl.Order].path ?? '');
	});

	export const getIsPageNewCategory = createSelector(
		RouterParamsSelectors.getSelectedItmeId,
		(id: string) => id === 'new'
	);
}
