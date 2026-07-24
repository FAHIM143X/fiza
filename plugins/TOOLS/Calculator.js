// ═══════════════════════════════════════════════
// 🎀 FIZA — Calculator Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { text }) => {
    if (!text) return m.reply('📝 .calc 2+2')
    try {
        let result = eval(text.replace(/[^0-9+\-*/().%]/g, ''))
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🔢 *CALCULATOR*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n📝 ${text}\n✅ ${result}\n\n🧁 Math done!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch { m.reply('❌ Invalid!') }
}

handler.help = ['calc', 'math']; handler.tags = ['tools']; handler.command = ['calc', 'math']
export default handler