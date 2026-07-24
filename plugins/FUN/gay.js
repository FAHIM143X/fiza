// ═══════════════════════════════════════════════
// 🎀 FIZA — Gay Test Plugin
// ═══════════════════════════════════════════════

let handler = async (m) => {
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
    let name = who.split('@')[0]
    let percent = Math.floor(Math.random() * 101)
    let bar = '█'.repeat(Math.floor(percent / 10)) + '░'.repeat(10 - Math.floor(percent / 10))
    
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🏳️‍🌈 *GAY TEST* ──╮
│ 👤 @${name}
│ ${bar} ${percent}%
│ 🧁 Just for fun~
╰── 😂 No offense! ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
}

handler.help = ['gay', 'gaytest']; handler.tags = ['fun']; handler.command = ['gay', 'gaytest']
export default handler