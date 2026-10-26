prompt 1
Add a real AI prediction engine to GuruPredict.

Use technical indicators such as RSI, MACD, moving averages, Bollinger Bands, volume analysis, support/resistance, and trend strength.

For every market, generate:
- BUY / SELL / HOLD signal
- Confidence score from 0 to 100
- Entry price
- Target price
- Stop-loss
- Time frame: Short term, Medium term, Long term
- Reason for prediction in simple Hindi and English

Never claim guaranteed profit.
Show this disclaimer on every prediction:
"GuruPredict predictions are educational only. Trading involves risk. Not financial advice."

If live market API is unavailable, use realistic demo data and clearly label it as DEMO MODE.

prompt 2
Create a completely new Android app called "GuruPredict", developed by HarshGuruJi.

Purpose:
GuruPredict is a color-round analysis and probability-tracking app for Green, Red, and Violet color prediction games. It must NOT claim guaranteed wins or 100% accurate predictions.

App identity:
- App name: GuruPredict
- Developer: Developed by HarshGuruJi
- Logo: logo.png for app icon, splash screen, and header
- Modern dark UI with Green, Red, and Violet accent colors
- Hindi + English language support

Main features:

1. Color Round Tracker
- User can manually enter past round results: Green, Red, or Violet
- Also allow entering the drawn number from 0 to 9 if available
- Save complete round history with time and period/round ID
- Show last 20, 50, and 100 rounds
- Show color streaks, for example: "Red appeared 4 times in a row"
- Show Green count, Red count, Violet count
- Show Violet gap: how many rounds since Violet last appeared
- Show Big/Small and Odd/Even history if number data is entered

2. Smart Probability Dashboard
- Calculate frequency percentage of Green, Red, and Violet from user-entered history
- Show short-term trend and long-term trend separately
- Display probability-based suggestion such as:
  "Green frequency is higher in last 50 rounds"
  "Violet has not appeared for 12 rounds"
- Clearly label every suggestion as:
  "Probability analysis only. Next round is random and cannot be guaranteed."

3. AI Pattern Analysis
- Analyze user-entered historical results
- Detect simple patterns: alternating colors, repeated colors, long streaks, violet gaps, number repetitions
- Use basic statistics and optionally a lightweight ML model
- Generate a "Possible Trend" for next round: Green, Red, or Violet
- Always show confidence level, but never above 80%
- Add explanation in simple Hindi/English: why the app gave this trend
- Add a "No Clear Pattern" state when data is insufficient

4. Prediction Card
- Big card showing suggested color: Green, Red, or Violet
- Confidence percentage
- Risk level: Low, Medium, High
- Short reason
- Last 10 results visual timeline
- Buttons: Correct / Wrong, to improve personal accuracy tracking
- Show disclaimer under every prediction:
  "GuruPredict is for educational analysis only. Color game results are random. Not guaranteed."

5. Overlay Feature
- Floating overlay using Android "Display over other apps" permission
- Compact overlay showing:
  - Last result
  - Current streak
  - Suggested trend
  - Violet gap
  - Timer if user sets round duration
- Overlay must be draggable, minimizable, resizable, and closable
- Add clear permission-request screen
- Overlay must not look like a system warning or mimic another app

6. Screen Reader and Accessibility
- Full TalkBack support
- Content descriptions for all buttons, colors, charts, and cards
- Large fonts and high-contrast mode
- Voice announcement option for new analysis
- Every color must also have a text label, not only color

7. Alerts and Notifications
- Alert when Violet gap crosses user-set limit
- Alert when a long Green or Red streak appears
- Alert when a new trend analysis is generated
- Custom round timer: 30 seconds, 1 minute, 3 minutes, 5 minutes
- Sound, vibration, and notification settings

8. Accuracy Tracker
- Track how often the app's suggested trend matched the actual result
- Show accuracy separately for Green, Red, and Violet
- Show last 20 predictions result
- Clearly explain that past accuracy does not guarantee future results

9. Responsible Play Tools
- Daily reminder limit
- Session timer
- Optional break reminder
- Warning if user records too many rounds in a short time
- Permanent disclaimer:
  "Color prediction games are chance-based and risky. GuruPredict does not guarantee winnings. Play responsibly."

10. Technical requirements
- Local database for round history
- Offline-first app
- Clean modular code
- Demo mode with sample Green/Red/Violet data
- Android overlay permission handled properly
- No real-money betting, no payment gateway, no automatic betting, and no connection to any gambling platform
- Do not claim to hack, crack, or bypass any game algorithm

Deliverables:
- Complete source code
- All screens and working UI
- logo.png integrated
- README with setup and build instructions
- App ready for future improvement


prompt 3
Add a "50% Target Trend Engine" to GuruPredict.

The app must analyze Green, Red, and Violet round history and give the best possible next-round trend, but it must never claim guaranteed accuracy.

Create an ensemble prediction system with 4 models:

1. Frequency Model
- Analyze last 20, 50, and 100 rounds
- Calculate Green%, Red%, and Violet%
- Give higher weight to the color with stronger recent frequency

2. Streak Model
- Detect current Green or Red streak
- If streak is 3+, analyze whether reversal or continuation is more common in user history
- Show streak strength

3. Violet Gap Model
- Track how many rounds since Violet appeared
- If Violet gap is high, mark Violet as "watch mode"
- Analyze whether Green or Red dominated during previous long Violet gaps

4. Pattern Model
- Detect alternating patterns: G-R-G-R
- Detect double patterns: G-G-R-R
- Detect mirror patterns and repeated 3-round sequences
- Compare current pattern with similar past patterns

Then combine all models using majority voting:
- If 3 or 4 models agree: STRONG SIGNAL
- If 2 models agree: NORMAL SIGNAL
- If no majority: SKIP ROUND / NO CLEAR SIGNAL

Prediction output:
- Suggested color: Green, Red, or Violet
- Confidence: maximum 65%
- Signal strength: Strong, Normal, Weak, Skip
- Reason in simple Hindi and English
- Risk level
- Last 10 rounds timeline

Accuracy target:
- Track real results after every round
- Show rolling accuracy of last 20, 50, and 100 predictions
- If accuracy falls below 50%, automatically reduce confidence and show more SKIP signals
- If a model performs poorly, lower its voting weight automatically

Important rules:
- Do not show a prediction when data is less than 20 rounds
- Do not claim 100% accuracy or guaranteed profit
- Always display: "Results are random. This is probability-based analysis only."
- Add SKIP ROUND option so the app does not force a prediction every time.




prommpt 4
Add an advanced "Skip Round Mode" to GuruPredict.

Purpose:
GuruPredict should not force a prediction in every round. It should analyze Green, Red, and Violet history and give a prediction only when the pattern is reasonably clear. If the pattern is weak, unclear, or risky, the app must show "SKIP ROUND".

Skip Round logic:

1. Signal strength calculation
For every new round, calculate a signal score from 0 to 100 using:
- Green/Red/Violet frequency in last 20, 50, and 100 rounds
- Current color streak
- Violet gap
- Alternating patterns like G-R-G-R
- Double patterns like G-G-R-R
- Repeated 3-round sequences
- Agreement between Frequency Model, Streak Model, Violet Gap Model, and Pattern Model

2. Decision rules
- Signal score 70 to 100: SHOW STRONG PREDICTION
- Signal score 55 to 69: SHOW NORMAL PREDICTION
- Signal score 40 to 54: SHOW WEAK SIGNAL or SKIP ROUND
- Signal score below 40: ALWAYS SHOW SKIP ROUND
- If fewer than 20 rounds of history exist: ALWAYS SHOW SKIP ROUND
- If all four models disagree: ALWAYS SHOW SKIP ROUND
- If Violet gap is unusual but Green/Red pattern is unclear: SHOW SKIP ROUND

3. Skip Round screen
When skipping, display:
- Big "SKIP ROUND" button/card
- Reason: "Pattern weak", "Models disagree", "Not enough data", or "High risk round"
- Current streak
- Violet gap
- Last 10 results
- Signal score
- Message: "Skip is also a smart decision. Waiting for a clear pattern improves focus."

4. Prediction screen
When prediction is shown, display:
- Suggested color: Green, Red, or Violet
- Confidence: maximum 65%
- Signal strength: Strong, Normal, or Weak
- Signal score
- Short reason in Hindi and English
- Risk level: Low, Medium, High
- Last 10 rounds timeline
- Buttons: Correct, Wrong, Skip Followed

5. Accuracy improvement
- Track only the rounds where the app gave Green, Red, or Violet prediction
- Do not count SKIP rounds as wrong predictions
- Show separate stats:
  - Total predictions
  - Correct predictions
  - Wrong predictions
  - Skipped rounds
  - Accuracy percentage
- If accuracy drops below 50%, automatically increase skipping and lower confidence
- If a model repeatedly gives wrong signals, reduce its voting weight

6. User settings
Allow user to choose Skip Mode:
- Aggressive Mode: More predictions, more risk
- Balanced Mode: Normal predictions and skips
- Safe Mode: Only strong signals, more skips
- Manual Mode: User sets minimum signal score, for example 60, 70, or 80

7. Overlay integration
In the floating overlay:
- If prediction is available, show suggested color and confidence
- If pattern is weak, show a clear "SKIP" badge instead of a color
- Overlay must remain small, draggable, and non-blocking

8. Responsible-play disclaimer
Show this message on prediction and skip screens:
"GuruPredict gives probability-based analysis only. Game results are random and cannot be guaranteed. Skipping unclear rounds is a safety feature, not a winning guarantee."

Do not claim guaranteed profits, hacking, or 100% accuracy.



prompt 5
sabhi code ko ek bar check kar lo kahi koi bug error ya mistakes na ho aur phir apk verify karke build karo aur phir apk ko rename karke GuruPredict kar dena 
kyuki jo apk milega oo app-debug.apk ya etc kuch rahega.

dono place per best response dena chahiye
android app me bhi for mobile 100% responsive
aur sabhi devices ke browser me bhi 100% responsive.