
export namespace OrderApiModel {
	export interface OrderListItem {
		_id: string | undefined;
		name: string;
		quantity: number;
		cost: number;
	}

	export interface MapOrder {
		_id?: string;
		date?: string;
		order?: number;
		time?: string;
		price?: number;
		list: OrderListItem[];
	}

  export interface Order {
    _id?: string;
    date?: Date;
    order?: number;
    user?: string;
    list: OrderListItem[];
  }

}
