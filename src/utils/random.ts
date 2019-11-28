
// Credit: https://gist.github.com/6174/6062387

export const pseudoUUID = (): string => (
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
);
