const KEY = 'aris-b2-lang-v1';

const dict = {
  ru: {
    navDashboard: 'Панель',
    navCoach: 'Коуч',
    navGrammar: 'Грамматика',
    navWriting: 'Письмо',
    navVocab: 'Словарь',
    navExam: 'Экзамен',
    milestone: 'Цель B2 к сентябрю',
    continue: '🎯 Продолжить тренировку',
    speaking: '🎙 Запустить speaking-дрилл'
  },
  de: {
    navDashboard: 'Dashboard',
    navCoach: 'Coach',
    navGrammar: 'Grammatik',
    navWriting: 'Writing',
    navVocab: 'Vokabeln',
    navExam: 'Prüfung',
    milestone: 'B2-Ziel bis September',
    continue: '🎯 Training fortsetzen',
    speaking: '🎙 Sprechtraining starten'
  }
};

let currentLang = localStorage.getItem(KEY) || 'ru';

export function getLang() { return currentLang; }
export function setLang(lang) {
  currentLang = dict[lang] ? lang : 'ru';
  localStorage.setItem(KEY, currentLang);
}
export function t(key) { return dict[currentLang]?.[key] || dict.ru[key] || key; }
