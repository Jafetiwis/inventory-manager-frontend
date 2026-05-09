import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  private notificationSource = new Subject<{ message: string, type: 'success' | 'error' }>();
  
  notification$ = this.notificationSource.asObservable();

  /**
   * Muestra un mensaje de éxito
   * @param message Texto a mostrar
   */
  showSuccess(message: string) {
    this.notificationSource.next({ message, type: 'success' });
  }

  /**
   * Muestra un mensaje de error
   * @param message Texto a mostrar
   */
  showError(message: string) {
    this.notificationSource.next({ message, type: 'error' });
  }
}