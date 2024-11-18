import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsEndpoint = '/notifications';

  constructor(private api: ApiService) {}

  /**
   * Obtém todas as notificações.
   */
  getNotifications(): Observable<Notification[]> {
    return this.api.get<Notification[]>(this.notificationsEndpoint);
  }

  /**
   * Marca uma notificação como lida pelo ID.
   */
  markAsRead(notificationId: string): Observable<void> {
    return this.api.put<void>(
      `${this.notificationsEndpoint}/${notificationId}/read`,
      {}
    );
  }

  /**
   * Exclui uma notificação pelo ID.
   */
  deleteNotification(notificationId: string): Observable<void> {
    return this.api.delete<void>(
      `${this.notificationsEndpoint}/${notificationId}`
    );
  }
}
