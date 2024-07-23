import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private notificationElement: HTMLElement;

    constructor() {
        this.notificationElement = document.createElement('div');
        this.notificationElement.id = 'notification';
        document.body.appendChild(this.notificationElement);
    }

    showSuccess(message: string) {
        this.showNotification(message, 'success');
    }

    showError(message: string) {
        this.showNotification(message, 'error');
    }

    private showNotification(message: string, type: 'success' | 'error') {
        this.notificationElement.innerText = message;
        this.notificationElement.className = `show ${type}`;
        setTimeout(() => {
            this.notificationElement.className =
                this.notificationElement.className.replace(`show ${type}`, '');
        }, 3000);
    }
}
