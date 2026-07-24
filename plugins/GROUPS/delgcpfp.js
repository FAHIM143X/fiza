// ═══════════════════════════════════════════════
// 🎀 FIZA — Delete Group Profile Picture
// ═══════════════════════════════════════════════

let handler = async (m, { conn }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

    await conn.removeProfilePicture(m.chat)

    return m.reply(`${BORDER_TOP}
╭── 🗑️ *GROUP PFP* ──╮
│ ✨ Group pic removed!
│ 💗 Fresh start~
╰── 🌸 FIZA 🌸 ──╯
${BORDER_BOTTOM}`)
}

handler.help = ['delppgc']
handler.tags = ['group']
handler.command = /^(d(el(ete)?)?pp(gc|gro?up)?)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler