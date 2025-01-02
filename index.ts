import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import { initializeCommands } from './commands';
import { handleMessage } from './messageHandler';
import { startConversationLoop } from './conversationLoop';
import { MistralClient } from './mistralClient';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const mistral = new MistralClient(process.env.MISTRAL_API_KEY!);

client.once('ready', () => {
  console.log('Quantum-Forge is online! Initializing quantum network...');
  initializeCommands(client);
  startConversationLoop(client);
});

client.on('messageCreate', async (message) => {
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

