import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Item, Message} from '../../interfaces/common.interface';
import {CategoriesApiModel} from './categories.api.interface';
import {Categories} from '../../entities/categories.entity';
import {CategoriesApiMapper} from './categories.api.mapper';

@Injectable({providedIn: 'root'})
export class CategoriesService {
	constructor(private http: HttpClient) {}

	getCategories(): Observable<Categories.Category[]> {
		return this.http.get<Categories.Category[]>('/api/category');
	}

	addCategory({name, image}: Categories.Category): Observable<CategoriesApiModel.Category> {
		const data = this.create(name, image);
		return this.http.post<CategoriesApiModel.Category>('/api/category', data);
	}

	create(name: string, image?: File): FormData {
		const fd = new FormData();

		if (image) {
			fd.append('image', image, image.name);
		}
		fd.append('name', name);

		return fd;
	}

	getCategoryById(id: string): Observable<CategoriesApiModel.Category> {
		return this.http.get<CategoriesApiModel.Category>(`/api/category/${id}`);
	}

	updateCategory({
		_id,
		name,
		image,
	}: Categories.Category): Observable<CategoriesApiModel.Category> {
		const fd = new FormData();

		if (image) {
			fd.append('image', image, image.name);
		}
		fd.append('name', name);
		return this.http.patch<CategoriesApiModel.Category>(`/api/category/${_id}`, fd);
	}

	fetch(): Observable<Categories.Category[]> {
		return this.http.get<Categories.Category[]>('/api/category');
	}

	deleteCategory(id: string): Observable<Message> {
		return this.http.delete<Message>(`/api/category/${id}`);
	}
}
