// ═══════════════════════════════════════════════
// 🎀 FIZA — Bored Plugin (API)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m) => {
    try {
        let res = await fetch('https://www.boredapi.com/api/activity')
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🎯 *BORED?*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n🌟 ${data.activity}\n👥 Participants: ${data.participants}\n💰 Cost: ${data.price === 0 ? 'Free!' : '$'}\n\n🧁 Try it!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['bored']; handler.tags = ['fun']; handler.command = ['bored']
export default handler