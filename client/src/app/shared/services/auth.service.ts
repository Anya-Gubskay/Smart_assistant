import {Injectable} from '@angular/core';
import {Login} from '../entities/login.entity';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private token = '';

	constructor(private http: HttpClient) {}

	public registration(user: Login.User): Observable<{token: string}> {
		return this.http.post<{token: string}>('/api/auth/registration', user);
	}

	public login(user: Login.User): Observable<{token: string}> {
		return this.http.post<{token: string}>('/api/auth/login', user).pipe(
			tap(({token}) => {
				localStorage.setItem(Login.KEY_TOKEN, token);
				this.setToken(token);
			})
		);
	}

	public setToken(token?: string): void {
		if (token || localStorage.getItem(Login.KEY_TOKEN)) {
			this.token = token ?? (localStorage.getItem(Login.KEY_TOKEN) as string);
		}
	}

	public getToken(): string {
		return this.token;
	}

	public isAuthenticated(): boolean {
		return !!this.token;
	}

	public logout(): void {
		this.setToken('');
		localStorage.clear();
	}
}
