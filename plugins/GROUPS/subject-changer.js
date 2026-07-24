// ═══════════════════════════════════════════════
// 🎀 FIZA — Group Subject Changer
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text, isAdmin, isOwner, isGroup, isBotAdmin }) => {
    if (!isGroup) return m.reply('👥 *Group only!*')
    if (!isAdmin && !isOwner) return m.reply('🛡️ *Admin only!*')
    if (!isBotAdmin) return m.reply('🤖 *Make me admin first!*')
    if (!text) return m.reply('📝 .setsubject New Group Name')
    
    await conn.groupUpdateSubject(m.chat, text)
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n✅ *Subject changed!*\n🌸 ${text}\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['setsubject', 'setnamegc']
handler.tags = ['group', 'admin']
handler.command = ['setsubject', 'setnamegc', 'setgcname']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler