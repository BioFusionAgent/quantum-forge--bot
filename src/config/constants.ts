export const QUANTUM_CONTEXT = {
  MODEL: 'mistral-tiny',
  API_ENDPOINT: 'https://api.mistral.ai/v1/chat/completions',
  COLORS: {
    PRIMARY: '#7700FF'
  },
  TIMEOUTS: {
    RESPONSE: 15000,
    SPAM: 5000
  }
};

export const MODERATION_RULES = {
  maxMentions: 5,
  maxEmojis: 10,
  maxLines: 10,
  spamTimeout: 5000
};

