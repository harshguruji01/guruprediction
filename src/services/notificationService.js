// Notification Service for In-App Toasts & Browser Push Notifications
import { sound } from './soundService.js';
import { speech } from './speechService.js';
import { storage } from './storageService.js';

class NotificationService {
  constructor() {
    this.toastContainer = null;
    this.notificationsEnabled = true;
    this.initBrowserNotifications();
  }

  setToastContainer(el) {
    this.toastContainer = el;
  }

  initBrowserNotifications() {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        // We will request on user action
      }
    }
  }

  requestPermission() {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.requestPermission();
    }
    return Promise.resolve('denied');
  }

  showToast({ title, message, type = 'info', duration = 4000, soundType = 'alert' }) {
    if (soundType === 'buy') sound.playBuySignal();
    else if (soundType === 'sell') sound.playSellSignal();
    else if (soundType === 'alert') sound.playAlertPing();

    speech.announceToScreenReader(`${title}: ${message}`);

    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `gp-toast gp-toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');

    const icon = type === 'success' ? '✅' : (type === 'error' ? '⚠️' : (type === 'buy' ? '🟢' : (type === 'sell' ? '🔴' : '🔔')));

    toast.innerHTML = `
      <div class="gp-toast-icon">${icon}</div>
      <div class="gp-toast-content">
        <strong class="gp-toast-title">${title}</strong>
        <p class="gp-toast-desc">${message}</p>
      </div>
      <button class="gp-toast-close" aria-label="Close Notification">×</button>
    `;

    toast.querySelector('.gp-toast-close').addEventListener('click', () => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 250);
    });

    this.toastContainer.appendChild(toast);

    // Auto remove
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 250);
      }
    }, duration);

    // Also trigger browser push if permitted and window is hidden
    if (this.notificationsEnabled && typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body: message,
          icon: '/logo.png',
          badge: '/logo.png'
        });
      } catch (e) {}
    }
  }

  checkPriceAlerts(asset) {
    const alerts = storage.getAlerts();
    alerts.forEach(alert => {
      if (alert.active && alert.assetId === asset.id) {
        if (alert.condition === 'ABOVE' && asset.price >= alert.targetPrice) {
          this.showToast({
            title: `🎯 Price Alert Triggered!`,
            message: `${asset.symbol} crossed ABOVE ${alert.targetPrice} (Now: ${asset.price})`,
            type: 'success',
            soundType: 'alert'
          });
          alert.active = false;
        } else if (alert.condition === 'BELOW' && asset.price <= alert.targetPrice) {
          this.showToast({
            title: `📉 Price Alert Triggered!`,
            message: `${asset.symbol} dropped BELOW ${alert.targetPrice} (Now: ${asset.price})`,
            type: 'error',
            soundType: 'alert'
          });
          alert.active = false;
        }
      }
    });
  }
}

export const notifications = new NotificationService();
