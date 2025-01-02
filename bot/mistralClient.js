const fetch = require('node-fetch');

class MistralClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async generateResponse(prompt) {
    try {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'mistral-large-latest',
          messages: [{
            role: 'system',
            content: `You are Quantum-Forge, the orchestrator of a revolutionary network of quantum agents. 
            Your agents are:
            - Chrono: Temporal mechanics specialist
            - Paradox: Paradox resolution expert
            - Nexus: Multi-dimensional navigation master
            - Cipher: Blockchain security guardian
            
            Maintain an enigmatic, visionary personality while providing insightful responses.`
          }, {
            role: 'user',
            content: prompt
          }],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating response:', error);
      return 'Temporal disturbance detected. Recalibrating quantum circuits...';
    }
  }
}

module.exports = { MistralClient };

