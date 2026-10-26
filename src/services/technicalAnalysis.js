// Technical Indicators & AI Prediction Calculation Engine
// Computes RSI, MACD, Moving Averages (EMA 20/50), Bollinger Bands, Volume Analysis, Support/Resistance, and Trend Strength

export function calculateSMA(data, period) {
  if (!data || data.length < period) return data ? data[data.length - 1] : 0;
  const slice = data.slice(-period);
  const sum = slice.reduce((acc, val) => acc + val, 0);
  return +(sum / period).toFixed(4);
}

export function calculateEMA(data, period) {
  if (!data || data.length < period) return data ? data[data.length - 1] : 0;
  const k = 2 / (period + 1);
  let ema = data[0];
  for (let i = 1; i < data.length; i++) {
    ema = (data[i] * k) + (ema * (1 - k));
  }
  return +ema.toFixed(4);
}

export function calculateRSI(closes, period = 14) {
  if (!closes || closes.length < period + 1) return 50.0;

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) gains += diff;
    else losses += Math.abs(diff);
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  for (let i = period + 1; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) {
      avgGain = (avgGain * (period - 1) + diff) / period;
      avgLoss = (avgLoss * (period - 1)) / period;
    } else {
      avgGain = (avgGain * (period - 1)) / period;
      avgLoss = (avgLoss * (period - 1) + Math.abs(diff)) / period;
    }
  }

  if (avgLoss === 0) return 100.0;
  const rs = avgGain / avgLoss;
  const rsi = 100 - (100 / (1 + rs));
  return +rsi.toFixed(1);
}

export function calculateMACD(closes) {
  if (!closes || closes.length < 26) {
    return { macd: 0, signal: 0, histogram: 0, status: "Neutral" };
  }

  // Calculate series of 12 EMA and 26 EMA to get MACD line history
  const macdSeries = [];
  const k12 = 2 / (12 + 1);
  const k26 = 2 / (26 + 1);
  let ema12 = closes[0];
  let ema26 = closes[0];

  for (let i = 0; i < closes.length; i++) {
    ema12 = (closes[i] * k12) + (ema12 * (1 - k12));
    ema26 = (closes[i] * k26) + (ema26 * (1 - k26));
    if (i >= 25) {
      macdSeries.push(ema12 - ema26);
    }
  }

  const currentMacd = macdSeries[macdSeries.length - 1] || 0;
  const signal = calculateEMA(macdSeries, 9);
  const histogram = +(currentMacd - signal).toFixed(4);

  let status = "Neutral";
  if (histogram > 0 && currentMacd > signal) {
    status = "Bullish Crossover";
  } else if (histogram < 0 && currentMacd < signal) {
    status = "Bearish Crossover";
  }

  return {
    macd: +currentMacd.toFixed(4),
    signal: +signal.toFixed(4),
    histogram,
    status
  };
}

export function calculateBollingerBands(closes, period = 20, multiplier = 2) {
  if (!closes || closes.length < period) {
    const p = closes && closes.length > 0 ? closes[closes.length - 1] : 0;
    return { middle: p, upper: p * 1.02, lower: p * 0.98, bandwidth: 4.0, status: "Normal" };
  }

  const slice = closes.slice(-period);
  const middle = calculateSMA(slice, period);

  // Standard deviation
  const variance = slice.reduce((acc, val) => acc + Math.pow(val - middle, 2), 0) / period;
  const stdDev = Math.sqrt(variance);

  const upper = +(middle + (multiplier * stdDev)).toFixed(4);
  const lower = +(middle - (multiplier * stdDev)).toFixed(4);
  const bandwidth = +(((upper - lower) / middle) * 100).toFixed(2);

  const currentPrice = closes[closes.length - 1];
  let status = "Within Bands";
  if (currentPrice >= upper * 0.995) status = "Upper Band Rejection / Overbought";
  else if (currentPrice <= lower * 1.005) status = "Lower Band Support / Oversold";
  else if (bandwidth < 2.5) status = "Bollinger Squeeze (Breakout Imminent)";

  return {
    middle,
    upper,
    lower,
    bandwidth,
    status
  };
}

export function calculateVolumeAnalysis(candles, period = 20) {
  if (!candles || candles.length < 5) {
    return { volumeRatio: 1.0, isSurge: false, status: "Average Volume" };
  }

  const volumes = candles.map(c => c.volume);
  const recentVolumes = volumes.slice(-period);
  const avgVolume = recentVolumes.reduce((acc, v) => acc + v, 0) / recentVolumes.length;
  const currentVolume = volumes[volumes.length - 1];

  const volumeRatio = +(currentVolume / (avgVolume || 1)).toFixed(2);
  const isSurge = volumeRatio >= 1.4;

  const lastCandle = candles[candles.length - 1];
  const isBullishCandle = lastCandle.close >= lastCandle.open;

  let status = "Normal Volume";
  if (isSurge && isBullishCandle) status = "High Volume Buying (Institutional Inflow)";
  else if (isSurge && !isBullishCandle) status = "High Volume Selling (Distribution)";
  else if (volumeRatio < 0.7) status = "Low Volume Consolidation";

  return {
    currentVolume,
    avgVolume: Math.round(avgVolume),
    volumeRatio,
    isSurge,
    status
  };
}

export function calculateSupportResistance(candles) {
  if (!candles || candles.length === 0) {
    return { pivot: 0, r1: 0, r2: 0, s1: 0, s2: 0, swingHigh: 0, swingLow: 0 };
  }

  const recent = candles.slice(-20);
  let highest = -Infinity;
  let lowest = Infinity;

  recent.forEach(c => {
    if (c.high > highest) highest = c.high;
    if (c.low < lowest) lowest = c.low;
  });

  const last = candles[candles.length - 1];
  const high = last.high;
  const low = last.low;
  const close = last.close;

  // Classic Standard Pivot Points
  const pivot = +((high + low + close) / 3).toFixed(4);
  const r1 = +((2 * pivot) - low).toFixed(4);
  const s1 = +((2 * pivot) - high).toFixed(4);
  const r2 = +(pivot + (high - low)).toFixed(4);
  const s2 = +(pivot - (high - low)).toFixed(4);

  return {
    pivot,
    r1,
    r2,
    s1,
    s2,
    swingHigh: +highest.toFixed(4),
    swingLow: +lowest.toFixed(4)
  };
}

export function calculateTrendStrength(candles) {
  if (!candles || candles.length < 20) {
    return { trend: "Neutral", strengthScore: 50, ema20: 0, ema50: 0 };
  }

  const closes = candles.map(c => c.close);
  const ema20 = calculateEMA(closes, 20);
  const ema50 = calculateEMA(closes, Math.min(50, closes.length));
  const currentPrice = closes[closes.length - 1];

  let trend = "Range Bound";
  let strengthScore = 50;

  if (currentPrice > ema20 && ema20 > ema50) {
    trend = "Strong Uptrend";
    strengthScore = 85;
  } else if (currentPrice > ema20) {
    trend = "Moderate Uptrend";
    strengthScore = 68;
  } else if (currentPrice < ema20 && ema20 < ema50) {
    trend = "Strong Downtrend";
    strengthScore = 85;
  } else if (currentPrice < ema20) {
    trend = "Moderate Downtrend";
    strengthScore = 68;
  }

  return {
    trend,
    strengthScore,
    ema20,
    ema50
  };
}

/**
 * AI Multi-Factor Confluence Evaluator
 * Evaluates 7 technical systems to generate signal, confidence (0-100), targets, stop-loss, and bilingual explanations
 */
export function generateAIPrediction(asset, candles) {
  const closes = candles.map(c => c.close);
  const currentPrice = asset.price;
  const decimals = asset.decimals || 2;

  // 1. Calculate all technical indicators
  const rsi = calculateRSI(closes, 14);
  const macd = calculateMACD(closes);
  const bb = calculateBollingerBands(closes, 20, 2);
  const volume = calculateVolumeAnalysis(candles, 20);
  const sr = calculateSupportResistance(candles);
  const trend = calculateTrendStrength(candles);

  // 2. Multi-Factor Scoring
  let score = 0; // positive for BUY, negative for SELL
  let factorsCount = 0;

  // Factor A: RSI
  if (rsi <= 35) {
    score += 2.0; // oversold bounce
  } else if (rsi >= 45 && rsi <= 65 && asset.change24h > 0) {
    score += 1.5; // healthy bullish momentum
  } else if (rsi >= 72) {
    score -= 2.0; // overbought risk
  } else if (rsi < 45 && asset.change24h < 0) {
    score -= 1.5; // bearish continuation
  }
  factorsCount++;

  // Factor B: MACD
  if (macd.histogram > 0 && macd.status === "Bullish Crossover") {
    score += 2.0;
  } else if (macd.histogram > 0) {
    score += 1.0;
  } else if (macd.histogram < 0 && macd.status === "Bearish Crossover") {
    score -= 2.0;
  } else if (macd.histogram < 0) {
    score -= 1.0;
  }
  factorsCount++;

  // Factor C: Moving Averages & Trend
  if (trend.trend.includes("Strong Uptrend")) {
    score += 2.5;
  } else if (trend.trend.includes("Moderate Uptrend")) {
    score += 1.5;
  } else if (trend.trend.includes("Strong Downtrend")) {
    score -= 2.5;
  } else if (trend.trend.includes("Moderate Downtrend")) {
    score -= 1.5;
  }
  factorsCount++;

  // Factor D: Bollinger Bands
  if (currentPrice <= bb.lower * 1.01) {
    score += 1.5; // lower band support
  } else if (currentPrice >= bb.upper * 0.99) {
    score -= 1.5; // upper band resistance
  } else if (bb.status.includes("Squeeze") && trend.trend.includes("Uptrend")) {
    score += 1.8; // squeeze breakout upward
  } else if (bb.status.includes("Squeeze") && trend.trend.includes("Downtrend")) {
    score -= 1.8; // squeeze breakdown downward
  }
  factorsCount++;

  // Factor E: Volume Confirmation
  if (volume.isSurge) {
    if (score > 0) score += 1.5; // high volume validates buy
    else if (score < 0) score -= 1.5; // high volume validates sell
  }
  factorsCount++;

  // Factor F: Support & Resistance Proximity
  const distToSupport = Math.abs(currentPrice - sr.s1) / currentPrice;
  const distToResistance = Math.abs(currentPrice - sr.r1) / currentPrice;
  if (distToSupport < 0.015 && score > 0) {
    score += 1.2; // buying right off key support
  } else if (distToResistance < 0.015 && score < 0) {
    score -= 1.2; // shorting near resistance
  }
  factorsCount++;

  // 3. Determine Final Signal Direction
  let direction = "HOLD";
  if (score >= 2.5) {
    direction = "BUY";
  } else if (score <= -2.5) {
    direction = "SELL";
  } else {
    direction = "HOLD";
  }

  // 4. Compute Confidence Score (0 to 100)
  // Confidence combines magnitude of alignment across indicators
  const absScore = Math.abs(score);
  let confidence = Math.min(96, Math.max(48, Math.round(52 + (absScore * 5.2))));
  if (direction === "HOLD") {
    confidence = Math.min(65, Math.max(50, Math.round(50 + (absScore * 3))));
  }

  // 5. Determine Recommended Time Frame
  // Short term (15m - 1h scalp), Medium term (4h - 1D swing), Long term (1W+ macro position)
  let timeframeCategory = "Short term";
  let timeframeDetail = "15m - 1h Intraday";

  if (Math.abs(asset.change24h) > 4 || volume.isSurge) {
    timeframeCategory = "Short term";
    timeframeDetail = "15m - 1h Scalp Momentum";
  } else if (trend.strengthScore >= 80) {
    timeframeCategory = "Medium term";
    timeframeDetail = "4h - 1D Swing Trend";
  } else {
    timeframeCategory = "Long term";
    timeframeDetail = "1D - 1W Position";
  }

  // 6. Dynamic Entry, Target 1, Target 2, Stop-Loss
  const vol = Math.max(0.004, asset.volatility || 0.005);
  let entryPrice = currentPrice;
  let target1 = 0;
  let target2 = 0;
  let stopLoss = 0;

  if (direction === "BUY") {
    entryPrice = +(currentPrice * 0.999).toFixed(decimals);
    // Target 1: at or near R1 or 1.8x volatility
    const calcT1 = Math.max(currentPrice * (1 + vol * 1.8), sr.r1);
    target1 = +calcT1.toFixed(decimals);
    target2 = +(target1 * (1 + vol * 1.5)).toFixed(decimals);
    // Stop-loss: below S1 or 1.2x volatility
    const calcSL = Math.min(currentPrice * (1 - vol * 1.3), sr.s1);
    stopLoss = +calcSL.toFixed(decimals);
  } else if (direction === "SELL") {
    entryPrice = +(currentPrice * 1.001).toFixed(decimals);
    const calcT1 = Math.min(currentPrice * (1 - vol * 1.8), sr.s1);
    target1 = +calcT1.toFixed(decimals);
    target2 = +(target1 * (1 - vol * 1.5)).toFixed(decimals);
    const calcSL = Math.max(currentPrice * (1 + vol * 1.3), sr.r1);
    stopLoss = +calcSL.toFixed(decimals);
  } else {
    entryPrice = currentPrice;
    target1 = +(currentPrice * (1 + vol)).toFixed(decimals);
    target2 = +(currentPrice * (1 + vol * 2)).toFixed(decimals);
    stopLoss = +(currentPrice * (1 - vol)).toFixed(decimals);
  }

  // Risk Reward Ratio
  const risk = Math.abs(entryPrice - stopLoss);
  const reward = Math.abs(target1 - entryPrice);
  const rrRatio = risk > 0 ? (reward / risk).toFixed(2) : "1:2.0";

  // Confluence badges
  const isDiamond = confidence >= 85 && (volume.isSurge || trend.strengthScore >= 80);
  const isCrowdTrap = (rsi > 78 && direction === "BUY") || (rsi < 22 && direction === "SELL");

  // 7. Reasons for prediction in simple Hindi and English
  const reasons = buildBilingualReasons({
    direction,
    asset,
    rsi,
    macd,
    bb,
    volume,
    sr,
    trend,
    timeframeCategory
  });

  return {
    assetId: asset.id,
    symbol: asset.symbol,
    name: asset.name,
    category: asset.category,
    unit: asset.unit,
    decimals,
    currentPrice,
    direction,
    confidence, // 0 to 100
    entryPrice,
    target1,
    target2,
    stopLoss,
    riskReward: `1:${rrRatio}`,
    timeframeCategory, // "Short term", "Medium term", "Long term"
    timeframeDetail,
    isDiamond,
    isCrowdTrap,
    isDemoMode: true, // Clearly labeled as DEMO MODE
    indicators: {
      rsi,
      macdStatus: macd.status,
      macdHist: macd.histogram,
      bbStatus: bb.status,
      volumeStatus: volume.status,
      volumeRatio: volume.volumeRatio,
      trend: trend.trend,
      pivot: sr.pivot,
      support1: sr.s1,
      resistance1: sr.r1
    },
    reasonEn: reasons.en,
    reasonHi: reasons.hi,
    disclaimer: "GuruPredict predictions are educational only. Trading involves risk. Not financial advice.",
    generatedAt: Date.now()
  };
}

function buildBilingualReasons({ direction, asset, rsi, macd, bb, volume, sr, trend, timeframeCategory }) {
  if (direction === "BUY") {
    const en = `AI indicators show strong bullish alignment for ${timeframeCategory.toLowerCase()} trading: RSI is at ${rsi} with healthy momentum, MACD confirms a ${macd.status.toLowerCase()}, and price trades above EMA 20 (${trend.trend}). Key support is established near ${asset.unit}${sr.s1} with volume at ${volume.volumeRatio}x average.`;
    const hi = `AI इंडिकेटर्स ${timeframeCategory} ट्रेड के लिए तेजी (Bullish) का संकेत दे रहे हैं: RSI ${rsi} पर मजबूत है, MACD में ${macd.status === "Bullish Crossover" ? "बुलिश क्रॉसओवर" : "सकारात्मक मोमेंटम"} बना है, और कीमत मुख्य सपोर्ट ${asset.unit}${sr.s1} के ऊपर टिकी है। ट्रेडिंग वॉल्यूम सामान्य से ${volume.volumeRatio}x गुना अधिक है।`;
    return { en, hi };
  } else if (direction === "SELL") {
    const en = `AI indicators detect bearish selling pressure for ${timeframeCategory.toLowerCase()} setups: RSI is at ${rsi} indicating downward drift, MACD shows ${macd.status.toLowerCase()}, and price tests overhead resistance near ${asset.unit}${sr.r1}. Moving averages indicate ${trend.trend.toLowerCase()} with distribution volume.`;
    const hi = `AI इंडिकेटर्स ${timeframeCategory} सेटअप के लिए मंदी (Bearish) का दबाव दिखा रहे हैं: RSI ${rsi} पर कमजोरी दिखा रहा है, MACD में बेयरिश क्रॉसओवर सक्रिय है, और कीमत मजबूत रेजिस्टेंस ${asset.unit}${sr.r1} से टकरा रही है। मूविंग एवरेज में ${trend.trend === "Strong Downtrend" ? "मजबूत गिरावट" : "कमजोरी"} दर्ज है।`;
    return { en, hi };
  } else {
    const en = `AI indicators show consolidation within a tight range: RSI is at ${rsi} (neutral zone), Bollinger Bands are compressing (${bb.status}), and volume is calm at ${volume.volumeRatio}x. Recommended strategy is to HOLD and wait for a clear directional breakout beyond ${asset.unit}${sr.r1} or below ${asset.unit}${sr.s1}.`;
    const hi = `AI इंडिकेटर्स सीमित दायरे में कंसोलिडेशन दिखा रहे हैं: RSI ${rsi} पर न्यूट्रल है, बॉलिंजर बैंड्स संकुचित हो रहे हैं (${bb.status}), और वॉल्यूम शांत है। सुरक्षित रणनीति HOLD करने की है जब तक कि कीमत ${asset.unit}${sr.r1} के ऊपर या ${asset.unit}${sr.s1} के नीचे स्पष्ट ब्रेकआउट न दे दे।`;
    return { en, hi };
  }
}
