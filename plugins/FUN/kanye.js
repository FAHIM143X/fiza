// ═══════════════════════════════════════════════
// 🎀 FIZA — Kanye Quote (API)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m) => {
    try {
        let res = await fetch('https://api.kanye.rest/')
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🎤 *KANYE SAYS*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n"${data.quote}"\n\n🧁 Ye!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['kanye', 'ye']; handler.tags = ['fun']; handler.command = ['kanye', 'ye']
export default handler