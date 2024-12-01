import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Client, GatewayIntentBits, EmbedBuilder  } = require('discord.js');
const { token } = require('../config.json');
import { getCollectionName } from './utils/getMetadata.js'
const wait = require('node:timers/promises').setTimeout;
import { writeToCsv } from './utils/indexCollection.js';
import { Profit } from "./profit/calcProfit.js";
import { Refresh } from "./utils/refreshTxs.js";


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	try {

	if (commandName === 'profit') {

		await interaction.deferReply({ ephemeral: true });
		let data = await new Profit(
			interaction.options.getString('collection_name'), 
			interaction.options.getString('wallet'), 
			interaction.options.getNumber('tokens_minted'),
			interaction.options.getNumber('mint_price')
			)
			.getProfit();

		let embed = new EmbedBuilder()
		
		.setColor(0x57F287)
		.setTitle('Calculated profits for Collection: ' + interaction.options.getString('collection_name'))
		.setURL("https://magiceden.io/marketplace/" + interaction.options.getString('collection_name'))
		.setDescription(`[${interaction.options.getString('wallet')}](https://magiceden.io/u/${interaction.options.getString('wallet')})`)
		.setThumbnail(data.thumbnail)
		.addFields(
			{ name: "Tokens Bought", value: "`" + data.tokensBought + "`", inline: true},
			{ name: "Tokens Minted", value: "`" + data.tokensMinted + "`", inline: true},
			{ name: "Tokens Sold", value: "`" + data.tokensSold + "`", inline: true},
			{ name: "Total Buought Amt.", value: "`" + data.buy + "◎ " + "(" + data.buyUsd + "$)`", inline: true},
			{ name: "Total Mint Amt.", value: "`" + data.minted + "◎ " + "(" + data.mintedUsd + "$)`", inline: true},
			{ name: "Total Sold Amt.", value: "`" + data.sell + "◎ " + "(" + data.sellUsd + "$)`", inline: true},
			{ name: "Total Spent", value: "`" + data.spent + "◎ " + "(" + data.spentUsd + "$)`", inline: true},
			{ name: "Tokens Left", value: "`" + data.tokensLeft + "`", inline: true},
			{ name: "Floor Price", value: "`" + data.floorPrice + "◎ " + "(" + data.floorUsd + "$)`", inline: true},
			{ name: "Potential P&L", value: "`" + data.unrealized + "◎ " + "(" + data.unrealizedUsd + "$)`", inline: true},
			{ name: "Current P&L", value: "`" + data.profit + "◎ " + "(" + data.profitUsd + "$)`", inline: true},
			{ name: "ROI", value: "`" + data.roi + "%`", inline: true},
		)
		.setFooter({ text: "SOL Profit Bot - yoshi#8888"})
		
		await interaction.editReply({ embeds: [embed]});

	} else if (commandName === 'index') {
		await interaction.deferReply({ ephemeral: true });
		await interaction.editReply({ content: await writeToCsv(interaction.options.getString('creator_address'))});
		
	} else if (commandName === 'refresh') {
		new Refresh(interaction.options.getString('collection_name')).initiate();
		await interaction.reply({ content: "Queued refresh for " + interaction.options.getString('collection_name'), ephemeral: true });
	}

} catch (err) {
	await interaction.editReply("An error occurred, make sure the inputs are correct!")
	console.log(err)
}

});

client.login(token);
