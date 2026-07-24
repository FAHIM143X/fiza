// ═══════════════════════════════════════════════
// 🎀 FIZA — Owner Broadcast Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')
    if (!text) return m.reply('📝 .bc Hello everyone!')
    
    let chats = Object.keys(await conn.chats)
    let botName = global.botname || 'FIZA'
    let count = 0
    
    for (let id of chats) {
        await conn.sendMessage(id, { 
            text: `📢 *${botName} Broadcast*\n\n${text}`,
            contextInfo: { isForwarded: true }
        }).catch(() => {})
        count++
    }
    
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n✅ *Broadcast sent!*\n📊 ${count} chats\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['bc', 'broadcast']
handler.tags = ['owner']
handler.command = ['bc', 'broadcast', 'bcast']
handler.owner = true

export default handler