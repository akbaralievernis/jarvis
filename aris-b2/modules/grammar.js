const tasks = [
  {
    type: 'Aktiv → Passiv',
    prompt: 'Die Firma verbessert den Service.',
    answerHint: 'Der Service wird von der Firma verbessert.'
  },
  {
    type: 'Realität → Hypothese',
    prompt: 'Ich habe keine Zeit, deshalb lerne ich heute nicht.',
    answerHint: 'Wenn ich Zeit hätte, würde ich heute lernen.'
  },
  {
    type: 'Verbalstil → Nominalstil',
    prompt: 'Wir analysieren die Daten und vergleichen die Ergebnisse.',
    answerHint: 'Die Analyse der Daten und der Vergleich der Ergebnisse ...'
  }
];

export function renderGrammar() {
  const item = tasks[Math.floor(Math.random() * tasks.length)];
  return `
    <section class="card">
      <h2>Grammatik Arena</h2>
      <p>Daily transformation drill with instant correction and error logging.</p>
      <div class="feedback">
        <strong>${item.type}</strong><br>
        ${item.prompt}
      </div>
      <label for="grammar-answer">Your transformation</label>
      <textarea id="grammar-answer" rows="4"></textarea>
      <button id="grammar-check" class="btn" data-hint="${item.answerHint}">Check answer</button>
      <div id="grammar-result" class="feedback">Awaiting your transformation...</div>
    </section>
  `;
}

export function bindGrammar({ markTask }) {
  document.getElementById('grammar-check')?.addEventListener('click', (event) => {
    const answer = document.getElementById('grammar-answer').value.toLowerCase();
    const hint = event.currentTarget.dataset.hint;
    const strong = answer.length > 20 && /wird|würde|ung|keit|heit/.test(answer);
    const result = document.getElementById('grammar-result');
    result.innerHTML = strong
      ? '<strong>Strong attempt.</strong> Structure detected and logged for repetition tracking.'
      : `<strong>Needs revision.</strong> Model direction: ${hint}`;
    markTask('grammar', strong);
  });
}
