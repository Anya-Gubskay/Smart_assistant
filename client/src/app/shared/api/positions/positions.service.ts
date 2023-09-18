import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../../interfaces/common.interface';
import {Positions} from '../../entities/positions.entity';

@Injectable({
	providedIn: 'root',
})
export class PositionsService {
	constructor(private http: HttpClient) {}

	public getPositionByCategory(categoryId: string): Observable<Positions.PositionByCategory[]> {
		return this.http.get<Positions.PositionByCategory[]>(`/api/position/${categoryId}`);
	}

	public addPositionForCategory(
		position: Positions.PositionByCategory
	): Observable<Positions.PositionByCategory> {
		return this.http.post<Positions.PositionByCategory>('/api/position', position);
	}

	public deletePositionForCategory(id: string): Observable<Message> {
		return this.http.delete<Message>(`/api/position/${id}`);
	}

	public updatePositionForCategory(
		position: Positions.PositionByCategory
	): Observable<Positions.PositionByCategory> {
		return this.http.patch<Positions.PositionByCategory>(`/api/position/${position._id}`, {
			name: position.name,
			cost: position.cost,
		});
	}
}
