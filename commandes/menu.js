const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭━༻𝑪𝒀𝑩𝑬𝑹_𝑾𝑨𝑹𝑹𝑰𝑶𝑹༺━╮
✫  *Préfix* : ${s.PREFIXE}
✫   *Owner* : ${s.OWNER_NAME}
✫   *Mode* : ${mode}
✫   *Commands* : ${cm.length}
✫   *Date* : ${date}
✫   *Hour* : ${temps}
✫   *Mémoire* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
✫
╰━━━━━━━━━━━━━━━━━━╯\n\n`;
    
let menuMsg = `
🌸🤭- " 𝐀 𝐅ɑkə 𝐒mıɭə 𝐂ɑη ┣𝐥ıdə  𝐌ıɭɭıoηs 𝐎f 𝐓əɑrs ||%❤😚

     ╭━⊱「Wᴇʟᴄᴏᴍᴇ ᴛᴏ ᴄᴍᴅ ᴍᴇɴᴜ⊱━╮

`;

    for (const cat in coms) {
        menuMsg += `╭─━⊱༻${cat}༺⊰━─`;
        for (const cmd of coms[cat]) {
            menuMsg += `
✫ ${cmd}`;
        }
        menuMsg += `
╰━━━━━━━━━━━━━━╯ \n`
    }

    menuMsg += `
╰━⊱༻𝑪𝒀𝑩𝑬𝑹_𝑾𝑨𝑹𝑹𝑰𝑶𝑹༺⊱━╯
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *𝑪𝒀𝑩𝑬𝑹_𝑾𝑨𝑹𝑹𝑰𝑶𝑹*, developed By 𝑪𝒀𝑩𝑬𝑹_𝑾𝑨𝑹𝑹𝑰𝑶𝑹" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis 𝑪𝒀𝑩𝑬𝑹_𝑾𝑨𝑹𝑹𝑰𝑶𝑹, developed By 𝑪𝒀𝑩𝑬𝑹_𝑾𝑨𝑹𝑹𝑰𝑶𝑹" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
