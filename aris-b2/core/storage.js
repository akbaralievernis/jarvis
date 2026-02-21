const KEY = 'aris-b2-state-v2';

const defaultState = {
  streak: 1,
  milestoneProgress: 18,
  scores: {
    grammar: 54,
    complexity: 49,
    vocabulary: 52,
    argumentation: 45,
    fluency: 47
  },
  completedTasks: [],
  weaknessLog: {},
  examHistory: []
};

export function getState() {
  try {
    const fromStorage = localStorage.getItem(KEY);
    if (!fromStorage) return structuredClone(defaultState);
    return { ...defaultState, ...JSON.parse(fromStorage) };
  } catch {
    return structuredClone(defaultState);
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
