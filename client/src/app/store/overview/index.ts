import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {AppStateEnum} from '../rootReducer';
import { OverviewEffects } from './effects';
import { overviewReducer } from './reducer';

@NgModule({
	declarations: [],
	imports: [
		StoreModule.forFeature(AppStateEnum.Overview, overviewReducer),
		EffectsModule.forFeature(OverviewEffects),
	],
})
export class OverviewFeatureModule {}
