import { RouterReducerState, routerReducer } from "@ngrx/router-store";
import { AssortimentState, assortimentReducer } from "./assortiment/reducer";
import { AuthorizationState, authorizationReducer } from "./authorization/reducer";
import { topProgressBarReducers } from "./top-progress-bar/reducer";
import { OrderState, orderReducer } from "./order/reducer";
import { AnalyticsState, analyticsReducer } from "./analytics/reducer";
import { OverviewState, overviewReducer } from "./overview/reducer";

export const reducers = {
  authorization: authorizationReducer,
	assortiment: assortimentReducer,
  order: orderReducer,
  analytics: analyticsReducer,
  overview: overviewReducer,
  topProgressBar: topProgressBarReducers,
  router: routerReducer,
};

export interface AppState {
  [AppStateEnum.Authorization]: AuthorizationState;
	[AppStateEnum.Assortiment]: AssortimentState;
	[AppStateEnum.Order]: OrderState;
  [AppStateEnum.Analytics]: AnalyticsState;
  [AppStateEnum.Overview]: OverviewState;
  [AppStateEnum.TopProgressBar]: AuthorizationState;
  [AppStateEnum.Router]: RouterReducerState;
}

export enum AppStateEnum {
  Authorization = 'authorization',
  Assortiment = 'assortiment',
  Order = 'order',
  Analytics = 'analytics',
  Overview = 'overview',
  TopProgressBar = 'topProgressBar',
  Router = 'router'
}
