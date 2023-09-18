import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Item, LoadingStatus} from '../../interfaces/common.interface';
import {SharedModule} from '../../shared.module';
import {TooltipDirective} from '../tooltip/tooltip/directives/tooltip/tooltip-directive';
import {RouterModule} from '@angular/router';
import {LoaderComponent} from '../loader/loader/loader.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SearchComponent} from '../search/search.component';
import {FilterItemsByParamsPipe} from '../../pipes/filter-items-by-string.pipe';
import {AppNoDataComponent} from '../no-data/no-data.component';

@Component({
	selector: 'app-todo-list',
	standalone: true,
	imports: [
		CommonModule,
		SharedModule,
		TooltipDirective,
		RouterModule,
		LoaderComponent,
		SearchComponent,
		FilterItemsByParamsPipe,
		AppNoDataComponent,
	],
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss'],
	animations: [
		trigger('fadeAnimation', [
			state('in', style({opacity: 1})),
			transition(':enter', [style({opacity: 0}), animate(200)]),
			transition(':leave', animate(400, style({opacity: 0}))),
		]),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent<T extends Item> {
	@Input() items!: T[] | null;
	@Input() loadingStatus!: LoadingStatus | null;

	protected searchQuery = '';

	@Output() clickItem = new EventEmitter<T>();
	@Output() clickAction = new EventEmitter<T>();

	protected trackByFn(index: number, item: T): string | number {
		return item._id;
	}

	protected deleteRow(event: MouseEvent, item: T): void {
		event.stopPropagation();
		this.clickAction.emit(item);
	}

	protected clickRow(event: MouseEvent, item: T): void {
		event.stopPropagation();
		this.clickItem.emit(item);
	}
}
