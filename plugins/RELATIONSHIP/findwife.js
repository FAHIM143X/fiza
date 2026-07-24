// ═══════════════════════════════════════════════
// 🎀 FIZA — Find Wife Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

    if (!m.isGroup) return m.reply(`${BORDER_TOP}\n👥 *Group only, sweetie!*\n${BORDER_BOTTOM}`)

    let meta = await conn.groupMetadata(m.chat)
    let users = meta.participants.map(u => u.id).filter(v => v !== conn.user.jid)
    if (users.length < 1) return m.reply(`${BORDER_TOP}\n😿 *No members!*\n${BORDER_BOTTOM}`)

    let target = users[Math.floor(Math.random() * users.length)]
    let tag = '@' + target.split('@')[0]
    let me = '@' + m.sender.split('@')[0]
    let percent = Math.floor(Math.random() * 31) + 70

    let msgs = [
        `👰 *${tag}* is your wife! 💍\n💗 Match: ${percent}%\n🌸 Treat her like a queen~`,
        `💒 *${tag}* says "I do!" 💍\n💗 She's the one~\n🌸 Match: ${percent}%`,
        `👰‍♀️ Wedding bells for *${tag}* & ${me}! 💍\n💗 Match: ${percent}%\n🌸 Happily ever after~`,
        `💍 *${tag}* is wifey material! 👰\n💗 Match: ${percent}%\n🌸 She's a keeper~`,
        `🏠 *${tag}* is your housewife! 👰\n💗 Match: ${percent}%\n🌸 Cooks with love~`
    ]

    return m.reply(`${BORDER_TOP}\n${msgs[Math.floor(Math.random() * msgs.length)]}\n${BORDER_BOTTOM}`, null, { mentions: [target, m.sender] })
}

handler.help = ['findwife']
handler.tags = ['fun', 'group']
handler.command = ['findwife']
handler.group = true

export default handler