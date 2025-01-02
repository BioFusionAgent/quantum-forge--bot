import { Message } from 'discord.js';
import { MODERATION_RULES } from '../config/constants';

export class ModerationService {
  private userLastMessage = new Map<string, number>();

  async moderateMessage(message: Message): Promise<boolean> {
    // Check mentions
    if (message.mentions.users.size > MODERATION_RULES.maxMentions) {
      await message.delete();
      await message.channel.send(`${message.author}, please avoid mass mentions.`);
      return false;
    }

    // Spam protection
    const lastMessageTime = this.userLastMessage.get(message.author.id);
    if (lastMessageTime && Date.now() - lastMessageTime < MODERATION_RULES.spamTimeout) {
      await message.delete();
      await message.channel.send(`${message.author}, please avoid spamming.`);
      return false;
    }
    this.userLastMessage.set(message.author.id, Date.now());

    return true;
  }
}

