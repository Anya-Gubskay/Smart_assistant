import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
	FormsModule,
	ReactiveFormsModule,
	UntypedFormBuilder,
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UntilDestroy} from '@ngneat/until-destroy';
import {LoaderComponent} from 'src/app/shared/components/loader/loader/loader.component';
import {Login} from 'src/app/shared/entities/login.entity';
import {LoadingStatus} from 'src/app/shared/interfaces/common.interface';
import {SharedModule} from 'src/app/shared/shared.module';

@UntilDestroy()
@Component({
	selector: 'app-login',
	standalone: true,
	imports: [SharedModule, ReactiveFormsModule, FormsModule, LoaderComponent],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	@Input() loadingStatus!: LoadingStatus | null;
	public title = Login.AuthTitle.SingIn;
	public formGroup!: UntypedFormGroup;
	public hide = true;
	public readonly FormFields = Login.FormFields;
	public readonly MIN_PASSWORD = 6;

	@Output() authorization = new EventEmitter<{user: Login.User; isFormLogin: boolean}>();

	constructor(
		private route: ActivatedRoute,
		private fb: UntypedFormBuilder
	) {}

	ngOnInit(): void {
		const path = this.route.snapshot.url[0].path;
		this.title = Login.auth[path].title;

		this.createFormGroup();
	}

	private createFormGroup(): void {
		this.formGroup = this.fb.group({
			[this.FormFields.Email]: new UntypedFormControl(null, [
				Validators.required,
				Validators.email,
			]),
			[this.FormFields.Password]: new UntypedFormControl(null, [
				Validators.required,
				Validators.minLength(this.MIN_PASSWORD),
			]),
		});
	}

	public onSubmit(): void {
		this.formGroup.disable();
		this.title === Login.AuthTitle.SingIn ? this.login() : this.registration();
	}

	public login(): void {
		this.authorization.emit({user: this.formGroup.value, isFormLogin: true});
	}

	public registration(): void {
		this.authorization.emit({user: this.formGroup.value, isFormLogin: false});
	}

	public clickIcon($event: MouseEvent): void {
		$event.preventDefault();
		this.hide = !this.hide;
	}
}
