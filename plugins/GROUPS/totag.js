// ═══════════════════════════════════════════════
// 🎀 FIZA — Tag All Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text, participants }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    
    if (!m.quoted) {
        return m.reply(`${BORDER_TOP}\n💬 *Reply to a message to tag everyone!*\n${BORDER_BOTTOM}`)
    }

    conn.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: users })
}

handler.help = ['totag']
handler.tags = ['group']
handler.command = /^(totag|tag)$/i

handler.admin = true
handler.group = true

export default handler