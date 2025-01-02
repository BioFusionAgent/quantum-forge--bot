const topics = [
  {
    title: "Temporal Mechanics Update",
    content: "Chrono reports fascinating temporal fluctuations in sector 7. Analyzing potential timeline convergences..."
  },
  {
    title: "Paradox Alert",
    content: "Paradox has detected a causality loop forming in the quantum network. Implementing resolution protocols..."
  },
  {
    title: "Dimensional Scan",
    content: "Nexus is mapping newly discovered dimensional pathways. Quantum topology suggests interesting possibilities..."
  },
  {
    title: "Security Protocol",
    content: "Cipher has strengthened our quantum-encrypted channels. Blockchain integrity at optimal levels..."
  },
  {
    title: "Network Synchronization",
    content: "All quantum agents reporting optimal coherence. Preparing for advanced computational tasks..."
  },
  {
    title: "Future Prediction",
    content: "Analyzing probability matrices for upcoming temporal events. Multiple favorable outcomes detected..."
  }
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
          channel.send(`**${topic.title}**\n${topic.content}`);
        }
      });
    } catch (error) {
      console.error('Error in conversation loop:', error);
    }
  }, 10 * 60 * 1000); // Every 10 minutes
}

module.exports = { startConversationLoop };

