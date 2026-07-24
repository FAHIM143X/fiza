// ═══════════════════════════════════════════════
// 🎀 FIZA — Find Husband Plugin
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
        `🤵 *${tag}* is your husband! 💍\n💗 Match: ${percent}%\n🌸 The man of your dreams~`,
        `💒 *${tag}* is hubby material! 🤵\n💗 Match: ${percent}%\n🌸 Strong & caring~`,
        `🤵‍♂️ *${tag}* puts a ring on it! 💍\n💗 Match: ${percent}%\n🌸 Lucky girl~`,
        `🏡 *${tag}* is your forever husband! 💍\n💗 Match: ${percent}%\n🌸 Protector mode ON~`,
        `💪 *${tag}* is your hubby! 🤵\n💗 Match: ${percent}%\n🌸 He'll carry you~`
    ]

    return m.reply(`${BORDER_TOP}\n${msgs[Math.floor(Math.random() * msgs.length)]}\n${BORDER_BOTTOM}`, null, { mentions: [target, m.sender] })
}

handler.help = ['findhusband']
handler.tags = ['fun', 'group']
handler.command = ['findhusband']
handler.group = true

export default handler