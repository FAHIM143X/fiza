// ═══════════════════════════════════════════════
// 🎀 FIZA — Slow Mode Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, args, isAdmin, isOwner, isGroup, isBotAdmin }) => {
    if (!isGroup) return m.reply('👥 Group only!')
    if (!isAdmin && !isOwner) return m.reply('🛡️ Admin only!')
    if (!isBotAdmin) return m.reply('🤖 Make me admin first!')
    
    let time = parseInt(args[0])
    if (!time || time < 0) return m.reply('📝 .slowmode 5 (seconds) or .slowmode 0 (off)')
    
    let db = global.db
    if (!db.data.chats[m.chat]) db.data.chats[m.chat] = {}
    db.data.chats[m.chat].slowmode = time
    await db.write()
    
    if (time === 0) {
        m.reply('｡ﾟ•┈୨💖୧┈•ﾟ｡\n⚡ Slowmode OFF!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡')
    } else {
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🐢 Slowmode ON!\n⏰ ${time}s between messages.\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    }
}

handler.help = ['slowmode']
handler.tags = ['group', 'admin']
handler.command = ['slowmode', 'slow']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler