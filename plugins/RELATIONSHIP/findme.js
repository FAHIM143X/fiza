// ═══════════════════════════════════════════════
// 🎀 FIZA — Find Me Plugin
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
        `🔍 *${tag}* found you interesting! 💗\n✨ Destiny brought you together~\n🌸 Match: ${percent}%`,
        `👀 *${tag}* noticed you! 💗\n✨ Someone's watching~\n🌸 Match: ${percent}%`,
        `💫 *${tag}* searched and found you! 💗\n✨ You're special~\n🌸 Match: ${percent}%`,
        `🎯 *${tag}* picked YOU! 💗\n✨ Lucky you~\n🌸 Match: ${percent}%`,
        `🔮 The stars say *${tag}* is looking for you! 💗\n✨ Connection: ${percent}%\n🌸 Fate~`
    ]

    return m.reply(`${BORDER_TOP}\n${msgs[Math.floor(Math.random() * msgs.length)]}\n${BORDER_BOTTOM}`, null, { mentions: [target, m.sender] })
}

handler.help = ['findme']
handler.tags = ['fun', 'group']
handler.command = ['findme']
handler.group = true

export default handler