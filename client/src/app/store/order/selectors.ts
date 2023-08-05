import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrderState } from "./reducer";
import { AppStateEnum } from "../rootReducer";

export namespace OrderSelectors {
  export const getState = createFeatureSelector<OrderState>(AppStateEnum.Order);

  export const getOrders = createSelector(getState, (state) => state.orders);

  export const getOrdersLoadingStatus = createSelector(getState, (state) => state.ordersLoadingStatus);
}
