// Market Data Service - Unified Data Provider with Live Simulation & API Pluggability

export const INITIAL_ASSETS = [
  // CRYPTO
  {
    id: "btc-usdt",
    symbol: "BTC/USDT",
    name: "Bitcoin",
    category: "crypto",
    price: 96840.50,
    change24h: 3.42,
    high24h: 97890.00,
    low24h: 93450.00,
    volume24h: "38.4B",
    decimals: 2,
    unit: "$",
    sentiment: "sentimentGreed",
    volatility: 0.004,
    rsi: 68.4,
    macd: "Bullish Cross",
    lastUpdated: Date.now()
  },
  {
    id: "eth-usdt",
    symbol: "ETH/USDT",
    name: "Ethereum",
    category: "crypto",
    price: 3340.20,
    change24h: 2.15,
    high24h: 3410.00,
    low24h: 3260.00,
    volume24h: "19.2B",
    decimals: 2,
    unit: "$",
    sentiment: "sentimentBullish",
    volatility: 0.005,
    rsi: 62.1,
    macd: "Bullish Continuation",
    lastUpdated: Date.now()
  },
  {
    id: "sol-usdt",
    symbol: "SOL/USDT",
    name: "Solana",
    category: "crypto",
    price: 214.80,
    change24h: 6.85,
    high24h: 220.50,
    low24h: 198.20,
    volume24h: "7.8B",
    decimals: 2,
    unit: "$",
    sentiment: "sentimentGreed",
    volatility: 0.008,
    rsi: 74.2,
    macd: "Strong Uptrend",
    lastUpdated: Date.now()
  },
  {
    id: "xrp-usdt",
    symbol: "XRP/USDT",
    name: "Ripple",
    category: "crypto",
    price: 1.48,
    change24h: -1.24,
    high24h: 1.55,
    low24h: 1.42,
    volume24h: "4.1B",
    decimals: 4,
    unit: "$",
    sentiment: "sentimentNeutral",
    volatility: 0.006,
    rsi: 48.9,
    macd: "Consolidating",
    lastUpdated: Date.now()
  },

  // STOCKS
  {
    id: "nifty-50",
    symbol: "NIFTY 50",
    name: "Nifty 50 Index",
    category: "stocks",
    price: 25890.75,
    change24h: 0.85,
    high24h: 26010.00,
    low24h: 25740.00,
    volume24h: "14.2K Cr",
    decimals: 2,
    unit: "₹",
    sentiment: "sentimentBullish",
    volatility: 0.002,
    rsi: 59.3,
    macd: "Bullish Breakout",
    lastUpdated: Date.now()
  },
  {
    id: "reliance",
    symbol: "RELIANCE",
    name: "Reliance Industries",
    category: "stocks",
    price: 3120.40,
    change24h: 1.45,
    high24h: 3150.00,
    low24h: 3085.00,
    volume24h: "1.8K Cr",
    decimals: 2,
    unit: "₹",
    sentiment: "sentimentBullish",
    volatility: 0.003,
    rsi: 64.0,
    macd: "Accumulation",
    lastUpdated: Date.now()
  },
  {
    id: "tata-motors",
    symbol: "TATAMOTORS",
    name: "Tata Motors Ltd",
    category: "stocks",
    price: 948.60,
    change24h: -0.65,
    high24h: 962.00,
    low24h: 938.50,
    volume24h: "920 Cr",
    decimals: 2,
    unit: "₹",
    sentiment: "sentimentNeutral",
    volatility: 0.004,
    rsi: 47.1,
    macd: "Pullback",
    lastUpdated: Date.now()
  },
  {
    id: "aapl",
    symbol: "AAPL",
    name: "Apple Inc.",
    category: "stocks",
    price: 238.40,
    change24h: 1.12,
    high24h: 240.20,
    low24h: 235.80,
    volume24h: "8.6B",
    decimals: 2,
    unit: "$",
    sentiment: "sentimentBullish",
    volatility: 0.003,
    rsi: 61.5,
    macd: "Golden Cross",
    lastUpdated: Date.now()
  },
  {
    id: "nvda",
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    category: "stocks",
    price: 142.90,
    change24h: 4.28,
    high24h: 145.80,
    low24h: 137.40,
    volume24h: "24.5B",
    decimals: 2,
    unit: "$",
    sentiment: "sentimentGreed",
    volatility: 0.007,
    rsi: 71.8,
    macd: "Momentum Surge",
    lastUpdated: Date.now()
  },

  // FOREX
  {
    id: "eur-usd",
    symbol: "EUR/USD",
    name: "Euro / US Dollar",
    category: "forex",
    price: 1.0845,
    change24h: -0.22,
    high24h: 1.0890,
    low24h: 1.0820,
    volume24h: "142B",
    decimals: 4,
    unit: "",
    sentiment: "sentimentBearish",
    volatility: 0.001,
    rsi: 42.6,
    macd: "Bearish Channel",
    lastUpdated: Date.now()
  },
  {
    id: "usd-inr",
    symbol: "USD/INR",
    name: "US Dollar / Indian Rupee",
    category: "forex",
    price: 84.42,
    change24h: 0.08,
    high24h: 84.55,
    low24h: 84.32,
    volume24h: "28B",
    decimals: 2,
    unit: "₹",
    sentiment: "sentimentNeutral",
    volatility: 0.0005,
    rsi: 54.2,
    macd: "Tight Range",
    lastUpdated: Date.now()
  },
  {
    id: "gbp-usd",
    symbol: "GBP/USD",
    name: "British Pound / US Dollar",
    category: "forex",
    price: 1.2980,
    change24h: 0.35,
    high24h: 1.3025,
    low24h: 1.2940,
    volume24h: "86B",
    decimals: 4,
    unit: "",
    sentiment: "sentimentBullish",
    volatility: 0.0015,
    rsi: 58.7,
    macd: "Support Bounce",
    lastUpdated: Date.now()
  },

  // COMMODITIES
  {
    id: "gold",
    symbol: "XAU/USD",
    name: "Gold Spot",
    category: "commodities",
    price: 2748.60,
    change24h: 0.94,
    high24h: 2762.00,
    low24h: 2731.50,
    volume24h: "62B",
    decimals: 2,
    unit: "$",
    sentiment: "sentimentGreed",
    volatility: 0.003,
    rsi: 69.1,
    macd: "All-Time High Test",
    lastUpdated: Date.now()
  },
  {
    id: "silver",
    symbol: "XAG/USD",
    name: "Silver Spot",
    category: "commodities",
    price: 33.85,
    change24h: 2.45,
    high24h: 34.40,
    low24h: 32.90,
    volume24h: "18B",
    decimals: 2,
    unit: "$",
    sentiment: "sentimentGreed",
    volatility: 0.006,
    rsi: 66.8,
    macd: "Bullish Flag",
    lastUpdated: Date.now()
  },
  {
    id: "crude-oil",
    symbol: "WTI CRUDE",
    name: "Crude Oil WTI",
    category: "commodities",
    price: 71.40,
    change24h: -1.85,
    high24h: 73.10,
    low24h: 70.80,
    volume24h: "34B",
    decimals: 2,
    unit: "$",
    sentiment: "sentimentBearish",
    volatility: 0.005,
    rsi: 39.4,
    macd: "Distribution",
    lastUpdated: Date.now()
  }
];

class MarketDataService {
  constructor() {
    this.assets = JSON.parse(JSON.stringify(INITIAL_ASSETS));
    this.listeners = new Set();
    this.candleHistory = new Map();
    this.isLiveSimulationActive = true;
    this.isDemoMode = true; // Clearly indicates DEMO MODE when real API is disconnected
    this.initCandleData();
    this.startLiveTicks();
  }

  initCandleData() {
    this.assets.forEach(asset => {
      this.candleHistory.set(asset.id, this.generateHistoricalCandles(asset.price, 65, asset.volatility));
    });
  }

  isDemo() {
    return this.isDemoMode;
  }

  generateHistoricalCandles(basePrice, count, volatility) {
    const candles = [];
    let current = basePrice * (1 - (count * 0.002));
    const now = Date.now();
    const intervalMs = 15 * 60 * 1000; // 15m candles

    for (let i = count; i >= 0; i--) {
      const time = now - (i * intervalMs);
      const deltaPercent = (Math.random() - 0.48) * volatility * 3;
      const open = current;
      const close = current * (1 + deltaPercent);
      const high = Math.max(open, close) * (1 + Math.random() * volatility);
      const low = Math.min(open, close) * (1 - Math.random() * volatility);
      const volume = Math.floor(Math.random() * 50000 + 10000);

      candles.push({ time, open, high, low, close, volume });
      current = close;
    }
    return candles;
  }

  startLiveTicks() {
    // Background price jitter every 2 seconds
    setInterval(() => {
      if (!this.isLiveSimulationActive) return;
      this.simulateTickUpdate();
    }, 2000);
  }

  simulateTickUpdate() {
    const randomIndex = Math.floor(Math.random() * this.assets.length);
    const asset = this.assets[randomIndex];
    
    const jitter = (Math.random() - 0.49) * asset.volatility;
    const oldPrice = asset.price;
    asset.price = +(asset.price * (1 + jitter)).toFixed(asset.decimals);
    asset.change24h = +(asset.change24h + (jitter * 20)).toFixed(2);
    asset.lastUpdated = Date.now();
    asset.lastDirection = asset.price >= oldPrice ? 'up' : 'down';

    // Update candle
    const candles = this.candleHistory.get(asset.id);
    if (candles && candles.length > 0) {
      const lastCandle = candles[candles.length - 1];
      lastCandle.close = asset.price;
      if (asset.price > lastCandle.high) lastCandle.high = asset.price;
      if (asset.price < lastCandle.low) lastCandle.low = asset.price;
    }

    this.notify({ type: 'tick', asset, oldPrice });
  }

  getAllAssets() {
    return this.assets;
  }

  getAssetById(id) {
    return this.assets.find(a => a.id === id);
  }

  getByCategory(cat) {
    if (!cat || cat === 'all') return this.assets;
    return this.assets.filter(a => a.category === cat);
  }

  getCandles(assetId) {
    return this.candleHistory.get(assetId) || [];
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(event) {
    this.listeners.forEach(cb => {
      try { cb(event); } catch (e) { console.error('Market listener error:', e); }
    });
  }

  refreshAll() {
    this.assets.forEach(asset => {
      const jitter = (Math.random() - 0.48) * asset.volatility * 2;
      asset.price = +(asset.price * (1 + jitter)).toFixed(asset.decimals);
      asset.change24h = +(asset.change24h + (jitter * 10)).toFixed(2);
      asset.lastUpdated = Date.now();
    });
    this.notify({ type: 'refresh', assets: this.assets });
    return this.assets;
  }
}

export const marketData = new MarketDataService();
