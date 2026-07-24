// ═══════════════════════════════════════════════
// 🎀 FIZA — Useless Fact (API)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m) => {
    try {
        let res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n📖 *USELESS FACT*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n${data.text}\n\n🧁 Totally useless!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['useless']; handler.tags = ['fun']; handler.command = ['useless']
export default handler