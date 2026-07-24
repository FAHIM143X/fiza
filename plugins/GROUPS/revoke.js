// ═══════════════════════════════════════════════
// 🎀 FIZA — Revoke Group Link Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, isAdmin, isOwner, isGroup, isBotAdmin }) => {
    if (!isGroup) return m.reply('👥 *Group only!*')
    if (!isAdmin && !isOwner) return m.reply('🛡️ *Admin only!*')
    if (!isBotAdmin) return m.reply('🤖 *Make me admin first!*')
    
    await conn.groupRevokeInvite(m.chat)
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🔗 *Group link revoked!*\n🔄 Old link is now invalid.\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['revoke', 'resetlink']
handler.tags = ['group', 'admin']
handler.command = ['revoke', 'resetlink']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler