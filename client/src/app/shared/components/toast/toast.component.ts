import {Component, ElementRef, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ToastService} from './toast-service';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared.module';
import {Toast} from './toast.entities';

@Component({
	selector: 'app-toast',
	standalone: true,
	imports: [CommonModule, SharedModule],
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
	animations: [
		trigger('openClose', [
			state(
				'open',
				style({
					opacity: 1,
				})
			),
			state(
				'closed',
				style({
					opacity: 0,
				})
			),
			transition('open <=> closed', [animate('.5s linear')]),
		]),
	],
})
export class ToastComponent {
	@ViewChild('element', {static: false}) progressBar!: ElementRef;

	public readonly settingsToast = Toast.SettingToast;
	public settings: Toast.SettingsToaster = this.settingsToast[Toast.ToastTypes.Error];
	public readonly toastTypes = Toast.ToastTypes;
	private progressInterval!: any;

	constructor(public toastService: ToastService) {}

	ngOnInit(): void {
		this.toastService.open.subscribe((data) => {
			if (data.show) {
				const toastType = data?.type ?? Toast.ToastTypes.Error;
				this.settings = this.settingsToast[toastType];
				this.showProgressBar();
			}
		});
	}

	public showProgressBar(): void {
		if (this.toastService.data?.progressWidth) {
			this.progressBar.nativeElement.style.width = this.toastService.data.progressWidth;

			this.progressInterval = setInterval(() => {
				const width = parseInt(this.progressBar.nativeElement.style.width, 10);

				if (width <= 0) {
					this.hideToast();
					clearInterval(this.progressInterval);
					return;
				}

				this.toastService.data.progressWidth = String(width - 2);
				this.progressBar.nativeElement.style.width =
					this.toastService.data.progressWidth + '%';
			}, 100);
		}
	}

	public stopProgressBar(): void {
		clearInterval(this.progressInterval);
	}

	public hideToast(): void {
		this.toastService.hide();
	}
}
