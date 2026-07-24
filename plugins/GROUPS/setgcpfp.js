// ═══════════════════════════════════════════════
// 🎀 FIZA — Set Group Profile Picture
// ═══════════════════════════════════════════════

let handler = async (m, { conn, isAdmin, isBotAdmin, isGroup }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

    if (!isGroup) {
        return m.reply(`${BORDER_TOP}\n👥 *Group only!*\n${BORDER_BOTTOM}`)
    }
    if (!isAdmin) {
        return m.reply(`${BORDER_TOP}\n🛡️ *Admin only!*\n${BORDER_BOTTOM}`)
    }
    if (!isBotAdmin) {
        return m.reply(`${BORDER_TOP}\n🤖 *Bot needs admin!*\n${BORDER_BOTTOM}`)
    }

    if (!m.quoted) {
        return m.reply(`${BORDER_TOP}\n🖼️ *Reply to an image!*\n${BORDER_BOTTOM}`)
    }

    let mime = (m.quoted.msg || m.quoted).mimetype || ''
    if (!/image/.test(mime)) {
        return m.reply(`${BORDER_TOP}\n🖼️ *Reply to an image!*\n${BORDER_BOTTOM}`)
    }

    try {
        let media = await m.quoted.download()
        await conn.updateProfilePicture(m.chat, media)
        return m.reply(`${BORDER_TOP}
╭── 🖼️ *GROUP PFP* ──╮
│ ✨ Group pic updated!
│ 💗 Looking great~
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`)
    } catch (e) {
        return m.reply(`${BORDER_TOP}\n❌ *Failed! Make sure bot is admin.*\n${BORDER_BOTTOM}`)
    }
}

handler.help = ['setgcpfp', 'setppgc']
handler.tags = ['group', 'admin']
handler.command = ['setgcpfp', 'setppgc']
handler.admin = true
handler.group = true

export default handler