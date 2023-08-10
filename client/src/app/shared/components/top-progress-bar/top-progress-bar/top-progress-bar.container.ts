import {Component, HostBinding} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/store/rootReducer';
import {getIsTopProgressBarVisible} from 'src/app/store/top-progress-bar/selectors';

@Component({
	selector: 'app-top-progress-bar',
	template: `<span class="bar"></span>`,
	styleUrls: ['./top-progress-bar.container.scss'],
})
export class TopProgressBarContainer {
	public isBarVisible!: boolean;

	@HostBinding('style.display') get isVisible(): string {
		return this.isBarVisible ? 'block' : 'none';
	}

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store
			.select(getIsTopProgressBarVisible)
			.subscribe((value) => (this.isBarVisible = value));
	}
}
