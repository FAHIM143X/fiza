// ═══════════════════════════════════════════════
// 🎀 FIZA — Set Bot Profile Picture
// ═══════════════════════════════════════════════

let handler = async (m, { conn, isOwner }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

    if (!isOwner) {
        return m.reply(`${BORDER_TOP}\n👑 *Owner only!*\n${BORDER_BOTTOM}`)
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
        await conn.updateProfilePicture(conn.user.id, media)
        return m.reply(`${BORDER_TOP}
╭── 🖼️ *BOT PFP* ──╮
│ ✨ Profile pic updated!
│ 💗 Looking cute~
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`)
    } catch (e) {
        return m.reply(`${BORDER_TOP}\n❌ *Failed to update!*\n${BORDER_BOTTOM}`)
    }
}

handler.help = ['setpfp', 'setppbot']
handler.tags = ['owner']
handler.command = ['setpfp', 'setppbot']
handler.owner = true

export default handler