import {Injectable} from '@angular/core';
import {Actions, ofType, createEffect} from '@ngrx/effects';
import {debounceTime, map, switchMap} from 'rxjs';
import {DEFAULT_REQUEST_DEBOUNCE_MS} from 'src/app/shared/constants/common.constats';
import {mapActions} from '../store.helper';
import {AuthorizationActions} from './actions';
import {AuthService} from 'src/app/shared/services/auth.service';
import {RouterActions} from '../route/actions';
import {Routing} from 'src/app/shared/entities/routing.entity';

@Injectable()
export class AuthorizationEffects {
	registration$ = createEffect(() =>
		this.actions$.pipe(
			ofType<AuthorizationActions.Registration>(
				AuthorizationActions.TYPES.REGISTRATION.REQUESTED
			),
			debounceTime(DEFAULT_REQUEST_DEBOUNCE_MS),
			switchMap((_: AuthorizationActions.Registration) =>
				this.authorizationApiService
					.registration(_.payload.user)
					.pipe(mapActions(AuthorizationActions.TYPES.REGISTRATION))
			)
		)
	);

	registrationCompleted$ = createEffect(() =>
		this.actions$.pipe(
			ofType<AuthorizationActions.RegistrationCompleted>(
				AuthorizationActions.TYPES.REGISTRATION.SUCCEEDED
			),
			map(
				(_: AuthorizationActions.RegistrationCompleted) =>
					new RouterActions.RouterGo(
						Routing.AUTH_CHILDREN?.[Routing.KeyUrl.Login].path || '',
						{
							replaceUrl: true,
						}
					)
			)
		)
	);

	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType<AuthorizationActions.Login>(AuthorizationActions.TYPES.LOGIN.REQUESTED),
			debounceTime(DEFAULT_REQUEST_DEBOUNCE_MS),
			switchMap((_: AuthorizationActions.Registration) =>
				this.authorizationApiService
					.login(_.payload.user)
					.pipe(mapActions(AuthorizationActions.TYPES.LOGIN))
			)
		)
	);

	loginCompleted$ = createEffect(() =>
		this.actions$.pipe(
			ofType<AuthorizationActions.LoginCompleted>(AuthorizationActions.TYPES.LOGIN.SUCCEEDED),
			map(
				(_: AuthorizationActions.LoginCompleted) =>
					new RouterActions.RouterGo(
						Routing.MAIN_CHILDREN?.[Routing.KeyUrl.Assortiment].path || '',
						{
							replaceUrl: true,
						}
					)
			)
		)
	);

	constructor(
		private actions$: Actions,
		private authorizationApiService: AuthService
	) {}
}
