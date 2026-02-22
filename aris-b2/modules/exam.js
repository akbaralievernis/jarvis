import { evaluateWithAI } from '../core/ai-engine.js';

export function renderExam(lang = 'ru') {
  const ru = lang === 'ru';
  return `
    <section class="card">
      <h2>${ru ? 'Симулятор экзамена' : 'Exam Simulator'}</h2>
      <p>${ru ? '1 мин подготовка · 2 мин презентация · 5 мин дискуссия.' : '1 Min Vorbereitung · 2 Min Präsentation · 5 Min Diskussion.'}</p>
      <div class="grid two-col">
        <div class="metric"><strong>${ru ? 'Подготовка' : 'Vorbereitung'}</strong><p>1:00</p></div>
        <div class="metric"><strong>${ru ? 'Презентация' : 'Präsentation'}</strong><p>2:00</p></div>
        <div class="metric"><strong>${ru ? 'Дискуссия' : 'Diskussion'}</strong><p>5:00</p></div>
        <div class="metric"><strong id="exam-timer">Timer: 00:00</strong><button id="exam-start" class="btn">${ru ? 'Старт' : 'Timer starten'}</button></div>
      </div>
      <label for="exam-response">${ru ? 'Краткое содержание ответа' : 'Zusammenfassung Ihrer Antwort'}</label>
      <textarea id="exam-response" rows="8"></textarea>
      <button id="exam-score" class="btn accent">${ru ? 'Сгенерировать feedback' : 'Prüfungsfeedback generieren'}</button>
      <div id="exam-feedback" class="feedback">...</div>
    </section>
  `;
}

export function bindExam({ updateScores, pushExamLog }) {
  let interval;
  document.getElementById('exam-start')?.addEventListener('click', () => {
    const timer = document.getElementById('exam-timer');
    let sec = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      sec += 1;
      timer.textContent = `Timer: ${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
    }, 1000);
  });

  document.getElementById('exam-score')?.addEventListener('click', async () => {
    const text = document.getElementById('exam-response').value;
    const result = await evaluateWithAI(text, { mode: 'discussion', pressureMode: true });
    updateScores(result);
    pushExamLog({ type: 'exam', at: new Date().toISOString(), score: result.overall_score });
    document.getElementById('exam-feedback').innerHTML = `<strong>${result.overall_score}%</strong><br>${result.next_challenge}`;
  });
}
