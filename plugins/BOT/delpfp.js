// ═══════════════════════════════════════════════
// 🎀 FIZA — Delete Bot Profile Picture
// ═══════════════════════════════════════════════

let handler = async (m, { conn }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

    await conn.removeProfilePicture(conn.user.jid)

    return m.reply(`${BORDER_TOP}
╭── 🗑️ *BOT PFP* ──╮
│ ✨ Profile pic removed!
│ 💗 Back to default~
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`)
}

handler.help = ['delppbot']
handler.tags = ['owner']
handler.command = /^(del(botpp|ppbot))$/i
handler.rowner = true

export default handler