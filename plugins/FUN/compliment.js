// ═══════════════════════════════════════════════
// 🎀 FIZA — Compliment Plugin (API)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m) => {
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
    let name = who.split('@')[0]
    
    try {
        let res = await fetch('https://complimentr.com/api')
        let data = await res.json()
        
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 💖 *COMPLIMENT* ──╮
│ 👤 @${name}
│
│ ${data.compliment}
│
╰── 🧁 You're amazing! ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
    } catch {
        // Fallback compliments
        let compliments = [
            "Your smile is contagious! 😊",
            "You light up the room! ✨",
            "You're an inspiration to everyone! 🌟",
            "You have a heart of gold! 💛",
            "You're smarter than you think! 🧠",
            "You're beautiful inside and out! 💖",
            "You make the world a better place! 🌍",
            "You're one of a kind! 🦄",
            "You're stronger than you know! 💪",
            "You're a true friend! 🤝",
        ]
        let comp = compliments[Math.floor(Math.random() * compliments.length)]
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n💖 *COMPLIMENT* for @${name}!\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n${comp}\n\n🧁 You're awesome!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
    }
}

handler.help = ['compliment', 'comp']
handler.tags = ['fun']
handler.command = ['compliment', 'comp']
export default handler