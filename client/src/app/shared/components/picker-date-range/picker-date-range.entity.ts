export namespace PickerDateRange {
	export interface Settings {
		disableInput: boolean;
	}

	export class DateRange {
		constructor(
			public start?: Date,
			public end?: Date
		) {}
	}
}
