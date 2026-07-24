// ═══════════════════════════════════════════════
// 🎀 FIZA — Dictionary Plugin (API)
// ═══════════════════════════════════════════════

let handler = async (m, { text }) => {
    if (!text) return m.reply('📝 .define love')
    try {
        let res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(text)}`)
        let data = await res.json()
        if (!data[0]) return m.reply('❌ Not found!')
        let w = data[0], mng = w.meanings[0], def = mng.definitions[0]
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n📚 *DICTIONARY*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n🔤 *${w.word}*\n📝 ${mng.partOfSpeech}\n💬 ${def.definition}\n${def.example ? '📖 ' + def.example : ''}\n\n🧁 Learned!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch { m.reply('❌ Failed!') }
}

handler.help = ['define', 'dict']; handler.tags = ['tools']; handler.command = ['define', 'dict', 'meaning']
export default handler