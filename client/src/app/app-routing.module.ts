import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from './shared/layouts/app-layout/app-layout.component';
import {Routing} from './shared/entities/routing.entity';
import {authGuard} from './shared/guards/auth.guard';
import {AssortimentContainer} from './pages/assortiment/assortiment.container';
import {LoginContainer} from './pages/login/login.container';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {OrderCategoriesContainer} from './pages/order/order-categories.container';
import {HistoryContainer} from './pages/history/history.container';
import {AnalyticsContainer} from './pages/analytics/analytics.container';
import {OverviewContainer} from './pages/overview/overview.container';

const KEY_ENUM = Routing.KeyUrl;

export const routes: Routes = [
	{
		path: '',
		component: AuthLayoutComponent,
		children: [
			{path: '', redirectTo: Routing.AUTH_CHILDREN?.[KEY_ENUM.Login].path, pathMatch: 'full'},
			{path: Routing.AUTH_CHILDREN?.[KEY_ENUM.Login].path, component: LoginContainer},
			{path: Routing.AUTH_CHILDREN?.[KEY_ENUM.Registration].path, component: LoginContainer},
		],
	},
	{
		path: '',
		component: AppLayoutComponent,
		canActivate: [authGuard],
		canActivateChild: [authGuard],
		children: [
			{path: Routing.MAIN_CHILDREN?.[KEY_ENUM.Overview].path, component: OverviewContainer},

			{
				path: Routing.MAIN_CHILDREN?.[KEY_ENUM.Order].path,
				component: OrderCategoriesContainer,
			},
			{
				path: Routing.MAIN_CHILDREN?.[KEY_ENUM.OrderProduction].path,
				loadComponent: () =>
					import('./../app/pages/order/order-add/order-add.container').then(
						(m) => m.OrderAddContainer
					),
			},
			{
				path: Routing.MAIN_CHILDREN?.[KEY_ENUM.History].path,
				component: HistoryContainer,
			},
			{
				path: Routing.MAIN_CHILDREN?.[KEY_ENUM.Analytics].path,
				component: AnalyticsContainer,
			},
			{
				path: Routing.MAIN_CHILDREN?.[KEY_ENUM.Assortiment].path,
				component: AssortimentContainer,
			},
			{
				path: Routing.MAIN_CHILDREN?.[KEY_ENUM.ItemCategories].path,
				loadComponent: () =>
					import('./../app/pages/category/category.container').then(
						(m) => m.CategoryContainer
					),
			},
			{
				path: Routing.MAIN_CHILDREN?.[KEY_ENUM.NewCategories].path,
				loadComponent: () =>
					import('./../app/pages/category/category.container').then(
						(m) => m.CategoryContainer
					),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
