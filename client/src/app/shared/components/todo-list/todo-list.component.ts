import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Item, LoadingStatus} from '../../interfaces/common.interface';
import {SharedModule} from '../../shared.module';
import {TooltipDirective} from '../tooltip/tooltip/directives/tooltip/tooltip-directive';
import {TooltipPosition, TooltipTheme} from '../tooltip/tooltip/directives/tooltip/tooltip.enum';
import {TooltipSettings} from '../tooltip/tooltip/directives/tooltip/tooltip.interface';
import {RouterModule} from '@angular/router';
import { LoaderComponent } from '../loader/loader/loader.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-todo-list',
	standalone: true,
	imports: [CommonModule, SharedModule, TooltipDirective, RouterModule, LoaderComponent],
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('fadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(200)
      ]),
      transition(':leave',
        animate(400, style({opacity: 0})))
    ])
  ]
})
export class TodoListComponent<T extends Item> {
	@Input() items!: T[] | null;
  @Input() loadingStatus!: LoadingStatus | null;
	@Output() clickItem = new EventEmitter<T>();
	@Output() clickIcon = new EventEmitter<T>();

	public readonly TOOLTIP_SETTINGS: TooltipSettings = {
		position: TooltipPosition.LEFT,
		theme: TooltipTheme.DARK,
		title: `Delete category`,
	};

	public trackByFn(index: number, item: T): string | number {
		return item._id ?? index;
	}




  iconClick($event: MouseEvent, item: T): void {
    $event.stopPropagation();
    this.clickIcon.emit(item);
  }
}
