// ═══════════════════════════════════════════════
// 🎀 FIZA — Owner Set Bio Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')
    if (!text) return m.reply('📝 .setbio I am FIZA!')
    
    await conn.updateProfileStatus(text)
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n✅ *Bio changed!*\n📝 ${text}\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['setbio']
handler.tags = ['owner']
handler.command = ['setbio', 'setstatus']
handler.owner = true

export default handler