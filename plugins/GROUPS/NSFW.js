// ═══════════════════════════════════════════════
// 🎀 FIZA — Group NSFW Toggle Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { isAdmin, isOwner }) => {
    if (!isAdmin && !isOwner) return m.reply('🛡️ *Admin only!*')
    if (!m.chat?.endsWith('@g.us')) return m.reply('👥 Group only!')
    
    let db = global.db
    if (!db.data.chats[m.chat]) db.data.chats[m.chat] = {}
    let gc = db.data.chats[m.chat]
    let args = m.text.split(' ')
    
    if (!args[1]) {
        let status = gc.nsfw ? '🔞 ON' : '✅ OFF'
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🔞 *NSFW MODE*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n📊 Status: ${status}\n\n📝 .nsfw on/off\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    }
    
    if (args[1] === 'on') { gc.nsfw = true; await db.write(); return m.reply('🔞 NSFW ON!') }
    if (args[1] === 'off') { gc.nsfw = false; await db.write(); return m.reply('✅ NSFW OFF!') }
}

handler.help = ['nsfw']
handler.tags = ['group', 'admin']
handler.command = ['nsfw']
handler.admin = true
handler.group = true

export default handler