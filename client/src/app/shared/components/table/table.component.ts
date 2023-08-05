import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { SharedModule } from '../../shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { SearchComponent } from '../search/search.component';
import { Table } from './table.namespace';
import { FormGroup} from '@angular/forms';
import { LoaderComponent } from '../loader/loader/loader.component';
import { LoadingStatus } from '../../interfaces/common.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, SharedModule, SearchComponent, LoaderComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T extends Table.Row> implements OnChanges {
  @Input() columnsConfig!: Table.ColumnConfig[];
  @Input() data!: T[] | null;
  @Input() isFilter = true;
  @Input() isPagination = false;
  @Input() title = '';
  @Input() loadingStatus!: LoadingStatus | null;

  public displayedColumns: string[] = [];
  public dataSource!: MatTableDataSource<T>;
  public formGroup!: FormGroup;
	public readonly ColumnsTypes = Table.ColumnsTypes;
  public readonly MAX_NUMBER_PAGES = 10;

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    if (!this.dataSource.paginator) {this.dataSource.paginator = paginator;}}

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {this.dataSource.sort = sort;}}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.columnsConfig?.currentValue) {
      this.displayedColumns = this.columnsConfig.map(item => item.property);
    }
    if(changes?.data?.currentValue) {
      this.dataSource = new MatTableDataSource(this.data as T[]);
    }
  }

  protected applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clickButton($event: MouseEvent,  column: Table.ColumnConfig, row: Table.Row): void {
    $event.preventDefault();
		$event.stopPropagation();
    if(column.onClick) {
      column.onClick(column, row);
    }
  }
}
