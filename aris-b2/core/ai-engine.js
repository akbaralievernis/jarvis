import { evaluateText } from './scoring.js';

function normalize(payload) {
  return {
    overall_score: payload.overall_score ?? 0,
    grammar_score: payload.grammar_score ?? 0,
    complexity_score: payload.complexity_score ?? 0,
    vocabulary_score: payload.vocabulary_score ?? 0,
    argument_score: payload.argument_score ?? 0,
    fluency_potential: payload.fluency_potential ?? 0,
    weakness_detected: payload.weakness_detected || [],
    missing_structures: payload.missing_structures || [],
    corrected_version: payload.corrected_version || '',
    advanced_version: payload.advanced_version || '',
    next_challenge: payload.next_challenge || ''
  };
}

export async function evaluateWithAI(text, options = {}) {
  const endpoint = window.ARIS_AI_ENDPOINT;
  if (!endpoint) {
    return { source: 'offline', ...evaluateText(text, options) };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, ...options })
    });
    if (!response.ok) throw new Error('endpoint failed');
    const payload = await response.json();
    return { source: 'api', ...normalize(payload) };
  } catch {
    return { source: 'offline-fallback', ...evaluateText(text, options) };
  }
}
