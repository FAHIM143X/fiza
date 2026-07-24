// ═══════════════════════════════════════════════
// 🎀 FIZA — Group Description Changer
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text, isAdmin, isOwner, isGroup, isBotAdmin }) => {
    if (!isGroup) return m.reply('👥 *Group only!*')
    if (!isAdmin && !isOwner) return m.reply('🛡️ *Admin only!*')
    if (!isBotAdmin) return m.reply('🤖 *Make me admin first!*')
    if (!text) return m.reply('📝 .setdesc New Description')
    
    await conn.groupUpdateDescription(m.chat, text)
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n✅ *Description changed!*\n📝 ${text}\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['setdesc', 'setdescription']
handler.tags = ['group', 'admin']
handler.command = ['setdesc', 'setdescription', 'setgcdesc']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler