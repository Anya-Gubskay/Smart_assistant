import {NgModule} from '@angular/core';
import { TopProgressBarContainer } from './top-progress-bar.container';
import { TopProgressBarStoreFeatureModule } from 'src/app/store/top-progress-bar';
@NgModule({
	declarations: [TopProgressBarContainer],
	exports: [TopProgressBarContainer],
	imports: [TopProgressBarStoreFeatureModule],
})
export class TopProgressBarModule {

}
