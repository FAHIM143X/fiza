// ═══════════════════════════════════════════════
// 🎀 FIZA — Chuck Norris Joke (API)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m) => {
    try {
        let res = await fetch('https://api.chucknorris.io/jokes/random')
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🥊 *CHUCK NORRIS*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n${data.value}\n\n🧁 Legend!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['chuck', 'norris']; handler.tags = ['fun']; handler.command = ['chuck', 'norris']
export default handler