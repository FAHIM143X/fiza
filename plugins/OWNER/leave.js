// ═══════════════════════════════════════════════
// 🎀 FIZA — Owner Leave Group Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, isOwner, isROwner, isGroup }) => {
    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')
    if (!isGroup) return m.reply('👥 Group only!')
    
    await conn.groupLeave(m.chat)
}

handler.help = ['leave', 'exit']
handler.tags = ['owner']
handler.command = ['leave', 'exit', 'out']
handler.owner = true

export default handler