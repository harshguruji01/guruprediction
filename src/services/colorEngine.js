// 50% Target Trend Engine & Advanced Skip Round Ensemble for Green, Red, Violet Games
// Models: 1. Frequency Model, 2. Streak Model, 3. Violet Gap Model, 4. Pattern Model

export const COLOR_KEYS = {
  GREEN: 'GREEN',
  RED: 'RED',
  VIOLET: 'VIOLET'
};

// 0 is Red+Violet, 5 is Green+Violet, 1,3,7,9 are Green, 2,4,6,8 are Red
export const NUMBER_MAP = {
  0: { color: 'RED', isViolet: true, type: 'SMALL', parity: 'EVEN' },
  1: { color: 'GREEN', isViolet: false, type: 'SMALL', parity: 'ODD' },
  2: { color: 'RED', isViolet: false, type: 'SMALL', parity: 'EVEN' },
  3: { color: 'GREEN', isViolet: false, type: 'SMALL', parity: 'ODD' },
  4: { color: 'RED', isViolet: false, type: 'SMALL', parity: 'EVEN' },
  5: { color: 'GREEN', isViolet: true, type: 'BIG', parity: 'ODD' },
  6: { color: 'RED', isViolet: false, type: 'BIG', parity: 'EVEN' },
  7: { color: 'GREEN', isViolet: false, type: 'BIG', parity: 'ODD' },
  8: { color: 'RED', isViolet: false, type: 'BIG', parity: 'EVEN' },
  9: { color: 'GREEN', isViolet: false, type: 'BIG', parity: 'ODD' }
};

const DEFAULT_SAMPLE_ROUNDS = [
  { period: "20261026040", color: "GREEN", number: 7, time: "09:20 AM" },
  { period: "20261026039", color: "GREEN", number: 1, time: "09:19 AM" },
  { period: "20261026038", color: "RED", number: 4, time: "09:18 AM" },
  { period: "20261026037", color: "RED", number: 2, time: "09:17 AM" },
  { period: "20261026036", color: "GREEN", number: 9, time: "09:16 AM" },
  { period: "20261026035", color: "GREEN", number: 3, time: "09:15 AM" },
  { period: "20261026034", color: "RED", number: 8, time: "09:14 AM" },
  { period: "20261026033", color: "VIOLET", number: 0, time: "09:13 AM" },
  { period: "20261026032", color: "GREEN", number: 5, time: "09:12 AM" },
  { period: "20261026031", color: "GREEN", number: 7, time: "09:11 AM" },
  { period: "20261026030", color: "RED", number: 6, time: "09:10 AM" },
  { period: "20261026029", color: "RED", number: 4, time: "09:09 AM" },
  { period: "20261026028", color: "GREEN", number: 1, time: "09:08 AM" },
  { period: "20261026027", color: "GREEN", number: 3, time: "09:07 AM" },
  { period: "20261026026", color: "RED", number: 2, time: "09:06 AM" },
  { period: "20261026025", color: "RED", number: 8, time: "09:05 AM" },
  { period: "20261026024", color: "GREEN", number: 7, time: "09:04 AM" },
  { period: "20261026023", color: "RED", number: 6, time: "09:03 AM" },
  { period: "20261026022", color: "GREEN", number: 9, time: "09:02 AM" },
  { period: "20261026021", color: "RED", number: 4, time: "09:01 AM" },
  { period: "20261026020", color: "GREEN", number: 3, time: "09:00 AM" },
  { period: "20261026019", color: "GREEN", number: 1, time: "08:59 AM" },
  { period: "20261026018", color: "RED", number: 2, time: "08:58 AM" },
  { period: "20261026017", color: "RED", number: 6, time: "08:57 AM" }
];

export class ColorEngine {
  constructor() {
    this.history = this.loadHistory();
    this.skipMode = localStorage.getItem('gurupredict_skip_mode') || 'BALANCED'; // AGGRESSIVE, BALANCED, SAFE, MANUAL
    this.manualThreshold = parseInt(localStorage.getItem('gurupredict_manual_threshold') || '65', 10);
    this.predictionLog = this.loadPredictionLog();
    this.modelWeights = {
      frequency: 1.0,
      streak: 1.0,
      violetGap: 1.0,
      pattern: 1.0
    };
  }

  loadHistory() {
    try {
      const stored = localStorage.getItem('gurupredict_color_rounds');
      return stored ? JSON.parse(stored) : [...DEFAULT_SAMPLE_ROUNDS];
    } catch (e) {
      return [...DEFAULT_SAMPLE_ROUNDS];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem('gurupredict_color_rounds', JSON.stringify(this.history));
    } catch (e) {}
  }

  loadPredictionLog() {
    try {
      const stored = localStorage.getItem('gurupredict_pred_log');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  savePredictionLog() {
    try {
      localStorage.setItem('gurupredict_pred_log', JSON.stringify(this.predictionLog));
    } catch (e) {}
  }

  addRound({ color, number, period, time, timestamp }) {
    const periodId = period || String(Date.now()).slice(-9);

    // Prevent duplicate entries for the same period ID
    const existingIndex = this.history.findIndex(r => String(r.period) === String(periodId));
    if (existingIndex !== -1) {
      return this.history[existingIndex];
    }

    const now = new Date();
    const timeStr = time || now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const round = {
      period: String(periodId),
      color: color.toUpperCase(),
      number: number !== undefined && number !== null && number !== '' ? parseInt(number, 10) : null,
      time: timeStr,
      timestamp: timestamp || Date.now()
    };

    this.history.unshift(round);
    // Keep reasonable buffer (up to 200 rounds)
    if (this.history.length > 200) {
      this.history = this.history.slice(0, 200);
    }
    this.saveHistory();
    return round;
  }

  clearHistory() {
    this.history = [];
    this.saveHistory();
  }

  resetToDemo() {
    this.history = [...DEFAULT_SAMPLE_ROUNDS];
    this.saveHistory();
  }

  getStats(limit = 100) {
    const list = this.history.slice(0, limit);
    const total = list.length;
    if (total === 0) {
      return { total: 0, green: 0, red: 0, violet: 0, greenPct: 0, redPct: 0, violetPct: 0, violetGap: 0, currentStreak: { color: 'NONE', count: 0 } };
    }

    let green = 0, red = 0, violet = 0;
    list.forEach(r => {
      if (r.color === 'GREEN') green++;
      else if (r.color === 'RED') red++;
      else if (r.color === 'VIOLET') violet++;
      // If number 0 or 5, it counts towards violet too
      if (r.number === 0 || r.number === 5) violet++;
    });

    // Violet gap
    let violetGap = 0;
    for (let i = 0; i < this.history.length; i++) {
      const r = this.history[i];
      if (r.color === 'VIOLET' || r.number === 0 || r.number === 5) {
        break;
      }
      violetGap++;
    }

    // Current Streak
    let streakColor = this.history[0]?.color || 'NONE';
    let streakCount = 0;
    for (let i = 0; i < this.history.length; i++) {
      if (this.history[i].color === streakColor) {
        streakCount++;
      } else {
        break;
      }
    }

    return {
      total,
      green,
      red,
      violet,
      greenPct: Math.round((green / total) * 100),
      redPct: Math.round((red / total) * 100),
      violetPct: Math.round((violet / total) * 100),
      violetGap,
      currentStreak: { color: streakColor, count: streakCount }
    };
  }

  // =========================================================
  // 4 ENSEMBLE MODELS
  // =========================================================

  // Model 1: Frequency Model
  runFrequencyModel() {
    const last20 = this.history.slice(0, 20);
    const last50 = this.history.slice(0, 50);

    let g20 = 0, r20 = 0;
    last20.forEach(r => {
      if (r.color === 'GREEN') g20++;
      if (r.color === 'RED') r20++;
    });

    let g50 = 0, r50 = 0;
    last50.forEach(r => {
      if (r.color === 'GREEN') g50++;
      if (r.color === 'RED') r50++;
    });

    // Weighted score
    const greenScore = (g20 * 2) + (g50 * 1);
    const redScore = (r20 * 2) + (r50 * 1);

    if (greenScore > redScore * 1.15) return { vote: 'GREEN', confidence: 60, reason: 'Green frequency is dominant in recent rounds' };
    if (redScore > greenScore * 1.15) return { vote: 'RED', confidence: 60, reason: 'Red frequency is dominant in recent rounds' };
    return { vote: 'SKIP', confidence: 45, reason: 'Frequency is balanced between Green and Red' };
  }

  // Model 2: Streak Model
  runStreakModel() {
    if (this.history.length < 3) return { vote: 'SKIP', confidence: 40, reason: 'Not enough rounds for streak analysis' };

    const first = this.history[0].color;
    let streak = 0;
    for (let i = 0; i < this.history.length; i++) {
      if (this.history[i].color === first) streak++;
      else break;
    }

    if (streak >= 4) {
      // Dragon streak: analyze history to see if reversal or continuation dominates
      const opposite = first === 'GREEN' ? 'RED' : 'GREEN';
      return { vote: opposite, confidence: 62, reason: `${first} streak reached ${streak}. Mean reversal probability elevated.` };
    } else if (streak === 2 || streak === 3) {
      // Continuation tendency in active momentum
      return { vote: first, confidence: 58, reason: `Active ${first} streak of ${streak} shows short-term continuation flow.` };
    }

    return { vote: 'SKIP', confidence: 48, reason: 'No significant streak detected.' };
  }

  // Model 3: Violet Gap Model
  runVioletGapModel() {
    let gap = 0;
    for (let i = 0; i < this.history.length; i++) {
      const r = this.history[i];
      if (r.color === 'VIOLET' || r.number === 0 || r.number === 5) break;
      gap++;
    }

    if (gap >= 14) {
      return { vote: 'VIOLET', confidence: 54, isWatchMode: true, reason: `Violet gap is ${gap} rounds. Violet in high-alert watch zone.` };
    }

    // During normal violet gaps, check if green or red dominates
    const lastGapSlice = this.history.slice(0, Math.min(gap, 15));
    let g = 0, r = 0;
    lastGapSlice.forEach(x => {
      if (x.color === 'GREEN') g++;
      if (x.color === 'RED') r++;
    });

    if (g > r + 2) return { vote: 'GREEN', confidence: 56, reason: `Green dominating during current ${gap}-round Violet gap.` };
    if (r > g + 2) return { vote: 'RED', confidence: 56, reason: `Red dominating during current ${gap}-round Violet gap.` };

    return { vote: 'SKIP', confidence: 45, reason: `Violet gap is ${gap} rounds. No dominant side.` };
  }

  // Model 4: Pattern Model (Alternating, Double, Mirror)
  runPatternModel() {
    if (this.history.length < 6) return { vote: 'SKIP', confidence: 40, reason: 'Insufficient history for pattern recognition' };

    const c = this.history.map(r => r.color);

    // 1. Alternating pattern (G-R-G-R or R-G-R-G)
    const isAlternating = (c[0] !== c[1]) && (c[1] !== c[2]) && (c[2] !== c[3]);
    if (isAlternating) {
      const nextColor = c[0] === 'GREEN' ? 'RED' : 'GREEN';
      return { vote: nextColor, confidence: 64, reason: `Zig-Zag alternating pattern (G-R-G-R) detected. Next cycle favors ${nextColor}.` };
    }

    // 2. Double pattern (G-G-R-R)
    if (c[0] === c[1] && c[2] === c[3] && c[0] !== c[2]) {
      // e.g. G, G, then R, R -> next would be opposite double pair starting
      const nextColor = c[0] === 'GREEN' ? 'RED' : 'GREEN';
      return { vote: nextColor, confidence: 61, reason: `Double repeat pattern (2x2 pair) confirmed. Expected turn to ${nextColor}.` };
    }

    // 3. Mirror pattern (e.g. R-G-G-R)
    if (c[0] === c[3] && c[1] === c[2]) {
      return { vote: c[0], confidence: 57, reason: `Mirror sequence symmetry matched.` };
    }

    return { vote: 'SKIP', confidence: 46, reason: 'No clear recurring geometric pattern.' };
  }

  // =========================================================
  // ENSEMBLE PREDICTION & ADVANCED SKIP LOGIC
  // =========================================================
  evaluateNextRound() {
    const totalRounds = this.history.length;
    const stats = this.getStats(50);

    // Rule 1: Minimum 20 rounds of data required
    if (totalRounds < 20) {
      return {
        isSkip: true,
        skipReasonEn: `Insufficient data: Only ${totalRounds} rounds recorded. Minimum 20 rounds required for statistical analysis.`,
        skipReasonHi: `डेटा अपर्याप्त है: केवल ${totalRounds} राउंड दर्ज हैं। सांख्यिकीय विश्लेषण के लिए न्यूनतम 20 राउंड आवश्यक हैं।`,
        signalScore: 25,
        signalStrength: 'Skip',
        suggestedColor: 'SKIP',
        confidence: 0,
        riskLevel: 'High',
        stats,
        last10: this.history.slice(0, 10),
        disclaimer: "GuruPredict gives probability-based analysis only. Game results are random and cannot be guaranteed. Skipping unclear rounds is a safety feature, not a winning guarantee."
      };
    }

    // Run the 4 ensemble models
    const mFreq = this.runFrequencyModel();
    const mStreak = this.runStreakModel();
    const mGap = this.runVioletGapModel();
    const mPattern = this.runPatternModel();

    const votes = { GREEN: 0, RED: 0, VIOLET: 0, SKIP: 0 };
    [mFreq, mStreak, mGap, mPattern].forEach(m => {
      if (votes[m.vote] !== undefined) votes[m.vote]++;
    });

    // Calculate composite signal score (0 to 100)
    let signalScore = 35; // base score
    let highestVoteCount = Math.max(votes.GREEN, votes.RED, votes.VIOLET);
    let winningColor = 'SKIP';

    if (votes.GREEN > votes.RED && votes.GREEN > votes.VIOLET) winningColor = 'GREEN';
    else if (votes.RED > votes.GREEN && votes.RED > votes.VIOLET) winningColor = 'RED';
    else if (votes.VIOLET > votes.GREEN && votes.VIOLET > votes.RED) winningColor = 'VIOLET';

    if (highestVoteCount === 4) signalScore = 88;
    else if (highestVoteCount === 3) signalScore = 76;
    else if (highestVoteCount === 2) signalScore = 58;
    else signalScore = 34; // all disagree

    // Violet gap factor
    if (stats.violetGap >= 15 && winningColor !== 'VIOLET') {
      // Risk factor
      signalScore -= 8;
    }

    // Determine Skip based on user mode
    let threshold = 55; // Balanced default
    if (this.skipMode === 'AGGRESSIVE') threshold = 45;
    else if (this.skipMode === 'SAFE') threshold = 70;
    else if (this.skipMode === 'MANUAL') threshold = this.manualThreshold;

    // Check rolling accuracy auto-throttle
    const rollingAcc = this.getRollingAccuracy(20);
    if (rollingAcc.total >= 10 && rollingAcc.accuracy < 50) {
      // Auto-throttle: increase threshold to avoid bad rounds
      threshold += 10;
      signalScore = Math.max(20, signalScore - 10);
    }

    const shouldSkip = signalScore < threshold || winningColor === 'SKIP' || highestVoteCount < 2;

    if (shouldSkip) {
      let reasonEn = "Pattern weak / High risk round";
      let reasonHi = "कमजोर पैटर्न / उच्च जोखिम राउंड";

      if (highestVoteCount < 2) {
        reasonEn = "Ensemble models disagree. No clear majority.";
        reasonHi = "चारों मॉडल्स में सहमति नहीं बनी। कोई स्पष्ट रुझान नहीं है।";
      } else if (signalScore < 40) {
        reasonEn = "Signal strength below 40. High variance detected.";
        reasonHi = "सिग्नल स्कोर 40 से कम है। अत्यधिक अनिश्चितता मौजूद है।";
      } else {
        reasonEn = `Signal score (${signalScore}) is below your ${this.skipMode.toLowerCase()} safety threshold (${threshold}).`;
        reasonHi = `सिग्नल स्कोर (${signalScore}) आपके ${this.skipMode} सुरक्षा स्तर (${threshold}) से कम है।`;
      }

      return {
        isSkip: true,
        skipReasonEn: reasonEn,
        skipReasonHi: reasonHi,
        signalScore,
        signalStrength: 'Skip',
        suggestedColor: 'SKIP',
        confidence: 0,
        riskLevel: 'High',
        stats,
        last10: this.history.slice(0, 10),
        disclaimer: "GuruPredict gives probability-based analysis only. Game results are random and cannot be guaranteed. Skipping unclear rounds is a safety feature, not a winning guarantee."
      };
    }

    // Prediction is shown!
    let signalStrength = 'Normal';
    if (signalScore >= 70) signalStrength = 'Strong';
    else if (signalScore < 55) signalStrength = 'Weak';

    // Maximum confidence capped at 65% as required!
    let confidence = Math.min(65, Math.max(48, Math.round(50 + (signalScore - 50) * 0.35)));

    let riskLevel = 'Medium';
    if (signalStrength === 'Strong') riskLevel = 'Low';
    else if (signalStrength === 'Weak') riskLevel = 'High';

    // Build explanations in English and Hindi
    const reasons = this.buildPredictionReasons(winningColor, highestVoteCount, signalScore, stats);

    return {
      isSkip: false,
      suggestedColor: winningColor,
      confidence, // max 65%
      signalStrength, // Strong, Normal, Weak
      signalScore, // 0 to 100
      riskLevel,
      reasonEn: reasons.en,
      reasonHi: reasons.hi,
      stats,
      last10: this.history.slice(0, 10),
      models: {
        frequency: mFreq,
        streak: mStreak,
        violetGap: mGap,
        pattern: mPattern
      },
      disclaimer: "GuruPredict gives probability-based analysis only. Game results are random and cannot be guaranteed. Skipping unclear rounds is a safety feature, not a winning guarantee."
    };
  }

  buildPredictionReasons(color, votes, score, stats) {
    const colorHi = color === 'GREEN' ? 'हरा (Green)' : (color === 'RED' ? 'लाल (Red)' : 'बैंगनी (Violet)');
    const en = `${votes} of 4 ensemble models align on ${color} with a Signal Score of ${score}/100. Current ${stats.currentStreak.color} streak is ${stats.currentStreak.count}, while 50-round ${color} frequency is strong.`;
    const hi = `4 में से ${votes} मॉडल्स ने ${colorHi} पर सहमति जताई है (सिग्नल स्कोर: ${score}/100)। वर्तमान ${stats.currentStreak.color} स्ट्रीक ${stats.currentStreak.count} है और पिछले 50 राउंड में ${colorHi} की आवृत्ति अनुकूल है।`;
    return { en, hi };
  }

  // =========================================================
  // ACCURACY TRACKER & FEEDBACK
  // =========================================================
  recordFeedback(period, actualColor, prediction, wasSkipped = false) {
    if (wasSkipped) {
      this.predictionLog.unshift({
        period,
        prediction: 'SKIP',
        actual: actualColor,
        result: 'SKIPPED',
        timestamp: Date.now()
      });
      this.savePredictionLog();
      return;
    }

    const isCorrect = actualColor.toUpperCase() === prediction.toUpperCase();
    this.predictionLog.unshift({
      period,
      prediction: prediction.toUpperCase(),
      actual: actualColor.toUpperCase(),
      result: isCorrect ? 'CORRECT' : 'WRONG',
      timestamp: Date.now()
    });
    this.savePredictionLog();
  }

  getRollingAccuracy(limit = 20) {
    const nonSkipped = this.predictionLog.filter(p => p.result !== 'SKIPPED').slice(0, limit);
    const total = nonSkipped.length;
    if (total === 0) return { total: 0, correct: 0, wrong: 0, accuracy: 50 };

    const correct = nonSkipped.filter(p => p.result === 'CORRECT').length;
    const wrong = total - correct;
    const accuracy = Math.round((correct / total) * 100);

    return { total, correct, wrong, accuracy };
  }

  getColorSpecificAccuracy() {
    const greenPreds = this.predictionLog.filter(p => p.prediction === 'GREEN');
    const redPreds = this.predictionLog.filter(p => p.prediction === 'RED');
    const violetPreds = this.predictionLog.filter(p => p.prediction === 'VIOLET');
    const skipped = this.predictionLog.filter(p => p.result === 'SKIPPED').length;

    const calc = (arr) => {
      if (arr.length === 0) return { total: 0, correct: 0, accuracy: 0 };
      const c = arr.filter(p => p.result === 'CORRECT').length;
      return { total: arr.length, correct: c, accuracy: Math.round((c / arr.length) * 100) };
    };

    return {
      green: calc(greenPreds),
      red: calc(redPreds),
      violet: calc(violetPreds),
      skippedTotal: skipped
    };
  }

  // =========================================================
  // 50-50% PROBABILITY & REAL-TIME LIVE ODDS ENGINE
  // =========================================================
  evaluateNextRound5050() {
    const totalRounds = this.history.length;
    const stats50 = this.getStats(50);
    const stats20 = this.getStats(20);

    // Baseline: Pure 50-50% Coin-flip equilibrium
    let greenProb = 50.0;
    let redProb = 50.0;

    if (totalRounds >= 10) {
      // 1. Historical Deviation Factor from 50 rounds
      const gCount = stats50.green;
      const rCount = stats50.red;
      const grTotal = (gCount + rCount) || 1;
      const gRatio = gCount / grTotal; // e.g. 0.54

      // Mean reversion pull: when one color is over-represented, opposite has +edge
      // However, short-term momentum (last 20) also contributes
      const g20 = stats20.green;
      const r20 = stats20.red;
      const gr20Total = (g20 + r20) || 1;
      const g20Ratio = g20 / gr20Total;

      // Weighted micro-deviation: 60% short-term momentum + 40% 50-round rebalance
      const momentumDelta = (g20Ratio - 0.50) * 8.0; // max +/- 4%
      const rebalanceDelta = (0.50 - gRatio) * 6.0;  // max +/- 3%

      // Net deviation from 50.0%
      let netDelta = momentumDelta + rebalanceDelta;

      // Streak influence: If streak >= 3, mean reversal pressure increases
      if (stats50.currentStreak.count >= 3) {
        if (stats50.currentStreak.color === 'GREEN') {
          netDelta -= (stats50.currentStreak.count >= 4 ? 3.0 : 1.5);
        } else if (stats50.currentStreak.color === 'RED') {
          netDelta += (stats50.currentStreak.count >= 4 ? 3.0 : 1.5);
        }
      }

      // Bound probability realistically between 44.0% and 56.0% (genuine 50-50 range)
      netDelta = Math.max(-6.0, Math.min(6.0, netDelta));
      greenProb = Number((50.0 + netDelta).toFixed(1));
      redProb = Number((100.0 - greenProb).toFixed(1));
    }

    // Live Payout Multipliers (standard 1.96x base payout adjusted for real-time odds)
    const greenMultiplier = (1.96 * (50.0 / greenProb)).toFixed(2) + 'x';
    const redMultiplier = (1.96 * (50.0 / redProb)).toFixed(2) + 'x';

    // Big vs Small 50-50 Analysis
    let bigCount = 0;
    let smallCount = 0;
    let oddCount = 0;
    let evenCount = 0;
    const sample = this.history.slice(0, 50).filter(r => r.number !== null && r.number !== undefined);
    sample.forEach(r => {
      if (r.number >= 5) bigCount++;
      else smallCount++;
      if (r.number % 2 !== 0) oddCount++;
      else evenCount++;
    });

    const sampleTotal = sample.length || 1;
    let bigProb = 50.0;
    let smallProb = 50.0;
    let oddProb = 50.0;
    let evenProb = 50.0;

    if (sample.length >= 10) {
      const bigDelta = ((bigCount / sampleTotal) - 0.5) * 6.0;
      bigProb = Number(Math.max(45.0, Math.min(55.0, 50.0 + bigDelta)).toFixed(1));
      smallProb = Number((100.0 - bigProb).toFixed(1));

      const oddDelta = ((oddCount / sampleTotal) - 0.5) * 6.0;
      oddProb = Number(Math.max(45.0, Math.min(55.0, 50.0 + oddDelta)).toFixed(1));
      evenProb = Number((100.0 - oddProb).toFixed(1));
    }

    // Violet Hedge Probability (0 and 5: 2 out of 10 numbers = ~10% probability)
    let violetHedgeProb = 10.0;
    if (stats50.violetGap >= 12) {
      violetHedgeProb = Number(Math.min(18.0, 10.0 + (stats50.violetGap - 10) * 0.8).toFixed(1));
    }

    let predictedColor = 'GREEN';
    let edgePercent = 0;
    let edgeDirection = 'NEUTRAL';

    if (greenProb > redProb) {
      predictedColor = 'GREEN';
      edgePercent = Number((greenProb - 50.0).toFixed(1));
      edgeDirection = 'GREEN';
    } else if (redProb > greenProb) {
      predictedColor = 'RED';
      edgePercent = Number((redProb - 50.0).toFixed(1));
      edgeDirection = 'RED';
    } else {
      predictedColor = stats50.currentStreak.color === 'GREEN' ? 'RED' : 'GREEN';
      edgePercent = 0.0;
      edgeDirection = 'EVEN';
    }

    const predictedSize = bigProb >= smallProb ? 'BIG' : 'SMALL';
    const predictedParity = oddProb >= evenProb ? 'ODD' : 'EVEN';

    // Formulate bilingual reasons
    let reasonEn = '';
    let reasonHi = '';

    if (edgePercent > 0) {
      reasonEn = `50-50% Equilibrium Analysis: Past rounds show Green (${stats50.green}) vs Red (${stats50.red}). Calculated live odds give ${predictedColor} a +${edgePercent}% probability edge (${predictedColor === 'GREEN' ? greenProb : redProb}% vs ${predictedColor === 'GREEN' ? redProb : greenProb}%) with ${predictedColor === 'GREEN' ? greenMultiplier : redMultiplier} payout odds.`;
      reasonHi = `50-50% संतुलन विश्लेषण: पिछले 50 राउंड्स में Green (${stats50.green}) और Red (${stats50.red}) दर्ज हैं। लाइव सांख्यिकी के अनुसार 50-50 बेसलाइन पर ${predictedColor} के पक्ष में +${edgePercent}% की बढ़त (${predictedColor === 'GREEN' ? greenProb : redProb}%) बन रही है।`;
    } else {
      reasonEn = `50-50% Perfect Balance: Green and Red are exactly at 50.0% vs 50.0% coin-flip equilibrium. High variance round.`;
      reasonHi = `50-50% पूर्ण संतुलन: Green और Red दोनों 50.0% - 50.0% पर पूरी तरह संतुलित हैं। यह सिक्का उछालने (Coin-flip) जैसा न्यूट्रल राउंड है।`;
    }

    return {
      greenProb,
      redProb,
      greenMultiplier,
      redMultiplier,
      bigProb,
      smallProb,
      predictedSize,
      oddProb,
      evenProb,
      predictedParity,
      violetHedgeProb,
      violetGap: stats50.violetGap,
      predictedColor,
      edgePercent,
      edgeDirection,
      reasonEn,
      reasonHi,
      stats50,
      totalRounds
    };
  }

  setSkipMode(mode, manualVal = 65) {
    this.skipMode = mode;
    this.manualThreshold = manualVal;
    localStorage.setItem('gurupredict_skip_mode', mode);
    localStorage.setItem('gurupredict_manual_threshold', String(manualVal));
  }
}

export const colorEngine = new ColorEngine();
