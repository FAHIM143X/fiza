// ═══════════════════════════════════════════════
// 🎀 FIZA — Find Girlfriend Plugin
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
        `👧 *${tag}* is your girlfriend! 💕\n💗 Match: ${percent}%\n🌸 Cute couple alert~`,
        `🌸 *${tag}* said yes! 💕\n💗 Match: ${percent}%\n🌸 Dating era begins~`,
        `🎀 *${tag}* is your gf! 💕\n💗 Match: ${percent}%\n🌸 She's adorable~`,
        `💖 *${tag}* holds your hand! 💕\n💗 Match: ${percent}%\n🌸 Couple goals~`,
        `🍫 *${tag}* brings you chocolates! 💕\n💗 Match: ${percent}%\n🌸 Sweet love~`
    ]

    return m.reply(`${BORDER_TOP}\n${msgs[Math.floor(Math.random() * msgs.length)]}\n${BORDER_BOTTOM}`, null, { mentions: [target, m.sender] })
}

handler.help = ['findgf']
handler.tags = ['fun', 'group']
handler.command = ['findgf']
handler.group = true

export default handler