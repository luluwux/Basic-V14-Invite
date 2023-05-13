const { EmbedBuilder, Partials, Client, Collection, GatewayIntentBits, ActivityType, OAuth2Scopes } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const client = global.client;
const config = require("../../config");

module.exports = () => {

const VoiceChannel = client.channels.cache.get(config._VoiceChannel);
if(!VoiceChannel) return console.log(`🔴 Bağlanacağım Ses Kanalına Bağlanamıyorum!`)
joinVoiceChannel({ channelId: VoiceChannel.id, guildId: VoiceChannel.guild.id, adapterCreator: VoiceChannel.guild.voiceAdapterCreator, selfDeaf: true, selfMute:true});
console.log(`🟢 Başarıyla Ses Kanalına Bağlandım!`);
}

module.exports.conf = {
name: "ready"
}