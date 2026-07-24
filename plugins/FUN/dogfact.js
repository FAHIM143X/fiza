// ═══════════════════════════════════════════════
// 🎀 FIZA — Dog Fact (API)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m) => {
    try {
        let res = await fetch('https://dog-api.kinduff.com/api/facts')
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🐕 *DOG FACT*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n${data.facts[0]}\n\n🧁 Woof!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['dogfact']; handler.tags = ['fun']; handler.command = ['dogfact']
export default handler