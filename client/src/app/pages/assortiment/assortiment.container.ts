import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AssortimentComponent} from './assortiment.component';
import {Store} from '@ngrx/store';
import {AssortimentSelectors} from 'src/app/store/assortiment/selectors';
import {CommonModule} from '@angular/common';
import {AppState} from 'src/app/store/rootReducer';
import {AssortimentActions} from 'src/app/store/assortiment/actions';
import {Categories} from 'src/app/shared/entities/categories.entity';

@Component({
	selector: 'app-assortiment-container',
	standalone: true,
	imports: [CommonModule, AssortimentComponent],
	template: `<app-assortiment
		[categories]="categories$ | async"
		[loadingStatus]="loadingStatus$ | async"
		(removeCategory)="onRemoveCategory($event)"
	></app-assortiment>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssortimentContainer implements OnInit, OnDestroy {
	public categories$ = this.store.select(AssortimentSelectors.getCategories);
	public loadingStatus$ = this.store.select(AssortimentSelectors.getCategoriesLoadingStatus);

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store.dispatch(new AssortimentActions.GetCategories());
	}

	public onRemoveCategory(category: Categories.Category): void {
		this.store.dispatch(new AssortimentActions.DeleteCategory({category}));
	}

	ngOnDestroy(): void {
		this.store.dispatch(new AssortimentActions.ClearePage());
	}
}
