import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  message: string = '';
  type: string = 'success';
  isVisible: boolean = false;

  constructor(private notifyService: NotificationService) {}

  ngOnInit() {
    this.notifyService.notification$.subscribe(data => {
      this.message = data.message;
      this.type = data.type;
      this.isVisible = true;

      // Auto-ocultar tras 3 segundos
      setTimeout(() => this.isVisible = false, 3000);
    });
  }
}