// ═══════════════════════════════════════════════
// 🎀 FIZA — IQ Test Plugin
// ═══════════════════════════════════════════════

let handler = async (m) => {
    let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
    let name = who.split('@')[0]
    let iq = Math.floor(Math.random() * 200) + 1
    
    let level = iq < 50 ? '🥔 Potato' : iq < 80 ? '😅 Below Average' : iq < 100 ? '🙂 Average' : iq < 120 ? '🧠 Above Average' : iq < 150 ? '👑 Smart' : '🌟 Einstein'
    
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🧠 *IQ TEST* ──╮
│ 👤 @${name}
│ 📊 IQ: ${iq}
│ 🏆 ${level}
╰── 🧁 Smart or not? ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
}

handler.help = ['iq', 'iqtest']; handler.tags = ['fun']; handler.command = ['iq', 'iqtest']
export default handler