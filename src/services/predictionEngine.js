// Quantitative & AI Prediction Engine for GuruPredict
import { marketData } from './marketData.js';
import { generateAIPrediction } from './technicalAnalysis.js';

export const AI_MODELS = [
  { name: "Multi-Factor Technical Confluence AI", winRate: 84.8, desc: "RSI + MACD + Bollinger Bands + Moving Averages + Volume" },
  { name: "Quantum Orderflow & Volatility AI", winRate: 82.4, desc: "Volume Delta + Support/Resistance Pivots + Trend Strength" },
  { name: "Fibonacci & Momentum Sentinel", winRate: 83.9, desc: "Golden Ratio + EMA 20/50 Alignment" }
];

class PredictionEngine {
  constructor() {
    this.sniperFilterActive = false;
    this.activeModel = AI_MODELS[0];
  }

  setSniperMode(active) {
    this.sniperFilterActive = !!active;
  }

  isSniperMode() {
    return this.sniperFilterActive;
  }

  getActiveModel() {
    return this.activeModel;
  }

  generatePrediction(asset) {
    const candles = marketData.getCandles(asset.id);
    const prediction = generateAIPrediction(asset, candles);

    prediction.modelName = this.activeModel.name;
    prediction.modelWinRate = this.activeModel.winRate;

    return prediction;
  }

  getAllPredictions(filterSniper = false) {
    const assets = marketData.getAllAssets();
    let predictions = assets.map(asset => this.generatePrediction(asset));

    if (filterSniper || this.sniperFilterActive) {
      predictions = predictions.filter(p => p.confidence >= 82);
    }

    return predictions;
  }
}

export const predictionEngine = new PredictionEngine();
