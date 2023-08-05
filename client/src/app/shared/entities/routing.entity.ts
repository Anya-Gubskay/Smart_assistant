export namespace Routing {
  export enum KeyUrl {
    Auth = 'auth',
    Login = 'login',
    Registration = 'registration',
    Main = 'main',
    Overview = 'overview',
    Analytics = 'analytics',
    History = 'history',
    Order = 'order',
    OrderCategories = 'order categories',
    OrderProduction = 'order production',
    Assortiment = 'categories',
    NewCategories = 'newCategories',
    ItemCategories = 'itemCategories'
  }

	export interface RouteInfo {
		path: string;
		title: string;
		icon: string;
		class: string;
		children?: Record<string, RouteInfo>;
	}

	export const ROUTES_MENU: Record<string, RouteInfo> = {
    [KeyUrl.Assortiment]: {path: 'categories', title: 'Assortiment', icon: 'shopping_cart', class: ''},
    [KeyUrl.Order]: {path: 'order', title: 'Add Order', icon: 'add_shopping_cart', class: ''},
    [KeyUrl.Analytics]: {path: 'analytics', title: 'Analytics', icon: 'show_chart', class: ''},
    [KeyUrl.Overview]: {path: 'overview', title: 'Overview', icon: 'monetization_on', class: ''},
    [KeyUrl.History]: {path: 'history', title: 'History', icon: 'history', class: ''},
	};

	export const ROUTES: Record<string, RouteInfo> = {
		[KeyUrl.Auth]: {
			path: '',
			title: 'Auth',
			icon: '',
			class: '',
			children: {
				[KeyUrl.Login]: {path: 'login', title: 'Login', icon: 'dashboard', class: ''},
				[KeyUrl.Registration]: {path: 'registration', title: 'Registration', icon: 'person', class: ''},
			},
		},
		[KeyUrl.Main]: {
			path: '',
			title: 'Main',
			icon: '',
			class: '',
			children: {
				...ROUTES_MENU,
        [KeyUrl.OrderCategories]: {path: 'order/add', title: 'Order Categories', icon: 'library_books', class: ''},
        [KeyUrl.OrderProduction]: {path: 'order/:id', title: 'Order Production', icon: 'library_books', class: ''},
				[KeyUrl.NewCategories]: {path: 'categories/new', title: 'New category', icon: 'notifications', class: ''},
				[KeyUrl.ItemCategories]: {path: 'categories/:id', title: 'Id category', icon: 'unarchive', class: 'active-pro'},
			},
		},
	};

  export const AUTH_CHILDREN = ROUTES[KeyUrl.Auth].children;
  export const MAIN_CHILDREN = ROUTES[KeyUrl.Main].children;
  export const ORDER_CHILDREN = ROUTES_MENU[KeyUrl.Order].children;
}
