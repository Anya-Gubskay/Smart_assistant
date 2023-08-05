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
	public readonly COLUMNS_CONFIG: Table.ColumnConfig[] = Order.configTable(
		this.onClickRow.bind(this)
	);

	constructor(
		protected modalService: ModalService,
		public order: OrderService
	) {}

	public onClickRow(column: Table.ColumnConfig, row: Table.Row): void {
		this.openModal(row);
	}

	public openModal(item: Table.Row): void {
		this.order.list = cloneDeep(item.list);
		this.modalService.open<{numberOrder: number}>(HistoryFormOrderComponent, {
			numberOrder: item.order,
		});
	}

	ngOnDestroy(): void {
		this.order.clear();
	}
}
