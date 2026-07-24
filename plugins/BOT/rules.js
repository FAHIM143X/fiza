// ═══════════════════════════════════════════════
// 🎀 FIZA — Rules Plugin
// ═══════════════════════════════════════════════

let handler = async (m) => {
    let botName = global.botname || 'FIZA'
    
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 📜 *BOT RULES* ──╮
│ 🌸 ${botName} Rules:
│
│ ✅ Be respectful
│ ✅ No spam commands
│ ✅ Use prefix: .
│ ✅ Have fun!
│
│ ❌ No abuse
│ ❌ No flooding
│ ❌ No illegal stuff
│ ❌ No adult content
│
│ 💡 Breaking rules = Ban
╰── ✨ ${botName} ✨ ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['rules', 'rule']
handler.tags = ['main']
handler.command = ['rules', 'rule']
export default handler