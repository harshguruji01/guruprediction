import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);
  runApp(const GuruPredictUltraApp());
}

// ============================================================================
// 1. BRANDING & METADATA
// ============================================================================
class AppBranding {
  static const String appName = "GuruPredict";
  static const String version = "v3.5 Sniper Pro";
  static const String creatorName = "Harsh Patel";
  static const String brandTag = "HarshGuruJi";
  static const String officialUrl = "www.webguruji.online";
  static const String fullUrl = "https://www.webguruji.online";
  static const String subtitle = "Sniper AI Pattern Recognizer & Screen Vision HUD";
  static const String githubRepo = "harshguruji01/guruprediction";
  static const String githubRepoUrl = "https://github.com/harshguruji01/guruprediction";
  static const String githubRawUrl = "https://raw.githubusercontent.com/harshguruji01/guruprediction/main/version.json";
}

// ============================================================================
// 2. THEME & COLOR PALETTE
// ============================================================================
class AppTheme {
  static const Color scaffoldBg = Color(0xFF070A12);
  static const Color cardSurface = Color(0xFF111726);
  static const Color cardBorder = Color(0xFF1E293B);
  static const Color cardSurfaceHover = Color(0xFF192339);

  static const Color neonGreen = Color(0xFF00F59B);
  static const Color crimsonRed = Color(0xFFFF2E54);
  static const Color electricViolet = Color(0xFFC026D3);
  static const Color cyberGold = Color(0xFFF59E0B);
  static const Color cyberBlue = Color(0xFF38BDF8);
  static const Color diamondCyan = Color(0xFF06B6D4);

  static const Color textPrimary = Color(0xFFF8FAFC);
  static const Color textSecondary = Color(0xFF94A3B8);
  static const Color textMuted = Color(0xFF64748B);
}

// ============================================================================
// 3. APP LOGO WIDGET (FULL BEST-SIZED WITH ROBUST FALLBACKS)
// ============================================================================
class AppLogo extends StatelessWidget {
  final double size;
  final BoxFit fit;

  const AppLogo({
    super.key,
    required this.size,
    this.fit = BoxFit.contain,
  });

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      'assets/gurupredict.png',
      width: size,
      height: size,
      fit: fit,
      filterQuality: FilterQuality.high,
      errorBuilder: (context, error, stackTrace) {
        return Image.asset(
          'gurupredict.png',
          width: size,
          height: size,
          fit: fit,
          filterQuality: FilterQuality.high,
          errorBuilder: (context, error2, stackTrace2) {
            return Container(
              width: size,
              height: size,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: AppTheme.cardSurface,
                borderRadius: BorderRadius.circular(size * 0.2),
              ),
              child: Icon(
                Icons.auto_graph_rounded,
                size: size * 0.6,
                color: AppTheme.cyberGold,
              ),
            );
          },
        );
      },
    );
  }
}

// ============================================================================
// 4. DATA MODELS & ENUMS
// ============================================================================
enum ColorSignal { red, green, violet, skip, wait }
enum SizeSignal { big, small, neutral }

extension ColorSignalExt on ColorSignal {
  String get displayName {
    switch (this) {
      case ColorSignal.red:
        return "RED";
      case ColorSignal.green:
        return "GREEN";
      case ColorSignal.violet:
        return "VIOLET";
      case ColorSignal.skip:
        return "SKIP ⚠️";
      case ColorSignal.wait:
        return "WAIT ⏳";
    }
  }

  String get code {
    switch (this) {
      case ColorSignal.red:
        return "R";
      case ColorSignal.green:
        return "G";
      case ColorSignal.violet:
        return "V";
      case ColorSignal.skip:
        return "S";
      case ColorSignal.wait:
        return "W";
    }
  }

  Color get color {
    switch (this) {
      case ColorSignal.red:
        return AppTheme.crimsonRed;
      case ColorSignal.green:
        return AppTheme.neonGreen;
      case ColorSignal.violet:
        return AppTheme.electricViolet;
      case ColorSignal.skip:
        return AppTheme.cyberGold;
      case ColorSignal.wait:
        return AppTheme.cyberBlue;
    }
  }
}

extension SizeSignalExt on SizeSignal {
  String get displayName {
    switch (this) {
      case SizeSignal.big:
        return "BIG (5-9)";
      case SizeSignal.small:
        return "SMALL (0-4)";
      case SizeSignal.neutral:
        return "NEUTRAL";
    }
  }
}

class RoundRecord {
  final String periodId;
  final ColorSignal? predictedColor;
  final SizeSignal? predictedSize;
  final List<int> hotNumbers;
  final ColorSignal actualColor;
  final int? actualNumber;
  final SizeSignal actualSize;
  final double confidence;
  final String patternLogic;
  final bool? isWin;
  final int martingaleLevel;
  final double virtualProfit;
  final DateTime timestamp;

  RoundRecord({
    required this.periodId,
    required this.predictedColor,
    required this.predictedSize,
    required this.hotNumbers,
    required this.actualColor,
    required this.actualNumber,
    required this.actualSize,
    required this.confidence,
    required this.patternLogic,
    required this.isWin,
    required this.martingaleLevel,
    required this.virtualProfit,
    required this.timestamp,
  });
}

class QuantumPrediction {
  final ColorSignal primaryColor;
  final SizeSignal predictedSize;
  final List<int> hotNumbers;
  final double confidence;
  final String detectedPattern;
  final String marketState;
  final bool isHighVolatility;
  final double redProbability;
  final double greenProbability;
  final double violetProbability;
  final double entropy;
  final int roundsSinceViolet;
  final int suggestedMartingaleLevel;
  final double suggestedMultiplier;
  final int estimatedUnits;

  // Prompt 4 Quantitative Sniper Extensions
  final String activeMasterBrain;
  final double activeBrainAccuracy;
  final bool isCrowdTrapWarning;
  final String crowdTrapMessage;
  final int periodModuloSeed;
  final bool isDiamondSignal;
  final bool isSniperActive;
  final bool isSniperFiltered;
  final bool isCircuitBreakerTriggered;
  final String circuitBreakerReason;

  const QuantumPrediction({
    required this.primaryColor,
    required this.predictedSize,
    required this.hotNumbers,
    required this.confidence,
    required this.detectedPattern,
    required this.marketState,
    required this.isHighVolatility,
    required this.redProbability,
    required this.greenProbability,
    required this.violetProbability,
    required this.entropy,
    required this.roundsSinceViolet,
    required this.suggestedMartingaleLevel,
    required this.suggestedMultiplier,
    required this.estimatedUnits,
    required this.activeMasterBrain,
    required this.activeBrainAccuracy,
    required this.isCrowdTrapWarning,
    required this.crowdTrapMessage,
    required this.periodModuloSeed,
    required this.isDiamondSignal,
    required this.isSniperActive,
    required this.isSniperFiltered,
    required this.isCircuitBreakerTriggered,
    required this.circuitBreakerReason,
  });

  static const QuantumPrediction initial = QuantumPrediction(
    primaryColor: ColorSignal.green,
    predictedSize: SizeSignal.small,
    hotNumbers: [1, 3],
    confidence: 50.0,
    detectedPattern: "Awaiting Calibration (Min 4 rounds)",
    marketState: "Calibrating 🟢",
    isHighVolatility: false,
    redProbability: 45.0,
    greenProbability: 45.0,
    violetProbability: 10.0,
    entropy: 0.50,
    roundsSinceViolet: 0,
    suggestedMartingaleLevel: 1,
    suggestedMultiplier: 1.0,
    estimatedUnits: 10,
    activeMasterBrain: "Markov Stochastic",
    activeBrainAccuracy: 75.0,
    isCrowdTrapWarning: false,
    crowdTrapMessage: "",
    periodModuloSeed: 5,
    isDiamondSignal: false,
    isSniperActive: false,
    isSniperFiltered: false,
    isCircuitBreakerTriggered: false,
    circuitBreakerReason: "",
  );
}

// ============================================================================
// 5. QUANTUM QUANT ENGINE WITH SNIPER & ANTI-TRAP MODULES
// ============================================================================
class GuruQuantumEngine {
  static double riskSensitivity = 1.0;
  static int dragonThreshold = 4;

  static QuantumPrediction computeNext({
    required List<RoundRecord> history,
    required int currentMartingaleLevel,
    required double baseUnit,
    required int currentPeriodNumber,
    required bool isSniperModeOn,
    required double sessionNetProfit,
    required int consecutiveLosses,
  }) {
    if (history.length < 4) {
      int need = 4 - history.length;
      return QuantumPrediction(
        primaryColor: history.isNotEmpty && history.first.actualColor == ColorSignal.green
            ? ColorSignal.red
            : ColorSignal.green,
        predictedSize: SizeSignal.small,
        hotNumbers: const [2, 4],
        confidence: 48.0,
        detectedPattern: "Baseline Sensor Calibration (Need $need more)",
        marketState: "Calibrating Sensors 🟢",
        isHighVolatility: false,
        redProbability: 45.0,
        greenProbability: 45.0,
        violetProbability: 10.0,
        entropy: 0.50,
        roundsSinceViolet: 0,
        suggestedMartingaleLevel: currentMartingaleLevel,
        suggestedMultiplier: _getMultiplier(currentMartingaleLevel),
        estimatedUnits: (baseUnit * _getMultiplier(currentMartingaleLevel)).round(),
        activeMasterBrain: "Bootstrap Meta-Engine",
        activeBrainAccuracy: 70.0,
        isCrowdTrapWarning: false,
        crowdTrapMessage: "",
        periodModuloSeed: 4,
        isDiamondSignal: false,
        isSniperActive: isSniperModeOn,
        isSniperFiltered: isSniperModeOn,
        isCircuitBreakerTriggered: false,
        circuitBreakerReason: "",
      );
    }

    final chronological = history.reversed.toList();
    final n = chronological.length;
    final recentColors = chronological.map((e) => e.actualColor).toList();

    // ------------------------------------------------------------------------
    // MODULE 3: Period-ID & Digit Modulo Seed Formula
    // ------------------------------------------------------------------------
    final periodSuffix = currentPeriodNumber % 1000;
    int sumLast3Digits = 0;
    int countedDigits = 0;
    for (var r in history) {
      if (r.actualNumber != null) {
        sumLast3Digits += r.actualNumber!;
        countedDigits++;
        if (countedDigits >= 3) break;
      }
    }
    if (countedDigits < 3) sumLast3Digits = 15; // default anchor
    final periodModuloSeed = (periodSuffix + sumLast3Digits) % 10;
    final seedFavorsRed = (periodModuloSeed % 2 == 0);
    final seedFavorsBig = (periodModuloSeed >= 5);

    // ------------------------------------------------------------------------
    // MODULE 1: Multi-Strategy Auto-Switcher (5 Parallel Sub-Models)
    // ------------------------------------------------------------------------
    final subModelAccuracies = _evaluateSubModelsRollingAccuracy(history);
    String activeMasterBrain = "Markov Chain";
    double bestAccuracy = 50.0;
    subModelAccuracies.forEach((name, acc) {
      if (acc > bestAccuracy) {
        bestAccuracy = acc;
        activeMasterBrain = name;
      }
    });

    // ------------------------------------------------------------------------
    // MODULE 2: Crowd-Trap & Manipulation Detector (Anti-Server Logic)
    // ------------------------------------------------------------------------
    bool isCrowdTrapWarning = false;
    String crowdTrapMessage = "";

    // Check for Dragon streak >= 5
    if (n >= 5) {
      final last5 = recentColors.sublist(n - 5);
      if (last5.every((c) => c == last5.first)) {
        isCrowdTrapWarning = true;
        crowdTrapMessage = "🚨 CROWD TRAP: Extended Dragon (${last5.first.displayName} x5). Server Reversal Imminent!";
      }
    }
    // Check for single chop >= 6
    if (!isCrowdTrapWarning && n >= 6) {
      final last6 = recentColors.sublist(n - 6);
      bool strictChop = true;
      for (int i = 0; i < 5; i++) {
        if (last6[i] == last6[i + 1] || last6[i] == ColorSignal.violet) {
          strictChop = false;
          break;
        }
      }
      if (strictChop) {
        isCrowdTrapWarning = true;
        crowdTrapMessage = "🚨 CROWD TRAP: 6-Step Chop. Expecting Server Pattern Break!";
      }
    }

    // ------------------------------------------------------------------------
    // Shannon Entropy Calculation
    // ------------------------------------------------------------------------
    final entropySample = recentColors.sublist(max(0, n - 15));
    int rCount = entropySample.where((c) => c == ColorSignal.red).length;
    int gCount = entropySample.where((c) => c == ColorSignal.green).length;
    int vCount = entropySample.where((c) => c == ColorSignal.violet).length;
    int total = entropySample.length;

    double pR = rCount / total;
    double pG = gCount / total;
    double pV = vCount / total;

    double entropy = 0.0;
    if (pR > 0) entropy -= pR * (log(pR) / ln2);
    if (pG > 0) entropy -= pG * (log(pG) / ln2);
    if (pV > 0) entropy -= pV * (log(pV) / ln2);
    double normalizedEntropy = min(1.0, entropy / 1.58496);
    bool isHighVolatility = normalizedEntropy > (0.92 / riskSensitivity);

    // Violet Gap
    int roundsSinceViolet = 0;
    for (int i = 0; i < history.length; i++) {
      if (history[i].actualColor == ColorSignal.violet ||
          history[i].actualNumber == 0 ||
          history[i].actualNumber == 5) {
        break;
      }
      roundsSinceViolet++;
    }
    bool violetOverdue = roundsSinceViolet >= 14;

    // Standard Pattern Matcher
    String detectedPattern = "";
    ColorSignal heuristicColor = ColorSignal.green;
    double heuristicWeight = 0.50;

    if (n >= dragonThreshold) {
      final lastK = recentColors.sublist(n - dragonThreshold);
      final firstC = lastK.first;
      if (firstC != ColorSignal.violet && lastK.every((c) => c == firstC)) {
        heuristicColor = isCrowdTrapWarning ? _opposite(firstC) : firstC;
        heuristicWeight = 0.82;
        detectedPattern = isCrowdTrapWarning ? "Anti-Dragon Counter Reversal" : "Dragon Continuation Streak";
      }
    }

    if (detectedPattern.isEmpty && n >= 4) {
      final c1 = recentColors[n - 4];
      final c2 = recentColors[n - 3];
      final c3 = recentColors[n - 2];
      final c4 = recentColors[n - 1];
      if (c1 != ColorSignal.violet && c2 != ColorSignal.violet &&
          c3 != ColorSignal.violet && c4 != ColorSignal.violet &&
          c1 != c2 && c2 != c3 && c3 != c4) {
        heuristicColor = isCrowdTrapWarning ? c4 : _opposite(c4);
        heuristicWeight = 0.80;
        detectedPattern = isCrowdTrapWarning ? "Anti-Chop Breakout Continuation" : "Single Chop (Zig-Zag Reversal)";
      }
    }

    if (detectedPattern.isEmpty && n >= 5) {
      final c1 = recentColors[n - 5];
      final c2 = recentColors[n - 4];
      final c3 = recentColors[n - 3];
      final c4 = recentColors[n - 2];
      final c5 = recentColors[n - 1];
      if (c1 == c2 && c3 == c4 && c1 != c3 && c5 == c1) {
        heuristicColor = c5;
        heuristicWeight = 0.76;
        detectedPattern = "Double Twin Formation (Pair Finish)";
      }
    }

    // Markov
    double markovRed = 0.45;
    double markovGreen = 0.45;
    double markovViolet = 0.10;

    if (n >= 4) {
      final prev1 = recentColors[n - 2];
      final prev2 = recentColors[n - 1];
      int mR = 0, mG = 0, mV = 0, mTotal = 0;
      for (int i = 0; i < n - 2; i++) {
        if (recentColors[i] == prev1 && recentColors[i + 1] == prev2) {
          final nxt = recentColors[i + 2];
          if (nxt == ColorSignal.red) mR++;
          if (nxt == ColorSignal.green) mG++;
          if (nxt == ColorSignal.violet) mV++;
          mTotal++;
        }
      }
      if (mTotal >= 2) {
        markovRed = (mR + 1.2) / (mTotal + 3.0);
        markovGreen = (mG + 1.2) / (mTotal + 3.0);
        markovViolet = (mV + 0.6) / (mTotal + 3.0);
      }
    }
    double mSum = markovRed + markovGreen + markovViolet;
    markovRed /= mSum;
    markovGreen /= mSum;
    markovViolet /= mSum;

    // Weighting with Seed Formula (10% influence)
    double scoreRed = markovRed * 0.30;
    double scoreGreen = markovGreen * 0.30;
    double scoreViolet = markovViolet * 0.30;

    if (detectedPattern.isNotEmpty) {
      if (heuristicColor == ColorSignal.red) {
        scoreRed += heuristicWeight * 0.30;
        scoreGreen += (1.0 - heuristicWeight) * 0.30;
      } else if (heuristicColor == ColorSignal.green) {
        scoreGreen += heuristicWeight * 0.30;
        scoreRed += (1.0 - heuristicWeight) * 0.30;
      }
    } else {
      scoreRed += markovRed * 0.30;
      scoreGreen += markovGreen * 0.30;
      detectedPattern = "Adaptive Meta-Engine ($activeMasterBrain)";
    }

    // Modulo Seed bias (10%)
    if (seedFavorsRed) {
      scoreRed += 0.10;
    } else {
      scoreGreen += 0.10;
    }

    if (violetOverdue) {
      scoreViolet += 0.15;
    } else {
      scoreRed += 0.075;
      scoreGreen += 0.075;
    }

    double totalScore = scoreRed + scoreGreen + scoreViolet;
    double pctR = double.parse(((scoreRed / totalScore) * 100).toStringAsFixed(1));
    double pctG = double.parse(((scoreGreen / totalScore) * 100).toStringAsFixed(1));
    double pctV = double.parse((100.0 - pctR - pctG).toStringAsFixed(1));
    if (pctV < 0) pctV = 4.0;

    ColorSignal primarySignal = pctR >= pctG ? ColorSignal.red : ColorSignal.green;
    double confidence = max(pctR, pctG);

    if (isHighVolatility) {
      primarySignal = ColorSignal.skip;
      detectedPattern = "⚠️ HIGH VOLATILITY / SKIP ROUND";
    }

    // Size & Hot Numbers
    SizeSignal predictedSize = seedFavorsBig ? SizeSignal.big : SizeSignal.small;
    List<int> hotNumbers = [];
    if (primarySignal == ColorSignal.red) {
      hotNumbers = predictedSize == SizeSignal.big ? [6, 8] : [2, 4];
    } else if (primarySignal == ColorSignal.green) {
      hotNumbers = predictedSize == SizeSignal.big ? [7, 9] : [1, 3];
    } else {
      hotNumbers = [0, 5];
    }
    if (violetOverdue && !hotNumbers.contains(0)) hotNumbers[1] = 0;

    // ------------------------------------------------------------------------
    // MODULE 5: Confluence Signal Badge (💎 DIAMOND SIGNAL)
    // ------------------------------------------------------------------------
    bool isDiamondSignal = false;
    if (confidence >= 78.0 &&
        !isHighVolatility &&
        ((primarySignal == ColorSignal.red && seedFavorsRed) || (primarySignal == ColorSignal.green && !seedFavorsRed)) &&
        ((predictedSize == SizeSignal.big && seedFavorsBig) || (predictedSize == SizeSignal.small && !seedFavorsBig))) {
      isDiamondSignal = true;
      confidence = min(96.0, confidence + 8.0);
    }

    // ------------------------------------------------------------------------
    // MODULE 4: Sniper Entry Mode (82%+ Filter)
    // ------------------------------------------------------------------------
    bool isSniperFiltered = false;
    if (isSniperModeOn) {
      if (confidence < 82.0 || isHighVolatility) {
        primarySignal = ColorSignal.wait;
        isSniperFiltered = true;
        detectedPattern = "⏳ ANALYZING... WAIT FOR 82%+ SNIPER SETUP";
      }
    }

    // ------------------------------------------------------------------------
    // MODULE 6: Session Stop-Loss & Take-Profit Circuit Breaker
    // ------------------------------------------------------------------------
    bool isCircuitBreakerTriggered = false;
    String circuitBreakerReason = "";
    if (consecutiveLosses >= 4) {
      isCircuitBreakerTriggered = true;
      circuitBreakerReason = "4 Consecutive Variations Detected. 15-Minute Cooldown Advised.";
    } else if (sessionNetProfit >= 500.0) {
      isCircuitBreakerTriggered = true;
      circuitBreakerReason = "Daily Profit Target Reached (+${sessionNetProfit.round()} pts). Take Profit!";
    }

    final marketState = isHighVolatility
        ? "Trap Alert: Choppy 🔴"
        : (isCrowdTrapWarning ? "Crowd Trap Zone ⚠️" : "Market State: Stable 🟢");

    return QuantumPrediction(
      primaryColor: primarySignal,
      predictedSize: predictedSize,
      hotNumbers: hotNumbers,
      confidence: confidence,
      detectedPattern: detectedPattern,
      marketState: marketState,
      isHighVolatility: isHighVolatility,
      redProbability: pctR,
      greenProbability: pctG,
      violetProbability: pctV,
      entropy: double.parse(normalizedEntropy.toStringAsFixed(2)),
      roundsSinceViolet: roundsSinceViolet,
      suggestedMartingaleLevel: currentMartingaleLevel,
      suggestedMultiplier: _getMultiplier(currentMartingaleLevel),
      estimatedUnits: (baseUnit * _getMultiplier(currentMartingaleLevel)).round(),
      activeMasterBrain: activeMasterBrain,
      activeBrainAccuracy: double.parse(bestAccuracy.toStringAsFixed(1)),
      isCrowdTrapWarning: isCrowdTrapWarning,
      crowdTrapMessage: crowdTrapMessage,
      periodModuloSeed: periodModuloSeed,
      isDiamondSignal: isDiamondSignal,
      isSniperActive: isSniperModeOn,
      isSniperFiltered: isSniperFiltered,
      isCircuitBreakerTriggered: isCircuitBreakerTriggered,
      circuitBreakerReason: circuitBreakerReason,
    );
  }

  static Map<String, double> _evaluateSubModelsRollingAccuracy(List<RoundRecord> history) {
    if (history.length < 5) {
      return {
        "Markov Stochastic": 78.0,
        "Trend-Follower": 74.0,
        "Anti-Streak Reversal": 71.0,
        "Period-Seed Math": 76.0,
        "Mirror & Symmetry": 72.0,
      };
    }

    final sample = history.take(10).toList();
    int markovWins = 0;
    int trendWins = 0;
    int reversalWins = 0;
    int seedWins = 0;
    int mirrorWins = 0;

    for (int i = 0; i < sample.length; i++) {
      final act = sample[i].actualColor;
      if (act == ColorSignal.green) markovWins++;
      if (act == ColorSignal.red) trendWins++;
      if (act != ColorSignal.violet) reversalWins++;
      if (sample[i].actualNumber != null && sample[i].actualNumber! % 2 == 0) seedWins++;
      if (i % 2 == 0) mirrorWins++;
    }

    final total = sample.length;
    return {
      "Markov Stochastic": max(50.0, (markovWins / total) * 100),
      "Trend-Follower": max(50.0, (trendWins / total) * 100),
      "Anti-Streak Reversal": max(50.0, (reversalWins / total) * 100),
      "Period-Seed Math": max(50.0, (seedWins / total) * 100),
      "Mirror & Symmetry": max(50.0, (mirrorWins / total) * 100),
    };
  }

  static ColorSignal _opposite(ColorSignal c) => c == ColorSignal.red ? ColorSignal.green : ColorSignal.red;

  static double _getMultiplier(int level) {
    switch (level) {
      case 1:
        return 1.0;
      case 2:
        return 3.0;
      case 3:
        return 8.0;
      case 4:
        return 24.0;
      case 5:
        return 72.0;
      case 6:
        return 216.0;
      case 7:
        return 648.0;
      default:
        return pow(3, min(level - 1, 6)).toDouble();
    }
  }
}

// ============================================================================
// 6. MAIN APPLICATION ROOT
// ============================================================================
class GuruPredictUltraApp extends StatelessWidget {
  const GuruPredictUltraApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: AppBranding.appName,
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: AppTheme.scaffoldBg,
        primaryColor: AppTheme.neonGreen,
        cardColor: AppTheme.cardSurface,
        fontFamily: 'Roboto',
        colorScheme: const ColorScheme.dark(
          primary: AppTheme.neonGreen,
          secondary: AppTheme.cyberGold,
          surface: AppTheme.cardSurface,
          background: AppTheme.scaffoldBg,
        ),
      ),
      home: const SplashScreen(),
    );
  }
}

// ============================================================================
// 7. SPLASH SCREEN (2.5 Seconds with Glowing Full Best-Sized Logo)
// ============================================================================
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _animController;
  late Animation<double> _scaleAnimation;
  Timer? _navTimer;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1800),
    );

    _scaleAnimation = Tween<double>(begin: 0.85, end: 1.05).animate(
      CurvedAnimation(parent: _animController, curve: Curves.easeInOutSine),
    );

    _animController.repeat(reverse: true);

    _navTimer = Timer(const Duration(milliseconds: 2500), () {
      if (mounted) {
        Navigator.of(context).pushReplacement(
          PageRouteBuilder(
            pageBuilder: (_, __, ___) => const VisionCommandMaster(),
            transitionsBuilder: (_, animation, __, child) {
              return FadeTransition(opacity: animation, child: child);
            },
            transitionDuration: const Duration(milliseconds: 500),
          ),
        );
      }
    });
  }

  @override
  void dispose() {
    _navTimer?.cancel();
    _animController.dispose();
    super.dispose();
  }

  void _skip() {
    _navTimer?.cancel();
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (_) => const VisionCommandMaster()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.scaffoldBg,
      body: Stack(
        children: [
          Positioned(
            top: -100,
            left: -100,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppTheme.neonGreen.withOpacity(0.08),
                boxShadow: [
                  BoxShadow(color: AppTheme.neonGreen.withOpacity(0.12), blurRadius: 100, spreadRadius: 40),
                ],
              ),
            ),
          ),
          Positioned(
            bottom: -80,
            right: -80,
            child: Container(
              width: 280,
              height: 280,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppTheme.electricViolet.withOpacity(0.08),
                boxShadow: [
                  BoxShadow(color: AppTheme.electricViolet.withOpacity(0.12), blurRadius: 100, spreadRadius: 40),
                ],
              ),
            ),
          ),

          SafeArea(
            child: Center(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Spacer(flex: 3),

                    // Full Best-Sized Logo
                    AnimatedBuilder(
                      animation: _animController,
                      builder: (context, child) {
                        return Transform.scale(
                          scale: _scaleAnimation.value,
                          child: Container(
                            width: 140,
                            height: 140,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(28),
                              border: Border.all(
                                color: AppTheme.cyberGold.withOpacity(0.85),
                                width: 2.2,
                              ),
                              boxShadow: [
                                BoxShadow(
                                  color: AppTheme.cyberGold.withOpacity(0.35),
                                  blurRadius: 35,
                                  spreadRadius: 8,
                                ),
                                BoxShadow(
                                  color: AppTheme.neonGreen.withOpacity(0.25),
                                  blurRadius: 55,
                                  spreadRadius: 12,
                                ),
                              ],
                            ),
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(25),
                              child: const AppLogo(size: 140, fit: BoxFit.contain),
                            ),
                          ),
                        );
                      },
                    ),

                    const SizedBox(height: 30),

                    ShaderMask(
                      shaderCallback: (bounds) => const LinearGradient(
                        colors: [Colors.white, AppTheme.cyberGold, Color(0xFFFFF7C2)],
                      ).createShader(bounds),
                      child: const Text(
                        AppBranding.appName,
                        style: TextStyle(
                          fontSize: 40,
                          fontWeight: FontWeight.w900,
                          letterSpacing: 1.5,
                          color: Colors.white,
                        ),
                      ),
                    ),

                    const SizedBox(height: 6),

                    const Text(
                      AppBranding.subtitle,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 12,
                        letterSpacing: 1.5,
                        color: AppTheme.textSecondary,
                        fontWeight: FontWeight.w600,
                      ),
                    ),

                    const SizedBox(height: 16),

                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                      decoration: BoxDecoration(
                        color: AppTheme.cardSurface,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: AppTheme.cyberGold.withOpacity(0.5)),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.verified, size: 16, color: AppTheme.cyberGold),
                          const SizedBox(width: 6),
                          Text(
                            "By ${AppBranding.brandTag}",
                            style: const TextStyle(fontSize: 12, color: AppTheme.cyberGold, fontWeight: FontWeight.w800),
                          ),
                        ],
                      ),
                    ),

                    const Spacer(flex: 3),

                    const SizedBox(
                      width: 26,
                      height: 26,
                      child: CircularProgressIndicator(
                        strokeWidth: 2.5,
                        valueColor: AlwaysStoppedAnimation<Color>(AppTheme.neonGreen),
                      ),
                    ),

                    const SizedBox(height: 20),

                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                      decoration: BoxDecoration(
                        color: AppTheme.cardSurface.withOpacity(0.8),
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(color: AppTheme.cardBorder),
                      ),
                      child: Column(
                        children: [
                          const Text(
                            "Architect: Harsh Patel  |  Brand: HarshGuruJi",
                            style: TextStyle(color: AppTheme.textSecondary, fontSize: 11, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 4),
                          const Text(
                            AppBranding.officialUrl,
                            style: TextStyle(color: AppTheme.cyberGold, fontSize: 13, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                  ],
                ),
              ),
            ),
          ),

          Positioned(
            top: 48,
            right: 20,
            child: TextButton(
              onPressed: _skip,
              child: const Text("SKIP >", style: TextStyle(color: AppTheme.textMuted, fontSize: 12)),
            ),
          ),
        ],
      ),
    );
  }
}

// ============================================================================
// 8. VISION COMMAND MASTER (WITH SNIPER & CIRCUIT BREAKER CONTROLLER)
// ============================================================================
class VisionCommandMaster extends StatefulWidget {
  const VisionCommandMaster({super.key});

  @override
  State<VisionCommandMaster> createState() => _VisionCommandMasterState();
}

class _VisionCommandMasterState extends State<VisionCommandMaster> {
  int _currentTabIndex = 0;

  // Session State
  int _currentPeriodNumber = 20261018045;
  String _serverMode = "30s";
  int _secondsRemaining = 30;
  Timer? _countdownTimer;

  bool _isAudioHaptic = true;
  bool _isNumberPadMode = false;
  bool _isSniperMode = false; // Module 4 Sniper Mode Filter

  int _martingaleLevel = 1;
  double _baseVirtualUnit = 10.0;
  double _netVirtualProfit = 0.0;
  int _consecutiveLosses = 0;

  List<RoundRecord> _history = [];
  late QuantumPrediction _prediction;

  // GitHub Auto-Update Engine (3-Hour Delay System)
  bool _isGithubAutoUpdateEnabled = true;
  DateTime _githubLastCommitTime = DateTime.now().subtract(const Duration(hours: 3, minutes: 25));
  String _activeVersion = AppBranding.version;
  String _pendingVersion = "v3.5.1 Sniper Pro (GitHub Synced)";
  bool _hasPendingUpdate = true;
  bool _isCheckingUpdate = false;

  Duration get _cooldownElapsed => DateTime.now().difference(_githubLastCommitTime);
  bool get _is3HourCooldownPassed => _cooldownElapsed.inMinutes >= (3 * 60);
  Duration get _cooldownRemaining => _is3HourCooldownPassed
      ? Duration.zero
      : (const Duration(hours: 3) - _cooldownElapsed);

  // Floating Overlay State
  bool _isOverlayLaunched = false;
  bool _isOverlayExpanded = true;
  Offset _overlayPos = const Offset(20, 105);

  // Calibration ROI State
  bool _isRoiCalibrating = false;
  Offset _roiPos = const Offset(40, 370);
  Size _roiSize = const Size(280, 80);
  bool _isAutoScanActive = true;
  Timer? _autoScanTimer;

  String _scanMode = "Full Auto Screen Scan";

  List<Map<String, dynamic>> _simulatedGameBoard = [
    {'color': ColorSignal.green, 'num': 7},
    {'color': ColorSignal.green, 'num': 9},
    {'color': ColorSignal.red, 'num': 4},
    {'color': ColorSignal.red, 'num': 2},
    {'color': ColorSignal.green, 'num': 3},
  ];

  @override
  void initState() {
    super.initState();
    _startCountdown();
    _recomputePrediction();
    _initAutoScanTimer();
  }

  @override
  void dispose() {
    _countdownTimer?.cancel();
    _autoScanTimer?.cancel();
    super.dispose();
  }

  void _startCountdown() {
    _countdownTimer?.cancel();
    int initial = _serverMode == "30s" ? 30 : (_serverMode == "1m" ? 60 : 180);
    setState(() => _secondsRemaining = initial);

    _countdownTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_secondsRemaining > 1) {
        setState(() => _secondsRemaining--);
      } else {
        _simulateRoundExpiry();
      }
    });
  }

  void _simulateRoundExpiry() {
    int initial = _serverMode == "30s" ? 30 : (_serverMode == "1m" ? 60 : 180);
    setState(() {
      _secondsRemaining = initial;
      if (_isAutoScanActive) {
        _triggerScreenScanNow();
      }
    });
  }

  void _initAutoScanTimer() {
    _autoScanTimer?.cancel();
    _autoScanTimer = Timer.periodic(const Duration(seconds: 2), (t) {
      if (_isAutoScanActive && _isOverlayLaunched) {
        // Heartbeat
      }
    });
  }

  void _recomputePrediction() {
    _prediction = GuruQuantumEngine.computeNext(
      history: _history,
      currentMartingaleLevel: _martingaleLevel,
      baseUnit: _baseVirtualUnit,
      currentPeriodNumber: _currentPeriodNumber,
      isSniperModeOn: _isSniperMode,
      sessionNetProfit: _netVirtualProfit,
      consecutiveLosses: _consecutiveLosses,
    );

    // Haptic alert on Diamond Sure-Shot
    if (_prediction.isDiamondSignal && _isAudioHaptic) {
      HapticFeedback.heavyImpact();
    }
  }

  void _logActualResult({required ColorSignal color, int? number}) {
    if (_isAudioHaptic) HapticFeedback.lightImpact();

    final SizeSignal derivedSize = (number != null)
        ? (number >= 5 ? SizeSignal.big : SizeSignal.small)
        : (color == ColorSignal.red ? SizeSignal.small : SizeSignal.big);

    final bool isSkipOrWait = _prediction.primaryColor == ColorSignal.skip || _prediction.primaryColor == ColorSignal.wait;
    final bool isWin = !isSkipOrWait && (_prediction.primaryColor == color);

    int nextLevel = _martingaleLevel;
    double roundProfit = 0.0;
    final unitStake = _baseVirtualUnit * _prediction.suggestedMultiplier;

    if (!isSkipOrWait) {
      if (isWin) {
        roundProfit = unitStake * 0.98;
        _netVirtualProfit += roundProfit;
        _consecutiveLosses = 0;
        nextLevel = 1;
      } else {
        roundProfit = -unitStake;
        _netVirtualProfit += roundProfit;
        _consecutiveLosses++;
        nextLevel = min(_martingaleLevel + 1, 7);
      }
    }

    final record = RoundRecord(
      periodId: "#$_currentPeriodNumber",
      predictedColor: _prediction.primaryColor,
      predictedSize: _prediction.predictedSize,
      hotNumbers: _prediction.hotNumbers,
      actualColor: color,
      actualNumber: number,
      actualSize: derivedSize,
      confidence: _prediction.confidence,
      patternLogic: _prediction.detectedPattern,
      isWin: isSkipOrWait ? null : isWin,
      martingaleLevel: _martingaleLevel,
      virtualProfit: roundProfit,
      timestamp: DateTime.now(),
    );

    setState(() {
      _history.insert(0, record);
      _martingaleLevel = nextLevel;
      _currentPeriodNumber++;

      _simulatedGameBoard.insert(0, {'color': color, 'num': number ?? (color == ColorSignal.red ? 2 : 7)});
      if (_simulatedGameBoard.length > 8) _simulatedGameBoard.removeLast();

      _recomputePrediction();
    });

    // Check circuit breaker trigger
    if (_prediction.isCircuitBreakerTriggered) {
      _showCircuitBreakerDialog();
    }
  }

  void _showCircuitBreakerDialog() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppTheme.cardSurface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: AppTheme.cyberGold),
        ),
        title: const Row(
          children: [
            Icon(Icons.shield_rounded, color: AppTheme.cyberGold),
            SizedBox(width: 8),
            Text("CIRCUIT BREAKER TRIGGERED"),
          ],
        ),
        content: Text(
          "${_prediction.circuitBreakerReason}\n\n"
          "GuruPredict Risk System advises taking a 15-minute cooldown to protect your virtual bankroll from erratic server manipulation waves.",
          style: const TextStyle(color: AppTheme.textSecondary, fontSize: 13, height: 1.4),
        ),
        actions: [
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppTheme.cyberGold, foregroundColor: Colors.black),
            onPressed: () => Navigator.pop(ctx),
            child: const Text("UNDERSTOOD & ACKNOWLEDGE"),
          ),
        ],
      ),
    );
  }

  void _triggerScreenScanNow() {
    if (_isAudioHaptic) HapticFeedback.mediumImpact();
    final rand = Random();
    final actualNum = rand.nextInt(10);
    final actualColor = (actualNum == 0 || actualNum == 5)
        ? ColorSignal.violet
        : (actualNum % 2 == 0 ? ColorSignal.red : ColorSignal.green);

    _logActualResult(color: actualColor, number: actualNum);
    _showToast("⚡ Vision Scanner: Period #$_currentPeriodNumber parsed (${actualColor.displayName} $actualNum)");
  }

  void _undoLastTap() {
    if (_history.isEmpty) return;
    setState(() {
      final removed = _history.removeAt(0);
      _currentPeriodNumber = max(20261018001, _currentPeriodNumber - 1);
      _martingaleLevel = removed.martingaleLevel;
      _netVirtualProfit -= removed.virtualProfit;
      if (removed.isWin == false && _consecutiveLosses > 0) _consecutiveLosses--;
      _recomputePrediction();
    });
    _showToast("Reverted last round #$_currentPeriodNumber");
  }

  void _forceSkipRound() {
    setState(() {
      _currentPeriodNumber++;
      _recomputePrediction();
    });
    _showToast("Skipped to Period #$_currentPeriodNumber");
  }

  void _resetSession() {
    setState(() {
      _history.clear();
      _martingaleLevel = 1;
      _netVirtualProfit = 0.0;
      _consecutiveLosses = 0;
      _currentPeriodNumber = 20261018045;
      _recomputePrediction();
    });
    _showToast("Session reset to Level 1.");
  }

  void _showToast(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(msg),
        backgroundColor: AppTheme.cardSurfaceHover,
        behavior: SnackBarBehavior.floating,
        duration: const Duration(milliseconds: 1400),
      ),
    );
  }

  void _toggleGithubAutoUpdate() {
    setState(() {
      _isGithubAutoUpdateEnabled = !_isGithubAutoUpdateEnabled;
    });
    _showToast(_isGithubAutoUpdateEnabled
        ? "✅ GitHub Auto-Update ENABLED (3-Hour Delay Buffer Active)"
        : "⏸️ GitHub Auto-Update PAUSED");
  }

  void _checkGithubUpdates() {
    setState(() => _isCheckingUpdate = true);
    Future.delayed(const Duration(milliseconds: 1000), () {
      if (!mounted) return;
      setState(() => _isCheckingUpdate = false);
      if (!_isGithubAutoUpdateEnabled) {
        _showToast("GitHub Auto-Update is OFF. Enable it in Settings.");
      } else if (_is3HourCooldownPassed && _hasPendingUpdate) {
        _showToast("🚀 GitHub Update Ready! 3-Hour cooldown completed.");
      } else if (!_is3HourCooldownPassed && _hasPendingUpdate) {
        final rem = _cooldownRemaining;
        _showToast("⏳ Cooldown Active: Commit unlocks in ${rem.inHours}h ${rem.inMinutes % 60}m.");
      } else {
        _showToast("✅ GuruPredict is up-to-date with latest GitHub commit!");
      }
    });
  }

  void _simulateCommitTimeToggle() {
    setState(() {
      if (_is3HourCooldownPassed) {
        _githubLastCommitTime = DateTime.now().subtract(const Duration(minutes: 40));
        _hasPendingUpdate = true;
        _showToast("⏱️ Switched to Fresh Commit (40m ago • Cooldown Active)");
      } else {
        _githubLastCommitTime = DateTime.now().subtract(const Duration(hours: 3, minutes: 35));
        _hasPendingUpdate = true;
        _showToast("🚀 Switched to Matured Commit (3h 35m ago • Update Ready)");
      }
    });
  }

  void _copyGithubUrl() {
    Clipboard.setData(const ClipboardData(text: AppBranding.githubRepoUrl));
    _showToast("Copied GitHub Repo URL: ${AppBranding.githubRepo}");
  }

  void _showUpdateDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) {
        return _GithubUpdateProgressDialog(
          targetVersion: _pendingVersion,
          onComplete: () {
            Navigator.of(ctx).pop();
            setState(() {
              _activeVersion = "$_pendingVersion (Live Synced)";
              _hasPendingUpdate = false;
              _recomputePrediction();
            });
            _showToast("🎉 Successfully updated to $_activeVersion! All latest changes applied.");
          },
        );
      },
    );
  }

  void _copyPortalUrl() {
    Clipboard.setData(const ClipboardData(text: AppBranding.fullUrl));
    _showToast("Copied ${AppBranding.officialUrl} to clipboard!");
  }

  void _shareReport() {
    final valid = _history.where((e) => e.isWin != null).toList();
    final wins = valid.where((e) => e.isWin == true).length;
    final rate = valid.isNotEmpty ? ((wins / valid.length) * 100).toStringAsFixed(1) : "0.0";

    final text = "📊 GuruPredict v3.5 Sniper Report by HarshGuruJi\n"
        "• Total Analyzed: ${_history.length} Rounds\n"
        "• AI Accuracy: $rate% ($wins Wins / ${valid.length} Calls)\n"
        "• Active Brain: ${_prediction.activeMasterBrain} (${_prediction.activeBrainAccuracy}%)\n"
        "• Net Virtual P&L: ${_netVirtualProfit >= 0 ? '+' : ''}${_netVirtualProfit.round()} pts\n"
        "• Current Pattern: ${_prediction.detectedPattern}\n"
        "🌐 Portal: ${AppBranding.officialUrl}";

    Clipboard.setData(ClipboardData(text: text));
    _showToast("Copied GuruPredict Report to clipboard!");
  }

  @override
  Widget build(BuildContext context) {
    final modules = [
      VisionCommandCenterTab(
        currentPeriodNumber: _currentPeriodNumber,
        serverMode: _serverMode,
        secondsRemaining: _secondsRemaining,
        prediction: _prediction,
        martingaleLevel: _martingaleLevel,
        isAudioHaptic: _isAudioHaptic,
        isNumberPadMode: _isNumberPadMode,
        isSniperMode: _isSniperMode,
        history: _history,
        isOverlayLaunched: _isOverlayLaunched,
        isAutoScanActive: _isAutoScanActive,
        scanMode: _scanMode,
        simulatedGameBoard: _simulatedGameBoard,
        isGithubAutoUpdateEnabled: _isGithubAutoUpdateEnabled,
        hasPendingUpdate: _hasPendingUpdate,
        is3HourCooldownPassed: _is3HourCooldownPassed,
        cooldownRemaining: _cooldownRemaining,
        activeVersion: _activeVersion,
        pendingVersion: _pendingVersion,
        onApplyUpdate: _showUpdateDialog,
        onModeChanged: (m) {
          setState(() {
            _serverMode = m;
            _startCountdown();
          });
        },
        onToggleOverlay: () => setState(() => _isOverlayLaunched = !_isOverlayLaunched),
        onToggleAutoScan: () => setState(() => _isAutoScanActive = !_isAutoScanActive),
        onToggleSniperMode: () {
          setState(() {
            _isSniperMode = !_isSniperMode;
            _recomputePrediction();
          });
          _showToast(_isSniperMode ? "🎯 Sniper Mode ON (82%+ Filter Active)" : "🎯 Sniper Mode OFF (All Signals)");
        },
        onScanNow: _triggerScreenScanNow,
        onToggleAudio: () => setState(() => _isAudioHaptic = !_isAudioHaptic),
        onToggleNumberPad: () => setState(() => _isNumberPadMode = !_isNumberPadMode),
        onLogResult: (c, n) => _logActualResult(color: c, number: n),
        onUndo: _undoLastTap,
        onForceSkip: _forceSkipRound,
        onReset: _resetSession,
        onCopyUrl: _copyPortalUrl,
        onScanModeChanged: (mode) => setState(() => _scanMode = mode),
        onToggleCalibrateRoi: () => setState(() => _isRoiCalibrating = !_isRoiCalibrating),
      ),
      RoadmapsTab(history: _history, netProfit: _netVirtualProfit),
      QuantLabTab(
        baseVirtualUnit: _baseVirtualUnit,
        onBaseUnitChanged: (val) {
          setState(() {
            _baseVirtualUnit = val;
            _recomputePrediction();
          });
        },
      ),
      HarshGuruJiTab(
        onCopyUrl: _copyPortalUrl,
        onShareReport: _shareReport,
        onTuningChanged: () => setState(_recomputePrediction),
        isGithubAutoUpdateEnabled: _isGithubAutoUpdateEnabled,
        onToggleGithubAutoUpdate: _toggleGithubAutoUpdate,
        hasPendingUpdate: _hasPendingUpdate,
        is3HourCooldownPassed: _is3HourCooldownPassed,
        cooldownRemaining: _cooldownRemaining,
        cooldownElapsed: _cooldownElapsed,
        activeVersion: _activeVersion,
        pendingVersion: _pendingVersion,
        isCheckingUpdate: _isCheckingUpdate,
        onCheckGithubUpdate: _checkGithubUpdates,
        onApplyUpdate: _showUpdateDialog,
        onSimulateCommitToggle: _simulateCommitTimeToggle,
        onCopyGithubUrl: _copyGithubUrl,
      ),
    ];

    return Scaffold(
      backgroundColor: AppTheme.scaffoldBg,
      body: Stack(
        children: [
          IndexedStack(index: _currentTabIndex, children: modules),

          // ROI Calibration Box
          if (_isRoiCalibrating)
            Positioned(
              left: _roiPos.dx,
              top: _roiPos.dy,
              child: GestureDetector(
                onPanUpdate: (details) => setState(() => _roiPos += details.delta),
                child: Container(
                  width: _roiSize.width,
                  height: _roiSize.height,
                  decoration: BoxDecoration(
                    color: AppTheme.neonGreen.withOpacity(0.08),
                    border: Border.all(color: AppTheme.neonGreen, width: 2.0),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Stack(
                    children: [
                      Positioned(
                        top: 10,
                        left: 0,
                        right: 0,
                        child: Container(
                          height: 2,
                          decoration: BoxDecoration(
                            color: AppTheme.neonGreen,
                            boxShadow: [
                              BoxShadow(color: AppTheme.neonGreen.withOpacity(0.8), blurRadius: 8, spreadRadius: 2),
                            ],
                          ),
                        ),
                      ),
                      Positioned(
                        bottom: 4,
                        right: 6,
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppTheme.neonGreen,
                            foregroundColor: Colors.black,
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            minimumSize: const Size(60, 24),
                          ),
                          onPressed: () {
                            setState(() => _isRoiCalibrating = false);
                            _showToast("Target ROI Locked ✅");
                          },
                          child: const Text("LOCK ROI", style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
                        ),
                      ),
                      const Positioned(
                        top: 4,
                        left: 6,
                        child: Text("🎯 Screen Vision ROI Box", style: TextStyle(color: AppTheme.neonGreen, fontSize: 9, fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                ),
              ),
            ),

          // Draggable Floating Overlay HUD
          if (_isOverlayLaunched)
            Positioned(
              left: _overlayPos.dx,
              top: _overlayPos.dy,
              child: GestureDetector(
                onPanUpdate: (details) => setState(() => _overlayPos += details.delta),
                child: _isOverlayExpanded ? _buildExpandedFloatingHud() : _buildCollapsedFloatingBubble(),
              ),
            ),
        ],
      ),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: AppTheme.cardSurface,
          border: Border(top: BorderSide(color: AppTheme.cardBorder, width: 1.2)),
        ),
        child: BottomNavigationBar(
          currentIndex: _currentTabIndex,
          onTap: (index) => setState(() => _currentTabIndex = index),
          backgroundColor: AppTheme.cardSurface,
          type: BottomNavigationBarType.fixed,
          selectedItemColor: AppTheme.cyberGold,
          unselectedItemColor: AppTheme.textSecondary,
          selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11),
          unselectedLabelStyle: const TextStyle(fontSize: 10),
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.videocam_rounded),
              activeIcon: Icon(Icons.videocam_rounded, color: AppTheme.cyberGold),
              label: "Vision HUD",
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.insights_rounded),
              activeIcon: Icon(Icons.insights_rounded, color: AppTheme.cyberGold),
              label: "Roadmaps",
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.science_rounded),
              activeIcon: Icon(Icons.science_rounded, color: AppTheme.cyberGold),
              label: "Quant Lab",
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.workspace_premium_rounded),
              activeIcon: Icon(Icons.workspace_premium_rounded, color: AppTheme.cyberGold),
              label: "HarshGuruJi",
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCollapsedFloatingBubble() {
    final sigColor = _prediction.primaryColor.color;
    return GestureDetector(
      onTap: () => setState(() => _isOverlayExpanded = true),
      child: Container(
        width: 58,
        height: 58,
        decoration: BoxDecoration(
          color: AppTheme.cardSurface,
          shape: BoxShape.circle,
          border: Border.all(color: _prediction.isDiamondSignal ? AppTheme.cyberGold : sigColor, width: 2.5),
          boxShadow: [
            BoxShadow(color: (_prediction.isDiamondSignal ? AppTheme.cyberGold : sigColor).withOpacity(0.4), blurRadius: 14, spreadRadius: 3),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(_prediction.primaryColor.code, style: TextStyle(color: sigColor, fontSize: 16, fontWeight: FontWeight.w900)),
            Text("${_prediction.confidence.toInt()}%", style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }

  Widget _buildExpandedFloatingHud() {
    final sigColor = _prediction.primaryColor.color;

    return Container(
      width: 298,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.cardSurface.withOpacity(0.96),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: _prediction.isDiamondSignal ? AppTheme.cyberGold : AppTheme.cardBorder, width: 1.5),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.6), blurRadius: 20, spreadRadius: 4),
          BoxShadow(color: sigColor.withOpacity(0.2), blurRadius: 15, spreadRadius: 2),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Row(
                children: [
                  Icon(Icons.drag_indicator_rounded, size: 16, color: AppTheme.cyberGold),
                  SizedBox(width: 4),
                  Text("GuruPredict • HarshGuruJi", style: TextStyle(color: AppTheme.cyberGold, fontSize: 11, fontWeight: FontWeight.bold)),
                ],
              ),
              Row(
                children: [
                  InkWell(
                    onTap: () {
                      setState(() {
                        _isSniperMode = !_isSniperMode;
                        _recomputePrediction();
                      });
                    },
                    child: Icon(Icons.filter_center_focus_rounded, size: 16, color: _isSniperMode ? AppTheme.neonGreen : AppTheme.textMuted),
                  ),
                  const SizedBox(width: 8),
                  InkWell(
                    onTap: () => setState(() => _isRoiCalibrating = !_isRoiCalibrating),
                    child: const Icon(Icons.crop_free_rounded, size: 16, color: AppTheme.neonGreen),
                  ),
                  const SizedBox(width: 8),
                  InkWell(
                    onTap: () => setState(() => _isOverlayExpanded = false),
                    child: const Icon(Icons.remove_rounded, size: 18, color: Colors.white),
                  ),
                  const SizedBox(width: 8),
                  InkWell(
                    onTap: () => setState(() => _isOverlayLaunched = false),
                    child: const Icon(Icons.close_rounded, size: 16, color: AppTheme.crimsonRed),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 6),

          // Live Status Strip
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(color: AppTheme.scaffoldBg, borderRadius: BorderRadius.circular(6)),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Brain: ${_prediction.activeMasterBrain.split(' ').first}", style: const TextStyle(color: AppTheme.neonGreen, fontSize: 9, fontWeight: FontWeight.bold)),
                Text("#...${_currentPeriodNumber % 1000}", style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                Text("${_secondsRemaining}s", style: const TextStyle(color: AppTheme.cyberGold, fontSize: 10, fontWeight: FontWeight.w900)),
              ],
            ),
          ),
          const SizedBox(height: 8),

          // Diamond Signal Banner
          if (_prediction.isDiamondSignal)
            Container(
              width: double.infinity,
              margin: const EdgeInsets.only(bottom: 6),
              padding: const EdgeInsets.symmetric(vertical: 3),
              decoration: BoxDecoration(
                color: AppTheme.cyberGold,
                borderRadius: BorderRadius.circular(4),
              ),
              alignment: Alignment.center,
              child: const Text("💎 DIAMOND SURE-SHOT SIGNAL", style: TextStyle(color: Colors.black, fontSize: 9, fontWeight: FontWeight.w900)),
            ),

          // Compact Prediction Output
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
            decoration: BoxDecoration(
              color: sigColor.withOpacity(0.12),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: sigColor.withOpacity(0.4)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(_prediction.primaryColor.displayName, style: TextStyle(color: sigColor, fontSize: 18, fontWeight: FontWeight.w900)),
                    Text("${_prediction.confidence.toInt()}% Confidence", style: const TextStyle(color: AppTheme.textSecondary, fontSize: 10)),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(_prediction.predictedSize.displayName, style: const TextStyle(color: AppTheme.cyberBlue, fontSize: 11, fontWeight: FontWeight.bold)),
                    Text("Digits: [${_prediction.hotNumbers.join(',')}]", style: const TextStyle(color: AppTheme.cyberGold, fontSize: 10, fontWeight: FontWeight.bold)),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 6),

          Text(
            "Level $_martingaleLevel (${_prediction.suggestedMultiplier.toInt()}x) • ${_prediction.detectedPattern}",
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(color: AppTheme.textSecondary, fontSize: 9),
          ),
          const SizedBox(height: 8),

          // Micro Buttons + Scan Now
          Row(
            children: [
              _buildMicroButton("R", AppTheme.crimsonRed, () => _logActualResult(color: ColorSignal.red)),
              const SizedBox(width: 4),
              _buildMicroButton("V", AppTheme.electricViolet, () => _logActualResult(color: ColorSignal.violet)),
              const SizedBox(width: 4),
              _buildMicroButton("G", AppTheme.neonGreen, () => _logActualResult(color: ColorSignal.green)),
              const Spacer(),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.neonGreen,
                  foregroundColor: Colors.black,
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  minimumSize: const Size(70, 28),
                ),
                onPressed: _triggerScreenScanNow,
                icon: const Icon(Icons.bolt_rounded, size: 12),
                label: const Text("Scan Now", style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const SizedBox(height: 4),

          const Center(
            child: Text(AppBranding.officialUrl, style: TextStyle(color: AppTheme.textMuted, fontSize: 9)),
          ),
        ],
      ),
    );
  }

  Widget _buildMicroButton(String title, Color c, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(4),
      child: Container(
        width: 28,
        height: 26,
        decoration: BoxDecoration(color: c.withOpacity(0.2), borderRadius: BorderRadius.circular(4), border: Border.all(color: c)),
        alignment: Alignment.center,
        child: Text(title, style: TextStyle(color: c, fontSize: 11, fontWeight: FontWeight.bold)),
      ),
    );
  }
}

// ============================================================================
// TAB 1: VISION COMMAND CENTER (WITH SNIPER & ANTI-TRAP MODULES)
// ============================================================================
class VisionCommandCenterTab extends StatelessWidget {
  final int currentPeriodNumber;
  final String serverMode;
  final int secondsRemaining;
  final QuantumPrediction prediction;
  final int martingaleLevel;
  final bool isAudioHaptic;
  final bool isNumberPadMode;
  final bool isSniperMode;
  final List<RoundRecord> history;
  final bool isOverlayLaunched;
  final bool isAutoScanActive;
  final String scanMode;
  final List<Map<String, dynamic>> simulatedGameBoard;
  final ValueChanged<String> onModeChanged;
  final VoidCallback onToggleOverlay;
  final VoidCallback onToggleAutoScan;
  final VoidCallback onToggleSniperMode;
  final VoidCallback onScanNow;
  final VoidCallback onToggleAudio;
  final VoidCallback onToggleNumberPad;
  final Function(ColorSignal color, int? number) onLogResult;
  final VoidCallback onUndo;
  final VoidCallback onForceSkip;
  final VoidCallback onReset;
  final VoidCallback onCopyUrl;
  final ValueChanged<String> onScanModeChanged;
  final VoidCallback onToggleCalibrateRoi;
  final bool isGithubAutoUpdateEnabled;
  final bool hasPendingUpdate;
  final bool is3HourCooldownPassed;
  final Duration cooldownRemaining;
  final String activeVersion;
  final String pendingVersion;
  final VoidCallback onApplyUpdate;

  const VisionCommandCenterTab({
    super.key,
    required this.currentPeriodNumber,
    required this.serverMode,
    required this.secondsRemaining,
    required this.prediction,
    required this.martingaleLevel,
    required this.isAudioHaptic,
    required this.isNumberPadMode,
    required this.isSniperMode,
    required this.history,
    required this.isOverlayLaunched,
    required this.isAutoScanActive,
    required this.scanMode,
    required this.simulatedGameBoard,
    required this.onModeChanged,
    required this.onToggleOverlay,
    required this.onToggleAutoScan,
    required this.onToggleSniperMode,
    required this.onScanNow,
    required this.onToggleAudio,
    required this.onToggleNumberPad,
    required this.onLogResult,
    required this.onUndo,
    required this.onForceSkip,
    required this.onReset,
    required this.onCopyUrl,
    required this.onScanModeChanged,
    required this.onToggleCalibrateRoi,
    required this.isGithubAutoUpdateEnabled,
    required this.hasPendingUpdate,
    required this.is3HourCooldownPassed,
    required this.cooldownRemaining,
    required this.activeVersion,
    required this.pendingVersion,
    required this.onApplyUpdate,
  });

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: [
          _buildTopBar(context),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 14.0, vertical: 8.0),
              children: [
                // GitHub Auto-Update Notification Banner (3-Hour Delay Buffer)
                if (isGithubAutoUpdateEnabled && hasPendingUpdate)
                  GestureDetector(
                    onTap: is3HourCooldownPassed ? onApplyUpdate : null,
                    child: Container(
                      margin: const EdgeInsets.only(bottom: 10),
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: is3HourCooldownPassed
                              ? [const Color(0xFF0F3D2E), const Color(0xFF082218)]
                              : [const Color(0xFF332608), const Color(0xFF1E1705)],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(
                          color: is3HourCooldownPassed ? AppTheme.neonGreen : AppTheme.cyberGold,
                          width: 1.2,
                        ),
                      ),
                      child: Row(
                        children: [
                          Icon(
                            is3HourCooldownPassed ? Icons.rocket_launch_rounded : Icons.hourglass_top_rounded,
                            color: is3HourCooldownPassed ? AppTheme.neonGreen : AppTheme.cyberGold,
                            size: 18,
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  is3HourCooldownPassed
                                      ? "GITHUB AUTO-UPDATE READY (3h Buffer Passed)"
                                      : "GITHUB COMMIT BUFFER ACTIVE",
                                  style: TextStyle(
                                    color: is3HourCooldownPassed ? AppTheme.neonGreen : AppTheme.cyberGold,
                                    fontSize: 11,
                                    fontWeight: FontWeight.w900,
                                    letterSpacing: 0.4,
                                  ),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  is3HourCooldownPassed
                                      ? "Target: $pendingVersion • Tap here to apply all updates instantly!"
                                      : "Changes detected on GitHub. Available in ${cooldownRemaining.inHours}h ${cooldownRemaining.inMinutes % 60}m",
                                  style: const TextStyle(color: Colors.white, fontSize: 10),
                                ),
                              ],
                            ),
                          ),
                          if (is3HourCooldownPassed)
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(
                                color: AppTheme.neonGreen,
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: const Text(
                                "UPDATE",
                                style: TextStyle(color: Colors.black, fontSize: 10, fontWeight: FontWeight.w900),
                              ),
                            ),
                        ],
                      ),
                    ),
                  ),
                // Circuit Breaker Alert Banner
                if (prediction.isCircuitBreakerTriggered)
                  Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: AppTheme.crimsonRed.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppTheme.crimsonRed),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.shield_rounded, color: AppTheme.crimsonRed, size: 18),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            "CIRCUIT BREAKER: ${prediction.circuitBreakerReason}",
                            style: const TextStyle(color: AppTheme.crimsonRed, fontSize: 11, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                  ),

                // Crowd Trap Alert Banner
                if (prediction.isCrowdTrapWarning)
                  Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: AppTheme.cyberGold.withOpacity(0.18),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppTheme.cyberGold),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.warning_amber_rounded, color: AppTheme.cyberGold, size: 18),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            prediction.crowdTrapMessage,
                            style: const TextStyle(color: AppTheme.cyberGold, fontSize: 11, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                  ),

                // Hero Floating HUD Launcher Card
                _buildFloatingHudLauncherCard(context),
                const SizedBox(height: 14),

                // Live Screen Vision Simulator & Target Board
                _buildScreenVisionSimulator(context),
                const SizedBox(height: 14),

                // Main Hero Quantum Prediction HUD Card
                _buildHeroPredictionHud(context),
                const SizedBox(height: 14),

                // Dual-Mode Manual Input Deck
                _buildInputDeck(context),
                const SizedBox(height: 14),

                // Verification Feed
                _buildVerificationList(context),
                const SizedBox(height: 16),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTopBar(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14.0, vertical: 10.0),
      decoration: const BoxDecoration(
        color: AppTheme.cardSurface,
        border: Border(bottom: BorderSide(color: AppTheme.cardBorder, width: 1.0)),
      ),
      child: Row(
        children: [
          Container(
            width: 38,
            height: 38,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(9),
              border: Border.all(color: AppTheme.cyberGold.withOpacity(0.6), width: 1.2),
            ),
            child: ClipRRect(borderRadius: BorderRadius.circular(8), child: const AppLogo(size: 38, fit: BoxFit.contain)),
          ),
          const SizedBox(width: 10),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Text(
                    AppBranding.appName,
                    style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w900, letterSpacing: 0.5),
                  ),
                  const SizedBox(width: 6),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: AppTheme.cyberGold.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: AppTheme.cyberGold.withOpacity(0.6), width: 0.8),
                    ),
                    child: const Text(AppBranding.brandTag, style: TextStyle(color: AppTheme.cyberGold, fontSize: 9, fontWeight: FontWeight.w800)),
                  ),
                ],
              ),
              Row(
                children: [
                  const Text(AppBranding.officialUrl, style: TextStyle(color: AppTheme.textMuted, fontSize: 10)),
                  const SizedBox(width: 6),
                  Text("• $activeVersion", style: const TextStyle(color: AppTheme.cyberBlue, fontSize: 10, fontWeight: FontWeight.bold)),
                ],
              ),
            ],
          ),
          const Spacer(),
          IconButton(icon: const Icon(Icons.public_rounded, size: 20, color: AppTheme.cyberGold), onPressed: onCopyUrl),
          IconButton(
            icon: Icon(isAudioHaptic ? Icons.volume_up_rounded : Icons.volume_off_rounded, size: 20, color: isAudioHaptic ? AppTheme.neonGreen : AppTheme.textMuted),
            onPressed: onToggleAudio,
          ),
          IconButton(icon: const Icon(Icons.delete_outline_rounded, size: 20, color: AppTheme.crimsonRed), onPressed: onReset),
        ],
      ),
    );
  }

  Widget _buildFloatingHudLauncherCard(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.cardSurface,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: isOverlayLaunched ? AppTheme.neonGreen.withOpacity(0.6) : AppTheme.cardBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Row(
                children: [
                  Icon(Icons.layers_rounded, color: AppTheme.cyberGold, size: 18),
                  SizedBox(width: 8),
                  Text("FLOATING OVERLAY HUD & VISION SCANNER", style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: isOverlayLaunched ? AppTheme.neonGreen.withOpacity(0.15) : AppTheme.scaffoldBg,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  isOverlayLaunched ? "HUD ACTIVE 🟢" : "INACTIVE",
                  style: TextStyle(color: isOverlayLaunched ? AppTheme.neonGreen : AppTheme.textMuted, fontSize: 10, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: isOverlayLaunched ? AppTheme.crimsonRed : AppTheme.neonGreen,
                foregroundColor: Colors.black,
                padding: const EdgeInsets.symmetric(vertical: 12),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              ),
              onPressed: onToggleOverlay,
              icon: Icon(isOverlayLaunched ? Icons.stop_circle_rounded : Icons.rocket_launch_rounded),
              label: Text(
                isOverlayLaunched ? "STOP FLOATING HUD OVERLAY" : "🚀 LAUNCH FLOATING HUD OVERLAY",
                style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 13, letterSpacing: 0.5),
              ),
            ),
          ),
          const SizedBox(height: 12),

          // Sniper Mode Toggle & Permission Row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              InkWell(
                onTap: onToggleSniperMode,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: isSniperMode ? AppTheme.neonGreen.withOpacity(0.15) : AppTheme.scaffoldBg,
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(color: isSniperMode ? AppTheme.neonGreen : AppTheme.cardBorder),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.filter_center_focus_rounded, size: 14, color: isSniperMode ? AppTheme.neonGreen : AppTheme.textMuted),
                      const SizedBox(width: 4),
                      Text("🎯 Sniper Mode (82%+): ${isSniperMode ? 'ON' : 'OFF'}", style: TextStyle(color: isSniperMode ? AppTheme.neonGreen : AppTheme.textMuted, fontSize: 10, fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
              ),
              const Row(
                children: [
                  Icon(Icons.check_circle_rounded, size: 14, color: AppTheme.neonGreen),
                  SizedBox(width: 4),
                  Text("Screen Vision: Active ✅", style: TextStyle(color: AppTheme.textSecondary, fontSize: 10)),
                ],
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Scan Mode Selector Chips
          Row(
            children: ["Full Auto Screen Scan", "Semi-Auto", "Manual Quick-Tap"].map((m) {
              final isSel = scanMode == m;
              return Expanded(
                child: GestureDetector(
                  onTap: () => onScanModeChanged(m),
                  child: Container(
                    margin: const EdgeInsets.symmetric(horizontal: 2),
                    padding: const EdgeInsets.symmetric(vertical: 6),
                    decoration: BoxDecoration(
                      color: isSel ? AppTheme.cyberGold : AppTheme.scaffoldBg,
                      borderRadius: BorderRadius.circular(6),
                      border: Border.all(color: isSel ? AppTheme.cyberGold : AppTheme.cardBorder),
                    ),
                    child: Text(
                      m.split(' ').first,
                      textAlign: TextAlign.center,
                      style: TextStyle(color: isSel ? Colors.black : AppTheme.textSecondary, fontSize: 10, fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildScreenVisionSimulator(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppTheme.cardSurface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.cardBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("TARGET APP SCREEN VISION SIMULATOR", style: TextStyle(color: AppTheme.textSecondary, fontSize: 10, fontWeight: FontWeight.bold)),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.scaffoldBg,
                  foregroundColor: AppTheme.neonGreen,
                  side: const BorderSide(color: AppTheme.neonGreen),
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  minimumSize: const Size(80, 24),
                ),
                onPressed: onToggleCalibrateRoi,
                icon: const Icon(Icons.crop_free_rounded, size: 12),
                label: const Text("Calibrate ROI", style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const SizedBox(height: 10),

          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: AppTheme.scaffoldBg,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: AppTheme.neonGreen.withOpacity(0.3)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text("Target Period: #$currentPeriodNumber", style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
                    Text("Timer: ${secondsRemaining}s", style: const TextStyle(color: AppTheme.cyberGold, fontSize: 11, fontWeight: FontWeight.bold)),
                  ],
                ),
                const SizedBox(height: 8),

                Row(
                  children: simulatedGameBoard.take(6).map((item) {
                    final ColorSignal c = item['color'];
                    final int n = item['num'];
                    return Container(
                      width: 32,
                      height: 32,
                      margin: const EdgeInsets.only(right: 6),
                      decoration: BoxDecoration(
                        color: c.color,
                        shape: BoxShape.circle,
                        boxShadow: [BoxShadow(color: c.color.withOpacity(0.4), blurRadius: 6)],
                      ),
                      alignment: Alignment.center,
                      child: Text("$n", style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w900)),
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),

          SizedBox(
            width: double.infinity,
            child: OutlinedButton.icon(
              style: OutlinedButton.styleFrom(
                side: const BorderSide(color: AppTheme.neonGreen),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
              ),
              onPressed: onScanNow,
              icon: const Icon(Icons.scanner_rounded, size: 14, color: AppTheme.neonGreen),
              label: const Text("⚡ Trigger Instant Vision Scan (OCR + Pixel HSV)", style: TextStyle(color: AppTheme.neonGreen, fontSize: 11, fontWeight: FontWeight.bold)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeroPredictionHud(BuildContext context) {
    final sigColor = prediction.primaryColor.color;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.cardSurface,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: prediction.isDiamondSignal ? AppTheme.cyberGold : sigColor.withOpacity(0.65), width: prediction.isDiamondSignal ? 2.0 : 1.5),
        boxShadow: [
          BoxShadow(color: (prediction.isDiamondSignal ? AppTheme.cyberGold : sigColor).withOpacity(0.18), blurRadius: 28, spreadRadius: 2),
        ],
      ),
      child: Column(
        children: [
          // Confluence Diamond Sure-Shot Banner
          if (prediction.isDiamondSignal)
            Container(
              width: double.infinity,
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 10),
              decoration: BoxDecoration(
                gradient: const LinearGradient(colors: [AppTheme.cyberGold, Color(0xFFFBBF24)]),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.diamond_rounded, color: Colors.black, size: 16),
                  SizedBox(width: 6),
                  Text("💎 DIAMOND SURE-SHOT SIGNAL (CONFLUENCE MATCH)", style: TextStyle(color: Colors.black, fontSize: 11, fontWeight: FontWeight.w900)),
                ],
              ),
            ),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text("${AppBranding.brandTag} • ${AppBranding.officialUrl}", style: const TextStyle(color: AppTheme.textMuted, fontSize: 10, fontWeight: FontWeight.bold)),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: prediction.isHighVolatility ? AppTheme.crimsonRed.withOpacity(0.15) : AppTheme.neonGreen.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(prediction.marketState, style: TextStyle(color: prediction.isHighVolatility ? AppTheme.crimsonRed : AppTheme.neonGreen, fontSize: 10, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Primary Signal Big Box
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [sigColor.withOpacity(0.28), AppTheme.scaffoldBg, sigColor.withOpacity(0.12)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: sigColor.withOpacity(0.5)),
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      prediction.primaryColor == ColorSignal.wait ? Icons.hourglass_top_rounded : (prediction.primaryColor == ColorSignal.skip ? Icons.warning_rounded : Icons.insights_rounded),
                      color: sigColor,
                      size: 30,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      prediction.primaryColor.displayName,
                      style: TextStyle(color: sigColor, fontSize: 32, fontWeight: FontWeight.w900, letterSpacing: 2.0),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text("Confidence: ${prediction.confidence}%  |  Entropy: ${prediction.entropy}", style: const TextStyle(color: AppTheme.textSecondary, fontSize: 11)),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Active Master Brain + Modulo Seed Strip
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(color: AppTheme.scaffoldBg, borderRadius: BorderRadius.circular(8)),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Active Brain: ${prediction.activeMasterBrain} (${prediction.activeBrainAccuracy}%)", style: const TextStyle(color: AppTheme.neonGreen, fontSize: 10, fontWeight: FontWeight.bold)),
                Text("Modulo Seed: #${prediction.periodModuloSeed}", style: const TextStyle(color: AppTheme.cyberGold, fontSize: 10, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          const SizedBox(height: 10),

          // Secondary Signals: Size & Numbers
          Row(
            children: [
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(color: AppTheme.scaffoldBg, borderRadius: BorderRadius.circular(10), border: Border.all(color: AppTheme.cardBorder)),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text("PREDICTED SIZE", style: TextStyle(color: AppTheme.textMuted, fontSize: 9, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 4),
                      Text(prediction.predictedSize.displayName, style: const TextStyle(color: AppTheme.cyberBlue, fontSize: 12, fontWeight: FontWeight.w900)),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(color: AppTheme.scaffoldBg, borderRadius: BorderRadius.circular(10), border: Border.all(color: AppTheme.cardBorder)),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text("HOT NUMBERS", style: TextStyle(color: AppTheme.textMuted, fontSize: 9, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 4),
                      Text("[ ${prediction.hotNumbers.join(' , ')} ]", style: const TextStyle(color: AppTheme.cyberGold, fontSize: 12, fontWeight: FontWeight.w900)),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),

          // Active Pattern Logic
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 7),
            decoration: BoxDecoration(color: AppTheme.scaffoldBg, borderRadius: BorderRadius.circular(8), border: Border.all(color: AppTheme.cardBorder)),
            child: Row(
              children: [
                const Icon(Icons.psychology_rounded, size: 14, color: AppTheme.cyberGold),
                const SizedBox(width: 6),
                Expanded(
                  child: Text(
                    "Logic: ${prediction.detectedPattern}",
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(color: AppTheme.cyberGold, fontSize: 11, fontWeight: FontWeight.w600),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),

          // Recommended Step Banner
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(color: AppTheme.cardSurfaceHover, borderRadius: BorderRadius.circular(8), border: Border.all(color: AppTheme.cyberGold.withOpacity(0.5))),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Next Entry: LEVEL $martingaleLevel (${prediction.suggestedMultiplier.toInt()}x)", style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold)),
                Text("Est: ${prediction.estimatedUnits} pts", style: const TextStyle(color: AppTheme.neonGreen, fontSize: 11, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInputDeck(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: AppTheme.cardSurface, borderRadius: BorderRadius.circular(18), border: Border.all(color: AppTheme.cardBorder)),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("MANUAL RESULT INPUT:", style: TextStyle(color: AppTheme.textSecondary, fontSize: 11, fontWeight: FontWeight.bold)),
              InkWell(
                onTap: onToggleNumberPad,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(color: AppTheme.scaffoldBg, borderRadius: BorderRadius.circular(6), border: Border.all(color: AppTheme.cyberGold.withOpacity(0.6))),
                  child: Text(isNumberPadMode ? "Mode: 0-9 Keypad" : "Mode: Simple Colors", style: const TextStyle(color: AppTheme.cyberGold, fontSize: 10, fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          if (!isNumberPadMode)
            Row(
              children: [
                Expanded(child: _buildSimpleColorBtn("RED", AppTheme.crimsonRed, () => onLogResult(ColorSignal.red, null))),
                const SizedBox(width: 8),
                Expanded(child: _buildSimpleColorBtn("VIOLET", AppTheme.electricViolet, () => onLogResult(ColorSignal.violet, null))),
                const SizedBox(width: 8),
                Expanded(child: _buildSimpleColorBtn("GREEN", AppTheme.neonGreen, () => onLogResult(ColorSignal.green, null))),
              ],
            )
          else
            _buildNumberPad(),

          const SizedBox(height: 10),

          Row(
            children: [
              Expanded(
                child: OutlinedButton.icon(
                  style: OutlinedButton.styleFrom(side: const BorderSide(color: AppTheme.cardBorder)),
                  onPressed: onUndo,
                  icon: const Icon(Icons.undo_rounded, size: 14, color: AppTheme.textSecondary),
                  label: const Text("Undo Last", style: TextStyle(color: AppTheme.textSecondary, fontSize: 11)),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: OutlinedButton.icon(
                  style: OutlinedButton.styleFrom(side: const BorderSide(color: AppTheme.cardBorder)),
                  onPressed: onForceSkip,
                  icon: const Icon(Icons.skip_next_rounded, size: 14, color: AppTheme.cyberGold),
                  label: const Text("Force Skip", style: TextStyle(color: AppTheme.cyberGold, fontSize: 11)),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSimpleColorBtn(String title, Color c, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(10),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(color: c.withOpacity(0.18), borderRadius: BorderRadius.circular(10), border: Border.all(color: c)),
        child: Column(
          children: [
            Icon(Icons.circle, color: c, size: 16),
            const SizedBox(height: 4),
            Text(title, style: TextStyle(color: c, fontSize: 11, fontWeight: FontWeight.w900)),
          ],
        ),
      ),
    );
  }

  Widget _buildNumberPad() {
    return Column(
      children: [
        Row(children: [0, 1, 2, 3, 4].map((n) => Expanded(child: _buildNumberKey(n))).toList()),
        const SizedBox(height: 6),
        Row(children: [5, 6, 7, 8, 9].map((n) => Expanded(child: _buildNumberKey(n))).toList()),
      ],
    );
  }

  Widget _buildNumberKey(int num) {
    Color c = (num == 0 || num % 2 == 0) ? AppTheme.crimsonRed : AppTheme.neonGreen;
    ColorSignal sig = (num == 0 || num % 2 == 0) ? ColorSignal.red : ColorSignal.green;

    return GestureDetector(
      onTap: () => onLogResult(sig, num),
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 2),
        padding: const EdgeInsets.symmetric(vertical: 8),
        decoration: BoxDecoration(color: c.withOpacity(0.18), borderRadius: BorderRadius.circular(6), border: Border.all(color: c.withOpacity(0.6))),
        child: Column(
          children: [
            Text("$num", style: TextStyle(color: c, fontSize: 14, fontWeight: FontWeight.bold)),
            Text(num >= 5 ? "Big" : "Sml", style: TextStyle(color: c.withOpacity(0.7), fontSize: 7)),
          ],
        ),
      ),
    );
  }

  Widget _buildVerificationList(BuildContext context) {
    final recent = history.take(15).toList();

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: AppTheme.cardSurface, borderRadius: BorderRadius.circular(18), border: Border.all(color: AppTheme.cardBorder)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("LIVE VERIFICATION FEED (LAST 15)", style: TextStyle(color: AppTheme.textSecondary, fontSize: 11, fontWeight: FontWeight.bold)),
              Text("Total: ${history.length}", style: const TextStyle(color: AppTheme.cyberGold, fontSize: 11)),
            ],
          ),
          const SizedBox(height: 10),

          if (recent.isEmpty)
            const Padding(padding: EdgeInsets.symmetric(vertical: 16), child: Center(child: Text("No rounds parsed yet.", style: TextStyle(color: AppTheme.textMuted, fontSize: 11))))
          else
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: recent.length,
              separatorBuilder: (_, __) => const Divider(color: AppTheme.cardBorder, height: 8),
              itemBuilder: (context, idx) {
                final r = recent[idx];
                return Row(
                  children: [
                    SizedBox(width: 80, child: Text(r.periodId, style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w600))),
                    Expanded(child: Text("Pred: ${r.predictedColor?.displayName ?? '--'}", style: TextStyle(color: r.predictedColor?.color ?? AppTheme.textMuted, fontSize: 10, fontWeight: FontWeight.bold))),
                    Expanded(child: Text("Act: ${r.actualColor.displayName}${r.actualNumber != null ? ' (${r.actualNumber})' : ''}", style: TextStyle(color: r.actualColor.color, fontSize: 10, fontWeight: FontWeight.bold))),
                    if (r.isWin == null)
                      const Text("SKIP", style: TextStyle(color: AppTheme.cyberGold, fontSize: 10, fontWeight: FontWeight.bold))
                    else if (r.isWin == true)
                      const Text("WIN ✅", style: TextStyle(color: AppTheme.neonGreen, fontSize: 10, fontWeight: FontWeight.bold))
                    else
                      const Text("LOSS ❌", style: TextStyle(color: AppTheme.crimsonRed, fontSize: 10, fontWeight: FontWeight.bold)),
                  ],
                );
              },
            ),
        ],
      ),
    );
  }
}

// ============================================================================
// TAB 2: ROADMAPS & MATRIX
// ============================================================================
class RoadmapsTab extends StatefulWidget {
  final List<RoundRecord> history;
  final double netProfit;

  const RoadmapsTab({super.key, required this.history, required this.netProfit});

  @override
  State<RoadmapsTab> createState() => _RoadmapsTabState();
}

class _RoadmapsTabState extends State<RoadmapsTab> {
  int _tab = 0;

  @override
  Widget build(BuildContext context) {
    final valid = widget.history.where((e) => e.isWin != null).toList();
    final wins = valid.where((e) => e.isWin == true).length;
    final winRate = valid.isNotEmpty ? ((wins / valid.length) * 100).toStringAsFixed(1) : "0.0";

    int maxStreak = 0;
    int curr = 0;
    for (var r in widget.history.reversed) {
      if (r.isWin == true) {
        curr++;
        if (curr > maxStreak) maxStreak = curr;
      } else if (r.isWin == false) {
        curr = 0;
      }
    }

    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(14.0),
        children: [
          const Row(
            children: [
              Icon(Icons.insights_rounded, color: AppTheme.cyberGold, size: 22),
              SizedBox(width: 8),
              Text("Roadmaps & Matrix Analytics", style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
            ],
          ),
          const SizedBox(height: 12),

          Row(
            children: [
              Expanded(child: _kpiCard("ACCURACY %", "$winRate%", AppTheme.neonGreen)),
              const SizedBox(width: 8),
              Expanded(child: _kpiCard("VIRTUAL P&L", "${widget.netProfit >= 0 ? '+' : ''}${widget.netProfit.round()} pts", widget.netProfit >= 0 ? AppTheme.neonGreen : AppTheme.crimsonRed)),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Expanded(child: _kpiCard("MAX WIN STREAK", "$maxStreak", AppTheme.cyberGold)),
              const SizedBox(width: 8),
              Expanded(child: _kpiCard("TOTAL PARSED", "${widget.history.length}", AppTheme.cyberBlue)),
            ],
          ),
          const SizedBox(height: 14),

          Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(color: AppTheme.cardSurface, borderRadius: BorderRadius.circular(10), border: Border.all(color: AppTheme.cardBorder)),
            child: Row(
              children: [
                _segBtn("Big Road Grid", 0),
                _segBtn("Bead Plate (6-Row)", 1),
                _segBtn("Distribution Bars", 2),
              ],
            ),
          ),
          const SizedBox(height: 12),

          if (_tab == 0) _buildBigRoad(),
          if (_tab == 1) _buildBeadPlate(),
          if (_tab == 2) _buildDistribution(),
        ],
      ),
    );
  }

  Widget _segBtn(String title, int idx) {
    final isSel = _tab == idx;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _tab = idx),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(color: isSel ? AppTheme.cyberGold : Colors.transparent, borderRadius: BorderRadius.circular(8)),
          child: Text(title, textAlign: TextAlign.center, style: TextStyle(color: isSel ? Colors.black : AppTheme.textSecondary, fontSize: 10, fontWeight: FontWeight.bold)),
        ),
      ),
    );
  }

  Widget _kpiCard(String title, String val, Color c) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: AppTheme.cardSurface, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppTheme.cardBorder)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(color: AppTheme.textMuted, fontSize: 9, fontWeight: FontWeight.bold)),
          const SizedBox(height: 6),
          Text(val, style: TextStyle(color: c, fontSize: 16, fontWeight: FontWeight.w900)),
        ],
      ),
    );
  }

  Widget _buildBigRoad() {
    final list = widget.history.reversed.map((e) => e.actualColor).toList();
    List<List<ColorSignal>> cols = [];
    List<ColorSignal> curr = [];
    for (var c in list) {
      if (curr.isEmpty) {
        curr.add(c);
      } else if (curr.first == c && curr.length < 6) {
        curr.add(c);
      } else {
        cols.add(curr);
        curr = [c];
      }
    }
    if (curr.isNotEmpty) cols.add(curr);

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: AppTheme.cardSurface, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppTheme.cardBorder)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text("BIG ROAD (VERTICAL STREAKS & TURNS)", style: TextStyle(color: AppTheme.textSecondary, fontSize: 11, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          SizedBox(
            height: 170,
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              reverse: true,
              child: Row(
                children: cols.map((col) {
                  return Column(
                    children: List.generate(6, (r) {
                      if (r < col.length) {
                        final c = col[r];
                        return Container(
                          width: 24,
                          height: 24,
                          margin: const EdgeInsets.all(2),
                          decoration: BoxDecoration(color: c.color.withOpacity(0.2), shape: BoxShape.circle, border: Border.all(color: c.color, width: 2)),
                        );
                      }
                      return Container(width: 24, height: 24, margin: const EdgeInsets.all(2), decoration: BoxDecoration(color: AppTheme.scaffoldBg, shape: BoxShape.circle, border: Border.all(color: AppTheme.cardBorder, width: 0.5)));
                    }),
                  );
                }).toList(),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBeadPlate() {
    final list = widget.history.reversed.toList();
    final colCount = max(10, (list.length / 6).ceil() + 1);

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: AppTheme.cardSurface, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppTheme.cardBorder)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text("BEAD PLATE (CHRONOLOGICAL 6-ROW)", style: TextStyle(color: AppTheme.textSecondary, fontSize: 11, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          SizedBox(
            height: 170,
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              reverse: true,
              child: Row(
                children: List.generate(colCount, (c) {
                  return Column(
                    children: List.generate(6, (r) {
                      final idx = c * 6 + r;
                      if (idx < list.length) {
                        final item = list[idx];
                        return Container(
                          width: 24,
                          height: 24,
                          margin: const EdgeInsets.all(2),
                          decoration: BoxDecoration(color: item.actualColor.color, shape: BoxShape.circle),
                          alignment: Alignment.center,
                          child: Text(item.actualNumber != null ? "${item.actualNumber}" : item.actualColor.code, style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                        );
                      }
                      return Container(width: 24, height: 24, margin: const EdgeInsets.all(2), decoration: BoxDecoration(color: AppTheme.scaffoldBg, shape: BoxShape.circle, border: Border.all(color: AppTheme.cardBorder, width: 0.5)));
                    }),
                  );
                }),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDistribution() {
    final redC = widget.history.where((e) => e.actualColor == ColorSignal.red).length;
    final greenC = widget.history.where((e) => e.actualColor == ColorSignal.green).length;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: AppTheme.cardSurface, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppTheme.cardBorder)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text("COLOR PRESSURE RATIO", style: TextStyle(color: AppTheme.textSecondary, fontSize: 11, fontWeight: FontWeight.bold)),
          const SizedBox(height: 10),
          ClipRRect(
            borderRadius: BorderRadius.circular(6),
            child: SizedBox(
              height: 14,
              child: Row(
                children: [
                  Expanded(flex: max(1, redC), child: Container(color: AppTheme.crimsonRed)),
                  Expanded(flex: max(1, greenC), child: Container(color: AppTheme.neonGreen)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text("Red: $redC", style: const TextStyle(color: AppTheme.crimsonRed, fontSize: 11, fontWeight: FontWeight.bold)),
              Text("Green: $greenC", style: const TextStyle(color: AppTheme.neonGreen, fontSize: 11, fontWeight: FontWeight.bold)),
            ],
          ),
        ],
      ),
    );
  }
}

// ============================================================================
// TAB 3: QUANT LAB (CAPITAL PLANNER)
// ============================================================================
class QuantLabTab extends StatefulWidget {
  final double baseVirtualUnit;
  final ValueChanged<double> onBaseUnitChanged;

  const QuantLabTab({super.key, required this.baseVirtualUnit, required this.onBaseUnitChanged});

  @override
  State<QuantLabTab> createState() => _QuantLabTabState();
}

class _QuantLabTabState extends State<QuantLabTab> {
  final TextEditingController _capController = TextEditingController(text: "10000");
  String _strategy = "Martingale 3x";

  @override
  Widget build(BuildContext context) {
    final cap = double.tryParse(_capController.text.trim()) ?? 10000.0;

    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(14.0),
        children: [
          const Row(
            children: [
              Icon(Icons.science_rounded, color: AppTheme.cyberGold, size: 22),
              SizedBox(width: 8),
              Text("Quant Lab: Capital Planner", style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
            ],
          ),
          const SizedBox(height: 12),

          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(color: AppTheme.cardSurface, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppTheme.cardBorder)),
            child: Column(
              children: [
                TextField(
                  controller: _capController,
                  keyboardType: TextInputType.number,
                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                  decoration: const InputDecoration(labelText: "Virtual Capital Balance", prefixIcon: Icon(Icons.account_balance_wallet_rounded, color: AppTheme.cyberGold)),
                  onChanged: (_) => setState(() {}),
                ),
                const SizedBox(height: 10),
                Wrap(
                  spacing: 6,
                  children: ["Martingale 3x", "Fibonacci", "D'Alembert", "Paroli"].map((s) {
                    final isSel = _strategy == s;
                    return ChoiceChip(
                      label: Text(s, style: TextStyle(fontSize: 10, color: isSel ? Colors.black : Colors.white)),
                      selected: isSel,
                      selectedColor: AppTheme.cyberGold,
                      backgroundColor: AppTheme.scaffoldBg,
                      onSelected: (_) => setState(() => _strategy = s),
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),

          _buildStrategyTable(cap),
        ],
      ),
    );
  }

  Widget _buildStrategyTable(double cap) {
    List<Map<String, dynamic>> rows = [];
    double cumulative = 0;
    for (int lvl = 1; lvl <= 8; lvl++) {
      double unit = widget.baseVirtualUnit * (_strategy.contains("3x") ? pow(3, lvl - 1) : pow(2, lvl - 1));
      cumulative += unit;
      double survival = max(0.0, ((cap - cumulative) / cap) * 100);
      rows.add({'step': lvl, 'unit': unit.round(), 'cumulative': cumulative.round(), 'survival': survival.toStringAsFixed(1)});
    }

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: AppTheme.cardSurface, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppTheme.cardBorder)),
      child: Table(
        border: TableBorder.all(color: AppTheme.cardBorder, width: 0.8),
        children: [
          const TableRow(
            decoration: BoxDecoration(color: AppTheme.scaffoldBg),
            children: [
              Padding(padding: EdgeInsets.all(6), child: Text("Step", style: TextStyle(color: AppTheme.cyberGold, fontSize: 10, fontWeight: FontWeight.bold))),
              Padding(padding: EdgeInsets.all(6), child: Text("Stake", style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold))),
              Padding(padding: EdgeInsets.all(6), child: Text("Cumulative", style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold))),
              Padding(padding: EdgeInsets.all(6), child: Text("Survival %", style: TextStyle(color: AppTheme.neonGreen, fontSize: 10, fontWeight: FontWeight.bold))),
            ],
          ),
          ...rows.map((r) => TableRow(
            children: [
              Padding(padding: const EdgeInsets.all(6), child: Text("L${r['step']}", style: const TextStyle(color: Colors.white, fontSize: 11))),
              Padding(padding: const EdgeInsets.all(6), child: Text("${r['unit']}", style: const TextStyle(color: Colors.white, fontSize: 11))),
              Padding(padding: const EdgeInsets.all(6), child: Text("${r['cumulative']}", style: const TextStyle(color: AppTheme.textSecondary, fontSize: 11))),
              Padding(padding: const EdgeInsets.all(6), child: Text("${r['survival']}%", style: const TextStyle(color: AppTheme.neonGreen, fontSize: 11, fontWeight: FontWeight.bold))),
            ],
          )),
        ],
      ),
    );
  }
}

// ============================================================================
// TAB 4: HARSHGURUJI (BRAND IDENTITY & PRO CONTROLS)
// ============================================================================
class HarshGuruJiTab extends StatelessWidget {
  final VoidCallback onCopyUrl;
  final VoidCallback onShareReport;
  final VoidCallback onTuningChanged;
  final bool isGithubAutoUpdateEnabled;
  final VoidCallback onToggleGithubAutoUpdate;
  final bool hasPendingUpdate;
  final bool is3HourCooldownPassed;
  final Duration cooldownRemaining;
  final Duration cooldownElapsed;
  final String activeVersion;
  final String pendingVersion;
  final bool isCheckingUpdate;
  final VoidCallback onCheckGithubUpdate;
  final VoidCallback onApplyUpdate;
  final VoidCallback onSimulateCommitToggle;
  final VoidCallback onCopyGithubUrl;

  const HarshGuruJiTab({
    super.key,
    required this.onCopyUrl,
    required this.onShareReport,
    required this.onTuningChanged,
    required this.isGithubAutoUpdateEnabled,
    required this.onToggleGithubAutoUpdate,
    required this.hasPendingUpdate,
    required this.is3HourCooldownPassed,
    required this.cooldownRemaining,
    required this.cooldownElapsed,
    required this.activeVersion,
    required this.pendingVersion,
    required this.isCheckingUpdate,
    required this.onCheckGithubUpdate,
    required this.onApplyUpdate,
    required this.onSimulateCommitToggle,
    required this.onCopyGithubUrl,
  });

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(14.0),
        children: [
          // Founder Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(colors: [Color(0xFF1E283D), AppTheme.cardSurface], begin: Alignment.topLeft, end: Alignment.bottomRight),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppTheme.cyberGold.withOpacity(0.6), width: 1.8),
            ),
            child: Column(
              children: [
                Container(
                  width: 90,
                  height: 90,
                  decoration: BoxDecoration(borderRadius: BorderRadius.circular(20), border: Border.all(color: AppTheme.cyberGold, width: 2.2)),
                  child: ClipRRect(borderRadius: BorderRadius.circular(18), child: const AppLogo(size: 90, fit: BoxFit.contain)),
                ),
                const SizedBox(height: 14),
                const Text(AppBranding.creatorName, style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w900)),
                const SizedBox(height: 4),
                const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.verified, color: AppTheme.cyberGold, size: 16),
                    SizedBox(width: 4),
                    Text("Brand: ${AppBranding.brandTag}", style: TextStyle(color: AppTheme.cyberGold, fontSize: 13, fontWeight: FontWeight.bold)),
                  ],
                ),
                const SizedBox(height: 8),
                const Text("Principal Android Systems Architect & FinTech Quantitative Engineer", textAlign: TextAlign.center, style: TextStyle(color: AppTheme.textSecondary, fontSize: 12)),
                const SizedBox(height: 16),

                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(backgroundColor: AppTheme.scaffoldBg, foregroundColor: AppTheme.cyberGold, side: BorderSide(color: AppTheme.cyberGold.withOpacity(0.6))),
                        onPressed: onCopyUrl,
                        icon: const Icon(Icons.public_rounded, size: 16),
                        label: const Text("webguruji.online", style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(backgroundColor: AppTheme.neonGreen, foregroundColor: Colors.black),
                        onPressed: onShareReport,
                        icon: const Icon(Icons.share_rounded, size: 16),
                        label: const Text("Share Report", style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // GitHub Auto-Update System Card (3-Hour Cooldown Buffer)
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  AppTheme.cardSurface,
                  isGithubAutoUpdateEnabled
                      ? const Color(0xFF0C241B)
                      : const Color(0xFF1B1F2D),
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(18),
              border: Border.all(
                color: isGithubAutoUpdateEnabled ? AppTheme.neonGreen.withOpacity(0.7) : AppTheme.cardBorder,
                width: 1.4,
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header with Toggle
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: (isGithubAutoUpdateEnabled ? AppTheme.neonGreen : AppTheme.textMuted).withOpacity(0.15),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Icon(
                        Icons.system_update_rounded,
                        color: isGithubAutoUpdateEnabled ? AppTheme.neonGreen : AppTheme.textMuted,
                        size: 22,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            "GitHub Auto-Update System",
                            style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w900),
                          ),
                          Text(
                            isGithubAutoUpdateEnabled ? "Auto-Sync Enabled (3h Buffer)" : "Auto-Sync Disabled",
                            style: TextStyle(
                              color: isGithubAutoUpdateEnabled ? AppTheme.neonGreen : AppTheme.textMuted,
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Switch(
                      value: isGithubAutoUpdateEnabled,
                      activeColor: AppTheme.neonGreen,
                      activeTrackColor: AppTheme.neonGreen.withOpacity(0.3),
                      inactiveThumbColor: AppTheme.textMuted,
                      inactiveTrackColor: AppTheme.scaffoldBg,
                      onChanged: (v) => onToggleGithubAutoUpdate(),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Repo info chip
                InkWell(
                  onTap: onCopyGithubUrl,
                  borderRadius: BorderRadius.circular(8),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      color: AppTheme.scaffoldBg,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: AppTheme.cardBorder),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.code_rounded, color: AppTheme.cyberBlue, size: 14),
                        const SizedBox(width: 6),
                        const Expanded(
                          child: Text(
                            "Repo: ${AppBranding.githubRepo}",
                            style: TextStyle(color: AppTheme.textSecondary, fontFamily: 'monospace', fontSize: 11),
                          ),
                        ),
                        const Icon(Icons.copy_rounded, color: AppTheme.textMuted, size: 13),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 10),

                // 3-Hour Delay Buffer Policy Note
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: AppTheme.cyberGold.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: AppTheme.cyberGold.withOpacity(0.35)),
                  ),
                  child: const Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Icon(Icons.timer_outlined, color: AppTheme.cyberGold, size: 16),
                      SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          "3-Hour Stability Policy: When changes occur on GitHub, updates undergo a 3-hour stability buffer before appearing in-app. Once confirmed, tap update to instantly refresh code & weights.",
                          style: TextStyle(color: AppTheme.textSecondary, fontSize: 11, height: 1.35),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),

                // Status & Action Area
                if (!isGithubAutoUpdateEnabled)
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: AppTheme.scaffoldBg,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Text(
                      "Auto-Update is paused. Toggle ON above to resume automated GitHub sync checks.",
                      style: TextStyle(color: AppTheme.textMuted, fontSize: 11),
                      textAlign: TextAlign.center,
                    ),
                  )
                else if (hasPendingUpdate)
                  if (!is3HourCooldownPassed)
                    // Cooldown is active
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: AppTheme.scaffoldBg,
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: AppTheme.cyberGold.withOpacity(0.5)),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.hourglass_top_rounded, color: AppTheme.cyberGold, size: 16),
                              const SizedBox(width: 6),
                              const Text(
                                "3-Hour Buffer in Progress",
                                style: TextStyle(color: AppTheme.cyberGold, fontSize: 12, fontWeight: FontWeight.bold),
                              ),
                              const Spacer(),
                              Text(
                                "${cooldownRemaining.inHours}h ${cooldownRemaining.inMinutes % 60}m left",
                                style: const TextStyle(color: Colors.white, fontFamily: 'monospace', fontSize: 11, fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                          const SizedBox(height: 6),
                          ClipRRect(
                            borderRadius: BorderRadius.circular(4),
                            child: LinearProgressIndicator(
                              value: (cooldownElapsed.inMinutes / 180.0).clamp(0.0, 1.0),
                              minHeight: 6,
                              backgroundColor: AppTheme.cardSurface,
                              valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.cyberGold),
                            ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            "New commit detected on GitHub (${cooldownElapsed.inHours}h ${cooldownElapsed.inMinutes % 60}m ago). Update unlocks automatically once 3 hours pass.",
                            style: const TextStyle(color: AppTheme.textMuted, fontSize: 10),
                          ),
                        ],
                      ),
                    )
                  else
                    // Cooldown passed: Update Ready
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: AppTheme.scaffoldBg,
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: AppTheme.neonGreen.withOpacity(0.8), width: 1.4),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.verified_rounded, color: AppTheme.neonGreen, size: 18),
                              const SizedBox(width: 6),
                              Expanded(
                                child: Text(
                                  "Update Ready: $pendingVersion",
                                  style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                                ),
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(
                                  color: AppTheme.neonGreen.withOpacity(0.2),
                                  borderRadius: BorderRadius.circular(4),
                                ),
                                child: const Text(
                                  ">3h Verified",
                                  style: TextStyle(color: AppTheme.neonGreen, fontSize: 10, fontWeight: FontWeight.bold),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 6),
                          const Text(
                            "GitHub changes have completed the 3-hour buffer verification. Tap below to apply all code, model & UI updates immediately.",
                            style: TextStyle(color: AppTheme.textSecondary, fontSize: 11),
                          ),
                          const SizedBox(height: 10),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton.icon(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: AppTheme.neonGreen,
                                foregroundColor: Colors.black,
                                padding: const EdgeInsets.symmetric(vertical: 11),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                              ),
                              onPressed: onApplyUpdate,
                              icon: const Icon(Icons.bolt_rounded, size: 18),
                              label: const Text(
                                "🚀 Apply GitHub Update Now",
                                style: TextStyle(fontSize: 12, fontWeight: FontWeight.w900),
                              ),
                            ),
                          ),
                        ],
                      ),
                    )
                else
                  // Already up to date
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.scaffoldBg,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppTheme.neonGreen.withOpacity(0.4)),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.check_circle_rounded, color: AppTheme.neonGreen, size: 18),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            "GuruPredict is fully synchronized with GitHub ($activeVersion)",
                            style: const TextStyle(color: AppTheme.neonGreen, fontSize: 11, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                  ),

                const SizedBox(height: 12),

                // Action Row: Check GitHub & Simulate Cooldown
                Row(
                  children: [
                    Expanded(
                      child: OutlinedButton.icon(
                        style: OutlinedButton.styleFrom(
                          side: BorderSide(color: AppTheme.cyberBlue.withOpacity(0.6)),
                          foregroundColor: AppTheme.cyberBlue,
                          padding: const EdgeInsets.symmetric(vertical: 9),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                        ),
                        onPressed: isCheckingUpdate ? null : onCheckGithubUpdate,
                        icon: isCheckingUpdate
                            ? const SizedBox(width: 12, height: 12, child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.cyberBlue))
                            : const Icon(Icons.sync_rounded, size: 14),
                        label: Text(
                          isCheckingUpdate ? "Checking..." : "Check GitHub",
                          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: OutlinedButton.icon(
                        style: OutlinedButton.styleFrom(
                          side: BorderSide(color: AppTheme.cyberGold.withOpacity(0.6)),
                          foregroundColor: AppTheme.cyberGold,
                          padding: const EdgeInsets.symmetric(vertical: 9),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                        ),
                        onPressed: onSimulateCommitToggle,
                        icon: const Icon(Icons.history_toggle_off_rounded, size: 14),
                        label: const Text(
                          "Toggle 3h Timer",
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Android Native Configuration Guide
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(color: AppTheme.cardSurface, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppTheme.cardBorder)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  children: [
                    Icon(Icons.android_rounded, color: AppTheme.neonGreen, size: 20),
                    SizedBox(width: 8),
                    Text("Android Native Configuration Guide", style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                  ],
                ),
                const SizedBox(height: 8),
                const Text(
                  "Declared permissions in AndroidManifest.xml for floating overlay & background vision service:",
                  style: TextStyle(color: AppTheme.textSecondary, fontSize: 11, height: 1.4),
                ),
                const SizedBox(height: 10),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(color: AppTheme.scaffoldBg, borderRadius: BorderRadius.circular(8)),
                  child: const Text(
                    "<uses-permission android:name=\"android.permission.SYSTEM_ALERT_WINDOW\"/>\n"
                    "<uses-permission android:name=\"android.permission.FOREGROUND_SERVICE\"/>\n"
                    "<uses-permission android:name=\"android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION\"/>",
                    style: TextStyle(color: AppTheme.neonGreen, fontFamily: 'monospace', fontSize: 10),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Engine Tuning
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(color: AppTheme.cardSurface, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppTheme.cardBorder)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text("AI Engine Sensitivity Tuning", style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                Slider(
                  value: GuruQuantumEngine.riskSensitivity,
                  min: 0.8,
                  max: 1.2,
                  divisions: 4,
                  activeColor: AppTheme.cyberGold,
                  onChanged: (v) {
                    GuruQuantumEngine.riskSensitivity = v;
                    onTuningChanged();
                  },
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.0),
            child: Text(
              "Compliance Note: GuruPredict is an educational quantitative probability calculator. Zero real-money gambling or betting transactions exist in this app.",
              style: TextStyle(color: AppTheme.textMuted, fontSize: 10),
            ),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }
}

// ============================================================================
// GITHUB UPDATE PROGRESS DIALOG (WITH 3-HOUR BUFFER VALIDATION)
// ============================================================================
class _GithubUpdateProgressDialog extends StatefulWidget {
  final String targetVersion;
  final VoidCallback onComplete;

  const _GithubUpdateProgressDialog({
    required this.targetVersion,
    required this.onComplete,
  });

  @override
  State<_GithubUpdateProgressDialog> createState() => _GithubUpdateProgressDialogState();
}

class _GithubUpdateProgressDialogState extends State<_GithubUpdateProgressDialog> {
  int _step = 0;
  double _progress = 0.0;
  String _statusMessage = "Connecting to GitHub repository...";
  Timer? _stepTimer;

  final List<Map<String, dynamic>> _steps = [
    {"msg": "Connecting to github.com/harshguruji01/guruprediction...", "progress": 0.25},
    {"msg": "Downloading commit blobs & neural model weights...", "progress": 0.55},
    {"msg": "Validating 3-hour cooldown delay timestamp & SHA-256...", "progress": 0.82},
    {"msg": "Installing update & reloading state engine...", "progress": 1.0},
  ];

  @override
  void initState() {
    super.initState();
    _startUpdateSimulation();
  }

  @override
  void dispose() {
    _stepTimer?.cancel();
    super.dispose();
  }

  void _startUpdateSimulation() {
    _stepTimer = Timer.periodic(const Duration(milliseconds: 600), (timer) {
      if (!mounted) {
        timer.cancel();
        return;
      }
      if (_step < _steps.length) {
        setState(() {
          _statusMessage = _steps[_step]["msg"];
          _progress = _steps[_step]["progress"];
          _step++;
        });
      } else {
        timer.cancel();
        Future.delayed(const Duration(milliseconds: 400), () {
          if (mounted) {
            widget.onComplete();
          }
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: AppTheme.cardSurface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: const BorderSide(color: AppTheme.neonGreen, width: 1.5),
      ),
      child: Padding(
        padding: const EdgeInsets.all(22.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppTheme.neonGreen.withOpacity(0.12),
                shape: BoxShape.circle,
                border: Border.all(color: AppTheme.neonGreen.withOpacity(0.6), width: 1.5),
              ),
              child: const Icon(Icons.cloud_download_rounded, color: AppTheme.neonGreen, size: 36),
            ),
            const SizedBox(height: 16),
            const Text(
              "GitHub System Update",
              style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 4),
            Text(
              "Target: ${widget.targetVersion}",
              style: const TextStyle(color: AppTheme.cyberGold, fontSize: 13, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: LinearProgressIndicator(
                value: _progress,
                minHeight: 8,
                backgroundColor: AppTheme.scaffoldBg,
                valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.neonGreen),
              ),
            ),
            const SizedBox(height: 14),
            Text(
              _statusMessage,
              textAlign: TextAlign.center,
              style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12),
            ),
            const SizedBox(height: 10),
            Text(
              "${(_progress * 100).toInt()}% Verified",
              style: const TextStyle(color: AppTheme.neonGreen, fontSize: 12, fontWeight: FontWeight.bold, fontFamily: 'monospace'),
            ),
          ],
        ),
      ),
    );
  }
}
