async function handleMessage(message, mistral) {
  try {
    if (message.content.startsWith('!quantum')) {
      const command = message.content.slice(8).trim();
      
      if (command.startsWith('activate')) {
        const agent = command.split(' ')[1]?.toLowerCase();
        await handleAgentActivation(message, agent);
        return;
      }

      const response = await mistral.generateResponse(command);
      await message.reply({
        embed: {
          title: '🌌 Quantum-Forge Response',
          description: response,
          color: 0x7B1FA2,
          footer: {
            text: 'Quantum-Forge | Orchestrating the Future'
          },
          timestamp: new Date()
        }
      });
    }
  } catch (error) {
    console.error('Error handling message:', error);
    await message.reply('Temporal disturbance detected. Recalibrating quantum circuits...');
  }
}

async function handleAgentActivation(message, agent) {
  const agents = {
    chrono: '⏰ Temporal mechanics initialization sequence engaged...',
    paradox: '🌀 Paradox resolution protocols activated...',
    nexus: '🎯 Multi-dimensional navigation systems online...',
    cipher: '🔒 Blockchain security measures deployed...'
  };

  const response = agents[agent] || 
    'Invalid agent specified. Available agents: Chrono, Paradox, Nexus, Cipher';

  await message.reply({
    embed: {
      title: `${agent ? agent.toUpperCase() : 'Unknown'} Agent Activation`,
      description: response,
      color: 0x7B1FA2,
      footer: {
        text: 'Quantum-Forge | Agent Network'
      },
      timestamp: new Date()
    }
  });
}

module.exports = { handleMessage };

