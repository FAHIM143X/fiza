// ═══════════════════════════════════════════════
// 🎀 FIZA — Find Enemy Plugin
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
        `😈 *${tag}* is your rival! ⚡\n💢 Watch your back~\n🌸 Rivalry: ${percent}%`,
        `⚔️ *${tag}* challenges you! 😈\n💢 Anime rival arc begins~\n🌸 Tension: ${percent}%`,
        `🐍 *${tag}* is your nemesis! 😈\n💢 It's on sight~\n🌸 Enemy level: ${percent}%`,
        `💥 *${tag}* declared war on you! 😈\n💢 Battle mode ON~\n🌸 Conflict: ${percent}%`,
        `🎭 *${tag}* is your frenemy! 😈\n💢 Trust no one~\n🌸 Suspicion: ${percent}%`
    ]

    return m.reply(`${BORDER_TOP}\n${msgs[Math.floor(Math.random() * msgs.length)]}\n${BORDER_BOTTOM}`, null, { mentions: [target, m.sender] })
}

handler.help = ['findenemy']
handler.tags = ['fun', 'group']
handler.command = ['findenemy']
handler.group = true

export default handler