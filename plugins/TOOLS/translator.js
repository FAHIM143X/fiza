// ═══════════════════════════════════════════════
// 🎀 FIZA — Translator Plugin (API)
// ═══════════════════════════════════════════════

let handler = async (m, { args }) => {
    if (!args[0]) return m.reply('📝 .translate en|Hello world')
    let [lang, ...text] = args.join(' ').split('|')
    if (!lang || !text.length) return m.reply('📝 .translate hi|Hello')
    
    try {
        let res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.join('|'))}&langpair=en|${lang}`)
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🌐 *TRANSLATE*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n📝 ${text.join('|')}\n🌍 ${data.responseData.translatedText}\n\n🧁 Translated!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['translate', 'tr']; handler.tags = ['tools']; handler.command = ['translate', 'tr']
export default handler