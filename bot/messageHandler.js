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
    
    // Create the embed
    const embed = new Discord.RichEmbed()
      .setTitle('🌌 Quantum-Forge Response')
      .setDescription(response)
      .setColor(0x7B1FA2)
      .setFooter('Quantum-Forge | Orchestrating the Future')
      .setTimestamp();

    // Send the response as plain text with mention
    message.channel.send(response).catch(console.error);

  } catch (error) {
    console.error('Error in handleMessage:', error);
    message.channel.send('Temporal disturbance detected. Recalibrating quantum circuits...').catch(console.error);
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

    // Send plain text response
    message.channel.send(response).catch(console.error);

  } catch (error) {
    console.error('Error in handleAgentActivation:', error);
    message.channel.send('Agent activation sequence failed. Retrying...').catch(console.error);
  }
}

module.exports = { handleMessage };

