import {CommonModule} from '@angular/common';
import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {SharedModule} from '../../shared.module';
import {MatTableDataSource} from '@angular/material/table';
import {SearchComponent} from '../search/search.component';
import {Table} from './table.namespace';
import {FormGroup} from '@angular/forms';
import {LoaderComponent} from '../loader/loader/loader.component';
import {LoadingStatus} from '../../interfaces/common.interface';
import {PickerDateRangeComponent} from '../picker-date-range/picker-date-range.component';
import {PickerDateRange} from '../picker-date-range/picker-date-range.entity';
import * as moment from 'moment';
import {DEFAULT_FORMAT_DATE} from '../../constants/common.constats';
import { AppNoDataComponent } from '../no-data/no-data.component';

@Component({
	selector: 'app-table',
	standalone: true,
	imports: [
		CommonModule,
		SharedModule,
		SearchComponent,
		LoaderComponent,
		PickerDateRangeComponent,
		AppNoDataComponent,
	],
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
})
export class TableComponent<T extends Table.Row> implements OnChanges {
	@Input() columnsConfig!: Table.ColumnConfig[];
	@Input() data!: T[] | null;
	@Input() isFilter = true;
	@Input() isPagination = false;
	@Input() isDatePicker = false;
	@Input() title = '';
	@Input() loadingStatus!: LoadingStatus | null;
	@Output() clickRow = new EventEmitter<T>();

	public displayedColumns: string[] = [];
	public dataSource!: MatTableDataSource<T>;
	public formGroup!: FormGroup;
	public readonly ColumnsTypes = Table.ColumnsTypes;
	public readonly MAX_NUMBER_PAGES = 10;

	@ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
		if (!this.dataSource.paginator) {
			this.dataSource.paginator = paginator;
		}
	}

	@ViewChild(MatSort) set matSort(sort: MatSort) {
		if (!this.dataSource.sort) {
			this.dataSource.sort = sort;
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes?.columnsConfig?.currentValue) {
			this.displayedColumns = this.columnsConfig.map((item) => item.property);
		}
		if (changes?.data?.currentValue) {
			this.dataSource = new MatTableDataSource(this.data as T[]);
		}
	}

	protected applyFilter(filterValue: string): void {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	protected clickByRow($event: MouseEvent, row: T): void {
		$event.preventDefault();
		$event.stopPropagation();
		this.clickRow.emit(row);
	}

	protected clickButton($event: MouseEvent, column: Table.ColumnConfig, row: Table.Row): void {
		$event.preventDefault();
		$event.stopPropagation();
		if (column.onClickButton) {
			column.onClickButton(column, row);
		}
	}

	protected changedDate(dateRange: PickerDateRange.DateRange): void {
    if(!dateRange.start && !dateRange.end) {
			this.dataSource.connect().next(this.dataSource.filteredData);
			return;
		}
		const newDate = this.dataSource.filteredData.filter((e) => {
			return (
				moment(e.date).format(DEFAULT_FORMAT_DATE) >=
					moment(dateRange.start).format(DEFAULT_FORMAT_DATE) &&
				moment(e.date).format(DEFAULT_FORMAT_DATE) <=
					moment(dateRange.end).format(DEFAULT_FORMAT_DATE)
			);
		});
		this.dataSource.connect().next(newDate);
	}
}
