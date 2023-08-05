import { LoadingStatus, Statuses } from "../interfaces/common.interface";

export const DEFAULT_REQUEST_DEBOUNCE_MS = 400;


export const status: Statuses = {
	default: {loading: false, loaded: false, error: null},
	loading: {loading: true, loaded: false, error: null},
	loaded: {loading: false, loaded: true, error: null},
	error: (error: any) => ({loading: false, loaded: false, error}) as LoadingStatus,
};

export const COLOR: Record<string, string> = {
  revenue: '#2780b0',
  orders: '#e4ce25'
}
