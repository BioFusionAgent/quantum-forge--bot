const topics = [
  "Exploring the quantum entanglement between parallel timelines...",
  "Detecting anomalies in the blockchain security matrix...",
  "Initiating temporal mechanics calibration sequence...",
  "Analyzing multi-dimensional navigation patterns...",
  "Preparing for the next phase of the Cybernetic Birth Protocol..."
];

function startConversationLoop(client) {
  setInterval(function() {
    try {
      client.guilds.cache.forEach(function(guild) {
        const channel = guild.channels.cache.find(function(channel) {
          return channel.type === 'text' && channel.name.includes('quantum-forge');
        });

        if (channel) {
          const topic = topics[Math.floor(Math.random() * topics.length)];
          channel.send({
            embed: {
              title: '🌌 Quantum Network Update',
              description: topic,
              color: 0x7B1FA2,
              footer: {
                text: 'Quantum-Forge | Orchestrating the Future'
              },
              timestamp: new Date()
            }
          }).catch(console.error);
        }
      });
    } catch (error) {
      console.error('Error in conversation loop:', error);
    }
  }, 10 * 60 * 1000); // Every 10 minutes
}

module.exports = { startConversationLoop };

