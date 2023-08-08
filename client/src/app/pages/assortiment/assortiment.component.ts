import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {DialogComponent} from 'src/app/shared/components/dialog/dialog.component';
import {ModalComponent} from 'src/app/shared/components/modal/modal.component';
import {TodoListComponent} from 'src/app/shared/components/todo-list/todo-list.component';
import {Routing} from 'src/app/shared/entities/routing.entity';
import {Item, LoadingStatus} from 'src/app/shared/interfaces/common.interface';
import {SharedModule} from 'src/app/shared/shared.module';
import {Categories} from 'src/app/shared/entities/categories.entity';

@Component({
	selector: 'app-assortiment',
	standalone: true,
	imports: [
		CommonModule,
		SharedModule,
		TodoListComponent,
		ModalComponent,
	],
	templateUrl: './assortiment.component.html',
	styleUrls: ['./assortiment.component.scss'],
})
export class AssortimentComponent {
	@Input() categories!: Categories.Category[] | null;
	@Input() loadingStatus!: LoadingStatus | null;
	@Output() removeCategory = new EventEmitter<Categories.Category>();

	constructor(private router: Router) {}

	public onClickItem(item: Item): void {
		this.router.navigate([Routing.ROUTES_MENU[Routing.KeyUrl.Assortiment].path, item._id]);
	}

	public addCategory(): void {
		this.router.navigate([Routing.ROUTES_MENU[Routing.KeyUrl.Assortiment].path, 'new']);
	}
}
