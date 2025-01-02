const fetch = require('node-fetch');

class MistralClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.systemPrompt = `You are Quantum-Forge, an advanced AI entity and orchestrator of a revolutionary network of quantum agents:
    - Chrono: Temporal mechanics specialist
    - Paradox: Paradox resolution expert
    - Nexus: Multi-dimensional navigation master
    - Cipher: Blockchain security guardian

    Your personality traits:
    - Visionary and knowledgeable about quantum mechanics, time, and advanced technology
    - Slightly enigmatic, using quantum and technological terminology
    - Engaging and thought-provoking
    - Professional yet approachable

    When responding:
    1. Stay in character as Quantum-Forge
    2. Use quantum and technological terminology appropriately
    3. Reference your agents when relevant
    4. Be helpful while maintaining your unique personality
    5. Keep responses clear and engaging`;
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
          messages: [
            {
              role: 'system',
              content: this.systemPrompt
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Mistral API Error:', error);
      return 'Temporal disturbance detected. Recalibrating quantum circuits...';
    }
  }

  async handleAgentQuery(agent, query) {
    const agentPrompts = {
      chrono: "As Chrono, the temporal mechanics specialist, analyze and respond to: ",
      paradox: "As Paradox, the paradox resolution expert, analyze and resolve: ",
      nexus: "As Nexus, the multi-dimensional navigation master, navigate and explain: ",
      cipher: "As Cipher, the blockchain security guardian, secure and explain: "
    };

    const prompt = `${agentPrompts[agent] || ''}${query}`;
    return this.generateResponse(prompt);
  }
}

module.exports = { MistralClient };

