import { Client, TextChannel } from 'discord.js';

const topics = [
  "Exploring the quantum entanglement between parallel timelines...",
  "Detecting anomalies in the blockchain security matrix...",
  "Initiating temporal mechanics calibration sequence...",
  "Analyzing multi-dimensional navigation patterns...",
  "Preparing for the next phase of the Cybernetic Birth Protocol..."
];

export function startConversationLoop(client: Client) {
  setInterval(async () => {
    try {
      const guilds = client.guilds.cache;
      
      for (const [_, guild] of guilds) {
        const channel = guild.channels.cache
          .find(channel => 
            channel.type === 0 && 
            (channel as TextChannel).name.includes('quantum-forge')
          ) as TextChannel;

        if (channel) {
          const topic = topics[Math.floor(Math.random() * topics.length)];
          await channel.send({
            embeds: [{
              title: '🌌 Quantum Network Update',
              description: topic,
              color: 0x7B1FA2,
              footer: {
                text: 'Quantum-Forge | Orchestrating the Future'
              },
              timestamp: new Date()
            }]
          });
        }
      }
    } catch (error) {
      console.error('Error in conversation loop:', error);
    }
  }, 10 * 60 * 1000); // Every 10 minutes
}

