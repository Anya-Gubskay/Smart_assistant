import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { map } from 'rxjs';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() label!: string;
	@Input() placeholder!: string;
	@Input() showSearchIcon = true;
	@Input() value!: string;
	@Input() disableTrim = false;
  @Input() size = '20rem';

	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

	public inputControl = new UntypedFormControl('');
	public readonly SEARCH_PLACEHOLDER_MSG = 'Search';

	ngOnInit(): void {
		this.inputControl.valueChanges
			.pipe(map(this.getValue.bind(this) as (value: unknown, index: number) => unknown))
			.subscribe({
       next: (value) => {
				this.valueChange.emit(value as string);
			}
    })
	}

	ngOnChanges(changes: any): void {
		if (changes.value) {
			this.inputControl.setValue(this.value, {emitEvent: false});
		}
	}

	public clearSearch(): void {
		this.inputControl.setValue(null);
	}

	public getValue(str: string): string {
		const value = (str || '').toLowerCase();
		return this.disableTrim ? value : value.trim();
	}
}
