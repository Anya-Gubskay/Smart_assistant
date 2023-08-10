import {Component, ViewChild} from '@angular/core';
import {TooltipPosition, TooltipTheme} from './tooltip.enum';
import {TooltipSettings} from './tooltip.interface';
import {CommonModule} from '@angular/common';

@Component({
	selector: 'app-tooltip',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './tooltip.component.html',
	styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
	@ViewChild('toastContent', {static: true}) toastContent: any;
	public tooltip: TooltipSettings = {
		position: TooltipPosition.DEFAULT,
		theme: TooltipTheme.DEFAULT,
		title: '',
		left: 0,
		top: 0,
		visible: false,
	};
}
