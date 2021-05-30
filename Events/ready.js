
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const ayar = db.get('ayar') || {};
const ayarlar = require('../ayarlar.json');
const client = global.client;
module.exports = () => {
  client.channels.cache.get('831548423760904245').join();
  console.log ('_________________________________________');
  console.log (`Kullanıcı İsmi     : ${client.user.username}`);
  console.log (`Sunucular          : ${client.guilds.cache.size}`);
  console.log (`Kullanıcılar       : ${client.users.cache.size}`);
  console.log (`Prefix             : ${ayarlar.prefix}`);
  console.log (`Durum              : Bot Çevrimiçi!`);
  console.log ('_________________________________________');
  client.user.setActivity("Eon147 ❤️ Eon");
  if (ayar.botSesKanali && client.channels.cache.has(ayar.botSesKanali)) client.channels.cache.get(ayar.botSesKanali).join().catch();
}
module.exports.configuration = {
  name: "ready"
  
}