import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { AnalyticsService } from 'src/app/shared/api/analytics/analytics.service';
import { debounceTime, switchMap, takeUntil } from 'rxjs';
import { DEFAULT_REQUEST_DEBOUNCE_MS } from 'src/app/shared/constants/common.constats';
import { mapActions } from '../store.helper';
import { OverviewActions } from './actions';

@Injectable()
export class OverviewEffects {
	getOrder$ = createEffect(() =>
		this.actions$.pipe(
			ofType<OverviewActions.GetData>(OverviewActions.TYPES.GET_DATA.REQUESTED),
			debounceTime(DEFAULT_REQUEST_DEBOUNCE_MS),
			switchMap((_: OverviewActions.GetData) =>
				this.analyticsApiService.getDataOverview().pipe(
          mapActions(OverviewActions.TYPES.GET_DATA),
          takeUntil(this.actions$.pipe(ofType(OverviewActions.TYPES.CLEAR_MODULE)))
          )
			)
		)
	);

	constructor(
		private actions$: Actions,
		private analyticsApiService: AnalyticsService,
	) {}
}
