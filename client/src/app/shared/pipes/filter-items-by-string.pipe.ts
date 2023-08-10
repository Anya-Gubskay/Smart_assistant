import {Pipe, PipeTransform} from '@angular/core';
import {Item} from '../interfaces/common.interface';

@Pipe({
	name: 'filterItemsByString',
	standalone: true,
})
export class FilterItemsByParamsPipe implements PipeTransform {
	public transform<T extends Item>(data: T[] | null, params: string): T[] | null {
		if (!data?.length || !params) {
			return data;
		}
		return data.filter((item) => item.name.toLowerCase().includes(params.toLowerCase()));
	}
}
