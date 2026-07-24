// ═══════════════════════════════════════════════
// 🎀 FIZA — Group Open/Close Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, args, isAdmin, isOwner, isGroup, isBotAdmin }) => {
    if (!isGroup) return m.reply('👥 *Group only!*')
    if (!isAdmin && !isOwner) return m.reply('🛡️ *Admin only!*')
    if (!isBotAdmin) return m.reply('🤖 *Make me admin first!*')
    
    let cmd = args[0]?.toLowerCase()
    
    if (cmd === 'open') {
        await conn.groupSettingUpdate(m.chat, 'not_announcement')
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🔓 *Group OPEN!*\n✨ Everyone can send messages now.\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    }
    if (cmd === 'close') {
        await conn.groupSettingUpdate(m.chat, 'announcement')
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🔒 *Group CLOSED!*\n🛡️ Only admins can send messages.\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    }
    
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n📝 *Usage:*\n.group open\n.group close\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['group']
handler.tags = ['group', 'admin']
handler.command = ['group']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler