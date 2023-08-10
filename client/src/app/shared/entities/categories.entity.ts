import {Item} from '../interfaces/common.interface';

export namespace Categories {
	export class Category extends Item {
		constructor(
			name: string,
			_id: string,
			public image?: File,
			public imageSrc?: string,
			public user?: string
		) {
			super(name, _id);
		}
	}
}
