const Discord = require("discord.js");
const Database = require("../Helpers/Database");
const vt = new Database("Database", "Voice");
const mdb = new Database("Database", "Message");
// exports.onLoad = (client) => {};
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {Array<String>} args 
 */
exports.run = async (client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.permissions.has("MANAGE_GUILD")) return message.reply("bunu yapma izniniz yok.");
    let deleteMessages = [];

    let msg = await message.reply("hangi verileri sıfırlamak istersiniz? `(Hepsi, Ses veya Mesaj)` bunlardan birini yazın.");
    deleteMessages.push(msg);

    let reply = await message.channel.awaitMessages((m) => m.author.id == message.author.id, {
        time: 15000,
        max: 1
    }).then(messages => messages.first()).catch(err => undefined);
    if(!reply){
        message.reply("15 saniye geçti ve doğru cevap veremediniz.")
        return delete_Messages(deleteMessages);
    }
    deleteMessages.push(reply);

    if(!["Hepsi", "Ses", "Mesaj"].some(type => reply.content.toLowerCase() == type)) return delete_Messages(deleteMessages);

    switch (reply.content) {
        case "Hepsi":
            vt.set(`stats.${message.guild.id}`, {});
            mdb.set(`stats.${message.guild.id}`, {});
            break;
        case "Ses":
            vt.set(`stats.${message.guild.id}`, {});
            break;
        case "Mesaj":
                mdb.set(`stats.${message.guild.id}`, {});
                break;
        default:
            vt.set(`stats.${message.guild.id}`, {});
            mdb.set(`stats.${message.guild.id}`, {});
            break;
    }
    delete_Messages(deleteMessages);
    message.reply(`\`${reply.content}\` bilgi başarıyla silindi.`).then(m => m.delete({timeout: 5000}));
};

exports.conf = {
    commands: ["rstats", "reset", "resetstats"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'me', 
    description: 'Sunucudaki aktifliğiniz hakkında bilgi verir.',
    usage: 'me',
    kategori: 'kullanıcı'
};

function delete_Messages(messages) {
    messages.forEach(message => {
        if(message.deletable && !message.deleted) message.delete().catch();
    });
}
