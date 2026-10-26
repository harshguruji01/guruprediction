// Financial Calculators: Profit/Loss & Risk Position Sizer

export function calculateProfitLoss({ type = 'LONG', entry, exit, quantity, leverage = 1 }) {
  const e = parseFloat(entry) || 0;
  const x = parseFloat(exit) || 0;
  const q = parseFloat(quantity) || 0;
  const lev = parseFloat(leverage) || 1;

  if (e <= 0 || q <= 0) {
    return { netProfit: 0, roiPercent: 0, priceDiff: 0 };
  }

  const direction = type === 'LONG' ? 1 : -1;
  const priceDiff = (x - e) * direction;
  const totalValue = e * q;
  const netProfit = (priceDiff * q) * lev;
  const roiPercent = ((priceDiff / e) * lev) * 100;

  return {
    netProfit: +netProfit.toFixed(2),
    roiPercent: +roiPercent.toFixed(2),
    priceDiff: +priceDiff.toFixed(4)
  };
}

export function calculateRiskPosition({ accountBalance, riskPercentage, entryPrice, stopLossPrice }) {
  const balance = parseFloat(accountBalance) || 0;
  const riskPct = parseFloat(riskPercentage) || 1;
  const entry = parseFloat(entryPrice) || 0;
  const sl = parseFloat(stopLossPrice) || 0;

  if (balance <= 0 || entry <= 0 || sl <= 0 || entry === sl) {
    return { maxRiskAmount: 0, positionSize: 0, riskRewardRatio: '1:2.0' };
  }

  const maxRiskAmount = balance * (riskPct / 100);
  const riskPerUnit = Math.abs(entry - sl);
  const positionSize = maxRiskAmount / riskPerUnit;

  return {
    maxRiskAmount: +maxRiskAmount.toFixed(2),
    positionSize: +positionSize.toFixed(4),
    riskPerUnit: +riskPerUnit.toFixed(4)
  };
}
