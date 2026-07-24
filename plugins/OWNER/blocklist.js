// ═══════════════════════════════════════════════
// 🎀 FIZA — Owner Block/Unblock Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, args, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')
    
    let who = m.mentionedJid?.[0] || m.quoted?.sender || (args[0]?.includes('@') ? args[0] : args[0] + '@s.whatsapp.net')
    if (!who) return m.reply('📝 Reply/mention user or .block 91xxxxxxxxxx')
    
    let cmd = args[0]?.toLowerCase()
    if (cmd === 'block') {
        await conn.updateBlockStatus(who, 'block')
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🚫 *Blocked!*\n👤 @${who.split('@')[0]}\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
    }
    if (cmd === 'unblock') {
        await conn.updateBlockStatus(who, 'unblock')
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n✅ *Unblocked!*\n👤 @${who.split('@')[0]}\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
    }
    
    await conn.updateBlockStatus(who, 'block')
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🚫 *Blocked!*\n👤 @${who.split('@')[0]}\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
}

handler.help = ['block', 'unblock']
handler.tags = ['owner']
handler.command = ['block', 'unblock']
handler.owner = true

export default handler