import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {assortimentReducer} from './reducer';
import {EffectsModule} from '@ngrx/effects';
import {AssortimentEffects} from './effects';
import {CategoriesService} from 'src/app/shared/api/categories/categories.api.service';
import {AppStateEnum} from '../rootReducer';
import { ToastService } from 'src/app/shared/components/toast/toast-service';

@NgModule({
	declarations: [],
	imports: [
		StoreModule.forFeature(AppStateEnum.Assortiment, assortimentReducer),
		EffectsModule.forFeature(AssortimentEffects),
	],
	providers: [CategoriesService],
})
export class AssortimentStoreFeatureModule {}
