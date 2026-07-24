// ═══════════════════════════════════════════════
// 🎀 FIZA — Hot Test Plugin
// ═══════════════════════════════════════════════

let handler = async (m) => {
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
    let name = who.split('@')[0]
    let percent = Math.floor(Math.random() * 101)
    let bar = '█'.repeat(Math.floor(percent / 10)) + '░'.repeat(10 - Math.floor(percent / 10))
    let emoji = percent > 80 ? '🔥' : percent > 50 ? '😎' : percent > 20 ? '😊' : '🥶'
    
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── ${emoji} *HOT TEST* ──╮
│ 👤 @${name}
│ ${bar} ${percent}%
│ 🧁 You're ${percent}% hot!
╰── 🔥 Smoking! ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
}

handler.help = ['hot', 'hottest']; handler.tags = ['fun']; handler.command = ['hot', 'hottest', 'hotness']
export default handler