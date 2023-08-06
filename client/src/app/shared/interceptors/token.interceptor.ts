import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const loadingService = inject(AuthService);
		if (loadingService.isAuthenticated()) {
			req = req.clone({
        url: `${environment.apiUrl}${req.url}`,
				setHeaders: {
					Authorization: loadingService.getToken(),
				},
			});
		}
		return next.handle(req);
	}
}
