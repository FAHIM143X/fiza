// ═══════════════════════════════════════════════
// 🎀 FIZA — Warn Plugin (Fixed)
// ═══════════════════════════════════════════════

let handler = async (m, { conn, args, isAdmin, isOwner, isROwner }) => {

    if (!m.chat?.endsWith('@g.us')) return m.reply('👥 *Group only!*')
    if (!isAdmin && !isOwner && !isROwner) return m.reply('🛡️ *Admin or Owner only!*')

    let who = m.mentionedJid?.[0] || m.quoted?.sender
    if (!who) return m.reply('📝 *Reply or mention user to warn!*')
    if (who === conn.user.id) return m.reply('🍓 Cannot warn myself!')

    let db = global.db
    if (!db.data.users[who]) db.data.users[who] = {}
    db.data.users[who].warnings = (db.data.users[who].warnings || 0) + 1
    let warns = db.data.users[who].warnings
    await db.write()

    let name = who.split('@')[0]
    let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── ⚠️ *WARNING* ──╮
│ 👤 @${name}
│ 📊 Warnings: ${warns}/3
│`

    if (warns >= 3) {
        txt += `│\n│ 🚫 3 warnings! Kicking...`
        await conn.groupParticipantsUpdate(m.chat, [who], 'remove').catch(() => {})
        db.data.users[who].warnings = 0
        await db.write()
    }

    txt += `\n╰── 🧁 Be nice! ──╯\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`

    m.reply(txt, null, { mentions: [who] })
}

handler.help = ['warn', 'warning']
handler.tags = ['group']
handler.command = ['warn', 'warning']

export default handler