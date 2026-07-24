// ═══════════════════════════════════════════════
// 🎀 FIZA — Mention Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text, isGroup, participants }) => {
    if (!isGroup) return m.reply('👥 Group only!')
    
    let who = m.mentionedJid?.[0] || m.quoted?.sender
    if (!who) return m.reply('📝 Reply or mention someone!')
    
    let name = who.split('@')[0]
    let msgs = [
        `Hey @${name}! Someone wants your attention 👀`,
        `@${name} you're being summoned! 🍭`,
        `Psttt @${name}, look here! 💖`,
        `@${name} where are you? Don't be shy! 🌸`,
        `Knock knock @${name}! 🚪`,
        `@${name} is wanted! 🫵`,
    ]
    
    let msg = text ? `💌 @${name}, ${text}` : msgs[Math.floor(Math.random() * msgs.length)]
    m.reply(msg, null, { mentions: [who] })
}

handler.help = ['mention', 'summon']
handler.tags = ['group', 'fun']
handler.command = ['mention', 'summon', 'call']
handler.group = true

export default handler