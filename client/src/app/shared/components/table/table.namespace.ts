export namespace Table {
	export interface ColumnConfig {
		/**
		 * Cell content value property
		 */
		property?: any;
		/**
		 * Custom predefined components or content
		 */
		type?: ColumnsTypes;
		/**
		 * Cell label
		 */
		title?: string;

		icon?: string;
		/**
		 * Is column sortable
		 */
		sortable?: boolean;

		customFormatter?: (value: any) => string;

		onClickButton?: (column: Table.ColumnConfig, row: Table.Row) => void;
		onClickRow?: (column: Table.ColumnConfig, row: Table.Row) => void;
	}

	export enum ColumnsTypes {
		Checkbox,
		Input,
		Weekdays,
		Weekparts,
		Button,
		ButtonIcon,
		Info,
		Array,
		ContextMenu,
	}

	export interface Row {
		[propName: string]: any;
	}
}
