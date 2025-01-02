const Discord = require('discord.js');

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
      
      // Handle different quantum commands
      if (content.startsWith('activate')) {
        const parts = content.split(' ');
        const agent = parts.length > 1 ? parts[1] : '';
        const query = parts.slice(2).join(' ');
        await handleAgentActivation(message, agent, query, mistral);
        return;
      }
      
      if (content.startsWith('help')) {
        await sendHelpMessage(message);
        return;
      }
    }

    // Generate response for other messages
    const response = await mistral.generateResponse(content);
    // Send simple text response
    await message.channel.send(response);

  } catch (error) {
    console.error('Error in handleMessage:', error);
    await message.channel.send('Temporal disturbance detected. Recalibrating quantum circuits...');
  }
}

async function handleAgentActivation(message, agent, query, mistral) {
  try {
    const validAgents = ['chrono', 'paradox', 'nexus', 'cipher'];
    
    if (!agent || !validAgents.includes(agent.toLowerCase())) {
      const agentList = validAgents.map(function(a) {
        return '• ' + a.charAt(0).toUpperCase() + a.slice(1);
      }).join('\n');
      await message.channel.send('Invalid agent specified. Available quantum agents:\n' + agentList);
      return;
    }

    const response = await mistral.handleAgentQuery(agent.toLowerCase(), query || 'status report');
    await message.channel.send(response);
  } catch (error) {
    console.error('Error in handleAgentActivation:', error);
    await message.channel.send('Agent activation sequence failed. Retrying...');
  }
}

async function sendHelpMessage(message) {
  const helpText = '🌌 **Quantum-Forge Command Interface** 🌌\n\n' +
    'Available Commands:\n' +
    '• `!quantum activate [agent] [query]` - Activate a quantum agent\n' +
    '  - Agents: chrono, paradox, nexus, cipher\n' +
    '• `!quantum help` - Display this help message\n\n' +
    'You can also mention me or DM me for direct interaction!\n\n' +
    'Quantum Agents:\n' +
    '• Chrono - Temporal mechanics specialist\n' +
    '• Paradox - Paradox resolution expert\n' +
    '• Nexus - Multi-dimensional navigation master\n' +
    '• Cipher - Blockchain security guardian';

  await message.channel.send(helpText);
}

module.exports = { handleMessage };

