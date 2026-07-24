// ═══════════════════════════════════════════════
// 🎀 FIZA — Weather Plugin (API)
// ═══════════════════════════════════════════════

let handler = async (m, { text }) => {
    if (!text) return m.reply('📝 .weather Mumbai')
    try {
        let res = await fetch(`https://wttr.in/${encodeURIComponent(text)}?format=%C+%t+%w+%h`)
        let data = await res.text()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🌤️ *WEATHER*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n📍 ${text}\n${data}\n\n🧁 Stay cozy!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch { m.reply('❌ Failed!') }
}

handler.help = ['weather']; handler.tags = ['tools']; handler.command = ['weather', 'climate']
export default handler