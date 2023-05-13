const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits, SelectMenuBuilder, ActivityType } = require("discord.js");
const db = client.db;
const config = require("../../config");


module.exports = async (member, inviter, invite) => {

    let data = await db.get(`inviter-${member.id}`, { inviter: member.id, code: invite.code, uses: invite.uses })
    if(inviter == null)
    {
        member.guild.channels.cache.get(config._InviteChannel).send({ content: `\` ✅ \` ${member.user.tag} Joined the server, but I couldn't find out who was invited!`})
    } else if(member.id == inviter.id)
    {
        member.guild.channels.cache.get(config._InviteChannel).send({ content: `\` ✅ \` ${member.user.tag} Joined the server by his own invitation **Total:(${data.uses})**!`})
    } else if(member.guild.vanityURLCode == inviter)
    {
        member.guild.channels.cache.get(config._InviteChannel).send({ content: `\` ✅ \` ${member.user.tag} Joined Server Using Vanity URL **Total:(${data.uses})**!`})
    } else 
    {   member.guild.channels.cache.get(config._InviteChannel).send({ content: `\` ✅ \` ${member.user.tag} Joined the server! inviter ${inviter.tag} **Total:(${data.uses})**!`})
    }
}

module.exports.conf = {
name: "memberJoin"
}
