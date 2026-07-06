require('dotenv').config(); // Yeh line sabse top par zaroori hai
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, REST, Routes } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const SERVER_IP = "rex-2.drexhost.in:19121";
const SHOP_LINK = "https://volex-store.onrender.com";

// TOKEN ko yahan se hata diya hai kyunki hum .env use kar rahe hain
const CLIENT_ID = '1523523459877961728';

const commands = [
  {
    name: 'info',
    description: 'Server IP aur Shop ka link dekhein',
  },
];

// .env se token le rahe hain
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

client.once('ready', async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
        console.log(`Bot login ho gaya hai: ${client.user.tag}!`);
    } catch (error) {
        console.error('Error refreshing commands:', error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() && !interaction.isButton()) return;

    if (interaction.isCommand() && interaction.commandName === 'info') {
        const embed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('✨ **Welcome to Our Server** ✨')
            .setDescription('Niche diye gaye buttons par click karke IP copy karein ya Shop visit karein!')
            .addFields({ name: '🌐 Server IP', value: `\`${SERVER_IP}\``, inline: true })
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({ text: 'Animated Pro Bot | Stay Awesome' });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('copy_ip').setLabel('Copy IP').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setLabel('Visit Shop').setURL(SHOP_LINK).setStyle(ButtonStyle.Link)
        );

        await interaction.reply({ embeds: [embed], components: [row] });
    }

    if (interaction.isButton() && interaction.customId === 'copy_ip') {
        await interaction.reply({ content: `Server IP: \`${SERVER_IP}\` (Copy kar lo!)`, ephemeral: true });
    }
});

// Yahan bhi process.env.TOKEN ka use kiya hai
client.login(process.env.TOKEN);
