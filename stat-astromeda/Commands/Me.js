const Discord = require("discord.js");
const Database = require("../Helpers/Database");
const vt = new Database("Database", "Voice");
const mdb = new Database("Database", "Message");
const moment = require("moment");
require("moment-duration-format");
// exports.onLoad = (client) => {};
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {Array<String>} args 
 */
exports.run = async (client, message, args) => {

    let voiceData = vt.get(`stats.${message.guild.id}.${message.author.id}`) || {voice: 0, channels: {}};
    let messageData = mdb.get(`stats.${message.guild.id}.${message.author.id}`) || {messages: 0, channels: {}};

    let voiceList = Object.keys(voiceData.channels).map(vd => {
        return {
            Id: vd,
            Total: voiceData.channels[vd]
        };
    }).sort((a, b) => b.Total - a.Total);

    let messageList = Object.keys(messageData.channels).map(md => {
        return {
            Id: md,
            Total: messageData.channels[md]
        };
    }).sort((a, b) => b.Total - a.Total);

    voiceList = voiceList.length > 10 ? voiceList.splice(0, 10) : voiceList;
    voiceList = voiceList.map((vd, index)=> `\`${index + 1}.\` ${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [Saat,] m [Dakika]")}\``).join("\n");
    messageList = messageList.length > 10 ? messageList.splice(0, 10) : messageList;
    messageList = messageList.map((md, index)=> `\`${index + 1}.\` ${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} Mesaj\``).join("\n");
    let embed = new Discord.MessageEmbed();
    embed.setColor(message.member.displayHexColor)
    .setFooter(`${message.author.tag} | Eon147`)
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .addField("Kullanıcı stats",` 
    
    \`ID:\` ${message.author.id} 
    \`Roller:\` ${message.member.roles.cache.size >= 5 ? "Çok fazla role sahip..." : message.member.roles.cache.map(role => role.toString())}
    \`Adı:\` ${message.member.displayName}
    `)
    .addField("Ses", `
    Son aktivite: ${new Date(voiceData.activity).toLocaleDateString()}

    ** **${voiceList}
    `)
    .addField("Mesaj", `
    Son aktivite: ${new Date(messageData.activity).toLocaleDateString()}

    ** **${messageList}
    `);

    message.channel.send(embed);
};

exports.conf = {
    commands: ["ben", "istatistik", "i", "me"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'Me', 
    description: 'Sunucudaki istatistikleriniz hakkında bilgi sağlar.',
    usage: '[p]me',
    kategori: 'User'
};
