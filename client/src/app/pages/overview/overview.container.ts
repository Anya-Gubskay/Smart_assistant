import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {CommonModule} from '@angular/common';
import {AppState} from 'src/app/store/rootReducer';
import {OverviewComponent} from './overview.component';
import {OverviewActions} from 'src/app/store/overview/actions';
import {OverviewSelectors} from 'src/app/store/overview/selectors';

@Component({
	selector: 'app-overview-container',
	standalone: true,
	imports: [CommonModule, OverviewComponent],
	template: `<app-overview
		[data]="data$ | async"
		[loadingStatus]="loadingStatus$ | async"
	></app-overview>`,
})
export class OverviewContainer implements OnInit, OnDestroy {
	public data$ = this.store.select(OverviewSelectors.getData);
	public loadingStatus$ = this.store.select(OverviewSelectors.getDataLoadingStatus);

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store.dispatch(new OverviewActions.GetData());
	}

	ngOnDestroy(): void {
		this.store.dispatch(new OverviewActions.ClearePage());
	}
}
