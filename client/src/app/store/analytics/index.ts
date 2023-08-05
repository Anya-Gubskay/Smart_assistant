import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {AppStateEnum} from '../rootReducer';
import { analyticsReducer } from './reducer';
import { AnalyticsEffects } from './effects';

@NgModule({
	declarations: [],
	imports: [
		StoreModule.forFeature(AppStateEnum.Analytics, analyticsReducer),
		EffectsModule.forFeature(AnalyticsEffects),
	],
})
export class AnalyticsFeatureModule {}
