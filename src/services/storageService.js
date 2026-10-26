// Persistent Local Storage Service for GuruPredict

const KEYS = {
  WATCHLIST: 'gurupredict_watchlist',
  ALERTS: 'gurupredict_alerts',
  SIGNAL_HISTORY: 'gurupredict_history',
  PREFERENCES: 'gurupredict_preferences',
  RISK_ACCEPTED: 'gurupredict_risk_accepted',
  ACCURACY_STATS: 'gurupredict_accuracy'
};

const DEFAULT_PREFS = {
  traderName: 'Guru Trader',
  defaultMarket: 'all',
  theme: 'dark',
  language: 'en',
  voiceAnnounce: true,
  speechRate: 1.0,
  autoRefreshInterval: 10, // seconds (0 = manual)
  soundEnabled: true,
  vibrateEnabled: true,
  sniperMode: false,
  highContrast: false,
  largeText: false,
  overlayEnabled: false
};

const INITIAL_HISTORY = [
  { id: 'h1', symbol: 'BTC/USDT', direction: 'BUY', entry: 94200, target: 96500, result: 'WIN', pnl: '+2.44%', date: '2 hours ago' },
  { id: 'h2', symbol: 'NIFTY 50', direction: 'BUY', entry: 25700, target: 25890, result: 'WIN', pnl: '+0.74%', date: '4 hours ago' },
  { id: 'h3', symbol: 'GOLD', direction: 'SELL', entry: 2755, target: 2735, result: 'WIN', pnl: '+0.72%', date: '6 hours ago' },
  { id: 'h4', symbol: 'EUR/USD', direction: 'SELL', entry: 1.0870, target: 1.0840, result: 'WIN', pnl: '+0.27%', date: '9 hours ago' },
  { id: 'h5', symbol: 'SOL/USDT', direction: 'BUY', entry: 202, target: 215, result: 'WIN', pnl: '+6.43%', date: '12 hours ago' },
  { id: 'h6', symbol: 'TATAMOTORS', direction: 'BUY', entry: 960, target: 975, result: 'LOSS', pnl: '-1.25%', date: 'Yesterday' }
];

class StorageService {
  getPreferences() {
    try {
      const stored = localStorage.getItem(KEYS.PREFERENCES);
      return stored ? { ...DEFAULT_PREFS, ...JSON.parse(stored) } : { ...DEFAULT_PREFS };
    } catch (e) {
      return { ...DEFAULT_PREFS };
    }
  }

  savePreferences(prefs) {
    try {
      const current = this.getPreferences();
      const updated = { ...current, ...prefs };
      localStorage.setItem(KEYS.PREFERENCES, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error saving prefs', e);
      return prefs;
    }
  }

  getWatchlist() {
    try {
      const stored = localStorage.getItem(KEYS.WATCHLIST);
      return stored ? JSON.parse(stored) : ['btc-usdt', 'nifty-50', 'gold', 'sol-usdt'];
    } catch (e) {
      return ['btc-usdt', 'nifty-50', 'gold'];
    }
  }

  toggleWatchlist(assetId) {
    const list = this.getWatchlist();
    const index = list.indexOf(assetId);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(assetId);
    }
    localStorage.setItem(KEYS.WATCHLIST, JSON.stringify(list));
    return list;
  }

  isInWatchlist(assetId) {
    return this.getWatchlist().includes(assetId);
  }

  getAlerts() {
    try {
      const stored = localStorage.getItem(KEYS.ALERTS);
      return stored ? JSON.parse(stored) : [
        { id: 'a1', assetId: 'btc-usdt', symbol: 'BTC/USDT', condition: 'ABOVE', targetPrice: 98000, active: true },
        { id: 'a2', assetId: 'gold', symbol: 'XAU/USD', condition: 'BELOW', targetPrice: 2730, active: true }
      ];
    } catch (e) {
      return [];
    }
  }

  addAlert(alert) {
    const alerts = this.getAlerts();
    alerts.unshift({ ...alert, id: 'a_' + Date.now(), active: true, createdAt: Date.now() });
    localStorage.setItem(KEYS.ALERTS, JSON.stringify(alerts));
    return alerts;
  }

  removeAlert(alertId) {
    let alerts = this.getAlerts();
    alerts = alerts.filter(a => a.id !== alertId);
    localStorage.setItem(KEYS.ALERTS, JSON.stringify(alerts));
    return alerts;
  }

  getSignalHistory() {
    try {
      const stored = localStorage.getItem(KEYS.SIGNAL_HISTORY);
      return stored ? JSON.parse(stored) : INITIAL_HISTORY;
    } catch (e) {
      return INITIAL_HISTORY;
    }
  }

  hasAcceptedRisk() {
    return localStorage.getItem(KEYS.RISK_ACCEPTED) === 'true';
  }

  acceptRisk() {
    localStorage.setItem(KEYS.RISK_ACCEPTED, 'true');
  }

  getAccuracyStats() {
    return {
      winRate: 81.4,
      totalPredictions: 142,
      wins: 115,
      losses: 27,
      currentStreak: 5,
      cryptoWinRate: 84.2,
      stocksWinRate: 79.5,
      forexWinRate: 80.0,
      commoditiesWinRate: 83.1
    };
  }
}

export const storage = new StorageService();
