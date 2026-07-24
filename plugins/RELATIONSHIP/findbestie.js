// ═══════════════════════════════════════════════
// 🎀 FIZA — Find Bestie Plugin
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
    let percent = Math.floor(Math.random() * 31) + 70

    let msgs = [
        `👯 *${tag}* is your bestie! ✨\n💗 Match: ${percent}%\n🌸 Partners in crime~`,
        `🎉 *${tag}* is your ride or die! ✨\n💗 Match: ${percent}%\n🌸 Bestie vibes~`,
        `📸 *${tag}* takes your candids! 👯\n💗 Match: ${percent}%\n🌸 Friendship goals~`,
        `🍕 *${tag}* shares pizza with you! 👯\n💗 Match: ${percent}%\n🌸 True bestie~`,
        `🎧 *${tag}* shares earphones with you! 👯\n💗 Match: ${percent}%\n🌸 One soul two bodies~`
    ]

    return m.reply(`${BORDER_TOP}\n${msgs[Math.floor(Math.random() * msgs.length)]}\n${BORDER_BOTTOM}`, null, { mentions: [target, m.sender] })
}

handler.help = ['findbestie']
handler.tags = ['fun', 'group']
handler.command = ['findbestie']
handler.group = true

export default handler