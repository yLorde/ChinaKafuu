module.exports = {
        name: 'interactionCreate', async execute(interaction, client) {
                if (!interaction.isButton()) return;
                const cases = {
                        delete: async () => {
                                interaction.message.delete();
                        }
                };
                const handler = cases[interaction.customId];
                if (handler) await handler();
        },
};