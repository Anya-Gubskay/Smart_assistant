import {Component, OnInit, inject} from '@angular/core';
import {AuthService} from './shared/services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private authSevice: AuthService) {}

	ngOnInit(): void {
		this.authSevice.setToken();
	}
}
