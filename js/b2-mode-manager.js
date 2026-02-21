(function () {
  const MODE_KEY = 'aris-ui-mode-v1';
  const LANG_KEY = 'aris-ui-lang-v1';

  const state = {
    mode: localStorage.getItem(MODE_KEY) || 'assistant',
    lang: localStorage.getItem(LANG_KEY) || 'ru'
  };

  const i18n = {
    ru: {
      assistant: 'Ассистент',
      coach: 'B2 Коуч',
      coachTitle: 'B2 German Performance Coach',
      coachInfo: 'Режим коуча открывает модуль строгой B2-практики, не затрагивая логику Jarvis.',
      openCoach: 'Открыть B2 модуль'
    },
    de: {
      assistant: 'Assistent',
      coach: 'B2 Coach',
      coachTitle: 'B2 Deutsch Performance Coach',
      coachInfo: 'Der Coach-Modus öffnet ein strenges B2-Trainingsmodul, ohne die Jarvis-Logik zu verändern.',
      openCoach: 'B2-Modul öffnen'
    }
  };

  function t(key) {
    return (i18n[state.lang] && i18n[state.lang][key]) || i18n.ru[key] || key;
  }

  function applyTexts() {
    const map = {
      modeAssistantBtn: 'assistant',
      modeCoachBtn: 'coach',
      coachPanelTitle: 'coachTitle',
      coachPanelInfo: 'coachInfo',
      openCoachBtn: 'openCoach'
    };
    Object.entries(map).forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = t(key);
    });

    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) langBtn.textContent = state.lang === 'ru' ? 'DE' : 'RU';
  }

  function applyMode() {
    const assistantRoot = document.getElementById('assistantRoot');
    const coachRoot = document.getElementById('coachRoot');
    const assistantBtn = document.getElementById('modeAssistantBtn');
    const coachBtn = document.getElementById('modeCoachBtn');

    if (!assistantRoot || !coachRoot) return;

    const coachMode = state.mode === 'coach';
    assistantRoot.classList.toggle('hidden-by-mode', coachMode);
    coachRoot.classList.toggle('hidden-by-mode', !coachMode);
    assistantBtn?.classList.toggle('active', !coachMode);
    coachBtn?.classList.toggle('active', coachMode);

    const iframe = document.getElementById('coachFrame');
    if (coachMode && iframe && !iframe.src) {
      iframe.src = `./aris-b2/index.html#dashboard?lang=${state.lang}`;
    }
  }

  function syncCoachLanguage() {
    const iframe = document.getElementById('coachFrame');
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage({ type: 'aris:set-language', lang: state.lang }, '*');
  }

  function setMode(mode) {
    state.mode = mode;
    localStorage.setItem(MODE_KEY, mode);
    applyMode();
  }

  function toggleLang() {
    state.lang = state.lang === 'ru' ? 'de' : 'ru';
    localStorage.setItem(LANG_KEY, state.lang);
    applyTexts();
    syncCoachLanguage();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('modeAssistantBtn')?.addEventListener('click', () => setMode('assistant'));
    document.getElementById('modeCoachBtn')?.addEventListener('click', () => setMode('coach'));
    document.getElementById('langToggleBtn')?.addEventListener('click', toggleLang);
    document.getElementById('openCoachBtn')?.addEventListener('click', () => setMode('coach'));

    applyTexts();
    applyMode();

    window.addEventListener('message', (event) => {
      if (event.data?.type === 'aris:coach-ready') {
        syncCoachLanguage();
      }
    });
  });
})();
