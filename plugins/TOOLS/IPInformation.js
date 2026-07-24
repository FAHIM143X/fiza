// ═══════════════════════════════════════════════
// 🎀 FIZA — IP Info Plugin (API)
// ═══════════════════════════════════════════════

let handler = async (m, { text }) => {
    if (!text) return m.reply('📝 .ip 8.8.8.8')
    try {
        let res = await fetch(`http://ip-api.com/json/${text}`)
        let data = await res.json()
        if (data.status === 'fail') return m.reply('❌ Invalid IP!')
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🌍 *IP INFO*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n📡 IP: ${data.query}\n🏳️ Country: ${data.country}\n🏙️ City: ${data.city}\n📌 ISP: ${data.isp}\n🗺️ Region: ${data.regionName}\n\n🧁 Located!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch { m.reply('❌ Failed!') }
}

handler.help = ['ip', 'ipinfo']; handler.tags = ['tools']; handler.command = ['ip', 'ipinfo', 'iptrack']
export default handler