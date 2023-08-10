export namespace Common {
	export class OptionModal {
		constructor(
			public width: string | null,
			public height: string | null
		) {}
	}

	export class Completed {
		constructor(
			public message: string,
			data: any
		) {}
	}
}
