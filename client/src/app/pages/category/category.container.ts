import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {CommonModule} from '@angular/common';
import {AppState} from 'src/app/store/rootReducer';
import {AssortimentActions} from 'src/app/store/assortiment/actions';
import {Categories} from 'src/app/shared/entities/categories.entity';
import {CategoryComponent} from './category.component';
import {AssortimentSelectors} from 'src/app/store/assortiment/selectors';
import {PagesSelectors} from 'src/app/store/route/selectors-pages';
import {Positions} from 'src/app/shared/entities/positions.entity';

@Component({
	selector: 'app-assortiment-container',
	standalone: true,
	imports: [CommonModule, CategoryComponent],
	template: `<app-category
		[isNewPage]="isNewCategoryPage$ | async"
		[category]="category$ | async"
		[loadingStatus]="loadingStatus$ | async"
		[positions]="positions$ | async"
		[positionsLoadingStatus]="positionsloadingStatus$ | async"
		(addCategory)="onAddCategory($event)"
		(updateCategory)="onUpdateCategory($event)"
		(addPosition)="onAddPosition($event)"
		(updatePosition)="onUpdatePosition($event)"
		(deletePosition)="onDeletePosition($event)"
	>
	</app-category>`,
})
export class CategoryContainer implements OnInit, OnDestroy {
	isNewCategoryPage$ = this.store.select(PagesSelectors.getIsPageNewCategory);
	category$ = this.store.select(AssortimentSelectors.getCategory);
	loadingStatus$ = this.store.select(AssortimentSelectors.getCategoryLoadingStatus);
	positions$ = this.store.select(AssortimentSelectors.getPositions);
	positionsloadingStatus$ = this.store.select(AssortimentSelectors.getPositionsLoadingStatus);

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store.dispatch(new AssortimentActions.initialCategoryPage());
	}

	public onAddCategory(category: Categories.Category): void {
		this.store.dispatch(new AssortimentActions.AddCategory({category}));
	}

	public onUpdateCategory(category: Categories.Category): void {
		this.store.dispatch(new AssortimentActions.UpdateCategory({category}));
	}

	public onAddPosition(position: Positions.PositionByCategory): void {
		this.store.dispatch(new AssortimentActions.AddPosition({position}));
	}

	public onUpdatePosition(position: Positions.PositionByCategory): void {
		this.store.dispatch(new AssortimentActions.UpdatePosition({position}));
	}

	public onDeletePosition(position: Positions.PositionByCategory) {
		this.store.dispatch(new AssortimentActions.DeletePosition({position}));
	}

	ngOnDestroy(): void {
		this.store.dispatch(new AssortimentActions.ClearePage());
	}
}
