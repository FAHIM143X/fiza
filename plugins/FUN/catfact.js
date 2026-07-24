// ═══════════════════════════════════════════════
// 🎀 FIZA — Cat Fact (API)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m) => {
    try {
        let res = await fetch('https://catfact.ninja/fact')
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🐱 *CAT FACT*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n${data.fact}\n\n🧁 Meow!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['catfact']; handler.tags = ['fun']; handler.command = ['catfact']
export default handler