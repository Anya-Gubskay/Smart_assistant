import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Injectable, inject} from '@angular/core';
import {Observable, catchError, delay, mergeMap, of, retry, retryWhen, switchMap} from 'rxjs';
import { ToastService } from '../components/toast/toast-service';
import { Toast } from '../components/toast/toast.entities';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const serviseToaster = inject(ToastService);
		return next.handle(req).pipe(
			retry({count: 2, delay: 2000}),
			catchError((e) => {
				if (e.status === 500) {
					serviseToaster.initiate(
            {content: e.message, type: Toast.ToastTypes.Error}
            )
					return of(e);
				}
        return of(e);
			})
		);
	}
}
