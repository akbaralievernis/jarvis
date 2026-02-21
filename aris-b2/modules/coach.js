import { evaluateWithAI } from '../core/ai-engine.js';
import { listenOnce, speechAvailable } from '../core/speech.js';

const prompts = [
  'Sollte Homeoffice in Deutschland die neue Norm werden? Begründen Sie differenziert.',
  'Welche Maßnahmen würden Sie ergreifen, um den öffentlichen Verkehr attraktiver zu machen?',
  'Wie könnte man den Fachkräftemangel in Deutschland langfristig lösen?'
];

const ui = {
  ru: {
    title: 'Разговорный коуч — Pressure Mode',
    subtitle: 'Отвечайте аргументированно на уровне B2.',
    record: 'Записать ответ',
    paste: 'Или вставьте ответ',
    eval: 'Строгая оценка',
    empty: 'Пока нет оценки.',
    listening: 'Идёт запись...',
    captured: 'Транскрипт готов. Оцените ответ.',
    processing: 'Оценка...'
  },
  de: {
    title: 'Gesprächs-Coach — Pressure Mode',
    subtitle: 'Antworten Sie präzise und argumentativ. Ziel: klare B2-Struktur unter Zeitdruck.',
    record: 'Antwort einsprechen',
    paste: 'Oder Antwort einfügen',
    eval: 'Streng evaluieren',
    empty: 'Noch keine Auswertung.',
    listening: 'Aufnahme läuft...',
    captured: 'Transkript erfasst. Jetzt streng bewerten.',
    processing: 'Evaluation läuft...'
  }
};

function tx(lang, key) { return (ui[lang] || ui.ru)[key]; }

function renderEvaluation(result) {
  return `
    <strong>Gesamt:</strong> ${result.overall_score}% (${result.source})<br>
    Grammatik ${result.grammar_score}% · Komplexität ${result.complexity_score}% · Wortschatz ${result.vocabulary_score}%<br>
    Argumentation ${result.argument_score}% · Fluency-Potenzial ${result.fluency_potential}%<br>
    <strong>Schwächen:</strong> ${result.weakness_detected.join(' | ') || 'Keine dominanten Muster'}<br>
    <strong>Fehlende Strukturen:</strong> ${result.missing_structures.join(' | ') || 'Keine'}<br>
    <strong>Korrigiert:</strong> ${result.corrected_version}<br>
    <strong>B2+ Version:</strong> ${result.advanced_version}<br>
    <strong>Nächste Aufgabe:</strong> ${result.next_challenge}
  `;
}

export function renderCoach(lang = 'ru') {
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];
  return `
    <section class="card">
      <h2>${tx(lang, 'title')}</h2>
      <p>${tx(lang, 'subtitle')}</p>
      <div class="feedback"><strong>Prompt:</strong> ${prompt}</div>
      <div class="grid" style="margin-top:.8rem;">
        <button id="coach-record" class="btn secondary">${tx(lang, 'record')}</button>
        <label for="coach-input">${tx(lang, 'paste')}</label>
        <textarea id="coach-input" rows="7" placeholder="Mindestens 5 Sätze mit Konjunktiv II, Passiv und Konnektoren..."></textarea>
        <button id="coach-score" class="btn">${tx(lang, 'eval')}</button>
      </div>
      <div id="coach-feedback" class="feedback">${tx(lang, 'empty')}</div>
      ${speechAvailable() ? '' : '<small class="warn">Speech recognition unavailable: use text input.</small>'}
    </section>
  `;
}

export function bindCoach({ updateScores, pushExamLog }) {
  document.getElementById('coach-record')?.addEventListener('click', () => {
    const output = document.getElementById('coach-feedback');
    output.textContent = '...';
    listenOnce(
      (text) => {
        document.getElementById('coach-input').value = text;
        output.textContent = 'OK';
      },
      (err) => (output.textContent = err)
    );
  });

  document.getElementById('coach-score')?.addEventListener('click', async () => {
    const text = document.getElementById('coach-input').value;
    const out = document.getElementById('coach-feedback');
    out.textContent = '...';

    const result = await evaluateWithAI(text, { mode: 'discussion', pressureMode: true });
    updateScores(result);
    pushExamLog({ type: 'coach', at: new Date().toISOString(), score: result.overall_score });
    out.innerHTML = renderEvaluation(result);
  });
}
