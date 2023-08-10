import {
	ApplicationRef,
	ComponentRef,
	EnvironmentInjector,
	Inject,
	Injectable,
	Injector,
	createComponent,
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {ModalComponent} from '../components/modal/modal.component';
import {ComponentType} from '@angular/cdk/portal';
import {MODAL_DATA} from '../tokens/modal.tokens';
import {Common} from '../entities/common.entity';

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	private modalNotifier?: Subject<any>;
	private modalComponent!: ComponentRef<ModalComponent>;

	constructor(
		private injector: EnvironmentInjector,
		private appRef: ApplicationRef,
		@Inject(DOCUMENT) private document: Document
	) {}

	open<T>(
		component: ComponentType<any>,
		data?: T,
		options?: Common.OptionModal
	): Observable<any> {
		const dialogWrapper = this.document.createElement('div');
		dialogWrapper.classList.add('dialog');
		this.modalComponent = createComponent(ModalComponent, {
			environmentInjector: this.injector,
			hostElement: dialogWrapper,
		});
		this.modalComponent.instance.width = options?.width ?? '70%';
		this.modalComponent.instance.height = options?.height ?? 'max-content';

		this.modalComponent.hostView.detectChanges();
		this.appRef.attachView(this.modalComponent.hostView);

		const contentDialog = dialogWrapper.getElementsByClassName('content-dialog')[0];
		this.document.body.appendChild(dialogWrapper);
		const injectorData = Injector.create({providers: [{provide: MODAL_DATA, useValue: data}]});

		// register the generated link using the ApplicationRef instance
		// to include the view in violation detection loops.
		const contentComponent = createComponent(component, {
			environmentInjector: this.injector,
			hostElement: contentDialog,
			elementInjector: injectorData,
		});

		this.appRef.attachView(contentComponent.hostView);
		this.modalNotifier = new Subject();
		return this.modalNotifier?.asObservable();
	}

	public closeModal(): void {
		this.appRef.detachView(this.modalComponent.hostView);
		this.modalNotifier?.complete();
	}

	public submitModal(data?: any): void {
		this.modalNotifier?.next(data);
		this.closeModal();
	}
}
