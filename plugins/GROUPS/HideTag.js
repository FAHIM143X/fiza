let handler = async (m, { conn, text, participants, isAdmin, isOwner, isROwner }) => {
    if (!isAdmin && !isOwner && !isROwner) return m.reply('🛡️ *Admin or Owner only!*')
    
    let botName = global.botname || 'FIZA'
    let users = participants.map(u => u.id)
    conn.sendMessage(m.chat, { 
        text: `｡ﾟ•┈୨💖୧┈•ﾟ｡\n📢 *${text || 'Announcement!'}*\n🤖 ${botName}\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`, 
        mentions: users 
    }, { quoted: m })
}

handler.help = ['hidetag', 'ht']
handler.tags = ['group']
handler.command = ['hidetag', 'ht']
handler.admin = true
handler.group = true
export default handler