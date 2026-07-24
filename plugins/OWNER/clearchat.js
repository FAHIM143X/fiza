// ═══════════════════════════════════════════════
// 🎀 FIZA — Owner Clear Chat Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')
    if (!m.quoted) return m.reply('📝 Reply to bot message!')
    
    await conn.sendMessage(m.chat, { delete: m.quoted.key })
}

handler.help = ['clear', 'cls']
handler.tags = ['owner']
handler.command = ['clear', 'cls', 'clean']
handler.owner = true

export default handler