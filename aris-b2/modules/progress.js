import { weekPlan, roadmap } from '../data/week1.js';

const percent = (n) => `${Math.max(0, Math.min(100, n))}%`;

function weaknessRows(weaknessLog) {
  const items = Object.entries(weaknessLog || {}).sort((a, b) => b[1] - a[1]).slice(0, 5);
  if (!items.length) return '<small>No recurring weakness detected yet.</small>';
  return items.map(([w, c]) => `<div class="task-row"><span>${w}</span><strong>${c}×</strong></div>`).join('');
}

export function renderDashboard(state, lang = 'ru') {
  const ru = lang === 'ru';
  const labels = {
    grammar: ru ? 'Грамматика' : 'Grammar Accuracy',
    complexity: ru ? 'Сложность' : 'Sentence Complexity',
    vocabulary: ru ? 'Словарь' : 'Vocabulary Range',
    argumentation: ru ? 'Аргументация' : 'Argument Structure',
    fluency: ru ? 'Беглость' : 'Fluency Potential'
  };

  return `
    <section class="card">
      <h2>${ru ? 'Панель прогресса' : 'Performance Dashboard'}</h2>
      <div class="grid two-col">
        ${Object.entries(state.scores).map(([k, v]) => `<div class="metric"><strong>${labels[k]}</strong><div class="progress-track"><div class="progress-fill" style="width:${percent(v)}"></div></div><small>${v}%</small></div>`).join('')}
      </div>
      <p><strong>Streak:</strong> ${state.streak}</p>
    </section>
    <section class="card"><h3>${ru ? 'Повторяющиеся слабости' : 'Recurring Weakness Patterns'}</h3>${weaknessRows(state.weaknessLog)}</section>
    <section class="card"><h3>${ru ? 'Дорожная карта до сентября' : 'Roadmap to September'}</h3>${roadmap.map((r) => `<div class="metric"><strong>${r.phase}: ${r.title}</strong><div class="progress-track"><div class="progress-fill" style="width:${percent(state.milestoneProgress >= r.target ? 100 : (state.milestoneProgress / r.target) * 100)}"></div></div></div>`).join('')}</section>
    <section class="card"><h3>${ru ? 'Недельный план' : 'Weekly Plan'}</h3>${weekPlan.map((item) => `<div class="task-row"><div><strong>${item.day}</strong> · ${item.focus}<br><small>${item.phase}</small></div><span class="status-pill">Plan</span></div>`).join('')}</section>
  `;
}
