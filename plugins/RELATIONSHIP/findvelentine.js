// ═══════════════════════════════════════════════
// 🎀 FIZA — Find Valentine Plugin
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
        `💝 *${tag}* is your valentine! 🌹\n💗 Match: ${percent}%\n🌸 Be mine forever~`,
        `💌 *${tag}* sends you roses! 🌹\n💗 Match: ${percent}%\n🌸 Happy Valentine's~`,
        `🍫 *${tag}* is your V-day date! 💝\n💗 Match: ${percent}%\n🌸 Sweet romance~`,
        `🧸 *${tag}* gives you a teddy! 💝\n💗 Match: ${percent}%\n🌸 Cuddle season~`,
        `💋 *${tag}* is your valentine! 🌹\n💗 Match: ${percent}%\n🌸 XOXO~`
    ]

    return m.reply(`${BORDER_TOP}\n${msgs[Math.floor(Math.random() * msgs.length)]}\n${BORDER_BOTTOM}`, null, { mentions: [target, m.sender] })
}

handler.help = ['findvalentine']
handler.tags = ['fun', 'group']
handler.command = ['findvalentine']
handler.group = true

export default handler