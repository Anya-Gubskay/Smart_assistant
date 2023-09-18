import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
	selector: 'app-modal',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
	@Input() width!: string;
	@Input() height!: string;

	constructor(protected modalService: ModalService) {}

	protected clickWrapper($event: MouseEvent): void {
		if (($event.target as HTMLElement).className === 'wrapper-dialog') {
			this.modalService.closeModal();
		}
	}
}
