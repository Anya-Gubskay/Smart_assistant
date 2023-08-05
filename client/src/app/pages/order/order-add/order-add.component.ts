import {CommonModule} from '@angular/common';
import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	Output,
	SimpleChanges,
} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'src/app/shared/shared.module';
import {ModalService} from 'src/app/shared/services/modal.service';
import {Positions} from 'src/app/shared/entities/positions.entity';
import {OrderService} from '../order.service';
import {LoaderComponent} from 'src/app/shared/components/loader/loader/loader.component';
import {LoadingStatus} from 'src/app/shared/interfaces/common.interface';
import {Order} from 'src/app/shared/entities/order.entity';
import {OrderAddFormComponent} from 'src/app/shared/components/order-add-form/order-add-form.component';

@Component({
	selector: 'app-order-add',
	standalone: true,
	imports: [CommonModule, SharedModule, RouterModule, LoaderComponent, OrderAddFormComponent],
	templateUrl: './order-add.component.html',
	styleUrls: ['./order-add.component.scss'],
})
export class OrderAddComponent implements OnChanges, OnDestroy {
	@Input() positions!: Positions.PositionByCategory[] | null;
	@Input() positionsLoadingStatus!: LoadingStatus | null;
	@Output() addOrder = new EventEmitter<Order.OrderByCategory>();

	constructor(
		protected modalService: ModalService,
		public order: OrderService
	) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.positions?.currentValue && this.positions?.length) {
			this.positions.forEach((item) => {
				const element = new Order.OrderListItem(
					item.name,
					item.quantity,
					item.cost,
					0,
					item._id
				);
				this.order.list.push({...element});
				this.order.oldList[item._id] = {...element};
			});
		}
	}

	protected complete(): void {
		this.addOrder.emit(new Order.OrderByCategory(this.order.price, this.order.list));
	}

	ngOnDestroy(): void {
		this.order.clear();
	}
}
