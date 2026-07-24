// ═══════════════════════════════════════════════
// 🎀 FIZA — Find Ex Plugin
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
        `💔 *${tag}* is now your ex! 😭\n💗 Time to move on~\n🌸 Heartbreak: ${percent}%`,
        `🥀 *${tag}* broke up with you! 💔\n💗 It's not you, it's them~\n🌸 Sadness: ${percent}%`,
        `😢 *${tag}* left you on read! 💔\n💗 Ghosted~\n🌸 Pain: ${percent}%`,
        `🚶 *${tag}* walked away! 💔\n💗 New chapter begins~\n🌸 Moving on: ${percent}%`,
        `🎭 *${tag}* is your toxic ex! 💔\n💗 Red flags detected~\n🌸 Freedom: ${percent}%`
    ]

    return m.reply(`${BORDER_TOP}\n${msgs[Math.floor(Math.random() * msgs.length)]}\n${BORDER_BOTTOM}`, null, { mentions: [target, m.sender] })
}

handler.help = ['findex']
handler.tags = ['fun', 'group']
handler.command = ['findex']
handler.group = true

export default handler