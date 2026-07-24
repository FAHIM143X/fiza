// ═══════════════════════════════════════════════
// 🎀 FIZA — Group AntiToxic Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { isAdmin, isOwner }) => {
    if (!isAdmin && !isOwner) return m.reply('🛡️ *Admin only!*')
    if (!m.chat?.endsWith('@g.us')) return m.reply('👥 Group only!')
    
    let db = global.db
    if (!db.data.chats[m.chat]) db.data.chats[m.chat] = {}
    let gc = db.data.chats[m.chat]
    let args = m.text.split(' ')
    
    if (!args[1]) {
        let status = gc.antiToxic ? '✅ ON' : '❌ OFF'
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🚫 *ANTI TOXIC*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n📊 Status: ${status}\n\n📝 .antitoxic on/off\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    }
    
    if (args[1] === 'on') { gc.antiToxic = true; await db.write(); return m.reply('🚫 AntiToxic ON! Bad words will be deleted.') }
    if (args[1] === 'off') { gc.antiToxic = false; await db.write(); return m.reply('🚫 AntiToxic OFF!') }
}

handler.help = ['antitoxic']
handler.tags = ['group', 'admin']
handler.command = ['antitoxic', 'antitox']
handler.admin = true
handler.group = true

export default handler