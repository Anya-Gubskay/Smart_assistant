import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AnalyticsService} from 'src/app/shared/api/analytics/analytics.service';
import {AnalyticsActions} from './actions';
import {debounceTime, switchMap, takeUntil} from 'rxjs';
import {DEFAULT_REQUEST_DEBOUNCE_MS} from 'src/app/shared/constants/common.constats';
import {mapActions} from '../store.helper';

@Injectable()
export class AnalyticsEffects {
	getOrder$ = createEffect(() =>
		this.actions$.pipe(
			ofType<AnalyticsActions.GetData>(AnalyticsActions.TYPES.GET_DATA.REQUESTED),
			debounceTime(DEFAULT_REQUEST_DEBOUNCE_MS),
			switchMap((_: AnalyticsActions.GetData) =>
				this.analyticsApiService
					.getDataCharts()
					.pipe(
						mapActions(AnalyticsActions.TYPES.GET_DATA),
						takeUntil(this.actions$.pipe(ofType(AnalyticsActions.TYPES.CLEAR_MODULE)))
					)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private analyticsApiService: AnalyticsService
	) {}
}
