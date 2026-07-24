// ═══════════════════════════════════════════════
// 🎀 FIZA — Find Boyfriend Plugin
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
        `👦 *${tag}* is your boyfriend! 💕\n💗 Match: ${percent}%\n🌸 He's a gentleman~`,
        `🌹 *${tag}* brings you flowers! 💕\n💗 Match: ${percent}%\n🌸 Romantic bf~`,
        `🎸 *${tag}* serenades you! 💕\n💗 Match: ${percent}%\n🌸 Dreamy~`,
        `🛡️ *${tag}* protects you! 💕\n💗 Match: ${percent}%\n🌸 Knight in shining armor~`,
        `☕ *${tag}* is your bf! 💕\n💗 Match: ${percent}%\n🌸 Coffee dates forever~`
    ]

    return m.reply(`${BORDER_TOP}\n${msgs[Math.floor(Math.random() * msgs.length)]}\n${BORDER_BOTTOM}`, null, { mentions: [target, m.sender] })
}

handler.help = ['findbf']
handler.tags = ['fun', 'group']
handler.command = ['findbf']
handler.group = true

export default handler