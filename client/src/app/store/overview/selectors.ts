import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateEnum } from "../rootReducer";
import { OverviewState } from "./reducer";

export namespace OverviewSelectors {
  export const getState = createFeatureSelector<OverviewState>(AppStateEnum.Overview);

  export const getData = createSelector(getState, (state) => state.data);

  export const getDataLoadingStatus = createSelector(getState, (state) => state.dataLoadingStatus);
}
