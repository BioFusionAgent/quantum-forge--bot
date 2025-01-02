async function handleMessage(message, mistral) {
  try {
    let content = message.content;
    
    // Remove bot mention from the message if present
    if (message.mentions.users.has(message.client.user.id)) {
      content = content.replace(/<@!?[0-9]+>/g, '').trim();
    }

    // Handle quantum command
    if (content.startsWith('!quantum')) {
      content = content.slice(8).trim();
    }

    // Handle agent activation
    if (content.startsWith('activate')) {
      const agentParts = content.split(' ');
      const agent = agentParts.length > 1 ? agentParts[1].toLowerCase() : '';
      await handleAgentActivation(message, agent);
      return;
    }

    // Generate response for other messages
    const response = await mistral.generateResponse(content);
    await message.channel.send({
      embed: {
        title: '🌌 Quantum-Forge Response',
        description: response,
        color: 0x7B1FA2,
        footer: {
          text: 'Quantum-Forge | Orchestrating the Future'
        },
        timestamp: new Date()
      }
    }, { reply: message.author });

  } catch (error) {
    console.error('Error in handleMessage:', error);
    await message.channel.send(
      'Temporal disturbance detected. Recalibrating quantum circuits...',
      { reply: message.author }
    );
  }
}

async function handleAgentActivation(message, agent) {
  try {
    const agents = {
      chrono: '⏰ Temporal mechanics initialization sequence engaged...',
      paradox: '🌀 Paradox resolution protocols activated...',
      nexus: '🎯 Multi-dimensional navigation systems online...',
      cipher: '🔒 Blockchain security measures deployed...'
    };

    const response = agents[agent] || 
      'Invalid agent specified. Available agents: Chrono, Paradox, Nexus, Cipher';

    await message.channel.send({
      embed: {
        title: `${agent ? agent.toUpperCase() : 'Unknown'} Agent Activation`,
        description: response,
        color: 0x7B1FA2,
        footer: {
          text: 'Quantum-Forge | Agent Network'
        },
        timestamp: new Date()
      }
    }, { reply: message.author });
  } catch (error) {
    console.error('Error in handleAgentActivation:', error);
    await message.channel.send(
      'Agent activation sequence failed. Retrying...',
      { reply: message.author }
    );
  }
}

module.exports = { handleMessage };

