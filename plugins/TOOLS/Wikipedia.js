// ═══════════════════════════════════════════════
// 🎀 FIZA — Wikipedia Plugin (API)
// ═══════════════════════════════════════════════

let handler = async (m, { text }) => {
    if (!text) return m.reply('📝 .wiki JavaScript')
    
    try {
        let res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(text)}`)
        let data = await res.json()
        if (!data.title) return m.reply('❌ Not found!')
        
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n📚 *WIKIPEDIA*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n📖 *${data.title}*\n📝 ${data.extract.slice(0, 500)}...\n\n🔗 ${data.content_urls?.desktop?.page || ''}\n🧁 Knowledge is power!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['wiki', 'wikipedia']; handler.tags = ['tools']; handler.command = ['wiki', 'wikipedia']
export default handler