import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, map} from 'rxjs';
import {Order} from '../../entities/order.entity';

@Injectable({
	providedIn: 'root',
})
export class OrdersService {
	constructor(private http: HttpClient) {}

	addOrder(order: Order.OrderByCategory): Observable<Order.OrderByCategory[]> {
		return this.http.post<Order.OrderByCategory[]>('/api/order', order);
	}

	getOrders(): Observable<Order.OrderByCategory[]> {
		return this.http
			.get<Order.OrderByCategory[]>(`/api/order`)
			.pipe(
				map((data) =>
					data.map(
						(e) =>
							new Order.OrderByCategory(
								e.total,
								e.list,
								e._id,
								e.date,
								e.order,
								e.user
							)
					)
				)
			);
	}
}
