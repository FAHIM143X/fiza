// ═══════════════════════════════════════════════
// 🎀 FIZA — Simp Test Plugin
// ═══════════════════════════════════════════════

let handler = async (m) => {
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
    let name = who.split('@')[0]
    let percent = Math.floor(Math.random() * 101)
    
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 💸 *SIMP TEST* ──╮
│ 👤 @${name}
│ 📊 Simp Level: ${percent}%
│ 🧁 ${percent > 70 ? 'Ultra Simp!' : percent > 40 ? 'Normal Simp' : 'Not a Simp'}
╰── 😂 Just for fun! ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
}

handler.help = ['simp']; handler.tags = ['fun']; handler.command = ['simp', 'simptest']
export default handler