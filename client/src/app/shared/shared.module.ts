import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatNativeDateModule, MatOptionModule, MatRippleModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
@NgModule({
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatExpansionModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatRadioModule,
		MatDialogModule,
		MatIconModule,
		MatCheckboxModule,
		MatInputModule,
		MatMenuModule,
		MatTableModule,
		MatTooltipModule,
		MatDividerModule,
		MatOptionModule,
		MatAutocompleteModule,
		MatProgressBarModule,
		MatSelectModule,
		MatChipsModule,
		MatSlideToggleModule,
		MatDatepickerModule,
		MatSliderModule,
		ScrollingModule,
		MatRippleModule,
		MatToolbarModule,
		MatCardModule,
		MatListModule,
		MatPaginatorModule,
		MatSortModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatNativeDateModule,
	],
})
export class SharedModule {}
