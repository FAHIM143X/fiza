// ═══════════════════════════════════════════════
// 🎀 FIZA — Promote Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, isAdmin, isOwner, isROwner, isBotAdmin }) => {

    if (!m.chat?.endsWith('@g.us')) return m.reply('👥 *Group only!*')
    if (!isAdmin && !isOwner && !isROwner) return m.reply('🛡️ *Admin or Owner only!*')
    if (!isBotAdmin) return m.reply('🤖 *Make me admin first!*')

    let who = m.mentionedJid?.[0] || m.quoted?.sender
    if (!who) return m.reply('📝 *Reply or mention user to promote!*')
    if (who === conn.user.id) return m.reply('🍓 I am already admin!')

    let name = who.split('@')[0]
    await conn.groupParticipantsUpdate(m.chat, [who], 'promote')
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n👑 *Promoted!*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n🌟 @${name} is now an admin!\n🧁 Congrats~\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
}

handler.help = ['promote', 'admin']
handler.tags = ['group']
handler.command = ['promote']

export default handler