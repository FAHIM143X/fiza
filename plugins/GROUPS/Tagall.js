let handler = async (m, { conn, text, participants, isAdmin, isOwner, isROwner, groupMetadata }) => {
    
    if (!m.chat?.endsWith('@g.us')) return m.reply('👥 *Group only!*')
    if (!isAdmin && !isOwner && !isROwner) return m.reply('🛡️ *Admin or Owner only!*')

    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    let sender = m.sender.split('@')[0]
    let botName = global.botname || 'FIZA'
    let memberCount = participants.length

    let now = new Date()
    let time = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })
    let date = now.toLocaleDateString('en-IN')

    let admins = participants.filter(p => p.admin)
    let adminCount = admins.length
    let msg = text || '🍭 *EVERYONE ATTENTION* 💕'
    let emojis = ['🍡', '🍭', '🧁', '🍬', '🍥', '🍩', '🍨', '🍫', '🍪', '🍧']

    let tagText = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭ 🍭 *FIZA SUMMON* ✨ ╮
│ 🌸 *Group:* ${groupMetadata.subject}
│ 👥 *Members:* ${memberCount}
│ 🔑 *Admins:* ${adminCount}
│ 🕰️ *Time:* ${time}
│ 📆 *Date:* ${date}
│ 🤖 *Bot:* ${botName}
│ 👑 *Owner:* FAHIM
│ 💎 *Tagger:* @${sender}
${text ? `│ 💌 *Message:* ${msg}\n` : ''}╰━━━━━━━━━━━━━━━━━━╯\n\n`

    for (let i = 0; i < users.length; i++) {
        tagText += `${emojis[i % emojis.length]} @${users[i].split('@')[0]}\n`
    }

    tagText += `\n🧁 *Summoned with love~*\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`

    let thumb = null
    try {
        let pp = await conn.profilePictureUrl(m.chat, 'image')
        let res = await fetch(pp)
        thumb = Buffer.from(await res.arrayBuffer())
    } catch {}

    conn.sendMessage(m.chat, {
        text: tagText,
        mentions: users,
        contextInfo: thumb ? {
            externalAdReply: {
                title: '🍭 FIZA SUMMONING',
                body: `TAGGING ${memberCount} members ✨`,
                thumbnail: thumb,
                mediaType: 1,
                renderLargerThumbnail: false,
                showAdAttribution: false
            }
        } : {}
    }, { quoted: m })
}

handler.help = ['tagall', 'all', 'everyone']
handler.tags = ['group']
handler.command = ['tagall', 'all', 'everyone']

export default handler