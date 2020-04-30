export const LANES_TYPES = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
};

export const LANES = {
  [LANES_TYPES.OPEN]: {
    id: LANES_TYPES.OPEN,
    type: LANES_TYPES.OPEN,
    title: 'Zgłoszone',
    cards: [],
  },
  [LANES_TYPES.IN_PROGRESS]: {
    id: LANES_TYPES.IN_PROGRESS,
    type: LANES_TYPES.IN_PROGRESS,
    title: 'W trakcie',
    cards: [],
  },
  [LANES_TYPES.DONE]: {
    id: LANES_TYPES.DONE,
    type: LANES_TYPES.DONE,
    title: 'Zakończone',
    cards: [],
  },
};
