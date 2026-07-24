// ═══════════════════════════════════════════════
// 🎀 FIZA — Group AntiDelete Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { isAdmin, isOwner }) => {
    if (!isAdmin && !isOwner) return m.reply('🛡️ *Admin only!*')
    if (!m.chat?.endsWith('@g.us')) return m.reply('👥 Group only!')
    
    let db = global.db
    if (!db.data.chats[m.chat]) db.data.chats[m.chat] = {}
    let gc = db.data.chats[m.chat]
    let args = m.text.split(' ')
    
    if (!args[1]) {
        let status = gc.antiDelete ? '✅ ON' : '❌ OFF'
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🗑️ *ANTI DELETE*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n📊 Status: ${status}\n\n📝 .antidelete on/off\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    }
    
    if (args[1] === 'on') { gc.antiDelete = true; await db.write(); return m.reply('🗑️ AntiDelete ON! Deleted messages will be detected.') }
    if (args[1] === 'off') { gc.antiDelete = false; await db.write(); return m.reply('🗑️ AntiDelete OFF!') }
}

handler.help = ['antidelete']
handler.tags = ['group', 'admin']
handler.command = ['antidelete', 'antidel']
handler.admin = true
handler.group = true

export default handler