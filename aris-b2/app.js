import { getState, saveState } from './core/storage.js';
import { blendedScore } from './core/scoring.js';
import { getLang, setLang, t } from './core/i18n.js';
import { renderDashboard } from './modules/progress.js';
import { renderCoach, bindCoach } from './modules/coach.js';
import { renderGrammar, bindGrammar } from './modules/grammar.js';
import { renderWriting, bindWriting } from './modules/writing.js';
import { renderVocab, bindVocab } from './modules/vocab.js';
import { renderExam, bindExam } from './modules/exam.js';
import { setSpeechLang } from './core/speech.js';

let state = getState();

const routes = {
  dashboard: { render: () => renderDashboard(state, getLang()) },
  coach: { render: () => renderCoach(getLang()), bind: bindCoach },
  grammar: { render: () => renderGrammar(getLang()), bind: bindGrammar },
  writing: { render: () => renderWriting(getLang()), bind: bindWriting },
  vocab: { render: () => renderVocab(getLang()), bind: bindVocab },
  exam: { render: () => renderExam(getLang()), bind: bindExam }
};

function setRoute(route) {
  window.location.hash = routes[route] ? route : 'dashboard';
}

function updateMilestone() {
  const average = Math.round(Object.values(state.scores).reduce((a, b) => a + b, 0) / 5);
  state.milestoneProgress = Math.max(state.milestoneProgress, average);
  document.getElementById('milestone-percent').textContent = `${state.milestoneProgress}%`;
}

function persist() {
  updateMilestone();
  saveState(state);
}

function applyStaticI18n() {
  const map = {
    'nav-dashboard': 'navDashboard',
    'nav-coach': 'navCoach',
    'nav-grammar': 'navGrammar',
    'nav-writing': 'navWriting',
    'nav-vocab': 'navVocab',
    'nav-exam': 'navExam',
    'milestone-label': 'milestone'
  };
  Object.entries(map).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  });
}

function helpers() {
  return {
    updateScores(result) {
      state.scores = {
        grammar: blendedScore(state.scores.grammar, result.grammar_score),
        complexity: blendedScore(state.scores.complexity, result.complexity_score),
        vocabulary: blendedScore(state.scores.vocabulary, result.vocabulary_score),
        argumentation: blendedScore(state.scores.argumentation, result.argument_score),
        fluency: blendedScore(state.scores.fluency, result.fluency_potential)
      };
      (result.weakness_detected || []).forEach((w) => {
        state.weaknessLog[w] = (state.weaknessLog[w] || 0) + 1;
      });
      persist();
    },
    markTask(task, success) {
      if (!success) return;
      state.completedTasks = [...new Set([...state.completedTasks, `${new Date().toDateString()}-${task}`])];
      state.streak += 1;
      persist();
    },
    pushExamLog(item) {
      state.examHistory = [item, ...state.examHistory].slice(0, 15);
      persist();
    }
  };
}

function renderApp() {
  applyStaticI18n();
  const route = window.location.hash.replace('#', '') || 'dashboard';
  const page = routes[route] || routes.dashboard;

  document.querySelectorAll('.nav-link').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.route === route);
  });

  document.getElementById('app-content').innerHTML = page.render();
  page.bind?.(helpers());

  const primary = document.getElementById('primary-action');
  primary.textContent = route === 'coach' ? t('speaking') : t('continue');
  primary.onclick = () => setRoute(route === 'coach' ? 'coach' : 'dashboard');
}

document.querySelectorAll('.nav-link').forEach((btn) => {
  btn.addEventListener('click', () => setRoute(btn.dataset.route));
});

window.addEventListener('message', (event) => {
  if (event.data?.type === 'aris:set-language') {
    setLang(event.data.lang);
    setSpeechLang(event.data.lang);
    renderApp();
  }
});

window.parent?.postMessage({ type: 'aris:coach-ready' }, '*');
window.addEventListener('hashchange', renderApp);
setSpeechLang(getLang());
updateMilestone();
renderApp();
