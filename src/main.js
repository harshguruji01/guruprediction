// GuruPredict Main Application Orchestrator
// Developed by HarshGuruJi (Harsh Patel)

import { marketData } from './services/marketData.js';
import { predictionEngine } from './services/predictionEngine.js';
import { storage } from './services/storageService.js';
import { sound } from './services/soundService.js';
import { speech } from './services/speechService.js';
import { notifications } from './services/notificationService.js';
import { t, getLang, setLang } from './services/i18n.js';
import { CandlestickChart } from './components/candlestickChart.js';
import { floatingOverlay } from './components/floatingOverlay.js';
import { calculateProfitLoss, calculateRiskPosition } from './components/calculators.js';
import { colorEngine, NUMBER_MAP } from './services/colorEngine.js';

class GuruPredictApp {
  constructor() {
    this.currentView = 'view-home';
    this.currentCategory = 'all';
    this.currentPredFilter = 'all';
    this.currentSort = 'gainers';
    this.searchQuery = '';
    this.chartInstance = null;
    this.selectedChartAsset = 'btc-usdt';
    this.chartInterval = '15m';
    this.refreshTimer = null;
    this.countdownSeconds = 10;
    
    // Color Game & 50% Target Trend Engine state
    this.selectedColor = 'GREEN';
    this.selectedNumber = null;
    this.colorHistoryLimit = 50;
    this.sessionStartTime = Date.now();
    this.roundsInSessionCount = 0;
  }

  init() {
    // 1. Initialize services
    this.initServices();

    // 2. Setup DOM & i18n
    this.applyTranslations();

    // 3. Setup Splash Screen
    this.setupSplashScreen();

    // 4. Setup Risk Modal
    this.setupRiskModal();

    // 5. Setup Floating Overlay
    floatingOverlay.init();

    // 6. Setup Chart
    this.setupChart();

    // 7. Setup Navigation & Views
    this.setupNavigation();

    // 8. Setup Home Dashboard & Listeners
    this.setupHomeDashboard();

    // 9. Setup Trending Section
    this.setupTrending();

    // 10. Setup Tools & Calculators
    this.setupTools();

    // 11. Setup Settings & Profile
    this.setupProfileSettings();

    // 12. Setup Color Prediction & Skip Mode Engine
    this.setupColorEngine();

    // 13. Setup Auto-Refresh Loop
    this.startAutoRefresh();

    // 14. Register Service Worker for PWA
    this.registerServiceWorker();

    // 15. Initial Render
    this.renderAll();
  }

  initServices() {
    speech.setLiveRegion(document.getElementById('sr-live-region'));
    notifications.setToastContainer(document.getElementById('toast-container'));

    const prefs = storage.getPreferences();
    sound.setEnabled(prefs.soundEnabled, prefs.vibrateEnabled);
    speech.setEnabled(prefs.voiceAnnounce);
    predictionEngine.setSniperMode(prefs.sniperMode);

    if (prefs.theme === 'light') {
      document.body.setAttribute('data-theme', 'light');
    }
    if (prefs.highContrast) {
      document.body.classList.add('high-contrast');
    }
    if (prefs.largeText) {
      document.body.classList.add('large-text');
    }

    // Subscribe to live market ticks
    marketData.subscribe((event) => {
      if (event.type === 'tick') {
        notifications.checkPriceAlerts(event.asset);
        this.updateSingleAssetTick(event.asset);
      }
    });
  }

  applyTranslations() {
    const lang = getLang();
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key);
    });

    const langText = document.getElementById('current-lang-text');
    if (langText) langText.textContent = lang === 'en' ? 'HI' : 'EN';
  }

  setupSplashScreen() {
    const splash = document.getElementById('splash-screen');
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => (splash.style.display = 'none'), 500);
    }, 1200);
  }

  setupRiskModal() {
    const riskModal = document.getElementById('risk-modal');
    const acceptBtn = document.getElementById('accept-risk-btn');

    if (!storage.hasAcceptedRisk()) {
      riskModal.style.display = 'flex';
    }

    acceptBtn.addEventListener('click', () => {
      sound.playClick();
      storage.acceptRisk();
      riskModal.style.display = 'none';
      notifications.showToast({
        title: 'Welcome to GuruPredict',
        message: 'Educational probability models loaded successfully.',
        type: 'success',
        soundType: 'alert'
      });
    });
  }

  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const targetViewId = btn.getAttribute('data-target-view');
        this.switchView(targetViewId);
      });
    });

    // Brand click -> home
    document.getElementById('brand-logo-trigger').addEventListener('click', () => {
      sound.playClick();
      this.switchView('view-home');
    });

    // Language Toggle
    document.getElementById('header-lang-btn').addEventListener('click', () => {
      sound.playClick();
      const current = getLang();
      const next = current === 'en' ? 'hi' : 'en';
      setLang(next);
      this.applyTranslations();
      this.renderAll();
      speech.speakText(next === 'hi' ? 'भाषा हिन्दी सेट की गई' : 'Language set to English');
    });

    // Header Voice Toggle
    const voiceBtn = document.getElementById('header-voice-btn');
    const voiceIcon = document.getElementById('voice-icon');
    voiceBtn.addEventListener('click', () => {
      sound.playClick();
      const current = speech.enabled;
      speech.setEnabled(!current);
      storage.savePreferences({ voiceAnnounce: !current });
      voiceIcon.textContent = !current ? '🔊' : '🔇';
      notifications.showToast({
        title: 'Voice Assistant',
        message: !current ? 'Voice signal announcements enabled' : 'Voice announcements muted',
        type: 'info'
      });
    });

    // Header Overlay Launcher & Guide
    document.getElementById('header-overlay-btn').addEventListener('click', () => {
      sound.playClick();
      this.showOverlayGuideModal();
    });

    // Manual Refresh
    document.getElementById('header-refresh-btn').addEventListener('click', () => {
      sound.playClick();
      this.refreshMarketData();
    });

    // Overlay Guide modal buttons
    const guideModal = document.getElementById('overlay-guide-modal');
    document.getElementById('guide-launch-overlay-btn').addEventListener('click', () => {
      sound.playClick();
      floatingOverlay.show();
      guideModal.style.display = 'none';
      notifications.showToast({
        title: 'Floating Overlay Launched',
        message: 'Drag the glowing bubble anywhere on screen. Tap to expand Mini-HUD.',
        type: 'success'
      });
    });

    document.getElementById('guide-close-btn').addEventListener('click', () => {
      sound.playClick();
      guideModal.style.display = 'none';
    });
  }

  showOverlayGuideModal() {
    const modal = document.getElementById('overlay-guide-modal');
    modal.style.display = 'flex';
  }

  switchView(viewId) {
    this.currentView = viewId;
    document.querySelectorAll('.view-pane').forEach((pane) => pane.classList.remove('active'));
    const targetPane = document.getElementById(viewId);
    if (targetPane) targetPane.classList.add('active');

    document.querySelectorAll('.nav-item').forEach((item) => {
      if (item.getAttribute('data-target-view') === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // If switching to chart, trigger resize
    if (viewId === 'view-tools' && this.chartInstance) {
      setTimeout(() => this.chartInstance.handleResize(), 100);
    }

    // If switching to color AI, trigger render
    if (viewId === 'view-color') {
      this.renderColorDashboard();
    }
  }

  setupHomeDashboard() {
    // Sniper mode toggle
    const sniperToggle = document.getElementById('sniper-toggle');
    const prefs = storage.getPreferences();
    sniperToggle.checked = !!prefs.sniperMode;

    sniperToggle.addEventListener('change', (e) => {
      sound.playClick();
      const isChecked = e.target.checked;
      predictionEngine.setSniperMode(isChecked);
      storage.savePreferences({ sniperMode: isChecked });
      this.renderPredictionsList();
      notifications.showToast({
        title: isChecked ? '🎯 Sniper Mode Active' : 'Standard Mode Active',
        message: isChecked ? 'Showing only 82%+ high-conviction sniper setups' : 'Showing all generated market signals',
        type: isChecked ? 'buy' : 'info'
      });
    });

    // Category chips
    document.querySelectorAll('.category-scroll .cat-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        sound.playClick();
        document.querySelectorAll('.category-scroll .cat-chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentCategory = chip.getAttribute('data-cat');
        this.renderPredictionsList();
      });
    });

    // Predictions tab direction filters
    document.querySelectorAll('[data-pred-filter]').forEach((chip) => {
      chip.addEventListener('click', () => {
        sound.playClick();
        document.querySelectorAll('[data-pred-filter]').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentPredFilter = chip.getAttribute('data-pred-filter');
        this.renderDeepPredictions();
      });
    });
  }

  renderPredictionsList() {
    const container = document.getElementById('predictions-container');
    if (!container) return;

    let predictions = predictionEngine.getAllPredictions();

    // Category filter
    if (this.currentCategory !== 'all') {
      predictions = predictions.filter((p) => p.category === this.currentCategory);
    }

    if (predictions.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary); background: var(--bg-card); border-radius: var(--radius-lg);">
          <div style="font-size: 32px; margin-bottom: 8px;">🎯</div>
          <div style="font-size: 15px; font-weight: 700; color: var(--text-primary);">No High-Conviction Setups Yet</div>
          <p style="font-size: 12px; margin-top: 4px;">Sniper filter is active. Waiting for confluent 82%+ probability signals.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = predictions.map((p) => this.buildPredictionCardHTML(p)).join('');
    this.attachCardEventListeners(container);
  }

  renderDeepPredictions() {
    const container = document.getElementById('deep-predictions-container');
    if (!container) return;

    let predictions = predictionEngine.getAllPredictions(false);

    if (this.currentPredFilter === 'BUY') {
      predictions = predictions.filter((p) => p.direction === 'BUY');
    } else if (this.currentPredFilter === 'SELL') {
      predictions = predictions.filter((p) => p.direction === 'SELL');
    } else if (this.currentPredFilter === 'DIAMOND') {
      predictions = predictions.filter((p) => p.isDiamond);
    }

    container.innerHTML = predictions.map((p) => this.buildPredictionCardHTML(p, true)).join('');
    this.attachCardEventListeners(container);
  }

  buildPredictionCardHTML(p, showRationaleDefault = false) {
    const isStarred = storage.isInWatchlist(p.assetId);
    const dirClass = p.direction === 'BUY' ? 'dir-buy' : (p.direction === 'SELL' ? 'dir-sell' : 'dir-hold');
    const borderClass = p.direction === 'BUY' ? 'pred-card-buy' : (p.direction === 'SELL' ? 'pred-card-sell' : 'pred-card-hold');
    const fillClass = p.direction === 'BUY' ? 'fill-buy' : (p.direction === 'SELL' ? 'fill-sell' : 'fill-hold');

    let badgeHTML = '';
    if (p.isDiamond) {
      badgeHTML = `<div class="special-tag tag-diamond" aria-label="Diamond Confluence Sure-Shot Signal">💎 DIAMOND CONFLUENCE SIGNAL</div>`;
    } else if (p.isCrowdTrap) {
      badgeHTML = `<div class="special-tag tag-trap" aria-label="Crowd Trap Detected">🚨 CROWD TRAP DETECTED - REVERSAL LIKELY</div>`;
    }

    return `
      <article class="pred-card ${borderClass}" data-asset-id="${p.assetId}" aria-label="AI Prediction for ${p.symbol}: ${p.direction} signal with ${p.confidence}% confidence. Timeframe: ${p.timeframeCategory}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span class="demo-card-tag">⚡ DEMO MODE</span>
            <span class="timeframe-pill">⏱️ ${p.timeframeCategory} (${p.timeframeDetail})</span>
          </div>
          ${badgeHTML}
        </div>
        
        <div class="pred-card-header">
          <div class="pred-asset-info">
            <div class="pred-symbol">
              <span>${p.symbol}</span>
              <span style="font-size: 11px; font-weight: 600; color: var(--text-muted); text-transform: uppercase;">[${p.category}]</span>
            </div>
            <div class="pred-name">${p.name} • Live: ${p.unit}${p.currentPrice.toLocaleString()}</div>
          </div>
          <div class="pred-badge-group">
            <span class="dir-badge ${dirClass}">${p.direction}</span>
          </div>
        </div>

        <!-- Confidence Meter (0 to 100) -->
        <div class="confidence-box">
          <div class="confidence-header">
            <span>AI Confidence Score</span>
            <span class="confidence-val">${p.confidence} / 100</span>
          </div>
          <div class="confidence-bar-bg" role="progressbar" aria-valuenow="${p.confidence}" aria-valuemin="0" aria-valuemax="100">
            <div class="confidence-bar-fill ${fillClass}" style="width: ${p.confidence}%;"></div>
          </div>
        </div>

        <!-- Technical Indicators Ribbon -->
        <div class="indicators-ribbon" aria-label="Technical Indicators">
          <span class="ind-chip ind-chip-active">RSI: ${p.indicators.rsi}</span>
          <span class="ind-chip">MACD: ${p.indicators.macdStatus}</span>
          <span class="ind-chip">BB: ${p.indicators.bbStatus}</span>
          <span class="ind-chip">Trend: ${p.indicators.trend}</span>
          <span class="ind-chip">Vol: ${p.indicators.volumeRatio}x</span>
          <span class="ind-chip">S1: ${p.unit}${p.indicators.support1}</span>
          <span class="ind-chip">R1: ${p.unit}${p.indicators.resistance1}</span>
        </div>

        <!-- Key Trade Levels: Entry, Target 1, Target 2, Stop Loss (4 Columns) -->
        <div class="targets-grid-4">
          <div class="target-col">
            <div class="target-label">Entry Price</div>
            <div class="target-value val-entry">${p.unit}${p.entryPrice.toLocaleString()}</div>
          </div>
          <div class="target-col">
            <div class="target-label">Target 1</div>
            <div class="target-value val-up">${p.unit}${p.target1.toLocaleString()}</div>
          </div>
          <div class="target-col">
            <div class="target-label">Target 2</div>
            <div class="target-value val-up">${p.unit}${p.target2.toLocaleString()}</div>
          </div>
          <div class="target-col">
            <div class="target-label">Stop-Loss</div>
            <div class="target-value val-down">${p.unit}${p.stopLoss.toLocaleString()}</div>
          </div>
        </div>

        <!-- Bilingual AI Prediction Reason (English + Hindi) -->
        <div class="ai-reason-container">
          <div class="reason-block">
            <div class="reason-lang-tag"><span>🤖</span> AI Reason (English):</div>
            <div class="reason-text">${p.reasonEn}</div>
          </div>
          <div class="reason-block" style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
            <div class="reason-lang-tag"><span>🇮🇳</span> AI विश्लेषण (Hindi):</div>
            <div class="reason-text">${p.reasonHi}</div>
          </div>
        </div>

        <!-- Mandatory Disclaimer on Every Prediction -->
        <div class="mandatory-card-disclaimer">
          <span>⚠️</span>
          <span><strong>Notice:</strong> GuruPredict predictions are educational only. Trading involves risk. Not financial advice.</span>
        </div>

        <!-- Actions Footer -->
        <div class="pred-card-actions">
          <div class="pred-timeframe">
            ⚖️ Risk/Reward: ${p.riskReward}
          </div>
          <div class="card-btn-group">
            <button class="card-action-btn btn-speak" data-asset="${p.assetId}" aria-label="Announce ${p.symbol} AI signal aloud in your language">
              🔊 Speak
            </button>
            <button class="card-action-btn btn-star ${isStarred ? 'active-star' : ''}" data-asset="${p.assetId}" aria-label="${isStarred ? 'Unstar' : 'Star'} ${p.symbol}">
              ⭐
            </button>
            <button class="card-action-btn btn-chart" data-asset="${p.assetId}" aria-label="View candlestick chart for ${p.symbol}">
              📊 Chart
            </button>
          </div>
        </div>
      </article>
    `;
  }

  attachCardEventListeners(container) {
    // Speak button
    container.querySelectorAll('.btn-speak').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playClick();
        const assetId = btn.getAttribute('data-asset');
        const asset = marketData.getAssetById(assetId);
        if (asset) {
          const pred = predictionEngine.generatePrediction(asset);
          speech.speakSignal(pred);
        }
      });
    });

    // Star favorite button
    container.querySelectorAll('.btn-star').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playClick();
        const assetId = btn.getAttribute('data-asset');
        const list = storage.toggleWatchlist(assetId);
        const isNowStarred = list.includes(assetId);
        btn.classList.toggle('active-star', isNowStarred);
        notifications.showToast({
          title: isNowStarred ? 'Starred Asset' : 'Removed from Watchlist',
          message: `${assetId} watchlist preference saved.`,
          type: 'info'
        });
        this.renderWatchlist();
      });
    });

    // Chart launcher button
    container.querySelectorAll('.btn-chart').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playClick();
        const assetId = btn.getAttribute('data-asset');
        this.openAssetChart(assetId);
      });
    });
  }

  openAssetChart(assetId) {
    this.selectedChartAsset = assetId;
    const select = document.getElementById('chart-asset-select');
    if (select) select.value = assetId;
    this.loadChartForAsset(assetId);
    this.switchView('view-tools');
    this.switchToolSubtab('chart');
  }

  setupTrending() {
    const searchInput = document.getElementById('trending-search');
    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderTrendingList();
    });

    document.querySelectorAll('[data-sort]').forEach((chip) => {
      chip.addEventListener('click', () => {
        sound.playClick();
        document.querySelectorAll('[data-sort]').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentSort = chip.getAttribute('data-sort');
        this.renderTrendingList();
      });
    });
  }

  renderTrendingList() {
    const container = document.getElementById('trending-list-container');
    if (!container) return;

    let assets = marketData.getAllAssets();

    // Search filter
    if (this.searchQuery) {
      assets = assets.filter(
        (a) =>
          a.symbol.toLowerCase().includes(this.searchQuery) ||
          a.name.toLowerCase().includes(this.searchQuery) ||
          a.category.toLowerCase().includes(this.searchQuery)
      );
    }

    // Sort
    if (this.currentSort === 'gainers') {
      assets.sort((a, b) => b.change24h - a.change24h);
    } else if (this.currentSort === 'losers') {
      assets.sort((a, b) => a.change24h - b.change24h);
    } else if (this.currentSort === 'volume') {
      assets.sort((a, b) => parseFloat(b.volume24h) - parseFloat(a.volume24h));
    } else if (this.currentSort === 'confidence') {
      assets.sort((a, b) => b.rsi - a.rsi);
    }

    container.innerHTML = assets
      .map((a, index) => {
        const isUp = a.change24h >= 0;
        const changeClass = isUp ? 'change-up' : 'change-down';
        const sign = isUp ? '+' : '';

        return `
        <div class="trending-item" data-asset="${a.id}" role="button" tabindex="0" aria-label="${a.name} ${a.symbol}: price ${a.unit}${a.price}, 24 hour change ${sign}${a.change24h}%">
          <div class="trending-left">
            <span class="trending-rank">#${index + 1}</span>
            <div style="display: flex; flex-direction: column;">
              <span style="font-size: 14px; font-weight: 800; font-family: var(--font-mono);">${a.symbol}</span>
              <span style="font-size: 11px; color: var(--text-secondary);">${a.name} • Vol: ${a.volume24h}</span>
            </div>
          </div>
          <div class="trending-right">
            <span class="trending-price">${a.unit}${a.price.toLocaleString()}</span>
            <span class="trending-change ${changeClass}">${sign}${a.change24h}%</span>
          </div>
        </div>
      `;
      })
      .join('');

    container.querySelectorAll('.trending-item').forEach((item) => {
      item.addEventListener('click', () => {
        sound.playClick();
        const assetId = item.getAttribute('data-asset');
        this.openAssetChart(assetId);
      });
    });
  }

  setupChart() {
    const canvas = document.getElementById('candlestick-canvas');
    if (!canvas) return;

    this.chartInstance = new CandlestickChart(canvas);

    // Populate asset dropdown
    const select = document.getElementById('chart-asset-select');
    const assets = marketData.getAllAssets();
    select.innerHTML = assets
      .map((a) => `<option value="${a.id}">${a.symbol} (${a.name})</option>`)
      .join('');

    select.addEventListener('change', (e) => {
      sound.playClick();
      this.selectedChartAsset = e.target.value;
      this.loadChartForAsset(this.selectedChartAsset);
    });

    // Interval buttons
    document.querySelectorAll('.interval-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        document.querySelectorAll('.interval-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.chartInterval = btn.getAttribute('data-int');
        this.loadChartForAsset(this.selectedChartAsset);
      });
    });

    this.loadChartForAsset(this.selectedChartAsset);
  }

  loadChartForAsset(assetId) {
    if (!this.chartInstance) return;
    const candles = marketData.getCandles(assetId);
    const asset = marketData.getAssetById(assetId);
    this.chartInstance.setData(candles, asset ? asset.symbol : '');
  }

  setupTools() {
    // Subtab navigation
    document.querySelectorAll('.subtab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const tool = btn.getAttribute('data-tool');
        this.switchToolSubtab(tool);
      });
    });

    // Alert Asset Select population
    const alertSelect = document.getElementById('alert-asset-select');
    if (alertSelect) {
      alertSelect.innerHTML = marketData
        .getAllAssets()
        .map((a) => `<option value="${a.id}">${a.symbol} (Now: ${a.unit}${a.price})</option>`)
        .join('');
    }

    // Create Alert button
    const createAlertBtn = document.getElementById('create-alert-btn');
    if (createAlertBtn) {
      createAlertBtn.addEventListener('click', () => {
        sound.playClick();
        const assetId = document.getElementById('alert-asset-select').value;
        const condition = document.getElementById('alert-condition').value;
        const targetPrice = parseFloat(document.getElementById('alert-price').value);

        if (!targetPrice || targetPrice <= 0) {
          notifications.showToast({ title: 'Invalid Price', message: 'Please enter a valid price threshold.', type: 'error' });
          return;
        }

        const asset = marketData.getAssetById(assetId);
        storage.addAlert({
          assetId,
          symbol: asset ? asset.symbol : assetId,
          condition,
          targetPrice
        });

        notifications.showToast({
          title: 'Alert Created',
          message: `Will notify when ${asset ? asset.symbol : assetId} is ${condition} ${targetPrice}`,
          type: 'success'
        });

        document.getElementById('alert-price').value = '';
        this.renderAlertsList();
      });
    }

    // P/L Calculator reactive inputs
    const plInputs = ['pl-entry', 'pl-exit', 'pl-qty', 'pl-lev'];
    let plType = 'LONG';

    const calcPL = () => {
      const res = calculateProfitLoss({
        type: plType,
        entry: document.getElementById('pl-entry').value,
        exit: document.getElementById('pl-exit').value,
        quantity: document.getElementById('pl-qty').value,
        leverage: document.getElementById('pl-lev').value
      });

      const netEl = document.getElementById('pl-net-val');
      const roiEl = document.getElementById('pl-roi-val');
      const sign = res.netProfit >= 0 ? '+' : '';
      netEl.textContent = `${sign}$${res.netProfit.toLocaleString()}`;
      netEl.style.color = res.netProfit >= 0 ? 'var(--color-buy)' : 'var(--color-sell)';
      roiEl.textContent = `${sign}${res.roiPercent}%`;
      roiEl.style.color = res.roiPercent >= 0 ? 'var(--color-buy)' : 'var(--color-sell)';
    };

    plInputs.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', calcPL);
    });

    const longBtn = document.getElementById('pl-btn-long');
    const shortBtn = document.getElementById('pl-btn-short');
    longBtn.addEventListener('click', () => {
      sound.playClick();
      plType = 'LONG';
      longBtn.className = 'seg-btn active-long';
      shortBtn.className = 'seg-btn';
      calcPL();
    });
    shortBtn.addEventListener('click', () => {
      sound.playClick();
      plType = 'SHORT';
      shortBtn.className = 'seg-btn active-short';
      longBtn.className = 'seg-btn';
      calcPL();
    });

    // Risk Calculator reactive inputs
    const riskInputs = ['risk-balance', 'risk-pct', 'risk-entry', 'risk-sl'];
    const calcRisk = () => {
      const res = calculateRiskPosition({
        accountBalance: document.getElementById('risk-balance').value,
        riskPercentage: document.getElementById('risk-pct').value,
        entryPrice: document.getElementById('risk-entry').value,
        stopLossPrice: document.getElementById('risk-sl').value
      });

      document.getElementById('risk-pos-val').textContent = `${res.positionSize} Units`;
      document.getElementById('risk-loss-val').textContent = `$${res.maxRiskAmount}`;
    };

    riskInputs.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', calcRisk);
    });

    // Render alerts & history & news
    this.renderAlertsList();
    this.renderSignalHistory();
    this.renderNewsFeed();
  }

  switchToolSubtab(toolName) {
    document.querySelectorAll('.subtab-btn').forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-tool') === toolName);
    });
    document.querySelectorAll('.tool-pane').forEach((p) => p.classList.remove('active'));
    const pane = document.getElementById(`tool-${toolName}-pane`);
    if (pane) pane.classList.add('active');

    if (toolName === 'chart' && this.chartInstance) {
      setTimeout(() => this.chartInstance.handleResize(), 100);
    } else if (toolName === 'watchlist') {
      this.renderWatchlist();
    }
  }

  renderWatchlist() {
    const container = document.getElementById('watchlist-container');
    if (!container) return;
    const list = storage.getWatchlist();

    const assets = marketData.getAllAssets().filter((a) => list.includes(a.id));
    if (assets.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-secondary); background: var(--bg-card); border-radius: var(--radius-lg);">
          <div style="font-size: 32px; margin-bottom: 8px;">⭐</div>
          <div style="font-size: 15px; font-weight: 700; color: var(--text-primary);">Watchlist Empty</div>
          <p style="font-size: 12px; margin-top: 4px;">Tap the star icon on any prediction card to pin it here.</p>
        </div>
      `;
      return;
    }

    const predictions = assets.map((a) => predictionEngine.generatePrediction(a));
    container.innerHTML = predictions.map((p) => this.buildPredictionCardHTML(p)).join('');
    this.attachCardEventListeners(container);
  }

  renderAlertsList() {
    const container = document.getElementById('alerts-list-container');
    if (!container) return;
    const alerts = storage.getAlerts();

    if (alerts.length === 0) {
      container.innerHTML = `<div style="text-align: center; padding: 20px; font-size: 12px; color: var(--text-muted);">No price alerts set.</div>`;
      return;
    }

    container.innerHTML = alerts
      .map(
        (a) => `
      <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 14px; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 18px;">🔔</span>
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 13px; font-weight: 800; font-family: var(--font-mono);">${a.symbol}</span>
            <span style="font-size: 11px; color: var(--text-secondary);">Alert when price is ${a.condition} ${a.targetPrice}</span>
          </div>
        </div>
        <button class="card-action-btn delete-alert-btn" data-alert-id="${a.id}" style="color: var(--color-sell); border-color: rgba(255, 61, 87, 0.3);">
          Delete
        </button>
      </div>
    `
      )
      .join('');

    container.querySelectorAll('.delete-alert-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const id = btn.getAttribute('data-alert-id');
        storage.removeAlert(id);
        this.renderAlertsList();
      });
    });
  }

  renderSignalHistory() {
    const container = document.getElementById('signal-history-container');
    if (!container) return;
    const history = storage.getSignalHistory();

    container.innerHTML = history
      .map((h) => {
        const isWin = h.result === 'WIN';
        return `
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); border-radius: var(--radius-sm); padding: 10px 12px; margin-bottom: 6px; font-size: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-weight: 800; font-family: var(--font-mono);">${h.symbol}</span>
            <span class="dir-badge ${h.direction === 'BUY' ? 'dir-buy' : 'dir-sell'}" style="padding: 2px 6px; font-size: 10px;">${h.direction}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-weight: 800; font-family: var(--font-mono); color: ${isWin ? 'var(--color-buy)' : 'var(--color-sell)'};">${h.pnl}</span>
            <span style="background: ${isWin ? 'rgba(0,230,118,0.15)' : 'rgba(255,61,87,0.15)'}; color: ${isWin ? 'var(--color-buy)' : 'var(--color-sell)'}; padding: 2px 6px; border-radius: 4px; font-weight: 800; font-size: 10px;">${h.result}</span>
          </div>
        </div>
      `;
      })
      .join('');
  }

  renderNewsFeed() {
    const container = document.getElementById('news-feed-container');
    if (!container) return;

    const news = [
      { headline: "Bitcoin tests $98,000 resistance as institutional ETF inflows hit new weekly record", time: "18m ago", source: "CoinDesk", sentiment: "Bullish", sentimentColor: "var(--color-buy)" },
      { headline: "Nifty 50 touches all-time high amid heavy foreign institutional buying in banking stocks", time: "42m ago", source: "Economic Times", sentiment: "Bullish", sentimentColor: "var(--color-buy)" },
      { headline: "US Federal Reserve hints at measured interest rate cuts as inflation data meets estimates", time: "1h ago", source: "Bloomberg", sentiment: "Neutral", sentimentColor: "var(--color-hold)" },
      { headline: "Crude oil slips 1.8% on higher inventory data and easing supply disruption concerns", time: "2h ago", source: "Reuters", sentiment: "Bearish", sentimentColor: "var(--color-sell)" },
      { headline: "Gold consolidates near $2,750 as global central banks continue steady bullion purchases", time: "3h ago", source: "Kitco", sentiment: "Bullish", sentimentColor: "var(--color-buy)" }
    ];

    container.innerHTML = news
      .map(
        (n) => `
      <article class="news-item">
        <div class="news-header">
          <span>${n.source} • ${n.time}</span>
          <span class="news-sentiment-badge" style="background: ${n.sentimentColor}22; color: ${n.sentimentColor}; border: 1px solid ${n.sentimentColor}44;">${n.sentiment}</span>
        </div>
        <div class="news-headline">${n.headline}</div>
      </article>
    `
      )
      .join('');
  }

  setupProfileSettings() {
    const prefs = storage.getPreferences();

    // Name input
    const nameInput = document.getElementById('profile-name-input');
    if (nameInput) {
      nameInput.value = prefs.traderName;
      nameInput.addEventListener('change', (e) => {
        storage.savePreferences({ traderName: e.target.value });
      });
    }

    // Default market select
    const marketSelect = document.getElementById('profile-market-select');
    if (marketSelect) {
      marketSelect.value = prefs.defaultMarket;
      marketSelect.addEventListener('change', (e) => {
        storage.savePreferences({ defaultMarket: e.target.value });
      });
    }

    // Overlay toggle in settings
    const overlayToggle = document.getElementById('settings-overlay-toggle');
    if (overlayToggle) {
      overlayToggle.checked = floatingOverlay.isActive;
      overlayToggle.addEventListener('change', (e) => {
        sound.playClick();
        if (e.target.checked) floatingOverlay.show();
        else floatingOverlay.hide();
      });
    }

    // Voice toggle
    const voiceToggle = document.getElementById('settings-voice-toggle');
    if (voiceToggle) {
      voiceToggle.checked = prefs.voiceAnnounce;
      voiceToggle.addEventListener('change', (e) => {
        sound.playClick();
        speech.setEnabled(e.target.checked);
        storage.savePreferences({ voiceAnnounce: e.target.checked });
        document.getElementById('voice-icon').textContent = e.target.checked ? '🔊' : '🔇';
      });
    }

    // Notifications toggle
    const notifyToggle = document.getElementById('settings-notify-toggle');
    if (notifyToggle) {
      notifyToggle.addEventListener('change', async (e) => {
        sound.playClick();
        if (e.target.checked) {
          const perm = await notifications.requestPermission();
          notifications.showToast({
            title: 'Push Notifications',
            message: perm === 'granted' ? 'Notifications activated!' : 'Permission denied by browser settings.',
            type: perm === 'granted' ? 'success' : 'error'
          });
        }
      });
    }

    // Sound toggle
    const soundToggle = document.getElementById('settings-sound-toggle');
    if (soundToggle) {
      soundToggle.checked = prefs.soundEnabled;
      soundToggle.addEventListener('change', (e) => {
        sound.setEnabled(e.target.checked, storage.getPreferences().vibrateEnabled);
        storage.savePreferences({ soundEnabled: e.target.checked });
      });
    }

    // Vibrate toggle
    const vibrateToggle = document.getElementById('settings-vibrate-toggle');
    if (vibrateToggle) {
      vibrateToggle.checked = prefs.vibrateEnabled;
      vibrateToggle.addEventListener('change', (e) => {
        sound.setEnabled(storage.getPreferences().soundEnabled, e.target.checked);
        storage.savePreferences({ vibrateEnabled: e.target.checked });
      });
    }

    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      const isLight = document.body.getAttribute('data-theme') === 'light';
      themeBtn.textContent = isLight ? '☀️ Light' : '🌙 Dark';

      themeBtn.addEventListener('click', () => {
        sound.playClick();
        const currentlyLight = document.body.getAttribute('data-theme') === 'light';
        if (currentlyLight) {
          document.body.removeAttribute('data-theme');
          themeBtn.textContent = '🌙 Dark';
          storage.savePreferences({ theme: 'dark' });
        } else {
          document.body.setAttribute('data-theme', 'light');
          themeBtn.textContent = '☀️ Light';
          storage.savePreferences({ theme: 'light' });
        }
      });
    }

    // Large text toggle
    const largeToggle = document.getElementById('settings-largetext-toggle');
    if (largeToggle) {
      largeToggle.checked = !!prefs.largeText;
      largeToggle.addEventListener('change', (e) => {
        sound.playClick();
        document.body.classList.toggle('large-text', e.target.checked);
        storage.savePreferences({ largeText: e.target.checked });
      });
    }

    // High contrast toggle
    const contrastToggle = document.getElementById('settings-contrast-toggle');
    if (contrastToggle) {
      contrastToggle.checked = !!prefs.highContrast;
      contrastToggle.addEventListener('change', (e) => {
        sound.playClick();
        document.body.classList.toggle('high-contrast', e.target.checked);
        storage.savePreferences({ highContrast: e.target.checked });
      });
    }
  }

  startAutoRefresh() {
    if (this.refreshTimer) clearInterval(this.refreshTimer);

    this.refreshTimer = setInterval(() => {
      this.countdownSeconds--;
      const pill = document.getElementById('home-timer-pill');
      if (pill) pill.textContent = `Auto: 0${this.countdownSeconds}s`;

      if (this.countdownSeconds <= 0) {
        this.countdownSeconds = 10;
        this.refreshMarketData(false);
      }
    }, 1000);
  }

  refreshMarketData(showToast = true) {
    marketData.refreshAll();
    this.renderPredictionsList();
    this.renderDeepPredictions();
    this.renderTrendingList();

    if (this.currentView === 'view-tools' && this.selectedChartAsset) {
      this.loadChartForAsset(this.selectedChartAsset);
    }

    if (showToast) {
      notifications.showToast({
        title: 'Signals Refreshed',
        message: 'Live quantitative predictions recalculated.',
        type: 'info'
      });
    }
  }

  updateSingleAssetTick(asset) {
    // Only update if visible
    if (this.currentView === 'view-home' || this.currentView === 'view-predictions') {
      const card = document.querySelector(`[data-asset-id="${asset.id}"]`);
      if (card) {
        const nameEl = card.querySelector('.pred-name');
        if (nameEl) {
          nameEl.textContent = `${asset.name} • ${asset.unit}${asset.price.toLocaleString()}`;
        }
      }
    }
  }

  // =========================================================
  // COLOR ROUND TRACKER & 50% TARGET TREND ENGINE CONTROLLER
  // =========================================================
  setupColorEngine() {
    // Mode Switcher Buttons (Markets AI <-> Color AI)
    document.querySelectorAll('.switch-to-markets-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        this.switchView('view-home');
      });
    });
    document.querySelectorAll('.switch-to-color-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        this.switchView('view-color');
      });
    });

    // Skip Mode Select
    const skipModeSelect = document.getElementById('skip-mode-select');
    const manualThresholdBox = document.getElementById('manual-threshold-box');
    const manualSlider = document.getElementById('manual-threshold-slider');
    const manualValEl = document.getElementById('manual-threshold-val');
    const skipDesc = document.getElementById('current-skip-mode-desc');

    if (skipModeSelect) {
      skipModeSelect.value = colorEngine.skipMode;
      if (colorEngine.skipMode === 'MANUAL' && manualThresholdBox) {
        manualThresholdBox.style.display = 'block';
      }
      skipModeSelect.addEventListener('change', (e) => {
        sound.playClick();
        const mode = e.target.value;
        if (manualThresholdBox) {
          manualThresholdBox.style.display = mode === 'MANUAL' ? 'block' : 'none';
        }
        if (skipDesc) {
          if (mode === 'BALANCED') skipDesc.textContent = 'Balanced Mode: Signals at 55+ score';
          else if (mode === 'AGGRESSIVE') skipDesc.textContent = 'Aggressive Mode: Signals at 45+ score (Higher risk)';
          else if (mode === 'SAFE') skipDesc.textContent = 'Safe Mode: Strong signals only at 70+ score (Max discipline)';
          else if (mode === 'MANUAL') skipDesc.textContent = `Manual Mode: Signals at ${manualSlider ? manualSlider.value : '65'}+ score`;
        }
        colorEngine.setSkipMode(mode, parseInt(manualSlider ? manualSlider.value : '65', 10));
        this.renderColorDashboard();
      });
    }

    if (manualSlider) {
      manualSlider.value = colorEngine.manualThreshold;
      if (manualValEl) manualValEl.textContent = colorEngine.manualThreshold;
      manualSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        if (manualValEl) manualValEl.textContent = val;
        if (skipDesc) skipDesc.textContent = `Manual Mode: Signals at ${val}+ score`;
        colorEngine.setSkipMode('MANUAL', parseInt(val, 10));
        this.renderColorDashboard();
      });
    }

    // Color Entry selection buttons
    const colorBtns = document.querySelectorAll('.color-select-btn');
    colorBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        colorBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedColor = btn.getAttribute('data-color');
      });
    });

    // Number Pad Chips (0-9)
    const numChips = document.querySelectorAll('.num-chip');
    const numberTag = document.getElementById('selected-number-tag');
    numChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        sound.playClick();
        const numVal = chip.getAttribute('data-num');
        if (chip.classList.contains('active')) {
          chip.classList.remove('active');
          this.selectedNumber = null;
          if (numberTag) numberTag.textContent = 'Big / Small & Parity Auto-Tagged';
        } else {
          numChips.forEach((c) => c.classList.remove('active'));
          chip.classList.add('active');
          this.selectedNumber = parseInt(numVal, 10);
          const meta = NUMBER_MAP[this.selectedNumber];
          if (meta) {
            if (numberTag) {
              numberTag.textContent = `Number ${this.selectedNumber}: ${meta.type} (5-9/0-4) • ${meta.parity} • ${meta.color}`;
            }
            this.selectedColor = meta.color;
            colorBtns.forEach((b) => {
              if (b.getAttribute('data-color') === meta.color) b.classList.add('active');
              else b.classList.remove('active');
            });
          }
        }
      });
    });

    // Auto Period generator
    const periodInput = document.getElementById('color-period-input');
    const autoPeriodBtn = document.getElementById('btn-next-period');
    const generateNextPeriod = () => {
      const top = colorEngine.history[0];
      if (top && top.period && /^\d+$/.test(top.period)) {
        try {
          const next = BigInt(top.period) + 1n;
          return next.toString();
        } catch (e) {}
      }
      const now = new Date();
      const ymd = now.toISOString().slice(0, 10).replace(/-/g, '');
      const min = String(now.getHours() * 60 + now.getMinutes()).padStart(3, '0');
      return `${ymd}${min}`;
    };

    if (periodInput && !periodInput.value) {
      periodInput.value = generateNextPeriod();
    }

    if (autoPeriodBtn) {
      autoPeriodBtn.addEventListener('click', () => {
        sound.playClick();
        if (periodInput) periodInput.value = generateNextPeriod();
      });
    }

    // Save Round Result Button
    const saveRoundBtn = document.getElementById('btn-save-color-round');
    if (saveRoundBtn) {
      saveRoundBtn.addEventListener('click', () => {
        sound.playClick();
        const periodVal = periodInput && periodInput.value ? periodInput.value.trim() : generateNextPeriod();
        const colorVal = this.selectedColor || 'GREEN';
        const numVal = this.selectedNumber;

        this.roundsInSessionCount++;
        const sessionRoundsEl = document.getElementById('session-rounds-count');
        if (sessionRoundsEl) sessionRoundsEl.textContent = `${this.roundsInSessionCount} Rounds`;

        if (this.roundsInSessionCount === 30) {
          notifications.showToast({
            title: 'Responsible Play Reminder',
            message: 'You have analyzed 30 rounds in this session. Take a 5-minute break.',
            type: 'warning',
            soundType: 'alert'
          });
        }

        colorEngine.addRound({
          color: colorVal,
          number: numVal,
          period: periodVal
        });

        if (periodInput) {
          periodInput.value = generateNextPeriod();
        }

        numChips.forEach((c) => c.classList.remove('active'));
        this.selectedNumber = null;
        if (numberTag) numberTag.textContent = 'Big / Small & Parity Auto-Tagged';

        sound.playBuy();
        notifications.showToast({
          title: 'Round Recorded',
          message: `Period ${periodVal}: ${colorVal} ${numVal !== null ? '(' + numVal + ')' : ''} saved.`,
          type: 'success'
        });

        this.renderColorDashboard();
      });
    }

    // Reset Demo Data Button
    const resetDemoBtn = document.getElementById('btn-reset-color-demo');
    if (resetDemoBtn) {
      resetDemoBtn.addEventListener('click', () => {
        sound.playClick();
        colorEngine.resetToDemo();
        if (periodInput) periodInput.value = generateNextPeriod();
        notifications.showToast({
          title: 'Demo Data Loaded',
          message: 'Sample 24-round history restored for pattern testing.',
          type: 'info'
        });
        this.renderColorDashboard();
      });
    }

    // Clear History Button
    const clearHistoryBtn = document.getElementById('btn-clear-color-history');
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', () => {
        sound.playClick();
        if (confirm('Clear all recorded color round history?')) {
          colorEngine.clearHistory();
          notifications.showToast({
            title: 'History Cleared',
            message: 'All round records removed.',
            type: 'info'
          });
          this.renderColorDashboard();
        }
      });
    }

    // History Filter Buttons (20, 50, 100)
    const historyFilterBtns = document.querySelectorAll('.color-history-filter-btn');
    historyFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        sound.playClick();
        historyFilterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.colorHistoryLimit = parseInt(btn.getAttribute('data-history-limit') || '50', 10);
        this.renderColorDashboard();
      });
    });

    // Session Timer interval
    setInterval(() => {
      const elapsedSec = Math.floor((Date.now() - this.sessionStartTime) / 1000);
      const m = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
      const s = String(elapsedSec % 60).padStart(2, '0');
      const sessionTimerEl = document.getElementById('session-timer-val');
      if (sessionTimerEl) sessionTimerEl.textContent = `${m}m ${s}s`;
    }, 1000);
  }

  renderColorDashboard() {
    const heroContainer = document.getElementById('color-prediction-hero-container');
    if (!heroContainer) return;

    const evaluation = colorEngine.evaluateNextRound();
    const stats = colorEngine.getStats(this.colorHistoryLimit);
    const rollingAcc = colorEngine.getRollingAccuracy(20);
    const colorAcc = colorEngine.getColorSpecificAccuracy();

    // 1. Auto-throttle banner
    const autoThrottleBanner = document.getElementById('auto-throttle-banner');
    if (autoThrottleBanner) {
      autoThrottleBanner.style.display = (rollingAcc.total >= 10 && rollingAcc.accuracy < 50) ? 'block' : 'none';
    }

    // 2. Render Hero Card: either SKIP ROUND or PREDICTION CARD
    if (evaluation.isSkip) {
      heroContainer.innerHTML = `
        <div class="skip-round-card" role="region" aria-label="Skip Round Signal">
          <div class="skip-badge">🛡️ SAFETY DISCIPLINE ACTIVE</div>
          <div class="skip-title">${t('skipRoundTitle') || 'SKIP ROUND'}</div>
          <div style="font-size: 13px; font-weight: 700; color: #FFFFFF; margin-bottom: 6px;">
            ${getLang() === 'hi' ? evaluation.skipReasonHi : evaluation.skipReasonEn}
          </div>
          <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">
            ${getLang() === 'hi' ? evaluation.skipReasonEn : evaluation.skipReasonHi}
          </div>

          <div style="display: flex; justify-content: center; gap: 14px; font-family: var(--font-mono); font-size: 11px; margin-bottom: 12px;">
            <div>Signal Score: <strong style="color: var(--color-gold); font-size: 14px;">${evaluation.signalScore}/100</strong></div>
            <div>Current Streak: <strong style="color: #00E676;">${stats.currentStreak.color} ${stats.currentStreak.count}</strong></div>
            <div>Violet Gap: <strong style="color: #C026D3;">${stats.violetGap} Rounds</strong></div>
          </div>

          <div class="skip-smart-msg">
            "Skip is also a smart decision. Waiting for a clear pattern improves focus and preserves discipline."<br/>
            <span style="font-size: 11px; opacity: 0.9;">(स्किप करना भी समझदारी है। स्पष्ट पैटर्न की प्रतीक्षा करना फोकस और अनुशासन बनाए रखता है।)</span>
          </div>

          <!-- Last 10 Results Timeline -->
          <div style="font-size: 10px; color: var(--text-muted); margin-top: 10px; margin-bottom: 6px; text-transform: uppercase;">
            Last 10 Rounds Result Timeline:
          </div>
          <div class="timeline-strip" style="justify-content: center;">
            ${evaluation.last10.map((r) => `
              <div class="result-dot dot-${r.color.toLowerCase()}" title="Period: ${r.period} - ${r.color} ${r.number !== null ? '(' + r.number + ')' : ''}">
                ${r.number !== null ? r.number : r.color[0]}
              </div>
            `).join('')}
          </div>

          <!-- Quick Feedback Buttons -->
          <div class="feedback-actions">
            <button class="btn-feedback btn-feedback-skip" id="btn-color-fb-skip">
              ⏭️ Skip Followed
            </button>
            <button class="btn-feedback btn-feedback-correct" id="btn-color-fb-skip-ok" title="Next result confirmed skip was wise">
              👍 Good Skip
            </button>
            <button class="btn-feedback" id="btn-color-fb-demo-next">
              ⚡ Next Round
            </button>
          </div>

          <div style="font-size: 9.5px; color: var(--text-muted); margin-top: 12px;">
            ${evaluation.disclaimer}
          </div>
        </div>
      `;

      document.getElementById('btn-color-fb-skip')?.addEventListener('click', () => {
        sound.playClick();
        colorEngine.recordFeedback('NEXT', 'SKIP', 'SKIP', true);
        notifications.showToast({ title: 'Discipline Logged', message: 'Skipped round recorded in accuracy history.', type: 'info' });
        this.renderColorDashboard();
      });
      document.getElementById('btn-color-fb-skip-ok')?.addEventListener('click', () => {
        sound.playClick();
        colorEngine.recordFeedback('NEXT', 'SKIP', 'SKIP', true);
        notifications.showToast({ title: 'Safety Validated', message: 'Patient execution logged.', type: 'success' });
        this.renderColorDashboard();
      });
      document.getElementById('btn-color-fb-demo-next')?.addEventListener('click', () => {
        sound.playClick();
        const colors = ['GREEN', 'RED', 'VIOLET', 'GREEN', 'RED'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomNum = Math.floor(Math.random() * 10);
        colorEngine.addRound({ color: randomColor, number: randomNum });
        this.renderColorDashboard();
      });

    } else {
      // PREDICTION CARD SHOWN
      const colorClass = `badge-${evaluation.suggestedColor.toLowerCase()}`;
      const colorEmoji = evaluation.suggestedColor === 'GREEN' ? '🟢' : (evaluation.suggestedColor === 'RED' ? '🔴' : '🟣');
      const strengthBadge = evaluation.signalStrength === 'Strong'
        ? '<span class="special-tag tag-diamond">🔥 STRONG SIGNAL</span>'
        : (evaluation.signalStrength === 'Normal' ? '<span class="special-tag" style="background: rgba(56, 189, 248, 0.2); color: #38BDF8; border: 1px solid #38BDF8;">⚡ NORMAL SIGNAL</span>' : '<span class="special-tag" style="background: rgba(245, 158, 11, 0.2); color: #F59E0B; border: 1px solid #F59E0B;">⚠️ WEAK SIGNAL</span>');

      heroContainer.innerHTML = `
        <div class="color-pred-card" role="region" aria-label="Color Prediction">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">50% Target Trend Engine</span>
            </div>
            ${strengthBadge}
          </div>

          <div class="pred-color-hero">
            <div>
              <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Suggested Next Color:</div>
              <div class="pred-color-badge ${colorClass}" style="margin-top: 4px;">
                ${colorEmoji} ${evaluation.suggestedColor}
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Max Confidence:</div>
              <div style="font-size: 26px; font-weight: 800; font-family: var(--font-mono); color: #00E676;">
                ${evaluation.confidence}%
              </div>
              <div style="font-size: 10px; color: var(--text-muted);">Capped at 65% max</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; background: rgba(255,255,255,0.03); padding: 8px; border-radius: var(--radius-sm); margin-bottom: 12px; font-size: 11px; text-align: center;">
            <div>
              <div style="color: var(--text-muted); font-size: 9.5px;">Signal Score</div>
              <div style="font-weight: 800; color: var(--color-gold); font-family: var(--font-mono); font-size: 13px;">${evaluation.signalScore}/100</div>
            </div>
            <div>
              <div style="color: var(--text-muted); font-size: 9.5px;">Risk Level</div>
              <div style="font-weight: 800; color: ${evaluation.riskLevel === 'Low' ? '#00E676' : (evaluation.riskLevel === 'High' ? '#FF3D57' : '#F59E0B')};">${evaluation.riskLevel}</div>
            </div>
            <div>
              <div style="color: var(--text-muted); font-size: 9.5px;">Streak Flow</div>
              <div style="font-weight: 800; color: #38BDF8;">${stats.currentStreak.color} ${stats.currentStreak.count}</div>
            </div>
          </div>

          <!-- Bilingual Reasoning -->
          <div style="background: rgba(255,255,255,0.02); border-left: 3px solid #00E676; border-radius: 4px; padding: 10px; margin-bottom: 12px;">
            <div style="font-size: 11px; font-weight: 700; color: #FFFFFF; line-height: 1.4; margin-bottom: 4px;">
              ${evaluation.reasonEn}
            </div>
            <div style="font-size: 11px; color: var(--text-secondary); line-height: 1.4;">
              ${evaluation.reasonHi}
            </div>
          </div>

          <!-- Last 10 Results Timeline -->
          <div style="font-size: 10px; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase;">
            Last 10 Rounds Result Timeline:
          </div>
          <div class="timeline-strip" style="justify-content: flex-start;">
            ${evaluation.last10.map((r) => `
              <div class="result-dot dot-${r.color.toLowerCase()}" title="Period: ${r.period} - ${r.color} ${r.number !== null ? '(' + r.number + ')' : ''}">
                ${r.number !== null ? r.number : r.color[0]}
              </div>
            `).join('')}
          </div>

          <!-- Accuracy Feedback Actions -->
          <div style="font-size: 10px; color: var(--text-muted); margin-top: 8px; margin-bottom: 4px;">
            Personal Accuracy Tracking (Did the suggestion match?):
          </div>
          <div class="feedback-actions">
            <button class="btn-feedback btn-feedback-correct" id="btn-color-fb-correct">
              ✅ Correct (जीत)
            </button>
            <button class="btn-feedback btn-feedback-wrong" id="btn-color-fb-wrong">
              ❌ Wrong (हार)
            </button>
            <button class="btn-feedback btn-feedback-skip" id="btn-color-fb-skip-btn">
              ⏭️ Skip Round
            </button>
          </div>

          <div style="font-size: 9px; color: var(--text-muted); margin-top: 12px; text-align: center;">
            ${evaluation.disclaimer}
          </div>
        </div>
      `;

      document.getElementById('btn-color-fb-correct')?.addEventListener('click', () => {
        sound.playBuy();
        colorEngine.recordFeedback('NEXT', evaluation.suggestedColor, evaluation.suggestedColor, false);
        notifications.showToast({ title: 'Feedback Recorded', message: 'Marked as Correct. Rolling accuracy updated.', type: 'success' });
        this.renderColorDashboard();
      });
      document.getElementById('btn-color-fb-wrong')?.addEventListener('click', () => {
        sound.playSell();
        const opposite = evaluation.suggestedColor === 'GREEN' ? 'RED' : 'GREEN';
        colorEngine.recordFeedback('NEXT', opposite, evaluation.suggestedColor, false);
        notifications.showToast({ title: 'Feedback Recorded', message: 'Marked as Wrong. Rolling accuracy updated.', type: 'error' });
        this.renderColorDashboard();
      });
      document.getElementById('btn-color-fb-skip-btn')?.addEventListener('click', () => {
        sound.playClick();
        colorEngine.recordFeedback('NEXT', 'SKIP', 'SKIP', true);
        notifications.showToast({ title: 'Skipped Round', message: 'Skipped round recorded without penalizing accuracy.', type: 'info' });
        this.renderColorDashboard();
      });
    }

    // 3. Update Ensemble Models Grid
    const mFreq = colorEngine.runFrequencyModel();
    const mStreak = colorEngine.runStreakModel();
    const mGap = colorEngine.runVioletGapModel();
    const mPattern = colorEngine.runPatternModel();

    const votes = [mFreq.vote, mStreak.vote, mGap.vote, mPattern.vote];
    const greenVotes = votes.filter((v) => v === 'GREEN').length;
    const redVotes = votes.filter((v) => v === 'RED').length;
    const violetVotes = votes.filter((v) => v === 'VIOLET').length;
    const maxVotes = Math.max(greenVotes, redVotes, violetVotes);

    const pillEl = document.getElementById('ensemble-agreement-pill');
    if (pillEl) {
      pillEl.textContent = `${maxVotes} of 4 Agree (${maxVotes >= 3 ? 'Strong' : (maxVotes === 2 ? 'Normal' : 'No Majority')})`;
      pillEl.className = maxVotes >= 3 ? 'special-tag tag-diamond' : (maxVotes === 2 ? 'special-tag' : 'special-tag tag-warning');
    }

    const setModelUI = (prefix, model) => {
      const voteEl = document.getElementById(`mod-${prefix}-vote`);
      const descEl = document.getElementById(`mod-${prefix}-desc`);
      if (voteEl) {
        voteEl.textContent = `${model.vote} (${model.confidence}%)`;
        voteEl.style.color = model.vote === 'GREEN' ? '#00E676' : (model.vote === 'RED' ? '#FF3D57' : (model.vote === 'VIOLET' ? '#C026D3' : '#F59E0B'));
      }
      if (descEl) descEl.textContent = model.reason;
    };

    setModelUI('freq', mFreq);
    setModelUI('streak', mStreak);
    setModelUI('gap', mGap);
    setModelUI('pattern', mPattern);

    // 4. Update Probability & Stats
    const gPct = document.getElementById('stat-green-pct');
    const rPct = document.getElementById('stat-red-pct');
    const vPct = document.getElementById('stat-violet-pct');
    const gCnt = document.getElementById('stat-green-count');
    const rCnt = document.getElementById('stat-red-count');
    const vCnt = document.getElementById('stat-violet-count');
    const barG = document.getElementById('stat-bar-green');
    const barR = document.getElementById('stat-bar-red');
    const barV = document.getElementById('stat-bar-violet');
    const streakEl = document.getElementById('stat-streak-display');
    const violetGapEl = document.getElementById('stat-violet-gap-display');
    const suggestionEl = document.getElementById('stat-suggestion-text');

    if (gPct) gPct.textContent = `${stats.greenPct}%`;
    if (rPct) rPct.textContent = `${stats.redPct}%`;
    if (vPct) vPct.textContent = `${stats.violetPct}%`;
    if (gCnt) gCnt.textContent = `${stats.green}`;
    if (rCnt) rCnt.textContent = `${stats.red}`;
    if (vCnt) vCnt.textContent = `${stats.violet}`;

    if (barG) barG.style.width = `${stats.greenPct}%`;
    if (barR) barR.style.width = `${stats.redPct}%`;
    if (barV) barV.style.width = `${stats.violetPct}%`;

    if (streakEl) {
      streakEl.textContent = `${stats.currentStreak.color} ${stats.currentStreak.count} in a row`;
      streakEl.style.color = stats.currentStreak.color === 'GREEN' ? '#00E676' : (stats.currentStreak.color === 'RED' ? '#FF3D57' : '#F59E0B');
    }

    if (violetGapEl) {
      violetGapEl.textContent = `${stats.violetGap} rounds since Violet`;
      violetGapEl.style.color = stats.violetGap >= 14 ? '#C026D3' : 'var(--color-gold)';
    }

    if (suggestionEl) {
      let suggestion = `Green frequency is ${stats.greenPct}% and Red is ${stats.redPct}% over last ${stats.total} rounds.`;
      if (stats.violetGap >= 12) {
        suggestion += ` Violet gap is unusually high (${stats.violetGap} rounds). Watch for sudden violet split.`;
      } else if (stats.currentStreak.count >= 3) {
        suggestion += ` ${stats.currentStreak.color} has a continuous streak of ${stats.currentStreak.count}.`;
      }
      suggestionEl.textContent = suggestion;
    }

    // 5. Update Timeline Circles
    const timelineCircles = document.getElementById('color-timeline-circles');
    if (timelineCircles) {
      timelineCircles.innerHTML = colorEngine.history.slice(0, 20).map((r) => `
        <div class="result-dot dot-${r.color.toLowerCase()}" title="Period: ${r.period} • ${r.color} ${r.number !== null ? '(' + r.number + ')' : ''} • ${r.time}">
          ${r.number !== null ? r.number : r.color[0]}
        </div>
      `).join('');
    }

    // 6. Update History List Table
    const historyList = document.getElementById('color-rounds-history-list');
    if (historyList) {
      const records = colorEngine.history.slice(0, this.colorHistoryLimit);
      if (records.length === 0) {
        historyList.innerHTML = `<div style="text-align: center; padding: 20px; color: var(--text-muted);">No rounds recorded yet. Use 'Record Round Result' above.</div>`;
      } else {
        historyList.innerHTML = records.map((r, i) => {
          const numMeta = r.number !== null ? NUMBER_MAP[r.number] : null;
          const badgeColor = r.color === 'GREEN' ? '#00E676' : (r.color === 'RED' ? '#FF3D57' : '#C026D3');
          return `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; border-bottom: 1px solid var(--border-subtle); background: ${i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent'};">
              <div>
                <span style="font-family: var(--font-mono); font-weight: 700; color: #FFFFFF;">${r.period}</span>
                <span style="color: var(--text-muted); font-size: 10px; margin-left: 8px;">${r.time || ''}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                ${numMeta ? `<span style="font-size: 10px; color: var(--text-secondary);">${numMeta.type} • ${numMeta.parity}</span>` : ''}
                <span style="display: inline-block; width: 22px; height: 22px; border-radius: 50%; background: ${badgeColor}; color: #FFFFFF; font-weight: 800; text-align: center; line-height: 22px; font-size: 10px;">
                  ${r.number !== null ? r.number : r.color[0]}
                </span>
                <span style="font-weight: 700; color: ${badgeColor}; width: 45px; text-align: right;">${r.color}</span>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // 7. Update Accuracy Cards
    const rollAccEl = document.getElementById('color-rolling-acc-val');
    const greenAccEl = document.getElementById('acc-green-val');
    const redAccEl = document.getElementById('acc-red-val');
    const violetAccEl = document.getElementById('acc-violet-val');
    const skippedAccEl = document.getElementById('acc-skipped-val');
    const sampleTag = document.getElementById('color-acc-sample-tag');

    if (rollAccEl) rollAccEl.textContent = `${rollingAcc.accuracy}%`;
    if (sampleTag) sampleTag.textContent = `${rollingAcc.correct} Wins / ${rollingAcc.wrong} Loss (${rollingAcc.total} calls)`;
    if (greenAccEl) greenAccEl.textContent = `${colorAcc.green.accuracy}% (${colorAcc.green.correct}/${colorAcc.green.total})`;
    if (redAccEl) redAccEl.textContent = `${colorAcc.red.accuracy}% (${colorAcc.red.correct}/${colorAcc.red.total})`;
    if (violetAccEl) violetAccEl.textContent = `${colorAcc.violet.accuracy}% (${colorAcc.violet.correct}/${colorAcc.violet.total})`;
    if (skippedAccEl) skippedAccEl.textContent = `${colorAcc.skippedTotal} Skips`;
  }

  renderAll() {
    this.renderPredictionsList();
    this.renderDeepPredictions();
    this.renderTrendingList();
    this.renderWatchlist();
    this.renderColorDashboard();
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(() => console.log('Service Worker Registered'))
          .catch((err) => console.warn('SW registration failed', err));
      });
    }
  }
}

// Instantiate and initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new GuruPredictApp();
  app.init();
});
