const advancedConnectors = [
  'obwohl',
  'während',
  'außerdem',
  'allerdings',
  'hingegen',
  'dennoch',
  'infolgedessen',
  'zudem',
  'einerseits',
  'andererseits'
];

const nominalSuffixes = /(ung|keit|heit|tion|tät|ismus)\b/i;
const konjunktivRegex = /\b(würde|hätte|wäre|könnte|sollte|müsste|dürfte)\b/gi;
const passiveRegex = /\b(wird|wurden|worden|ist)\s+\w+(t|en)\b/gi;
const subordinateRegex = /\b(weil|dass|obwohl|wenn|während|damit|sobald|falls)\b/gi;

function countMatches(regex, text) {
  return (text.match(regex) || []).length;
}

function buildWeaknesses({ hasKonjunktiv, hasPassive, hasNominal, subordinateCount, connectorCount, grammarSignals }) {
  const weaknesses = [];

  if (!hasKonjunktiv) weaknesses.push('Konjunktiv II Bildung unsicher');
  if (!hasPassive) weaknesses.push('Passiv kaum oder falsch eingesetzt');
  if (!hasNominal) weaknesses.push('Nominalisierung fehlt im Ausdruck');
  if (subordinateCount < 2) weaknesses.push('Nebensatzstruktur zu einfach');
  if (connectorCount < 2) weaknesses.push('Argumentative Verknüpfung zu schwach');
  if (grammarSignals.articleLikelyIssue) weaknesses.push('Artikelgebrauch wirkt inkonsistent');
  if (grammarSignals.prepLikelyIssue) weaknesses.push('Präpositionen mit Kasus unsicher');

  return weaknesses;
}

function grammarSignals(text) {
  return {
    articleLikelyIssue: /\bein\s+[A-ZÄÖÜ]/.test(text),
    prepLikelyIssue: /\bmit\s+der\s+Problem\b|\bwegen\s+dem\b/i.test(text)
  };
}

export function evaluateText(text, options = {}) {
  const clean = text.trim();
  const mode = options.mode || 'discussion';
  const pressureMode = options.pressureMode ?? true;

  if (!clean) {
    return {
      overall_score: 0,
      grammar_score: 0,
      complexity_score: 0,
      vocabulary_score: 0,
      argument_score: 0,
      fluency_potential: 0,
      weakness_detected: ['Keine auswertbare Antwort vorhanden'],
      missing_structures: ['Konjunktiv II', 'Passiv', 'Nominalisierung', 'Nebensätze', 'Konnektoren'],
      corrected_version: '',
      advanced_version: '',
      next_challenge: 'Antwort liefern. Mindestens fünf Sätze mit klarer Argumentationsstruktur verfassen.'
    };
  }

  const words = clean.split(/\s+/).filter(Boolean);
  const sentences = clean.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const uniqueWords = new Set(words.map((w) => w.toLowerCase()));

  const konjunktivCount = countMatches(konjunktivRegex, clean);
  const passiveCount = countMatches(passiveRegex, clean);
  const subordinateCount = countMatches(subordinateRegex, clean);
  const connectorCount = advancedConnectors.filter((c) => new RegExp(`\\b${c}\\b`, 'i').test(clean)).length;
  const nominalCount = countMatches(nominalSuffixes, clean);

  const hasKonjunktiv = konjunktivCount > 0;
  const hasPassive = passiveCount > 0;
  const hasNominal = nominalCount > 0;

  const signals = grammarSignals(clean);
  const missing_structures = [];
  if (!hasKonjunktiv) missing_structures.push('Konjunktiv II');
  if (!hasPassive) missing_structures.push('Passiv');
  if (!hasNominal) missing_structures.push('Nominalisierung');
  if (subordinateCount < 2) missing_structures.push('Mindestens zwei komplexe Nebensätze');
  if (connectorCount < 2) missing_structures.push('Fortgeschrittene Konnektoren');

  const avgSentenceLength = words.length / Math.max(1, sentences.length);
  let grammar_score = 56 + (hasKonjunktiv ? 12 : -10) + (hasPassive ? 10 : -8) + (signals.articleLikelyIssue ? -7 : 5) + (signals.prepLikelyIssue ? -7 : 5);
  let complexity_score = 40 + subordinateCount * 10 + connectorCount * 8 + (hasNominal ? 8 : -8) + Math.min(8, Math.round(avgSentenceLength / 3));
  let vocabulary_score = 38 + Math.round((uniqueWords.size / words.length) * 42) + nominalCount * 4;
  let argument_score = 35 + connectorCount * 12 + (sentences.length >= 5 ? 14 : -8) + (/einerseits|andererseits|abschließend|zusammenfassend/i.test(clean) ? 12 : -6);
  let fluency_potential = 42 + Math.min(20, sentences.length * 3) + Math.min(16, Math.round(words.length / 12));

  const tooSimple = sentences.length < 4 && subordinateCount === 0 && connectorCount === 0;
  if (tooSimple) {
    complexity_score -= 20;
    argument_score -= 15;
  }

  if (pressureMode && /^(ich|wir)\s+\w+/i.test(sentences.join(' ')) && !/\b(war|hatte|würde|wäre|hätte|könnte|wurde)\b/i.test(clean)) {
    grammar_score -= 8;
  }

  grammar_score = Math.max(0, Math.min(100, Math.round(grammar_score)));
  complexity_score = Math.max(0, Math.min(100, Math.round(complexity_score)));
  vocabulary_score = Math.max(0, Math.min(100, Math.round(vocabulary_score)));
  argument_score = Math.max(0, Math.min(100, Math.round(argument_score)));
  fluency_potential = Math.max(0, Math.min(100, Math.round(fluency_potential)));

  const overall_score = Math.round((grammar_score + complexity_score + vocabulary_score + argument_score + fluency_potential) / 5);
  const weakness_detected = buildWeaknesses({
    hasKonjunktiv,
    hasPassive,
    hasNominal,
    subordinateCount,
    connectorCount,
    grammarSignals: signals
  });

  const corrected_version = clean
    .replace(/ ich /gi, ' Ich ')
    .replace(/ ,/g, ',')
    .replace(/\s{2,}/g, ' ')
    .trim();

  const advanced_version =
    'Meines Erachtens sollte das Thema differenziert betrachtet werden, weil sowohl gesellschaftliche als auch wirtschaftliche Folgen berücksichtigt werden müssen. ' +
    'Wenn die vorgeschlagenen Maßnahmen konsequent umgesetzt würden, könnte die Qualität deutlich gesteigert werden; zudem würde die langfristige Planung erleichtert. ' +
    'Abschließend lässt sich festhalten, dass eine strukturierte Umsetzung unter klaren Rahmenbedingungen den größten Mehrwert erzeugen würde.';

  let next_challenge =
    'Erweitern Sie Ihre Antwort mit einer klaren Einleitung, zwei begründeten Argumenten und einem präzisen Fazit.';

  const shortEssay = mode === 'essay' && words.length < 120;
  const shortDiscussion = mode !== 'essay' && sentences.length < 5;

  if (shortEssay || shortDiscussion) {
    next_challenge =
      'Antwort erweitern. Nutzen Sie mindestens zwei komplexe Nebensätze und eine Hypothese im Konjunktiv II.';
  }

  if (tooSimple) {
    next_challenge = 'Struktur noch nicht auf B2-Niveau. Bitte komplexer formulieren.';
  }

  if (pressureMode && !hasKonjunktiv && !hasNominal) {
    next_challenge =
      'Bitte anspruchsvoller formulieren. Verwenden Sie Konjunktiv II und mindestens eine Nominalisierung.';
  }

  return {
    overall_score,
    grammar_score,
    complexity_score,
    vocabulary_score,
    argument_score,
    fluency_potential,
    weakness_detected,
    missing_structures,
    corrected_version,
    advanced_version,
    next_challenge
  };
}

export function blendedScore(current, latest) {
  return Math.round(current * 0.65 + latest * 0.35);
}
