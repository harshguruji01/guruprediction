// Floating Overlay Component ("Display Over Other Apps")
import { predictionEngine } from '../services/predictionEngine.js';
import { marketData } from '../services/marketData.js';
import { sound } from '../services/soundService.js';
import { speech } from '../services/speechService.js';
import { t } from '../services/i18n.js';

export class FloatingOverlayManager {
  constructor() {
    this.container = null;
    this.isExpanded = false;
    this.isActive = false;
    this.isAutoScan = true;
    this.scanInterval = null;
    this.activePrediction = null;
    this.sizeState = 'standard'; // 'compact', 'standard', 'wide'
    this.pipWindow = null;

    // Position coordinates
    this.posX = window.innerWidth - 80;
    this.posY = 120;
    this.isDragging = false;
    this.dragOffset = { x: 0, y: 0 };
  }

  init() {
    this.createDOM();
    this.bindEvents();
    this.updateActiveSignal();
  }

  createDOM() {
    const existing = document.getElementById('gp-floating-overlay-root');
    if (existing) existing.remove();

    this.container = document.createElement('div');
    this.container.id = 'gp-floating-overlay-root';
    this.container.className = 'gp-overlay-root gp-overlay-hidden';
    this.container.setAttribute('role', 'region');
    this.container.setAttribute('aria-label', 'Floating Prediction Overlay');

    this.container.innerHTML = `
      <!-- COLLAPSED BUBBLE MODE -->
      <div id="gp-overlay-bubble" class="gp-overlay-bubble" role="button" tabindex="0" aria-label="Expand GuruPredict Floating HUD" title="Tap to expand GuruPredict HUD">
        <div class="gp-bubble-ring"></div>
        <img src="/logo.png" alt="" class="gp-bubble-icon" />
        <div class="gp-bubble-badge" id="gp-bubble-badge">BUY 86%</div>
      </div>

      <!-- EXPANDED MINI-HUD WINDOW -->
      <div id="gp-overlay-hud" class="gp-overlay-hud gp-hud-standard">
        <!-- DRAG HEADER -->
        <div class="gp-hud-header" id="gp-hud-drag-handle">
          <div class="gp-hud-brand">
            <img src="/logo.png" alt="Logo" class="gp-hud-logo" />
            <div class="gp-hud-title-col">
              <span class="gp-hud-app-name">GuruPredict</span>
              <span class="gp-hud-author">HarshGuruJi</span>
            </div>
          </div>
          <div class="gp-hud-actions">
            <button class="gp-hud-btn" id="gp-hud-pip-btn" title="Pop-out Picture-in-Picture window over other apps" aria-label="Pop-out Floating Window">⧉</button>
            <button class="gp-hud-btn" id="gp-hud-size-btn" title="Toggle Size" aria-label="Resize HUD">⤢</button>
            <button class="gp-hud-btn" id="gp-hud-min-btn" title="Minimize to Bubble" aria-label="Minimize HUD">_</button>
            <button class="gp-hud-btn gp-hud-close" id="gp-hud-close-btn" title="Close Overlay" aria-label="Close Overlay">✕</button>
          </div>
        </div>

        <!-- STATUS STRIP -->
        <div class="gp-hud-strip">
          <div class="gp-hud-status-item">
            <span class="demo-card-tag" style="font-size: 8px; padding: 1px 4px;">DEMO MODE</span>
            <span class="gp-hud-dot" id="gp-hud-status-dot"></span>
            <span id="gp-hud-scan-label">Auto-Scan: ACTIVE</span>
          </div>
          <div class="gp-hud-status-item">
            <span class="gp-hud-timer" id="gp-hud-timer">Next: 04s</span>
          </div>
        </div>

        <!-- PREDICTION DISPLAY CARD -->
        <div class="gp-hud-card" id="gp-hud-card">
          <div class="gp-hud-card-top">
            <div style="display: flex; flex-direction: column;">
              <span class="gp-hud-symbol" id="gp-hud-symbol">BTC/USDT</span>
              <span id="gp-hud-timeframe" style="font-size: 9px; color: #38BDF8; font-weight: 700;">Short term</span>
            </div>
            <div class="gp-hud-dir-badge gp-dir-buy" id="gp-hud-dir">BUY 88%</div>
          </div>
          <div class="gp-hud-metrics">
            <div class="gp-hud-metric">
              <span class="gp-hud-label">Entry:</span>
              <span class="gp-hud-val" id="gp-hud-entry" style="color: #38BDF8;">$96,800.00</span>
            </div>
            <div class="gp-hud-metric">
              <span class="gp-hud-label">Target:</span>
              <span class="gp-hud-val gp-text-up" id="gp-hud-target">$98,400.00</span>
            </div>
            <div class="gp-hud-metric">
              <span class="gp-hud-label">Stop-Loss:</span>
              <span class="gp-hud-val gp-text-down" id="gp-hud-sl">$95,200.00</span>
            </div>
          </div>
          <div id="gp-hud-indicators" style="font-size: 8.5px; font-family: var(--font-mono); color: var(--text-secondary); margin-bottom: 4px;">
            RSI: 62.4 • MACD: Bullish • Vol: 1.4x
          </div>
          <div class="gp-hud-sniper-badge" id="gp-hud-sniper">💎 DIAMOND CONFLUENCE SIGNAL</div>
          <div style="font-size: 7.5px; color: var(--color-gold); margin-top: 4px; text-align: center; opacity: 0.85;">
            GuruPredict predictions are educational only. Trading involves risk. Not financial advice.
          </div>
        </div>

        <!-- QUICK CONTROLS -->
        <div class="gp-hud-controls">
          <button class="gp-hud-ctl-btn" id="gp-hud-scan-now" aria-label="Scan next signal">⚡ Scan Now</button>
          <button class="gp-hud-ctl-btn" id="gp-hud-voice-btn" aria-label="Speak prediction aloud">🔊 Speak</button>
          <button class="gp-hud-ctl-btn gp-ctl-toggle" id="gp-hud-auto-toggle" aria-label="Toggle Auto-Scan">Auto: ON</button>
        </div>

        <!-- FOOTER WATERMARK -->
        <div class="gp-hud-footer">
          <span>Developed by HarshGuruJi • www.webguruji.online</span>
        </div>
      </div>
    `;

    document.body.appendChild(this.container);
  }

  bindEvents() {
    const bubble = document.getElementById('gp-overlay-bubble');
    const hud = document.getElementById('gp-overlay-hud');
    const handle = document.getElementById('gp-hud-drag-handle');
    const minBtn = document.getElementById('gp-hud-min-btn');
    const closeBtn = document.getElementById('gp-hud-close-btn');
    const sizeBtn = document.getElementById('gp-hud-size-btn');
    const pipBtn = document.getElementById('gp-hud-pip-btn');
    const scanNowBtn = document.getElementById('gp-hud-scan-now');
    const voiceBtn = document.getElementById('gp-hud-voice-btn');
    const autoToggleBtn = document.getElementById('gp-hud-auto-toggle');

    // Bubble click -> expand
    bubble.addEventListener('click', () => {
      sound.playClick();
      this.expand();
    });

    // Min button -> collapse
    minBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playClick();
      this.collapse();
    });

    // Close button
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playClick();
      this.hide();
    });

    // Resize button
    sizeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playClick();
      this.toggleSize();
    });

    // PiP Pop-out
    pipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.launchPictureInPicture();
    });

    // Scan now
    scanNowBtn.addEventListener('click', () => {
      sound.playClick();
      this.scanNext();
    });

    // Voice button
    voiceBtn.addEventListener('click', () => {
      if (this.activePrediction) {
        speech.speakSignal(this.activePrediction);
      }
    });

    // Auto toggle
    autoToggleBtn.addEventListener('click', () => {
      sound.playClick();
      this.isAutoScan = !this.isAutoScan;
      autoToggleBtn.textContent = `Auto: ${this.isAutoScan ? 'ON' : 'OFF'}`;
      document.getElementById('gp-hud-scan-label').textContent = `Auto-Scan: ${this.isAutoScan ? 'ACTIVE' : 'PAUSED'}`;
      document.getElementById('gp-hud-status-dot').style.background = this.isAutoScan ? '#00E676' : '#FFB300';
    });

    // Draggable Bubble
    this.makeDraggable(bubble, bubble);
    // Draggable HUD by handle
    this.makeDraggable(hud, handle);

    // Initial position
    this.clampPosition();
  }

  makeDraggable(element, handle) {
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;
    let hasMoved = false;

    const onStart = (clientX, clientY) => {
      this.isDragging = true;
      hasMoved = false;
      startX = clientX;
      startY = clientY;
      const rect = element.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;
      element.classList.add('gp-dragging');
    };

    const onMove = (clientX, clientY) => {
      if (!this.isDragging) return;
      const dx = clientX - startX;
      const dy = clientY - startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMoved = true;
      }
      let newX = initialLeft + dx;
      let newY = initialTop + dy;

      // Clamp to screen bounds
      const elWidth = element.offsetWidth;
      const elHeight = element.offsetHeight;
      newX = Math.max(10, Math.min(window.innerWidth - elWidth - 10, newX));
      newY = Math.max(10, Math.min(window.innerHeight - elHeight - 10, newY));

      element.style.left = `${newX}px`;
      element.style.top = `${newY}px`;
      element.style.right = 'auto';
      element.style.bottom = 'auto';

      this.posX = newX;
      this.posY = newY;
    };

    const onEnd = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      element.classList.remove('gp-dragging');

      // Dock to nearest edge if in bubble mode
      if (element.id === 'gp-overlay-bubble') {
        const midX = window.innerWidth / 2;
        const targetX = this.posX < midX ? 15 : window.innerWidth - element.offsetWidth - 15;
        element.style.transition = 'left 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
        element.style.left = `${targetX}px`;
        this.posX = targetX;
        setTimeout(() => { element.style.transition = ''; }, 300);
      }
    };

    // Mouse
    handle.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'BUTTON') return;
      onStart(e.clientX, e.clientY);
      const moveHandler = (ev) => onMove(ev.clientX, ev.clientY);
      const upHandler = () => {
        window.removeEventListener('mousemove', moveHandler);
        window.removeEventListener('mouseup', upHandler);
        onEnd();
      };
      window.addEventListener('mousemove', moveHandler);
      window.addEventListener('mouseup', upHandler);
    });

    // Touch
    handle.addEventListener('touchstart', (e) => {
      if (e.target.tagName === 'BUTTON') return;
      if (e.touches.length > 0) {
        onStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length > 0) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (this.isDragging) onEnd();
    });
  }

  clampPosition() {
    const bubble = document.getElementById('gp-overlay-bubble');
    const hud = document.getElementById('gp-overlay-hud');
    const targetX = Math.max(10, Math.min(window.innerWidth - 75, this.posX));
    const targetY = Math.max(20, Math.min(window.innerHeight - 80, this.posY));

    if (bubble) {
      bubble.style.left = `${targetX}px`;
      bubble.style.top = `${targetY}px`;
    }
    if (hud) {
      const hudX = Math.max(10, Math.min(window.innerWidth - 320, this.posX - 120));
      const hudY = Math.max(20, Math.min(window.innerHeight - 280, this.posY));
      hud.style.left = `${hudX}px`;
      hud.style.top = `${hudY}px`;
    }
  }

  show() {
    this.isActive = true;
    this.container.classList.remove('gp-overlay-hidden');
    this.collapse();
    this.startAutoScanLoop();
  }

  hide() {
    this.isActive = false;
    this.container.classList.add('gp-overlay-hidden');
    if (this.scanInterval) clearInterval(this.scanInterval);
  }

  expand() {
    this.isExpanded = true;
    const bubble = document.getElementById('gp-overlay-bubble');
    const hud = document.getElementById('gp-overlay-hud');
    bubble.classList.add('gp-hidden');
    hud.classList.add('gp-visible');
    this.clampPosition();
  }

  collapse() {
    this.isExpanded = false;
    const bubble = document.getElementById('gp-overlay-bubble');
    const hud = document.getElementById('gp-overlay-hud');
    bubble.classList.remove('gp-hidden');
    hud.classList.remove('gp-visible');
    this.clampPosition();
  }

  toggleSize() {
    const hud = document.getElementById('gp-overlay-hud');
    if (this.sizeState === 'standard') {
      this.sizeState = 'compact';
      hud.classList.remove('gp-hud-standard', 'gp-hud-wide');
      hud.classList.add('gp-hud-compact');
    } else if (this.sizeState === 'compact') {
      this.sizeState = 'wide';
      hud.classList.remove('gp-hud-standard', 'gp-hud-compact');
      hud.classList.add('gp-hud-wide');
    } else {
      this.sizeState = 'standard';
      hud.classList.remove('gp-hud-compact', 'gp-hud-wide');
      hud.classList.add('gp-hud-standard');
    }
    this.clampPosition();
  }

  startAutoScanLoop() {
    if (this.scanInterval) clearInterval(this.scanInterval);
    let secondsLeft = 5;

    this.scanInterval = setInterval(() => {
      if (!this.isActive || !this.isAutoScan) return;
      secondsLeft--;
      const timerEl = document.getElementById('gp-hud-timer');
      if (timerEl) timerEl.textContent = `Next: 0${secondsLeft}s`;

      if (secondsLeft <= 0) {
        secondsLeft = 5;
        this.scanNext();
      }
    }, 1000);
  }

  scanNext() {
    const assets = marketData.getAllAssets();
    const randomAsset = assets[Math.floor(Math.random() * assets.length)];
    this.activePrediction = predictionEngine.generatePrediction(randomAsset);
    this.renderPrediction();
  }

  updateActiveSignal() {
    const assets = marketData.getAllAssets();
    if (assets.length > 0) {
      this.activePrediction = predictionEngine.generatePrediction(assets[0]);
      this.renderPrediction();
    }
  }

  renderPrediction() {
    if (!this.activePrediction) return;
    const p = this.activePrediction;

    // Update Bubble badge
    const bubbleBadge = document.getElementById('gp-bubble-badge');
    const bubble = document.getElementById('gp-overlay-bubble');
    if (bubbleBadge && bubble) {
      bubbleBadge.textContent = `${p.direction} ${p.confidence}%`;
      bubble.className = `gp-overlay-bubble gp-bubble-${p.direction.toLowerCase()}`;
    }

    // Update HUD card
    const symbolEl = document.getElementById('gp-hud-symbol');
    const dirEl = document.getElementById('gp-hud-dir');
    const entryEl = document.getElementById('gp-hud-entry');
    const targetEl = document.getElementById('gp-hud-target');
    const slEl = document.getElementById('gp-hud-sl');
    const timeframeEl = document.getElementById('gp-hud-timeframe');
    const indicatorsEl = document.getElementById('gp-hud-indicators');
    const sniperEl = document.getElementById('gp-hud-sniper');

    if (symbolEl) symbolEl.textContent = p.symbol;
    if (dirEl) {
      dirEl.textContent = `${p.direction} ${p.confidence}%`;
      dirEl.className = `gp-hud-dir-badge gp-dir-${p.direction.toLowerCase()}`;
    }
    if (entryEl) entryEl.textContent = `${p.unit}${p.entryPrice.toLocaleString()}`;
    if (targetEl) targetEl.textContent = `${p.unit}${p.target1.toLocaleString()}`;
    if (slEl) slEl.textContent = `${p.unit}${p.stopLoss.toLocaleString()}`;
    if (timeframeEl) timeframeEl.textContent = `${p.timeframeCategory}`;
    if (indicatorsEl && p.indicators) {
      indicatorsEl.textContent = `RSI: ${p.indicators.rsi} • MACD: ${p.indicators.macdStatus} • Vol: ${p.indicators.volumeRatio}x`;
    }

    if (sniperEl) {
      if (p.isDiamond) {
        sniperEl.textContent = '💎 DIAMOND CONFLUENCE SIGNAL';
        sniperEl.style.display = 'block';
      } else if (p.isCrowdTrap) {
        sniperEl.textContent = '🚨 CROWD TRAP DETECTED - REVERSAL';
        sniperEl.style.display = 'block';
      } else {
        sniperEl.style.display = 'none';
      }
    }
  }

  async launchPictureInPicture() {
    // Check if Document Picture-in-Picture API is supported
    if ('documentPictureInPicture' in window) {
      try {
        const pipWindow = await window.documentPictureInPicture.requestWindow({
          width: 320,
          height: 260
        });

        // Copy styles
        [...document.styleSheets].forEach((styleSheet) => {
          try {
            const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
            const style = document.createElement('style');
            style.textContent = cssRules;
            pipWindow.document.head.appendChild(style);
          } catch (e) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = styleSheet.type;
            link.media = styleSheet.media;
            link.href = styleSheet.href;
            pipWindow.document.head.appendChild(link);
          }
        });

        // Add HUD inside PiP
        const hudClone = document.getElementById('gp-overlay-hud').cloneNode(true);
        hudClone.style.position = 'static';
        hudClone.style.width = '100%';
        hudClone.style.height = '100%';
        hudClone.style.display = 'flex';
        pipWindow.document.body.style.margin = '0';
        pipWindow.document.body.style.background = '#0B0E14';
        pipWindow.document.body.appendChild(hudClone);

        this.pipWindow = pipWindow;
        this.collapse();
      } catch (err) {
        console.warn('Document PiP not granted or cancelled:', err);
      }
    } else {
      // Document PiP not supported natively - in-app draggable overlay is already active!
      speech.speakText("Floating overlay is active on your screen. You can drag it anywhere.");
    }
  }
}

export const floatingOverlay = new FloatingOverlayManager();
