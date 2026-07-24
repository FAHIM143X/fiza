// ═══════════════════════════════════════════════
// 🎀 FIZA — Top 10 Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text, participants }) => {

    if (!m.chat?.endsWith('@g.us')) return m.reply('👥 *Group only!*')
    if (!text) return m.reply('📝 *.top Cutest*')

    let users = participants.map(u => u.id)
    let top10 = users.sort(() => Math.random() - 0.5).slice(0, 10)
    
    let emojis = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
    let randomEmoji = ['🤓', '😅', '😂', '😳', '😎', '🥵', '😱', '🤑', '🙄', '💩', '🍑', '🤨', '🥴', '🔥', '👇🏻', '😔', '👀', '🌚']
    let emoji = randomEmoji[Math.floor(Math.random() * randomEmoji.length)]

    let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── ${emoji} *TOP 10 ${text.toUpperCase()}* ${emoji} ──╮
│
`
    top10.forEach((user, i) => {
        txt += `│ ${emojis[i]} @${user.split('@')[0]}\n`
    })

    txt += `│\n╰── 🧁 FIZA Top ──╯\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`

    m.reply(txt, null, { mentions: top10 })
}

handler.help = ['top']
handler.tags = ['fun', 'group']
handler.command = ['top']
handler.group = true

export default handler