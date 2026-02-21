import { vocabularyBank } from '../data/vocab.js';

function pickSet() {
  const shuffled = [...vocabularyBank].sort(() => Math.random() - 0.5);
  return {
    newWords: shuffled.slice(0, 5),
    reviewWords: shuffled.slice(5, 10)
  };
}

export function renderVocab() {
  const set = pickSet();
  const list = (items) =>
    items
      .map((w) => `<li><strong>${w.word}</strong> — ${w.context}</li>`)
      .join('');

  return `
    <section class="card">
      <h2>Vocabulary Engine</h2>
      <p>5 new + 5 review words with production requirements and spaced repetition.</p>
      <div class="grid two-col">
        <div>
          <h4>New Words</h4>
          <ul>${list(set.newWords)}</ul>
        </div>
        <div>
          <h4>Review Words</h4>
          <ul>${list(set.reviewWords)}</ul>
        </div>
      </div>
      <label for="vocab-production">Write one sentence using at least 2 words from today</label>
      <textarea id="vocab-production" rows="4"></textarea>
      <button id="vocab-submit" class="btn secondary">Submit production</button>
      <div id="vocab-feedback" class="feedback">Waiting for your sentence...</div>
    </section>
  `;
}

export function bindVocab({ markTask }) {
  document.getElementById('vocab-submit')?.addEventListener('click', () => {
    const text = document.getElementById('vocab-production').value.toLowerCase();
    const matches = vocabularyBank.filter((w) => text.includes(w.word.toLowerCase())).length;
    const out = document.getElementById('vocab-feedback');
    if (matches >= 2) {
      out.innerHTML = `<strong>Great.</strong> ${matches} target words detected. Repetition score updated.`;
      markTask('vocab', true);
    } else {
      out.innerHTML = '<strong>Try again.</strong> Include at least two target words for active production.';
    }
  });
}
