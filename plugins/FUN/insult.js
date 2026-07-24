// ═══════════════════════════════════════════════
// 🎀 FIZA — Insult Plugin (API)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m) => {
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
    let name = who.split('@')[0]
    
    try {
        let res = await fetch('https://insult.mattbas.org/api/insult.json')
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n😤 *INSULT* @${name}!\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n${data.insult}\n\n🧁 Just kidding!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['insult']; handler.tags = ['fun']; handler.command = ['insult']
export default handler