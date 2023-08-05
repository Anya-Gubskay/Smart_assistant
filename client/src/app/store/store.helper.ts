import {Observable, OperatorFunction, catchError, defer, map, of} from 'rxjs';
import {DataLoadingActions} from '../shared/interfaces/common.interface';
import { flow, set } from 'lodash/fp';
import { Action } from '@ngrx/store';
import {status} from '../shared/constants/common.constats'
import { Params } from '@angular/router';

export const getModuleDataLoadingActionsCreator =
	(moduleName: string) =>
	(actionName: string): DataLoadingActions => ({
		REQUESTED: `[${moduleName}] ${actionName} requested`,
		SUCCEEDED: `[${moduleName}] ${actionName} succeeded`,
		FAILED: `[${moduleName}] ${actionName} failed`,
	});

export const getActionDescription = (moduleName: string, id: string, description: string): string =>
	`[${moduleName}] ${id}: ${description}`;

export interface DataLoadingActionTypes {
	REQUESTED: string;
	SUCCEEDED: string;
	FAILED: string;
}

export function mapActionOnSuccess(
	actionTypes: DataLoadingActionTypes,
	isPayloadRequired = true
): OperatorFunction<unknown, {payload?: unknown; type: string}> {
	return map((payload) => {
		if (isPayloadRequired) {
			return {
				type: payload ? actionTypes.SUCCEEDED : actionTypes.FAILED,
				payload: payload ?? 'Payload is undefined or null',
			};
		}

		return {
			type: actionTypes.SUCCEEDED,
		};
	});
}

export const mapActionOnFailed = (
	actionTypes: DataLoadingActionTypes
): OperatorFunction<unknown, {payload: unknown; type: string}> =>
	catchError((error) =>
		of({
			type: actionTypes.FAILED,
			payload: error,
		})
	) as OperatorFunction<unknown, {payload: unknown; type: string}>;

export function mapActions<T>(actionTypes: DataLoadingActionTypes, isPayloadRequired = true) {
	return (source: Observable<T>) =>
		defer(() => source.pipe(mapActionOnSuccess(actionTypes, isPayloadRequired), mapActionOnFailed(actionTypes)));
}

export interface ActionWithPayload<T> extends Action {
	readonly payload: T;
}

export abstract class ActionWithPayload<T> implements Action {
	constructor(public readonly payload: T) {}
}

export interface ActionWithOptionalPayload<T> extends Action {
	readonly payload?: T;
}

export abstract class ActionWithOptionalPayload<T> implements Action {
	constructor(public readonly payload?: T) {}
}

export type ActionWithObjectPayload = ActionWithPayload<Record<string, unknown>>;


export function getDataLoaderReducer<T extends Params>(
	loadingActions: DataLoadingActions,
	storeDataKey: string,
	state: T,
	action: ActionWithPayload<unknown>
): T {
	const loadingStatusProperty = `${storeDataKey}LoadingStatus`;
  
	if (!state[loadingStatusProperty]) {
		console.warn(`Missing store key "${loadingStatusProperty}" will be added automatically`);
	}

	switch (action.type) {
		case loadingActions.REQUESTED:
			return set(loadingStatusProperty, status.loading, state);
		case loadingActions.SUCCEEDED:
			return flow(set(loadingStatusProperty, status.loaded), set(storeDataKey, action.payload))(state) as T;
		case loadingActions.FAILED:
			return set(loadingStatusProperty, status.error(action.payload), state);
      default:
        return {} as T
	}
}
