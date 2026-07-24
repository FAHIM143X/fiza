// ═══════════════════════════════════════════════
// 🎀 FIZA — Unwarn Plugin (Fixed)
// ═══════════════════════════════════════════════

let handler = async (m, { conn, isAdmin, isOwner, isROwner }) => {

    if (!m.chat?.endsWith('@g.us')) return m.reply('👥 *Group only!*')
    if (!isAdmin && !isOwner && !isROwner) return m.reply('🛡️ *Admin or Owner only!*')

    let who = m.mentionedJid?.[0] || m.quoted?.sender
    if (!who) return m.reply('📝 *Reply or mention user!*')

    let db = global.db
    if (!db.data.users[who]) db.data.users[who] = { warnings: 0 }
    db.data.users[who].warnings = 0
    await db.write()

    let name = who.split('@')[0]
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── ✅ *CLEARED* ──╮
│ 👤 @${name}
│ 📊 Warnings: 0
│ 🧁 Fresh start!
╰── FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
}

handler.help = ['unwarn', 'clearwarn']
handler.tags = ['group']
handler.command = ['unwarn', 'clearwarn']

export default handler