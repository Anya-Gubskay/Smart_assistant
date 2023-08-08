import { LoadingStatus, Statuses } from "../interfaces/common.interface";

export const DEFAULT_REQUEST_DEBOUNCE_MS = 400;


export const status: Statuses = {
	default: {loading: false, loaded: false, error: null},
	loading: {loading: true, loaded: false, error: null},
	loaded: {loading: false, loaded: true, error: null},
	error: (error: any) => ({loading: false, loaded: false, error}) as LoadingStatus,
};

export const COLOR: Record<string, string> = {
  revenue: '#B7A6F6',
  orders: '#88A3E2'
}

export const DEFAULT_FORMAT_DATE = 'MM.DD.YYYY'
