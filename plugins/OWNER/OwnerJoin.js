// ═══════════════════════════════════════════════
// 🎀 FIZA — Owner Join Group Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')
    if (!text) return m.reply('📝 .join https://chat.whatsapp.com/xxxxx')
    
    try {
        let code = text.split('whatsapp.com/')[1]?.replace(/[^a-zA-Z0-9]/g, '')
        if (!code) return m.reply('❌ Invalid link!')
        await conn.groupAcceptInvite(code)
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n✅ *Joined!*\n🔗 ${code}\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed to join! Link may be invalid.')
    }
}

handler.help = ['join']
handler.tags = ['owner']
handler.command = ['join', 'joingroup']
handler.owner = true

export default handler