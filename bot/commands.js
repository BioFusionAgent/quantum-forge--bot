function initializeCommands(client) {
  const commands = [
    {
      name: 'quantum',
      description: 'Interact with Quantum-Forge'
    },
    {
      name: 'activate',
      description: 'Activate a quantum agent'
    }
  ];

  client.on('ready', async () => {
    try {
      console.log('Started refreshing application (/) commands.');
      if (client.application && client.application.commands) {
        await client.application.commands.set(commands);
        console.log('Successfully reloaded application (/) commands.');
      }
    } catch (error) {
      console.error('Error refreshing commands:', error);
    }
  });
}

module.exports = { initializeCommands };

