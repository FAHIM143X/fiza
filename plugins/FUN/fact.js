// ═══════════════════════════════════════════════
// 🎀 FIZA — Fact Plugin (API)
// ═══════════════════════════════════════════════

let handler = async (m) => {
    try {
        let res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 📖 *DID YOU KNOW?* ──╮
│
│ 🤯 ${data.text}
│
╰── 🧁 Mind blown! ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['fact']; handler.tags = ['fun']; handler.command = ['fact', 'facts']
export default handler