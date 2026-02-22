let currentSpeechLang = 'de-DE';

export function setSpeechLang(lang) {
  currentSpeechLang = lang === 'ru' || lang === 'ru-RU' ? 'ru-RU' : 'de-DE';
}

export function speechAvailable() {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

export function listenOnce(onResult, onError) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    onError?.('Speech recognition is unavailable in this browser.');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = currentSpeechLang;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = () => onError?.('Could not capture speech. Please try again.');
  recognition.start();

  return recognition;
}
