// ═══════════════════════════════════════════════
// 🎀 FIZA — Find Crush Plugin
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
        `💘 *${tag}* is secretly crushing on you! 😳\n💗 Match: ${percent}%\n🌸 Shoot your shot~`,
        `💓 *${tag}* blushes when you're near! 💘\n💗 Match: ${percent}%\n🌸 Adorable~`,
        `💌 *${tag}* wrote you a love letter! 💘\n💗 Match: ${percent}%\n🌸 How romantic~`,
        `😍 *${tag}* can't stop staring at you! 💘\n💗 Match: ${percent}%\n🌸 Love is in the air~`,
        `🦋 *${tag}* gives you butterflies! 💘\n💗 Match: ${percent}%\n🌸 Crush mode activated~`
    ]

    return m.reply(`${BORDER_TOP}\n${msgs[Math.floor(Math.random() * msgs.length)]}\n${BORDER_BOTTOM}`, null, { mentions: [target, m.sender] })
}

handler.help = ['findcrush']
handler.tags = ['fun', 'group']
handler.command = ['findcrush']
handler.group = true

export default handler