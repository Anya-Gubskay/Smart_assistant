export class Item {
	constructor(
		public name: string,
		public _id: string = ''
	) {}
}

export interface OptionModal {
	width: string;
	height: string;
}

export interface User {
	_id?: string;
	password: string;
	email: string;
}

export interface Position {
	_id?: string;
	cost: number;
	name: string;
	category: string;
	user?: string;
}

export interface Message {
	message: string;
}

export interface Order {
	_id?: string;
	date?: Date;
	order?: number;
	user?: string;
	list: OrderListItem[];
}

export interface MapOrder {
	_id?: string;
	date?: string;
	order?: number;
	time?: string;
	price?: number;
	list: OrderListItem[];
}

export interface OrderListItem {
	_id: string | undefined;
	name: string;
	quantity: number;
	cost: number;
}

export interface Analytics {
	chart: AnalyticsChart[];
	average: number;
}

export interface AnalyticsChart {
	gain: number;
	order: number;
	label: string;
}

export interface OverviewItem {
	percent: number;
	compare: number;
	yesterday: number;
	isHigher: boolean;
}

export interface DataLoadingActions {
	REQUESTED: string;
	SUCCEEDED: string;
	FAILED: string;
}

export type LoadingStatus =
	| {loading: false; loaded: false; error: null}
	| {loading: true; loaded: false; error: null}
	| {loading: false; loaded: true; error: null}
	| {loading: false; loaded: false; error: any};

export interface Statuses {
	default: LoadingStatus;
	loading: LoadingStatus;
	loaded: LoadingStatus;
	error: (error: unknown) => LoadingStatus;
}
