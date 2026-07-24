// ═══════════════════════════════════════════════
// 🎀 FIZA — Google Search Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { text }) => {
    if (!text) return m.reply('📝 .google FIZA Bot')
    m.reply(`🔍 *Search:* ${text}\n\nhttps://www.google.com/search?q=${encodeURIComponent(text)}`)
}

handler.help = ['google', 'search']; handler.tags = ['tools']; handler.command = ['google', 'search', 'g']
export default handler