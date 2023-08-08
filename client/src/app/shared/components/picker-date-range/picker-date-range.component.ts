import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PickerDateRange } from './picker-date-range.entity';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import { filter } from 'rxjs';


@UntilDestroy()
@Component({
  selector: 'app-picker-date-range',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './picker-date-range.component.html',
  styleUrls: ['./picker-date-range.component.scss'],
  providers: []
})
export class PickerDateRangeComponent implements OnInit, OnChanges {
  @Input() range: PickerDateRange.DateRange = new PickerDateRange.DateRange();
  @Input() disable!: boolean;
  @Output() dateChange = new EventEmitter<PickerDateRange.DateRange>();

  public formGroup!: UntypedFormGroup;


  constructor(private fb: UntypedFormBuilder){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.range?.currentValue) {
      this.createFormGroup(this.range);
    }
  }

  ngOnInit(): void {
    if(!this.formGroup) {
      this.createFormGroup(this.range);
    }
    this.subscribeForm()
  }

  private createFormGroup(range: PickerDateRange.DateRange): void {
    this.formGroup = this.fb.group({
      start: new UntypedFormControl(range?.start),
      end: new UntypedFormControl(range?.start),
    })
  }

  private subscribeForm(): void {
    this.formGroup.valueChanges.pipe(
      untilDestroyed(this),
      ).subscribe((dateRange: PickerDateRange.DateRange) => {
        this.dateChange.emit(dateRange)
    })
  }
}
