import * as moment from 'moment';
import { Table } from '../components/table/table.namespace';

export namespace Order {
	export class OrderListItem {
		constructor(
			public name: string,
			public quantity: number,
			public cost: number,
      public total?: number,
			public _id?: string,
		) {}
	}

	export class OrderByCategory {
		private _date!: string;
		private _time!: string;

		constructor(
      public total: number,
			public list: OrderListItem[],
      public _id?: string,
      public date?: Date,
			public order?: number,
			public user?: string,
      public time?: string,
		) {
      if(date) {
        this.setDate(date);
        this.setTime(date);
      }
		}

		getDate(): string {
			return this._date;
		}

		getTime(): string {
			return this._time;
		}

		setDate(value: Date | string): void {
			this._date = moment(value).format('DD.MM.YYYY');
		}

		setTime(value: Date | string): void {
			this._time = moment(value).format('HH:mm:ss');
		}
	}

  type callbackFnc = (column: Table.ColumnConfig, row: Table.Row) => void;

  export const  configTable = (callback: callbackFnc) => [
		{property: 'order', title: '№', sortable: true},
		{property: '_date', title: 'Date', sortable: true},
		{property: '_time', title: 'Time', sortable: true},
		{property: 'total', title: 'Price', sortable: true},
		{
			property: 'action',
			title: '',
			icon: 'filter',
			onClick: callback,
			type: Table.ColumnsTypes.ButtonIcon,
		},
	];
}
