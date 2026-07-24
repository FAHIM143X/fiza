// ═══════════════════════════════════════════════
// 🎀 FIZA — Quote Plugin (API)
// ═══════════════════════════════════════════════

let handler = async (m) => {
    try {
        let res = await fetch('https://api.quotable.io/random')
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 💬 *QUOTE* ──╮
│
│ "${data.content}"
│
│ 🌸 — ${data.author}
╰── 🧁 Stay wise! ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['quote']; handler.tags = ['fun']; handler.command = ['quote', 'quotes']
export default handler