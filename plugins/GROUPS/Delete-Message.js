// ═══════════════════════════════════════════════
// 🎀 FIZA — Delete Message Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

    if (!m.quoted) {
        return m.reply(`${BORDER_TOP}\n💬 *Reply to a message to delete it~* 🧁\n${BORDER_BOTTOM}`)
    }

    let { chat, fromMe } = m.quoted

    try {
        if (!fromMe && isAdmin && isBotAdmin) {
            await conn.sendMsg(chat, { 
                delete: { 
                    remoteJid: m.chat, 
                    fromMe: false, 
                    id: m.quoted.id, 
                    participant: m.quoted.sender 
                } 
            })
        } else {
            await conn.sendMsg(chat, { delete: m.quoted.vM.key })
        }
    } catch (e) {
        // silently fail
    }
}

handler.help = ['del', 'delete']
handler.tags = ['group']
handler.command = /^(d(el(ete)?)?)$/i
handler.admin = true
handler.group = true

export default handler