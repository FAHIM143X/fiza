// ═══════════════════════════════════════════════
// 🎀 FIZA — Demote Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, isAdmin, isOwner, isROwner, isBotAdmin }) => {

    if (!m.chat?.endsWith('@g.us')) return m.reply('👥 *Group only!*')
    if (!isAdmin && !isOwner && !isROwner) return m.reply('🛡️ *Admin or Owner only!*')
    if (!isBotAdmin) return m.reply('🤖 *Make me admin first!*')

    let who = m.mentionedJid?.[0] || m.quoted?.sender
    if (!who) return m.reply('📝 *Reply or mention admin to demote!*')
    if (who === conn.user.id) return m.reply('🍓 Cannot demote myself!')

    let name = who.split('@')[0]
    await conn.groupParticipantsUpdate(m.chat, [who], 'demote')
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n⬇️ *Demoted!*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n💔 @${name} is no longer admin!\n🧁 Bye bye~\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
}

handler.help = ['demote', 'unadmin']
handler.tags = ['group']
handler.command = ['demote']

export default handler