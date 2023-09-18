import {Injectable} from '@angular/core';
import {cloneDeep} from 'lodash';
import {Order} from 'src/app/shared/entities/order.entity';

@Injectable({
	providedIn: 'root',
})
export class OrderService {
	public oldList: Record<string, Order.OrderListItem> = {};
	public list: Order.OrderListItem[] = [];
	public price = 0;

	public count(item: Order.OrderListItem): void {
		item.total = item.cost * item.quantity;
		this.computePrice();
	}

	public resetOrder(): void {
		this.list = cloneDeep(Object.values(this.oldList));
		this.price = 0;
	}

	public clear(): void {
		this.oldList = {};
		this.list = [];
		this.price = 0;
	}

	public computePrice(): void {
		this.price = this.list.reduce((total, item) => {
			if (item.total) {
				total += item.total;
			}
			return total;
		}, 0);
	}
}
