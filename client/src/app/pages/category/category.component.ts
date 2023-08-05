import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {TodoListComponent} from 'src/app/shared/components/todo-list/todo-list.component';
import {LoadingStatus} from 'src/app/shared/interfaces/common.interface';
import {ModalService} from 'src/app/shared/services/modal.service';
import {SharedModule} from 'src/app/shared/shared.module';
import {AddPositionModalComponent} from './add-position-modal/add-position-modal.component';
import {Categories} from 'src/app/shared/entities/categories.entity';
import {LoaderComponent} from 'src/app/shared/components/loader/loader/loader.component';
import {Positions} from 'src/app/shared/entities/positions.entity';
import {RouterModule} from '@angular/router';

@Component({
	selector: 'app-category',
	standalone: true,
	imports: [CommonModule, SharedModule, TodoListComponent, RouterModule, LoaderComponent],
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnChanges {
	@Input() positions!: Positions.PositionByCategory[] | null;
	@Input() positionsLoadingStatus!: LoadingStatus | null;
	@Input() isNewPage!: boolean | null;
	@Input() category!: Categories.Category | null;
	@Input() loadingStatus!: LoadingStatus | null;
	private image!: File;
	public imagePreview: string = '';
	public formGroup!: UntypedFormGroup;

	@Output() addCategory = new EventEmitter<Categories.Category>();
	@Output() updateCategory = new EventEmitter<Categories.Category>();
	@Output() addPosition = new EventEmitter<Positions.PositionByCategory>();
	@Output() updatePosition = new EventEmitter<Positions.PositionByCategory>();
	@Output() deletePosition = new EventEmitter<Positions.PositionByCategory>();

	constructor(protected modalService: ModalService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (!this.formGroup) {
			this.createFormGroup();
		}

		if (changes.category?.currentValue && !this.formGroup.controls.name.value) {
			this.setFormCategory();
		}

		if (changes.loadingStatus?.currentValue) {
			switch (true) {
				case this.loadingStatus?.loading:
				case this.loadingStatus?.error:
					this.formGroup.disable();
					break;
				default:
					this.formGroup.enable();
			}
		}
	}

	private setFormCategory(): void {
		this.formGroup.patchValue({
			name: this.category?.name,
		});
    
		if (this.category?.imageSrc) {
			this.imagePreview = this.category.imageSrc;
		}
	}

	public saveChange(): void {
		if (!this.category?._id) {
			this.addCategory.emit(
				new Categories.Category(this.formGroup.value.name, '', this.image)
			);
		} else {
			this.updateCategory.emit(
				new Categories.Category(this.formGroup.value.name, this.category?._id, this.image)
			);
		}
	}

	private createFormGroup(): void {
		this.formGroup = new FormGroup({
			name: new UntypedFormControl(null, Validators.required),
		});
	}

	public onClickItem(item: Positions.PositionByCategory): void {
		this.openModal(item);
	}

	public openModal(item?: Positions.PositionByCategory): void {
		this.modalService
			.open<Positions.PositionByCategory>(AddPositionModalComponent, item)
			.subscribe((action: Positions.PositionByCategory) => {
				if (action._id) {
					this.updatePosition.emit(
						new Positions.PositionByCategory(
							action.name,
							action.cost,
							action._id,
							1,
							this.category?._id
						)
					);
					return;
				}
				this.addPosition.emit(
					new Positions.PositionByCategory(
						action.name,
						action.cost,
						'',
						1,
						this.category?._id
					)
				);
			});
	}

	public onFileSelect(event: Event): void {
		const file = (event.target as any).files[0];
		this.image = file;

		const reader = new FileReader();

		reader.onload = () => {
			this.imagePreview = reader.result as string;
		};

		reader.readAsDataURL(file);
	}
}
