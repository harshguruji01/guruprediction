# GuruPredict 📈⚡
> **Production-Ready Mobile Trading Prediction & Market Intelligence App**  
> **Brand & Developer:** Developed by **HarshGuruJi** (Harsh Patel)  
> **Official Website:** [www.webguruji.online](https://www.webguruji.online)  
> **Version:** 3.2.0 (Production Release)

---

## 🌟 App Overview

**GuruPredict** is an ultra-fast, modern mobile trading prediction and market probability platform rebuilt completely from scratch. It equips traders with real-time quantitative predictions across **Stocks, Crypto, Forex, and Commodities**, coupled with a revolutionary **Floating Overlay Mini-HUD ("Display Over Other Apps")**, full **TalkBack / Screen Reader accessibility** with **Voice Announcements in English and Hindi**, high-accuracy **Sniper Mode**, and professional financial calculators.

---

## 🚀 Key Features

### 1. Trading Prediction Dashboard
- **Live Market Predictions**: Real-time signals for **Stocks** (NIFTY 50, Reliance, Tata Motors, Apple, Nvidia), **Crypto** (Bitcoin, Ethereum, Solana, Ripple), **Forex** (EUR/USD, GBP/USD, USD/INR), and **Commodities** (Gold, Silver, WTI Crude Oil).
- **Directional Signals**: Distinct, color-coded **BUY 🟢**, **SELL 🔴**, and **HOLD 🟡** recommendations with confidence percentages (68% - 94%).
- **Multi-Level Targets & Stop-Loss**: Every prediction provides **Target 1 (TP1)**, **Target 2 Extended (TP2)**, **Stop-Loss (SL)**, and **Risk-to-Reward (R:R)** ratio.
- **Sniper Entry Mode**: One-tap toggle that filters exclusively for 82%+ high-conviction, low-entropy trades.
- **Confluence Badges**: Glowing `💎 DIAMOND CONFLUENCE SIGNAL` and `🚨 CROWD TRAP DETECTED` manipulation alerts.
- **Auto-Refresh Loop**: Dynamic 10-second auto-refresh timer with manual refresh override.

### 2. Floating Overlay HUD ("Display Over Other Apps")
- Replicates Android's native `SYSTEM_ALERT_WINDOW` floating widget:
  - **Collapsed Bubble Mode**: Compact, glowing 56px circular floating bubble with neon pulse ring and live prediction percentage (e.g. `BUY 88%`). Draggable across the entire screen with magnetic edge snapping.
  - **Expanded Mini-HUD Window**: Draggable, resizable (Compact / Standard / Wide), minimizable glassmorphic card showing active asset price, target, stop-loss, and `⚡ Scan Now` micro-controls.
  - **Picture-in-Picture (PiP) Window**: Uses the Document Picture-in-Picture API to float outside the browser tab over any desktop or mobile charting app (TradingView, Zerodha, Binance, AngelOne).

### 3. Screen Reader & TalkBack Accessibility
- **WCAG AAA Compliance**: High contrast ratios, accessible focus indicators, and semantic HTML5 landmarks (`role="region"`, `role="alert"`, `aria-live="polite"`).
- **Dual-Language Voice Announcements (Web Speech API)**: Speaks new trading signals aloud in **English** and **Hindi (हिन्दी)** with customizable speech speed.
- **Visual Accessibility**: Built-in toggles for **High Contrast Mode** (true black `#000000` with high-luminance borders) and **Large Text Mode** (+15% font scaling).

### 4. Dual Language Support (English + हिन्दी)
- Instant one-tap language switching in the header (`header-lang-btn`).
- Complete localization across all navigation tabs, metrics, directions, disclaimers, and voice speech prompts.

### 5. Trending Trades & Market Sentiment
- Top market movers ranked by **Top Gainers**, **Top Losers**, **Highest Volume**, and **High Confidence**.
- Real-time search filter for instantly finding any ticker or company name.
- Sentiment indicators: Strong Bullish, Bearish Bias, Extreme Greed, and Neutral Consolidation.

### 6. Trading Tools & Financial Calculators
- **Interactive Candlestick Chart**: HTML5 Canvas chart with multi-timeframe intervals (1M, 5M, 15M, 1H, 1D), EMA 20 trend line, volume histogram, and hover crosshair inspection.
- **Personalized Watchlist**: Star/unstar favorite assets with persistent local storage.
- **Price Alerts Manager**: Set price breach alerts (`Above >=` or `Below <=`) with audible notifications.
- **Profit / Loss Calculator**: Calculate estimated net profit/loss, ROI %, and pip move for Long and Short positions with leverage multiplier (1x - 100x).
- **Risk Management Calculator**: Compute exact position sizing and maximum capital risk based on account balance, risk percentage, entry price, and stop loss.
- **Accuracy Tracker**: Rolling 30-day win-rate analytics (81.4%), winning streak counter, and recent signal performance history.
- **Curated Market News Feed**: Live financial headlines categorized with Bullish/Bearish sentiment badges.

### 7. Color Round Tracker & 50% Target Trend Engine (Green, Red, Violet)
- **Manual Round Input**: Record results as **GREEN**, **RED**, or **VIOLET** with drawn numbers (0-9). Automatically labels Big/Small (5-9 / 0-4) and Odd/Even parity.
- **Smart Probability Dashboard**: Frequency distribution % across last 20, 50, and 100 rounds. Displays color streaks (e.g. "Red appeared 4 times in a row") and Violet gap counters.
- **4-Model Ensemble Engine**:
  1. *Frequency Model*: Weights dominant recent color distributions.
  2. *Streak Model*: Evaluates mean reversal vs momentum continuation for streaks of 3+.
  3. *Violet Gap Model*: High-alert watch mode when Violet has not appeared for extended rounds.
  4. *Pattern Model*: Zig-zag alternating (G-R-G-R), double pairs (G-G-R-R), and mirror sequences.
- **Advanced Skip Round Mode**:
  - Signal Score (0 to 100).
  - Decision rules: 70-100 = Strong, 55-69 = Normal, 40-54 = Weak/Skip, <40 = ALWAYS SKIP.
  - Less than 20 rounds of data or models disagreeing automatically triggers **SKIP ROUND**.
  - Confidence is strictly capped at **65% maximum**.
  - Four customizable safety profiles: **Aggressive**, **Balanced**, **Safe**, and **Manual Threshold**.
  - Auto-throttle: If rolling accuracy drops below 50%, skipping is automatically increased.
- **Personal Accuracy Tracking**: Dedicated feedback buttons (`[Correct]`, `[Wrong]`, `[Skip Followed]`) with rolling statistics.
- **Responsible Play Safeguards**: Session timer, round counter, and break reminders.

### 8. Audio & Haptic Feedback
- Synthesized Web Audio API sound effects for **Buy Signal Arpeggios**, **Sell Signal Tones**, and **Alert Chimes** without requiring external audio assets.
- Mobile vibration feedback via `navigator.vibrate`.

### 9. PWA & Android APK Installation
- **Android APK**: Native debug build generated and renamed directly to `GuruPredict.apk` in the workspace root.
- **Mobile-first & Multi-device responsive**: 100% responsive across mobile Android devices, tablets, and desktop browsers.
- PWA manifest (`public/manifest.json`) and service worker (`public/sw.js`) enabling standalone installation on Android devices ("Add to Home Screen").

---

## ⚖️ Important Risk & Compliance Disclaimer

> **DISCLAIMER:** GuruPredict is built exclusively for educational, analytical, and informational simulation purposes. Financial trading involves substantial risk of loss. Predictions are generated algorithmically using mathematical pattern recognition and historical volatility. They do not constitute financial advice, nor do they guarantee profits. HarshGuruJi and GuruPredict are not SEBI or FINRA registered financial advisors.

---

## 🛠️ Project Structure

```
GuruPredict/
├── index.html                   # Mobile-responsive app shell & semantic views
├── logo.png                     # Official high-resolution brand logo
├── package.json                 # Project configuration & Vite build scripts
├── public/
│   ├── favicon.png              # App icon
│   ├── logo.png                 # PWA logo asset
│   ├── manifest.json            # PWA Android installable manifest
│   └── sw.js                    # Service worker for offline caching & notifications
└── src/
    ├── main.js                  # Central application orchestrator & router
    ├── components/
    │   ├── calculators.js       # P/L & Risk position sizing financial logic
    │   ├── candlestickChart.js  # High-performance Canvas candlestick & volume chart
    │   └── floatingOverlay.js   # Draggable Floating HUD ("Display Over Other Apps")
    ├── services/
    │   ├── i18n.js              # English & Hindi translation dictionary
    │   ├── marketData.js        # Market data provider & realistic simulation ticks
    │   ├── notificationService.js # Toast notifications & Web Push triggers
    │   ├── predictionEngine.js  # Quantitative probability engine & sub-models
    │   ├── soundService.js      # Web Audio synthesizer & haptic vibration
    │   ├── speechService.js     # Web Speech TTS for English & Hindi TalkBack
    │   └── storageService.js    # Persistent localStorage preferences & watchlist
    └── styles/
        ├── accessibility.css    # High contrast, large text & TalkBack styles
        ├── components.css       # Prediction cards, trending chips, calculators
        ├── main.css             # Header, bottom navigation, splash screen, layout
        ├── overlay.css          # Floating HUD window & draggable bubble styles
        └── variables.css        # Dark/light theme design tokens & neon colors
```

---

## 🚀 Running & Building the App

### Prerequisites
- Node.js (v18+ recommended, v24 verified)
- npm (v9+ recommended, v11 verified)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your mobile or desktop browser.

### 3. Build Production Bundle
```bash
npm run build
```
Generates a minified, production-ready bundle in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🔌 Customizing with Real Live Market APIs

The codebase uses a clean provider architecture in `src/services/marketData.js`. To connect real market data feeds:

1. **Crypto (Binance WebSocket / CoinGecko)**:
   In `src/services/marketData.js`, connect a live WebSocket:
   ```javascript
   const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
   ws.onmessage = (event) => {
     const data = JSON.parse(event.data);
     this.updateAssetPrice('btc-usdt', parseFloat(data.c));
   };
   ```

2. **Stocks & Forex (Finnhub / AlphaVantage / Yahoo Finance)**:
   Store your API key in environment variables (e.g., `VITE_FINNHUB_KEY`) and fetch quotes in `marketData.js`:
   ```javascript
   const apiKey = import.meta.env.VITE_FINNHUB_KEY;
   const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${apiKey}`);
   ```

---

## 📱 Android App Packaging

To distribute GuruPredict as a native Android APK:
1. **Capacitor (Recommended)**:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init GuruPredict com.harshguruji.gurupredict
   npm run build
   npx cap add android
   npx cap open android
   ```
2. In Android Studio, build the signed APK or launch directly on any connected Android device or emulator.
3. For "Display over other apps" in native Android, ensure `<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />` is declared in `android/app/src/main/AndroidManifest.xml`.

---

## 👨‍💻 Developer & Credits
- **Application Name**: GuruPredict
- **Lead Architect & Developer**: **HarshGuruJi** (Harsh Patel)
- **Official Portal**: [www.webguruji.online](https://www.webguruji.online)
