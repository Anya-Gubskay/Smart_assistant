import {Routing} from './routing.entity';

export namespace Login {
	export enum AuthTitle {
		SingIn = 'Sign in',
		SignUp = 'Sign up',
	}

	export interface Auth {
		title: AuthTitle;
	}

	export const auth: Record<string, Auth> = {
		[Routing.KeyUrl.Login]: {title: AuthTitle.SingIn},
		[Routing.KeyUrl.Registration]: {title: AuthTitle.SignUp},
	};

	export enum FormFields {
		Email = 'email',
		Password = 'password',
	}

	export class User {
		constructor(
			public email: string,
			public password: string
		) {}
	}

	export const KEY_TOKEN = 'auth-token';
}
