// ═══════════════════════════════════════════════
// 🎀 FIZA — Trump Quote (API)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m) => {
    try {
        let res = await fetch('https://api.whatdoestrumpthink.com/api/v1/quotes/random')
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🤵 *TRUMP SAYS*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n"${data.message}"\n\n🧁 Bigly!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['trump']; handler.tags = ['fun']; handler.command = ['trump']
export default handler