import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from './toast.entities';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  data!: Toast.Data;
  public open = new Subject<Toast.Data>();

  public initiate(data: Toast.Data) {
    this.data = { ...data, show: true, progressWidth: '100%' };
    if (data.type) {
      this.data.type = data.type;
    }
    if(!data.title) {
      this.data.title = this.data.type;
    }
    this.open.next(this.data);
  }

  public hide(): void {
    this.data = { ...this.data, show: false };
    this.open.next(this.data);
  }
}
