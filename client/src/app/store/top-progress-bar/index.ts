import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';;
import { AppStateEnum } from '../rootReducer';
import { topProgressBarReducers } from './reducer';

@NgModule({
	declarations: [],
	imports: [StoreModule.forFeature(AppStateEnum.TopProgressBar, topProgressBarReducers)],
	providers: [],
})
export class TopProgressBarStoreFeatureModule {}
