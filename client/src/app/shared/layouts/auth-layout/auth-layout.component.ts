import {Component} from '@angular/core';
import {Routing} from '../../entities/routing.entity';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared.module';
import {LoginComponent} from 'src/app/pages/login/login.component';

@Component({
	selector: 'app-auth-layout',
	standalone: true,
	imports: [RouterModule, SharedModule, LoginComponent],
	templateUrl: './auth-layout.component.html',
	styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent {
	public readonly Paths = Routing.ROUTES;
	public readonly PathsChildren = Routing.AUTH_CHILDREN;
	public readonly Key = Routing.KeyUrl;
}
