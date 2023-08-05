import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TopProgressBarState } from "./reducer";
import { AppStateEnum } from "../rootReducer";

export const getTopProgressBarState = createFeatureSelector<TopProgressBarState>(AppStateEnum.TopProgressBar);
export const getIsTopProgressBarVisible = createSelector(getTopProgressBarState, (state) => state.isVisible);
