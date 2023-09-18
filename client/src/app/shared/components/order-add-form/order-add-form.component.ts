import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {OrderService} from 'src/app/pages/order/order.service';
import {LoaderComponent} from 'src/app/shared/components/loader/loader/loader.component';
import {Order} from 'src/app/shared/entities/order.entity';
import {LoadingStatus} from 'src/app/shared/interfaces/common.interface';
import {SharedModule} from 'src/app/shared/shared.module';
import {AppNoDataComponent} from '../no-data/no-data.component';

@Component({
	selector: 'app-order-add-form',
	standalone: true,
	imports: [CommonModule, SharedModule, LoaderComponent, AppNoDataComponent],
	templateUrl: './order-add-form.component.html',
	styleUrls: ['./order-add-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderAddFormComponent {
	@Input() loadingStatus!: LoadingStatus | null;
	@Input() isEdit!: boolean;
	@Output() addOrder = new EventEmitter<Order.OrderByCategory>();

	constructor(public order: OrderService) {}

	public trackByFn(index: number, item: Order.OrderListItem): string | number {
		return item._id ?? index;
	}
}
