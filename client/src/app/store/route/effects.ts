import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, tap} from 'rxjs/operators';
import {ActivatedRoute, ActivationEnd, NavigationStart, Router} from '@angular/router';
import {RouterActions} from './actions';

@Injectable()
export class RouterEffects {
	go$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType<RouterActions.RouterGo>(RouterActions.TYPES.GO),
				tap((action:RouterActions.RouterGo) => this.router.navigate([action.url], action.extras))
			),
		{dispatch: false}
	);

	setParam$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType<RouterActions.SetQueryParams>(RouterActions.TYPES.SET_PARAM),
				tap((action: RouterActions.SetQueryParams) => {
					void this.router.navigate([], {
						relativeTo: this.route,
						queryParams: action.payload,
						queryParamsHandling: action.queryParamsHandling,
						replaceUrl: true,
					});
				})
			),
		{dispatch: false}
	);

	constructor(
		private actions$: Actions,
		private router: Router,
		private route: ActivatedRoute,
	) {
		this.listenToRouter();
	}

	private listenToRouter() {
		this.router.events.pipe(filter((event) => event instanceof ActivationEnd)).subscribe(() => {
			this.checkUrlChange();
		});

		this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe((e) => {
			this.checkPageAccess(e as NavigationStart);
		});
	}

	private checkUrlChange(): void {
	}

	/**
	 * Currently supports only billing page
	 */
	private checkPageAccess(event: NavigationStart): void {
	}
}
