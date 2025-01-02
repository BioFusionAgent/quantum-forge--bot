import { MessageEmbed } from 'discord.js';
import { QUANTUM_CONTEXT } from '../config/constants';

export class EmbedService {
  createHelpEmbed(): MessageEmbed {
    return new MessageEmbed()
      .setTitle('⚛️ Quantum-Forge Interface')
      .setDescription('How may I assist you today?')
      .addField('🌟 Interaction Methods', 
        '• Mention me: `@Quantum-Forge`\n' +
        '• Use command: `!quantum`\n' +
        '• Reply to my messages'
      )
      .setColor(QUANTUM_CONTEXT.COLORS.PRIMARY)
      .setFooter('Quantum Computing Assistant');
  }

  createWelcomeEmbed(memberName: string): MessageEmbed {
    return new MessageEmbed()
      .setTitle('New Entity Detected')
      .setDescription(`Welcome ${memberName} to the quantum realm.`)
      .setColor(QUANTUM_CONTEXT.COLORS.PRIMARY)
      .addField('Getting Started', 'Use `!help` to learn how to interact with me.');
  }
}

