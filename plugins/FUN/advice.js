// ═══════════════════════════════════════════════
// 🎀 FIZA — Advice Plugin (API)
// ═══════════════════════════════════════════════

let handler = async (m) => {
    try {
        let res = await fetch('https://api.adviceslip.com/advice')
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 💡 *ADVICE* ──╮
│
│ 🌟 ${data.slip.advice}
│
╰── 🧁 Take note! ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['advice']; handler.tags = ['fun']; handler.command = ['advice', 'tip']
export default handler