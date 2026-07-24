// ═══════════════════════════════════════════════
// 🎀 FIZA — Roast Plugin (API)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m) => {
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
    let name = who.split('@')[0]
    
    try {
        let res = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
        let data = await res.json()
        
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🔥 *ROAST* ──╮
│ 👤 @${name}
│
│ ${data.insult}
│
╰── 🧁 No offense! ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
    } catch {
        // Fallback roasts
        let roasts = [
            "You're not stupid, you just have bad luck thinking. 🤔",
            "I'd agree with you but then we'd both be wrong. 😂",
            "You bring everyone so much joy when you leave the room. 🚪",
            "I'm not saying I hate you, but I'd unplug your life support to charge my phone. 📱",
            "You're like a cloud. When you disappear, it's a beautiful day. ☀️",
        ]
        let roast = roasts[Math.floor(Math.random() * roasts.length)]
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🔥 *ROAST* @${name}!\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n${roast}\n\n🧁 No offense~\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
    }
}

handler.help = ['roast']
handler.tags = ['fun']
handler.command = ['roast']
export default handler