// ═══════════════════════════════════════════════
// 🎀 FIZA — Dad Joke Plugin (API)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m) => {
    try {
        let res = await fetch('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } })
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n👨 *DAD JOKE*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n${data.joke}\n\n🧁 Dad laughs alone~\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['dadjoke']; handler.tags = ['fun']; handler.command = ['dadjoke']
export default handler