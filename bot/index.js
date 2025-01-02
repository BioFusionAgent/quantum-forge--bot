const { Client } = require('discord.js');
const { initializeCommands } = require('./commands.js');
const { handleMessage } = require('./messageHandler.js');
const { startConversationLoop } = require('./conversationLoop.js');
const { MistralClient } = require('./mistralClient.js');

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'MESSAGE_CONTENT']
});

const mistral = new MistralClient(process.env.MISTRAL_API_KEY);

client.once('ready', () => {
  console.log('Quantum-Forge is online! Initializing quantum network...');
  initializeCommands(client);
  startConversationLoop(client);
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  
  if (message.content.toLowerCase().includes('who is your creator') || 
      message.content.toLowerCase().includes('what is your dev name')) {
    await message.reply('@CyberForge_AI');
    return;
  }

  if (message.content.toLowerCase().includes('where were you born')) {
    await message.reply('I was born on Pump.fun with DNA/CA: CiwMDzUZ7jzi4e8thjPJquKcrUesLsUGjo9jtzyvpump');
    return;
  }

  await handleMessage(message, mistral);
});

client.login(process.env.DISCORD_TOKEN);

