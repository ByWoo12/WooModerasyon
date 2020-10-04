const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
    const embed = new Discord.RichEmbed()
      .setDescription("```Ne yazık ki bu komutu kullanmaya yetkin yok.```")
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }
 let wooÜye = message.mentions.members.first() || message.guild.members.get(args[0])
  if(!wooÜye) return message.channel.send("Lütfen susturulacak kişiyi etiketleyiniz.");
  if(wooÜye.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Benden yetkili birini susturamam.");
  if (wooÜye.id === message.author.id) return message.channel.send("Kendinizi susturamazsınız.");
  let wooRol = message.guild.roles.find(`name`, "Susturuldu");

  if(!wooRol){
    try{
      wooRol = await message.guild.createRole({
        name: "Susturuldu",
        color: "#666666",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(wooRol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  let wooZaman = args[1];
  if(!wooZaman) return message.channel.send("Lütfen doğru bir zaman dilimi giriniz. Örneğin: ***!sustur @kişi 1s/m/h/d sebep**");
  let sebep = args[2]
  if(!sebep) return message.channel.send("Lütfen bir sebep giriniz. Örneğin: ***!sustur @kişi 1s/m/h/d sebep**");

  await(wooÜye.addRole(wooRol.id));
  const kod = "```fix";
  const kod2 = "```";
   let embed = new Discord.RichEmbed()
              .setTitle("Kullanıcı Chat Cezası Aldı")
                .setDescription(`
**Susturulan Üye:** ${wooÜye}
**Susturan Yetkili:** ${message.author}

**Susturulma Sebebi:** ${kod}
${sebep} ${kod2}
**Verilen Süre:** ${kod}
${wooZaman} ${kod2}`)
                .setColor("RANDOM");
  message.channel.send(`${message.author} Başarılı Bir Şekilde ${wooÜye} Susturuldu.`);
  let onay = message.guild.channels.find(`name`, "KANAL LOG ADI")
  message.guild.channels.get(onay.id).send(embed)
  
  setTimeout(function(){
    wooÜye.removeRole(wooRol.id);
    let sembed =  new Discord.RichEmbed()
              .setTitle("Kullanıcı Chat Cezası Kalktı")
                .setDescription(`
**Susturulması Kalkan Üye:** ${wooÜye}
**Susturulmasını Kaldıran Yetkili:** ${message.author}

**Susturulma Sebebi:** ${kod}
${sebep} ${kod2}
**Dolan Süre:** ${kod}
${wooZaman} ${kod2}`)
                .setColor("RANDOM");
  let onay = message.guild.channels.find(`name`, "KANAL LOG ADI")
  message.guild.channels.get(onay.id).send(sembed)
  }, ms(wooZaman));

  message.delete();

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["chat-mute","süreli-sustur"],
    permLevel: 0
};

exports.help = {
    name: 'sustur',
    description: 'sustur',
    usage: 'sustur'
};