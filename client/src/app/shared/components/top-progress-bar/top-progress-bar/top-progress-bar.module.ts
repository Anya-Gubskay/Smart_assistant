import {NgModule} from '@angular/core';
import { TopProgressBarContainer } from './top-progress-bar.container';
import { TopProgressBarStoreFeatureModule } from 'src/app/store/top-progress-bar';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [TopProgressBarContainer],
	exports: [TopProgressBarContainer],
	imports: [SharedModule, TopProgressBarStoreFeatureModule],
})
export class TopProgressBarModule {

}
