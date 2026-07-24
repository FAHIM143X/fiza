// ═══════════════════════════════════════════════
// 🎀 FIZA — Kick Plugin (Fixed)
// ═══════════════════════════════════════════════

let handler = async (m, { conn, isAdmin, isOwner, isROwner, isBotAdmin }) => {

    if (!m.chat?.endsWith('@g.us')) return m.reply('👥 *Group only!*')
    if (!isAdmin && !isOwner && !isROwner) return m.reply('🛡️ *Admin or Owner only!*')
    if (!isBotAdmin) return m.reply('🤖 *Make me admin first!*')

    let who = m.mentionedJid?.[0] || m.quoted?.sender
    if (!who) return m.reply('📝 *Reply or mention user to kick!*')
    if (who === conn.user.id) return m.reply('🍓 Cannot kick myself!')

    let name = who.split('@')[0]
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n👢 *Kicked!*\n💗━━━━━━⊱💖⊰━━━━━━💗\n\n💔 @${name} has been removed!\n🧁 Bye bye~\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`, null, { mentions: [who] })
}

handler.help = ['kick', 'remove']
handler.tags = ['group']
handler.command = ['k', 'remove']

export default handler