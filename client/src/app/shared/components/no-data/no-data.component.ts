import {Component, Input} from '@angular/core';

export interface NoDataConfig {
	color: string;
	size: 'xs' | 's' | 'm' | 'l';
	type: 'inline' | 'full';
}

@Component({
	selector: 'app-no-data',
  standalone: true,
	templateUrl: './no-data.component.html',
	styleUrls: ['./no-data.component.scss']
})
export class AppNoDataComponent {
	@Input() size: NoDataConfig['size'] = 's';
	@Input() color: NoDataConfig['color'] = '#5b2eac';
	@Input() type: NoDataConfig['type'] = 'full';
}
