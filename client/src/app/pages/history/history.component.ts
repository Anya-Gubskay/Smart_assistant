import {CommonModule} from '@angular/common';
import {Component, Input, OnDestroy} from '@angular/core';
import {TableComponent} from 'src/app/shared/components/table/table.component';
import {Table} from 'src/app/shared/components/table/table.namespace';
import {Order} from 'src/app/shared/entities/order.entity';
import {LoadingStatus} from 'src/app/shared/interfaces/common.interface';
import {ModalService} from 'src/app/shared/services/modal.service';
import {OrderService} from '../order/order.service';
import {cloneDeep} from 'lodash';
import {HistoryFormOrderComponent} from './history-form-order/history-form-order/history-form-order.component';
import { Common } from 'src/app/shared/entities/common.entity';
@Component({
	selector: 'app-history',
	standalone: true,
	imports: [CommonModule, TableComponent],
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnDestroy {
	@Input() orders!: Order.OrderByCategory[] | null;
	@Input() loadingStatus!: LoadingStatus | null;

	public readonly COLUMNS_CONFIG: Table.ColumnConfig[] = Order.configTable;

	constructor(
		protected modalService: ModalService,
		public order: OrderService
	) {}

	public onClickRow(row: Order.OrderByCategory): void {
		this.openModal(row);
	}

	public openModal(item: Table.Row): void {
		this.order.list = cloneDeep(item.list);
    this.order.price = item.total;
		this.modalService.open<{numberOrder: number}>(HistoryFormOrderComponent, {
			numberOrder: item.order,
		}, new Common.OptionModal('70%', '70%'));
	}

	ngOnDestroy(): void {
		this.order.clear();
	}
}
