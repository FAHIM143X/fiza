// ═══════════════════════════════════════════════
// 🎀 FIZA — URL Shortener Plugin (API)
// ═══════════════════════════════════════════════

let handler = async (m, { text }) => {
    if (!text) return m.reply('📝 .short https://google.com')
    try {
        let res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(text)}`)
        let data = await res.text()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🔗 *SHORT LINK*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n📝 ${data}\n\n🧁 Shortened!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch { m.reply('❌ Failed!') }
}

handler.help = ['short', 'shorten']; handler.tags = ['tools']; handler.command = ['short', 'shorten', 'tinyurl']
export default handler