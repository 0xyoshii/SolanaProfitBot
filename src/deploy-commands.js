import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, token } = require('../config.json');

const commands = [
	new SlashCommandBuilder()
    .setName('profit')
    .setDescription('Calculate total profit for collection')
    .addStringOption(option =>
        option.setName('collection_name')
        .setDescription('Collection name')
        .setRequired(true)
        )
    .addStringOption(option =>
        option.setName('wallet')
        .setDescription('Wallet address')
        .setRequired(true)
        )
    .addNumberOption(option =>
        option.setName('tokens_minted')
        .setDescription('Tokens Minted')
        .setRequired(true)
        )
    .addNumberOption(option =>
        option.setName('mint_price')
        .setDescription('Mint Price')
        .setRequired(true)
        ),

    
    new SlashCommandBuilder()
    .setName('index')
    .setDescription('Index new collection')
    .addStringOption(option =>
        option.setName('creator_address')
        .setDescription('Creator Address')
        .setRequired(true)
        ),

    new SlashCommandBuilder()
    .setName('refresh')
    .setDescription('Refresh collection')
    .addStringOption(option =>
        option.setName('collection_name')
        .setDescription('Collection Name')
        .setRequired(true)
        ),

    new SlashCommandBuilder()
    .setName('isIndexed')
    .setDescription('Check if collection is indexed')
    .addStringOption(option =>
        option.setName('collection_name')
        .setDescription('Collection Name')
        .setRequired(true)
        ),

    new SlashCommandBuilder()
    .setName('latestRefresh')
    .setDescription('Check latest refresh for collection')
    .addStringOption(option =>
        option.setName('collection_name')
        .setDescription('Collection Name')
        .setRequired(true)
        )
]

	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);