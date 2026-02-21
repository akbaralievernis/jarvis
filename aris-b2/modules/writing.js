import { evaluateWithAI } from '../core/ai-engine.js';

export function renderWriting(lang = 'ru') {
  const ru = lang === 'ru';
  return `
    <section class="card">
      <h2>${ru ? 'Письменная лаборатория — Academic Pressure' : 'Writing Lab — Academic Pressure'}</h2>
      <p>${ru ? 'Напишите 180–250 слов с чёткой структурой.' : 'Schreiben Sie 180–250 Wörter mit klarer Einleitung, Begründung und Fazit.'}</p>
      <label for="writing-type">${ru ? 'Тип задания' : 'Aufgabentyp'}</label>
      <select id="writing-type">
        <option>${ru ? 'Жалоба' : 'Beschwerdebrief'}</option>
        <option>${ru ? 'Аргументативное эссе' : 'Argumentativer Essay'}</option>
        <option>${ru ? 'Профессиональная позиция' : 'Berufliche Stellungnahme'}</option>
      </select>
      <label for="writing-text">${ru ? 'Ваш текст' : 'Ihr Text'}</label>
      <textarea id="writing-text" rows="11" placeholder="Konjunktiv II, Passiv, Nominalisierung, Konnektoren"></textarea>
      <button id="writing-eval" class="btn accent">${ru ? 'Запустить B2-оценку' : 'B2-Evaluation ausführen'}</button>
      <div id="writing-feedback" class="feedback">${ru ? 'Оценка ещё не выполнена.' : 'Noch keine Auswertung vorhanden.'}</div>
    </section>
  `;
}

export function bindWriting({ updateScores, markTask }) {
  document.getElementById('writing-eval')?.addEventListener('click', async () => {
    const text = document.getElementById('writing-text').value;
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const feedback = document.getElementById('writing-feedback');

    if (wordCount < 120) {
      feedback.innerHTML = '<strong>Zu kurz.</strong> Struktur noch nicht auf B2-Niveau. Bitte komplexer formulieren.';
      return;
    }

    const result = await evaluateWithAI(text, { mode: 'essay', pressureMode: true });
    updateScores(result);
    markTask('writing', result.overall_score >= 60);
    feedback.innerHTML = `<strong>Gesamt:</strong> ${result.overall_score}% (${wordCount} Wörter)<br><strong>Schwächen:</strong> ${result.weakness_detected.join(' | ') || '-'}<br><strong>Nächste Challenge:</strong> ${result.next_challenge}`;
  });
}
