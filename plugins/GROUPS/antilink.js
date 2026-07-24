// plugins/GROUP/antilink.js
// ═══════════════════════════════════════════════
// 🎀 FIZA — AntiLink Toggle (100% Working)
// ═══════════════════════════════════════════════

let handler = async (m, { conn, args, isAdmin, isOwner, isROwner }) => {

    // Check if group
    if (!m.chat?.endsWith('@g.us')) return m.reply('👥 *Group only!*')

    // Check permission
    if (!isAdmin && !isOwner && !isROwner) return m.reply('🛡️ *Admin or Owner only!*')

    // Database
    let db = global.db
    if (!db.data) db.data = {}
    if (!db.data.chats) db.data.chats = {}
    if (!db.data.chats[m.chat]) db.data.chats[m.chat] = {}
    let gc = db.data.chats[m.chat]

    // No args = show status
    if (!args[0]) {
        let status = gc.antiLink ? '✅ ON' : '❌ OFF'
        return m.reply(`🔗 *AntiLink:* ${status}\n\n.antilink on\n.antilink off`)
    }

    // Turn ON
    if (args[0] === 'on') {
        gc.antiLink = true
        await db.write()
        return m.reply('✅ *AntiLink ON!*\n🚫 Links will be deleted\n⚠️ 3 warnings = Kick')
    }

    // Turn OFF
    if (args[0] === 'off') {
        gc.antiLink = false
        await db.write()
        return m.reply('❌ *AntiLink OFF!*')
    }

    return m.reply('.antilink on | .antilink off')
}

handler.help = ['antilink']
handler.tags = ['group']
handler.command = ['antilink']

export default handler