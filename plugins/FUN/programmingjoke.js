// ═══════════════════════════════════════════════
// 🎀 FIZA — Programming Joke (API)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m) => {
    try {
        let res = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single')
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n💻 *PROGRAMMING JOKE*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n${data.joke}\n\n🧁 Only devs understand!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['devjoke', 'codejoke']; handler.tags = ['fun']; handler.command = ['devjoke', 'codejoke']
export default handler