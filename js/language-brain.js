(function () {
  const KEY = 'aris-language-brain-v1';

  class LanguageBrain {
    constructor() {
      this.state = this.loadState();
    }

    loadState() {
      try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return { weaknessLog: {}, dailyMissionCompleted: false, lastMistakes: [] };
        return { weaknessLog: {}, dailyMissionCompleted: false, lastMistakes: [], ...JSON.parse(raw) };
      } catch {
        return { weaknessLog: {}, dailyMissionCompleted: false, lastMistakes: [] };
      }
    }

    saveState() {
      localStorage.setItem(KEY, JSON.stringify(this.state));
    }

    detectLangFromText(inputText = '') {
      if (/[а-яё]/i.test(inputText)) return 'ru';
      if (/[äöüß]/i.test(inputText)) return 'de';
      return 'de';
    }

    analyzeAnswer(inputText = '', lang = 'de') {
      const text = String(inputText || '').trim();
      const detectedLang = this.detectLangFromText(text);
      const mistakes = [];

      if (/\bweil\s+[A-Za-zÄÖÜäöüß]+\s+[A-Za-zÄÖÜäöüß]+\s+[A-Za-zÄÖÜäöüß]+\./i.test(text)) {
        mistakes.push('Проверьте порядок слов после weil (глагол в конец).');
      }
      if (/\bich bin 20 jahre\b/i.test(text)) mistakes.push('Нужно: Ich bin 20 Jahre alt.');
      if (/\bich habe angst\s+für\b/i.test(text)) mistakes.push('Корректно: Angst vor + Dativ.');
      if (/\bder problem\b/i.test(text)) mistakes.push('Корректно: das Problem.');
      if (/\bich gehen\b/i.test(text)) mistakes.push('Спряжение: ich gehe.');

      const words = text.split(/\s+/).filter(Boolean);
      const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
      const complexity = Math.min(100, 30 + sentenceCount * 8 + (/\b(weil|dass|obwohl|wenn)\b/i.test(text) ? 18 : 0));
      const vocab = Math.min(100, 35 + Math.round(new Set(words.map(w => w.toLowerCase())).size / Math.max(words.length, 1) * 70));
      const accuracy = Math.max(15, 90 - mistakes.length * 18);
      const fluency = Math.min(100, 35 + Math.round(words.length / 2));

      const skillScores = {
        accuracy,
        fluency,
        complexity,
        vocab
      };

      const microPool = [
        'Скажите 3 предложения с weil + глагол в конце.',
        'Сделайте 2 фразы в Konjunktiv II: ich würde..., ich könnte...',
        'Преобразуйте 2 предложения из Aktiv в Passiv.'
      ];

      const microTask = microPool[Math.floor(Math.random() * microPool.length)];
      const advice = mistakes.length
        ? `Сфокусируйтесь на: ${mistakes[0]} Затем повторите ответ медленно и четко.`
        : 'Хорошо. Усложните ответ: добавьте Nebensatz и 1 связку (außerdem/dennoch).';

      this.state.lastMistakes = mistakes.slice(0, 5);
      mistakes.forEach((m) => {
        this.state.weaknessLog[m] = (this.state.weaknessLog[m] || 0) + 1;
      });
      this.saveState();

      return { detectedLang: lang || detectedLang, mistakes, skillScores, microTask, advice };
    }

    generateDailyPlan(profile = {}) {
      const level = profile.level || 'A2→B2';
      return [
        `5 мин: повтор лексики уровня ${level} (5 слов + 2 примера).`,
        '10 мин: roleplay (кафе/собеседование) с одним follow-up вопросом.',
        '8 мин: мини-письмо (4-6 предложений) с weil/dass + самопроверка.'
      ];
    }

    markMissionCompleted(done = true) {
      this.state.dailyMissionCompleted = !!done;
      this.saveState();
      return this.state.dailyMissionCompleted;
    }

    getState() {
      return { ...this.state, weaknessLog: { ...this.state.weaknessLog }, lastMistakes: [...this.state.lastMistakes] };
    }
  }

  if (!window.arisLanguageBrain) {
    window.arisLanguageBrain = new LanguageBrain();
  }
})();
