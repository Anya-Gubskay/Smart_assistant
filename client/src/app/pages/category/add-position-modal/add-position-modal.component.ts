import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {CurrencyInputDirective} from 'src/app/shared/directives/currency-input/currency-input.directive';
import {Positions} from 'src/app/shared/entities/positions.entity';
import {ModalService} from 'src/app/shared/services/modal.service';
import {SharedModule} from 'src/app/shared/shared.module';
import {MODAL_DATA} from 'src/app/shared/tokens/modal.tokens';

@Component({
	selector: 'app-add-position-modal',
	standalone: true,
	imports: [CommonModule, SharedModule, CurrencyInputDirective],
	templateUrl: './add-position-modal.component.html',
	styleUrls: ['./add-position-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPositionModalComponent implements OnInit {
	public formGroup!: UntypedFormGroup;

	constructor(
		protected modalService: ModalService,
		@Inject(MODAL_DATA) public data: Positions.PositionByCategory
	) {}

	ngOnInit(): void {
		this.createFormGroup();
	}

	private createFormGroup(): void {
		this.formGroup = new FormGroup({
			name: new UntypedFormControl(this.data?.name ?? null, Validators.required),
			cost: new UntypedFormControl(this.data?.cost ?? 1, [
				Validators.required,
				Validators.min(1),
			]),
		});
	}

	public onSubmit(): void {
		this.modalService.submitModal({...this.formGroup.value, _id: this.data?._id});
	}
}
