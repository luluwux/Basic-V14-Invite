const { EmbedBuilder, Partials, Client, Collection, GatewayIntentBits, ActivityType, OAuth2Scopes } = require("discord.js");
const config = require("./config")
// Developing with ❤ Luppux
const client = global.client = new Client({
  intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent],
    scopes:[
    OAuth2Scopes.Bot,
    OAuth2Scopes.ApplicationsCommands
  ],partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.User,
    Partials.GuildMember,
    Partials.ThreadMember,
    Partials.GuildScheduledEvent
  ],
    presence: { activities: [{ name: config && config.botDurum.length > 0 ? config.botDurum : "Luppux Was Here", type: ActivityType.Streaming, url:"https://discord.gg/luppux" }], status: 'dnd'}
  });

const {YamlDatabase} = require('five.db')
const db = client.db = new YamlDatabase();
const { InviteManager } = require("discord-invite");
InviteManager(client);
const { readdir } = require("fs");

/*

! Commands 

const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();

readdir("./src/_Commands/", (err, files) => {
    if (err) console.error(err)
    files.forEach(f => {
        readdir("./src/_Commands/" + f, (err2, files2) => {
            if (err2) console.log(err2)
            files2.forEach(file => {
                let lulu_prop = require(`./src/_Commands/${f}/` + file);
                console.log(`[COMMANDS] ${lulu_prop.name} Yüklendi!`);
                commands.set(lulu_prop.name, lulu_prop);
                lulu_prop.aliases.forEach(alias => { aliases.set(alias, lulu_prop.name); });
            });
        });
    });
});

*/

readdir("./src/_Events", (err, files) => {
    if (err) return console.error(err);
    files.filter((file) => file.endsWith(".js")).forEach((file) => {
        let lulu_prop = require(`./src/_Events/${file}`);
        if (!lulu_prop.conf) return;
        client.on(lulu_prop.conf.name, lulu_prop);
        console.log(`📚 [EVENTS] ${lulu_prop.conf.name} Yüklendi!`);
    });
});

Collection.prototype.array = function () { return [...this.values()] }
const {emitWarning} = process;
process.emitWarning = (warning, ...args) => {
if (args[0] === 'ExperimentalWarning') {return;}
if (args[0] && typeof args[0] === 'object' && args[0].type === 'ExperimentalWarning') {return;}
return emitWarning(warning, ...args);
};

client.login(config.token).then(() => console.log(`🟢 ${client.user.tag} Başarıyla Giriş Yaptı!`)).catch((lulu_err) => console.log(`🔴 Bot Giriş Yapamadı | Sebep: ${lulu_err}`));