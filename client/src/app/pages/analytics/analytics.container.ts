import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {CommonModule} from '@angular/common';
import {AppState} from 'src/app/store/rootReducer';
import {AnalyticsComponent} from './analytics.component';
import {AnalyticsSelectors} from 'src/app/store/analytics/selectors';
import {AnalyticsActions} from 'src/app/store/analytics/actions';

@Component({
	selector: 'app-analytics-container',
	standalone: true,
	imports: [CommonModule, AnalyticsComponent],
	template: `<app-analytics
		[data]="data$ | async"
		[loadingStatus]="loadingStatus$ | async"
	></app-analytics>`,
})
export class AnalyticsContainer implements OnInit, OnDestroy {
	public data$ = this.store.select(AnalyticsSelectors.getData);
	public loadingStatus$ = this.store.select(AnalyticsSelectors.getDataLoadingStatus);

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store.dispatch(new AnalyticsActions.GetData());
	}

	ngOnDestroy(): void {
		this.store.dispatch(new AnalyticsActions.ClearePage());
	}
}
