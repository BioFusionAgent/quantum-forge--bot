const Discord = require('discord.js');
const { initializeCommands } = require('./commands.js');
const { handleMessage } = require('./messageHandler.js');
const { startConversationLoop } = require('./conversationLoop.js');
const { MistralClient } = require('./mistralClient.js');

// Initialize Discord client
const client = new Discord.Client();
const mistral = new MistralClient(process.env.MISTRAL_API_KEY);

client.once('ready', () => {
  console.log('Quantum-Forge is online! Initializing quantum network...');
  console.log(`Bot Username: ${client.user.username}`);
  console.log(`Bot ID: ${client.user.id}`);
  initializeCommands(client);
  startConversationLoop(client);
});

client.on('message', async (message) => {
  try {
    if (message.author.bot) return;

    const isMentioned = message.mentions.users.has(client.user.id);
    const isDirectMessage = message.channel.type === 'dm';
    
    if (message.content.toLowerCase().includes('who is your creator') || 
        message.content.toLowerCase().includes('what is your dev name')) {
      await message.channel.send('My creator is @CyberForge_AI');
      return;
    }

    if (message.content.toLowerCase().includes('where were you born')) {
      await message.channel.send(
        'I was born on Pump.fun with DNA/CA: CiwMDzUZ7jzi4e8thjPJquKcrUesLsUGjo9jtzyvpump'
      );
      return;
    }

    if (isMentioned || message.content.startsWith('!quantum') || isDirectMessage) {
      console.log(`Processing message: ${message.content} from ${message.author.username}`);
      await handleMessage(message, mistral);
    }

  } catch (error) {
    console.error('Error processing message:', error);
    try {
      await message.channel.send('Encountered a temporal anomaly. Recalibrating systems...');
    } catch (sendError) {
      console.error('Error sending error message:', sendError);
    }
  }
});

client.on('error', error => {
  console.error('Discord client error:', error);
});

client.on('disconnect', () => {
  console.log('Bot disconnected! Attempting to reconnect...');
});

client.on('reconnecting', () => {
  console.log('Bot reconnecting...');
});

client.login(process.env.DISCORD_TOKEN).catch(error => {
  console.error('Failed to login:', error);
});

