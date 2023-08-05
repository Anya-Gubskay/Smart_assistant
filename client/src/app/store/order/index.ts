import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {orderReducer} from './reducer';
import {EffectsModule} from '@ngrx/effects';
import {OrderEffects} from './effects';
import {AppStateEnum} from '../rootReducer';

@NgModule({
	declarations: [],
	imports: [
		StoreModule.forFeature(AppStateEnum.Order, orderReducer),
		EffectsModule.forFeature(OrderEffects),
	],
})
export class OrderFeatureModule {}
