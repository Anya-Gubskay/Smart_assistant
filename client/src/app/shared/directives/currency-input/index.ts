import {NgModule} from '@angular/core';
import {CurrencyInputDirective} from './currency-input.directive';

@NgModule({
	declarations: [CurrencyInputDirective],
	exports: [CurrencyInputDirective],
	providers: [CurrencyInputDirective],
})
export class CurrencyInputModule {}
