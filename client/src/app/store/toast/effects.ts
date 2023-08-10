import {Injectable} from '@angular/core';
import {AuthorizationActions} from '../authorization/actions';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs';
import {Common} from 'src/app/shared/entities/common.entity';
import {ToastService} from 'src/app/shared/components/toast/toast-service';
import {Toast} from 'src/app/shared/components/toast/toast.entities';
import {AssortimentActions} from '../assortiment/actions';
import {ActionWithPayload} from '../store.helper';
import {OrderActions} from '../order/actions';

@Injectable()
export class ToastEffects {
	showSuccessToast$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType<ActionWithPayload<Common.Completed>>(
					AuthorizationActions.TYPES.LOGIN.SUCCEEDED,
					AuthorizationActions.TYPES.REGISTRATION.SUCCEEDED,
					AssortimentActions.TYPES.DELETE_POSITION_FOR_CATEGORY.SUCCEEDED,
					AssortimentActions.TYPES.ADD_CATEGORY.SUCCEEDED,
					AssortimentActions.TYPES.UPDATE_CATEGORY.SUCCEEDED,
					AssortimentActions.TYPES.DELETE_CATEGORY.SUCCEEDED,
					AssortimentActions.TYPES.ADD_POSITION_FOR_CATEGORY.SUCCEEDED,
					AssortimentActions.TYPES.UPDATE_POSITION_FOR_CATEGORY.SUCCEEDED,
					OrderActions.TYPES.ADD_ORDER.SUCCEEDED
				),
				tap((_: ActionWithPayload<Common.Completed>) => {
					this.toasterService.initiate({
						content: _.payload.message,
						type: Toast.ToastTypes.Success,
					});
				})
			),
		{dispatch: false}
	);

	constructor(
		private actions$: Actions,
		private toasterService: ToastService
	) {}
}
