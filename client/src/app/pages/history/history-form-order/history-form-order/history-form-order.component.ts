import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { OrderAddFormComponent } from 'src/app/shared/components/order-add-form/order-add-form.component';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MODAL_DATA } from 'src/app/shared/tokens/modal.tokens';

@Component({
  selector: 'app-history-form-order',
  standalone: true,
  imports: [CommonModule, SharedModule, OrderAddFormComponent],
  templateUrl: './history-form-order.component.html',
  styleUrls: ['./history-form-order.component.scss']
})
export class HistoryFormOrderComponent {
  constructor(public modalService: ModalService,
    @Inject(MODAL_DATA) public data: {numberOrder: number}
    ) {}
}
