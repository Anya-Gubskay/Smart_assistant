import {NgModule} from '@angular/core';
import {AssortimentEffects} from './assortiment/effects';
import {EffectsModule} from '@ngrx/effects';
import {AuthorizationEffects} from './authorization/effects';
import {RouterEffects} from './route/effects';
import {ToastEffects} from './toast/effects';
import {OrderEffects} from './order/effects';
import {AnalyticsEffects} from './analytics/effects';
import {OverviewEffects} from './overview/effects';

@NgModule({
	imports: [
		EffectsModule.forRoot(
			AssortimentEffects,
			AuthorizationEffects,
			RouterEffects,
			ToastEffects,
			OrderEffects,
			AnalyticsEffects,
			OverviewEffects
		),
	],
	providers: [],
})
export class StoreEffectsModule {}
