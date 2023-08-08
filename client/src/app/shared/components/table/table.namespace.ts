export namespace Table {
	export interface ColumnConfig {
		/**
		 * Cell content value property
		 */
		property?: any;
		/**
		 * Custom predefined components or content
		 */
		type?: Table.ColumnsTypes;
		/**
		 * Cell label
		 */
		title?: string;

    icon?: string;
		/**
		 * Is column sortable
		 */
		sortable?: boolean;
		/**
		 * Sort function for sortable columns
		 */
		sortValueOf?: (value: string) => number;

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
