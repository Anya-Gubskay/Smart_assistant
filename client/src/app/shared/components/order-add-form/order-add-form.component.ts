import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output} from '@angular/core';
import { OrderService } from 'src/app/pages/order/order.service';
import { LoaderComponent } from 'src/app/shared/components/loader/loader/loader.component';
import { Order } from 'src/app/shared/entities/order.entity';
import { LoadingStatus } from 'src/app/shared/interfaces/common.interface';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-order-add-form',
  standalone: true,
  imports: [CommonModule,  SharedModule, LoaderComponent],
  templateUrl: './order-add-form.component.html',
  styleUrls: ['./order-add-form.component.scss']
})
export class OrderAddFormComponent {
	@Input() loadingStatus!: LoadingStatus | null;
  @Input() isEdit!: boolean;
  @Output() addOrder = new EventEmitter<Order.OrderByCategory>();

  constructor(public order: OrderService){}
}