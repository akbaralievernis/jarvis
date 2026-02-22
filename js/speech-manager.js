/**
 * SpeechManager - менеджер синтеза и распознавания речи
 */

class SpeechManager {
    constructor() {
        this.synth = window.speechSynthesis;
        this.recognition = null;
        this.isListening = false;
        this.isSpeaking = false;
        this.voices = [];
        this.voicesLoaded = false;

        this.settings = {
            voice: null,
            voiceByLang: { ru: null, de: null, en: null },
            rate: 1,
            pitch: 1,
            volume: 1,
            language: 'ru-RU',
            autoLanguage: true
        };

        this.eventListeners = new Map();
        this.speechQueue = [];
        this.isProcessingQueue = false;

        this.init();
    }

    async init() {
        console.log('🔊 Инициализация SpeechManager...');

        try {
            this.loadVoiceSettings();
            await this.initSpeechSynthesis();
            this.initSpeechRecognition();
            this.setupEventListeners();

            console.log('✅ SpeechManager готов');
        } catch (error) {
            console.error('❌ Ошибка инициализации SpeechManager:', error);
            this.emit('initError', error);
        }
    }

    async initSpeechSynthesis() {
        if (!this.synth) {
            console.warn('⚠️ Синтез речи не поддерживается браузером');
            this.emit('speechError', 'Синтез речи не поддерживается');
            return false;
        }

        await this.loadVoicesWithRetry();

        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this.loadVoices();
        }

        return true;
    }

    async loadVoicesWithRetry(maxRetries = 5) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                const voices = this.synth.getVoices();
                if (voices.length > 0) {
                    this.voices = voices;
                    this.voicesLoaded = true;
                    this.autoSelectVoiceDefaults();
                    this.emit('voicesLoaded', voices);
                    this.emit('settingsChanged', this.getSettings());
                    return true;
                }
                if (i < maxRetries - 1) await this.delay(400);
            } catch (error) {
                console.error('❌ Ошибка загрузки голосов:', error);
            }
        }

        this.voicesLoaded = true;
        return false;
    }

    loadVoices() {
        if (!this.synth) return;

        const voices = this.synth.getVoices();
        if (!voices.length) return;

        this.voices = voices;
        this.voicesLoaded = true;
        this.autoSelectVoiceDefaults();
        this.emit('voicesLoaded', voices);
        this.emit('settingsChanged', this.getSettings());
    }

    findBestVoiceForLang(langCode) {
        const short = (langCode || '').toLowerCase().slice(0, 2);
        const exact = this.voices.find(v => (v.lang || '').toLowerCase().startsWith(short));
        if (exact) return exact;

        const en = this.voices.find(v => (v.lang || '').toLowerCase().startsWith('en'));
        return en || this.voices[0] || null;
    }

    detectTextLanguage(text) {
        const value = (text || '').trim();
        if (!value) return 'ru';
        if (/[а-яё]/i.test(value)) return 'ru';
        if (/[äöüß]/i.test(value)) return 'de';
        if (/\b(ich|nicht|und|weil|würde|könnte|sollte|dass|eine|der|die|das)\b/i.test(value)) return 'de';
        return 'de';
    }

    autoSelectVoiceDefaults() {
        if (!this.voices.length) return;

        if (!this.settings.voiceByLang.ru) {
            const rv = this.findBestVoiceForLang('ru');
            if (rv) this.settings.voiceByLang.ru = rv.name;
        }

        if (!this.settings.voiceByLang.de) {
            const dv = this.findBestVoiceForLang('de');
            if (dv) this.settings.voiceByLang.de = dv.name;
        }

        if (!this.settings.voiceByLang.en) {
            const ev = this.findBestVoiceForLang('en');
            if (ev) this.settings.voiceByLang.en = ev.name;
        }

        if (!this.settings.voice) {
            this.settings.voice = this.settings.voiceByLang.ru || this.settings.voiceByLang.de || this.voices[0]?.name || null;
        }

        this.saveVoiceSettings();
    }

    loadVoiceSettings() {
        try {
            const savedVoice = localStorage.getItem('arisVoice');
            const savedRate = parseFloat(localStorage.getItem('arisRate')) || 1;
            const savedPitch = parseFloat(localStorage.getItem('arisPitch')) || 1;
            const savedVolume = parseFloat(localStorage.getItem('arisVolume')) || 1;
            const savedLanguage = localStorage.getItem('arisSpeechLanguage');
            const savedAutoLanguage = localStorage.getItem('arisAutoLanguage');
            const savedVoiceByLangRaw = localStorage.getItem('arisVoiceByLang');

            this.settings.rate = Math.max(0.5, Math.min(2, savedRate));
            this.settings.pitch = Math.max(0.5, Math.min(2, savedPitch));
            this.settings.volume = Math.max(0, Math.min(1, savedVolume));

            if (savedVoice) this.settings.voice = savedVoice;
            if (savedLanguage) this.settings.language = savedLanguage;
            if (savedAutoLanguage !== null) this.settings.autoLanguage = savedAutoLanguage === 'true';

            if (savedVoiceByLangRaw) {
                try {
                    const parsed = JSON.parse(savedVoiceByLangRaw);
                    this.settings.voiceByLang = {
                        ru: parsed?.ru || null,
                        de: parsed?.de || null,
                        en: parsed?.en || null
                    };
                } catch {
                    // ignore malformed cache
                }
            }

            this.emit('settingsChanged', this.getSettings());
        } catch (error) {
            console.error('Ошибка загрузки настроек голоса:', error);
        }
    }

    updateSettings(settings = {}) {
        Object.assign(this.settings, settings);

        this.settings.rate = Math.max(0.5, Math.min(2, this.settings.rate));
        this.settings.pitch = Math.max(0.5, Math.min(2, this.settings.pitch));
        this.settings.volume = Math.max(0, Math.min(1, this.settings.volume));

        if (typeof settings.autoLanguage === 'boolean') {
            this.settings.autoLanguage = settings.autoLanguage;
        }

        if (settings.voice) {
            const selected = this.voices.find(v => v.name === settings.voice);
            if (selected) {
                const short = (selected.lang || '').toLowerCase().slice(0, 2);
                if (short === 'ru' || short === 'de' || short === 'en') {
                    this.settings.voiceByLang[short] = selected.name;
                }
            }
        }

        if (this.recognition) {
            this.recognition.lang = this.settings.language || 'ru-RU';
        }

        this.saveVoiceSettings();
        this.emit('settingsChanged', this.getSettings());
    }

    getSelectedVoice(text = '') {
        if (!this.voicesLoaded || this.voices.length === 0) return null;

        const lang = this.detectTextLanguage(text);
        const byLang = this.settings.voiceByLang?.[lang];
        if (byLang) {
            const v = this.voices.find(voice => voice.name === byLang);
            if (v) return v;
        }

        if (this.settings.voice) {
            const selected = this.voices.find(voice => voice.name === this.settings.voice);
            if (selected) return selected;
        }

        return this.findBestVoiceForLang(lang);
    }

    async speak(text, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.synth) return reject(new Error('Синтез речи не доступен'));
            if (!text || typeof text !== 'string' || !text.trim()) return reject(new Error('Текст для произношения пуст'));

            if (this.isSpeaking && !options.allowOverlap) {
                this.synth.cancel();
            }

            try {
                const formattedText = this.formatTextForSpeech(text);
                const utterance = new SpeechSynthesisUtterance(formattedText);

                const voice = this.getSelectedVoice(formattedText);
                if (voice) {
                    utterance.voice = voice;
                    utterance.lang = voice.lang;
                } else {
                    utterance.lang = this.settings.language;
                }

                utterance.rate = options.rate || this.settings.rate;
                utterance.pitch = options.pitch || this.settings.pitch;
                utterance.volume = options.volume || this.settings.volume;

                utterance.onstart = () => {
                    this.isSpeaking = true;
                    this.emit('speechStart', formattedText);
                };

                utterance.onend = () => {
                    this.isSpeaking = false;
                    this.emit('speechEnd', formattedText);
                    resolve();
                };

                utterance.onerror = (event) => {
                    this.isSpeaking = false;
                    const message = `Ошибка синтеза речи: ${event.error}`;
                    this.emit('speechError', message);
                    reject(new Error(message));
                };

                this.synth.speak(utterance);
            } catch (error) {
                this.emit('speechError', error.message);
                reject(error);
            }
        });
    }

    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            this.emit('recognitionError', 'Распознавание речи не поддерживается');
            return false;
        }

        try {
            this.recognition = new SpeechRecognition();
            this.recognition.lang = this.settings.language;
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.maxAlternatives = 1;

            this.recognition.onstart = () => {
                this.isListening = true;
                this.emit('recognitionStart');
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;

                if (this.settings.autoLanguage) {
                    const detected = this.detectTextLanguage(transcript);
                    const nextLang = detected === 'ru' ? 'ru-RU' : 'de-DE';
                    this.settings.language = nextLang;
                    this.recognition.lang = nextLang;
                    localStorage.setItem('arisSpeechLanguage', nextLang);
                }

                this.emit('recognitionResult', transcript);
            };

            this.recognition.onerror = (event) => {
                let errorMessage = '';
                switch (event.error) {
                    case 'no-speech':
                        errorMessage = 'Речь не обнаружена. Пожалуйста, повторите.';
                        break;
                    case 'audio-capture':
                        errorMessage = 'Микрофон не найден. Проверьте подключение микрофона.';
                        break;
                    case 'not-allowed':
                        errorMessage = 'Доступ к микрофону запрещен. Разрешите доступ в браузере.';
                        break;
                    default:
                        errorMessage = `Ошибка распознавания: ${event.error}`;
                }
                this.emit('recognitionError', errorMessage);
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.emit('recognitionEnd');
            };

            return true;
        } catch (error) {
            this.emit('recognitionError', 'Не удалось инициализировать распознавание речи');
            return false;
        }
    }

    toggleRecognition() {
        if (!this.recognition) {
            this.emit('recognitionError', 'Распознавание речи не поддерживается');
            return;
        }

        if (this.isListening) this.stopRecognition();
        else this.startRecognition();
    }

    startRecognition() {
        if (!this.recognition || this.isListening) return;

        try {
            this.recognition.lang = this.settings.language || 'ru-RU';
            this.recognition.start();
        } catch (error) {
            this.emit('recognitionError', 'Не удалось запустить распознавание речи');
        }
    }

    stopRecognition() {
        if (!this.recognition || !this.isListening) return;
        try {
            this.recognition.stop();
        } catch {
            // noop
        }
    }

    stopSpeaking() {
        if (this.synth) {
            this.synth.cancel();
            this.isSpeaking = false;
            this.emit('speechStopped');
        }
    }

    pauseSpeaking() {
        if (this.synth && this.isSpeaking) {
            this.synth.pause();
            this.emit('speechPaused');
        }
    }

    resumeSpeaking() {
        if (this.synth && this.synth.paused) {
            this.synth.resume();
            this.emit('speechResumed');
        }
    }

    async testVoice() {
        const isGerman = (this.settings.language || '').toLowerCase().startsWith('de');
        const testText = isGerman
            ? 'Guten Tag. Das ist ein Test der deutschen Sprachsynthese.'
            : 'Привет! Это тест синтеза речи ARIS.';

        try {
            await this.speak(testText);
            this.emit('testCompleted');
            return true;
        } catch (error) {
            this.emit('speechError', `Тест не удался: ${error.message}`);
            return false;
        }
    }


    async say(text, options = {}) {
        return this.speak(text, options);
    }

    hasSpeechSynthesis() {
        return !!window.speechSynthesis;
    }

    hasSpeechRecognition() {
        return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    }

    getVoices() {
        return this.voices;
    }

    getSettings() {
        return { ...this.settings, voiceByLang: { ...this.settings.voiceByLang } };
    }

    getStatus() {
        return {
            isListening: this.isListening,
            isSpeaking: this.isSpeaking,
            voicesLoaded: this.voicesLoaded,
            voicesCount: this.voices.length,
            speechQueueLength: this.speechQueue.length,
            speechSupported: this.hasSpeechSynthesis(),
            recognitionSupported: this.hasSpeechRecognition()
        };
    }

    formatTextForSpeech(text) {
        if (!text || typeof text !== 'string') return '';

        let formatted = text
            .replace(/<[^>]*>/g, '')
            .replace(/[\"]/g, '')
            .replace(/[-]/g, ' ')
            .replace(/[@#$%^&*()_+=\[\]{}|\\<>?]/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        if (formatted.length > 500) {
            formatted = formatted.substring(0, 497) + '...';
        }

        return formatted;
    }

    setupEventListeners() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseSpeaking();
                this.stopRecognition();
            }
        });
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    saveVoiceSettings() {
        try {
            localStorage.setItem('arisVoice', this.settings.voice || '');
            localStorage.setItem('arisRate', this.settings.rate.toString());
            localStorage.setItem('arisPitch', this.settings.pitch.toString());
            localStorage.setItem('arisVolume', this.settings.volume.toString());
            localStorage.setItem('arisSpeechLanguage', this.settings.language || 'ru-RU');
            localStorage.setItem('arisAutoLanguage', String(this.settings.autoLanguage));
            localStorage.setItem('arisVoiceByLang', JSON.stringify(this.settings.voiceByLang));
        } catch (error) {
            console.error('Ошибка сохранения настроек голоса:', error);
        }
    }

    on(event, callback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(callback);
    }

    emit(event, data) {
        if (!this.eventListeners.has(event)) return;

        this.eventListeners.get(event).forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`❌ Error in ${event} listener:`, error);
            }
        });
    }

    off(event, callback) {
        if (!this.eventListeners.has(event)) return;
        const listeners = this.eventListeners.get(event);
        const index = listeners.indexOf(callback);
        if (index !== -1) listeners.splice(index, 1);
    }

    destroy() {
        this.stopSpeaking();
        this.stopRecognition();
        this.eventListeners.clear();

        if (this.synth) this.synth.cancel();
    }
}

if (!window.speechManager) {
    window.speechManager = new SpeechManager();
}

window.debugSpeech = {
    test: () => {
        if (!window.speechSynthesis) return false;
        const voices = window.speechSynthesis.getVoices();
        console.log(`🎤 Доступно голосов: ${voices.length}`);
        return true;
    },
    speakTest: async () => {
        try {
            await window.speechManager.speak('Тестирование синтеза речи');
            return true;
        } catch {
            return false;
        }
    },
    getStatus: () => window.speechManager?.getStatus() || { error: 'SpeechManager не инициализирован' }
};
