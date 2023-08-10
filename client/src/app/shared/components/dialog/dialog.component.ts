import {CommonModule} from '@angular/common';
import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {DialogService} from '../../services/dialog.service';

@Component({
	selector: 'app-dialog',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
	@Input() id?: string;
	isOpen = false;
	private element: any;

	constructor(
		private dialogService: DialogService,
		private el: ElementRef
	) {
		this.element = el.nativeElement;
	}

	ngOnInit() {
		// add self (this modal instance) to the modal service so it can be opened from any component
		this.dialogService.add(this);

		// move element to bottom of page (just before </body>) so it can be displayed above everything else
		document.body.appendChild(this.element);

		// close modal on background click
		this.element.addEventListener('click', (el: any) => {
			if (el.target.className === 'wrapper-dialog') {
				this.close();
			}
		});
	}

	ngOnDestroy() {
		// remove self from modal service
		this.dialogService.remove(this);

		// remove modal element from html
		this.element.remove();
	}

	open() {
		this.element.style.display = 'block';
		document.body.classList.add('wrapper-dialog-open');
		this.isOpen = true;
	}

	close() {
		this.element.style.display = 'none';
		document.body.classList.remove('wrapper-dialog-open');
		this.isOpen = false;
	}
}
