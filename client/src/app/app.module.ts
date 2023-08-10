import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {TokenInterceptor} from './shared/interceptors/token.interceptor';
import {StoreEffectsModule} from './store/effects.module';
import {reducers} from './store/rootReducer';
import {StoreModule} from '@ngrx/store';
import {TopProgressBarModule} from './shared/components/top-progress-bar/top-progress-bar/top-progress-bar.module';
import {NavigationActionTiming, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ErrorInterceptor} from './shared/interceptors/error.interceptor';
import {ToastComponent} from './shared/components/toast/toast.component';
import {ApiUrlInterceptor} from './shared/interceptors/api-url.interceptor';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserAnimationsModule,
		CommonModule,
		AppRoutingModule,
		AuthLayoutComponent,
		HttpClientModule,
		StoreEffectsModule,
		StoreModule.forRoot(reducers),
		StoreRouterConnectingModule.forRoot({
			navigationActionTiming: NavigationActionTiming.PostActivation,
		}),
		TopProgressBarModule,
		StoreDevtoolsModule.instrument(),
		ToastComponent,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiUrlInterceptor,
			multi: true,
		},
		CurrencyPipe,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
