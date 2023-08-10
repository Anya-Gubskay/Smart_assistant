import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {CommonModule} from '@angular/common';
import {AppState} from 'src/app/store/rootReducer';
import {AuthorizationActions} from 'src/app/store/authorization/actions';
import {Login} from 'src/app/shared/entities/login.entity';
import {LoginComponent} from './login.component';
import {AuthorizationSelectors} from 'src/app/store/authorization/selectors';

@Component({
	selector: 'app-login-container',
	standalone: true,
	imports: [CommonModule, LoginComponent],
	template: `<app-login
		[loadingStatus]="$loadingStatus | async"
		(authorization)="onAuthorisation($event)"
	></app-login>`,
	styleUrls: ['./login.component.scss'],
})
export class LoginContainer {
	$loadingStatus = this.store.select(AuthorizationSelectors.getLoadingStatus);

	constructor(private store: Store<AppState>) {}

	public onAuthorisation(auth: {user: Login.User; isFormLogin: boolean}): void {
		if (auth.isFormLogin) {
			this.store.dispatch(new AuthorizationActions.Login({user: auth.user}));
			return;
		}
		this.store.dispatch(new AuthorizationActions.Registration({user: auth.user}));
	}
}
