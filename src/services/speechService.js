// Speech & Screen Reader Voice Assistant Service for GuruPredict
import { getLang } from './i18n.js';

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.enabled = true;
    this.speechRate = 1.0;
    this.liveRegion = null;
    this.voices = [];
    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;
    const load = () => {
      this.voices = this.synth.getVoices();
    };
    load();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = load;
    }
  }

  setLiveRegion(el) {
    this.liveRegion = el;
  }

  setEnabled(val) {
    this.enabled = !!val;
  }

  setRate(rate) {
    this.speechRate = Math.max(0.5, Math.min(2.0, rate));
  }

  announceToScreenReader(text) {
    if (this.liveRegion) {
      this.liveRegion.textContent = '';
      setTimeout(() => {
        this.liveRegion.textContent = text;
      }, 50);
    }
  }

  speakSignal(prediction) {
    // Both screen reader text announcement and optional voice synthesis
    const lang = getLang();
    let text = "";

    if (lang === 'hi') {
      const dirText = prediction.direction === 'BUY' ? 'खरीदें' : (prediction.direction === 'SELL' ? 'बेचें' : 'होल्ड करें');
      const reason = prediction.reasonHi || "";
      text = `AI प्रेडिक्शन: ${prediction.name}, दिशा ${dirText}, कॉन्फिडेंस ${prediction.confidence} प्रतिशत, एंट्री ${prediction.entryPrice}, टारगेट ${prediction.target1}, स्टॉप लॉस ${prediction.stopLoss}। टाइम फ्रेम ${prediction.timeframeCategory}। ${reason}`;
    } else {
      const reason = prediction.reasonEn || "";
      text = `AI Prediction for ${prediction.name}. Direction: ${prediction.direction}. Confidence: ${prediction.confidence} percent. Entry: ${prediction.entryPrice}. Target: ${prediction.target1}. Stop-loss: ${prediction.stopLoss}. Timeframe: ${prediction.timeframeCategory}. ${reason}`;
    }

    // Always update screen reader live region for accessibility/TalkBack
    this.announceToScreenReader(text);

    // Speak aloud if voice announce enabled
    if (this.enabled && this.synth) {
      try {
        this.synth.cancel(); // Stop prior utterance
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = this.speechRate;
        utterance.pitch = 1.0;

        // Choose appropriate voice
        if (lang === 'hi') {
          const hiVoice = this.voices.find(v => v.lang.startsWith('hi') || v.name.includes('Hindi'));
          if (hiVoice) utterance.voice = hiVoice;
          utterance.lang = 'hi-IN';
        } else {
          const enVoice = this.voices.find(v => v.lang.startsWith('en'));
          if (enVoice) utterance.voice = enVoice;
          utterance.lang = 'en-US';
        }

        this.synth.speak(utterance);
      } catch (e) {
        console.warn('Speech synthesis error:', e);
      }
    }
  }

  speakText(text, langCode = 'en-US') {
    if (!this.enabled || !this.synth) return;
    try {
      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = this.speechRate;
      utterance.lang = langCode;
      this.synth.speak(utterance);
    } catch (e) {}
  }
}

export const speech = new SpeechService();
