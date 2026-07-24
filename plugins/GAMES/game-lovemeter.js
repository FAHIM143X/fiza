// ═══════════════════════════════════════════════
// 🎀 FIZA — Love Meter Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('📝 *.love @user* or *.love name*')

    let who = m.mentionedJid?.[0] || m.sender
    let name = text.replace('@', '').split(' ')[0] || who.split('@')[0]
    let sender = m.sender.split('@')[0]

    let percent = Math.floor(Math.random() * 100)
    let isHigh = percent >= 50

    let loveMessages = [
        "You two are perfect together! 💑",
        "A match made in heaven! 💖",
        "Love is in the air! 💕",
        "You're meant to be! 💝",
        "Such a beautiful connection! 💗",
    ]
    
    let lowMessages = [
        "Just friends vibes~ 🤝",
        "Maybe give it time? ⏰",
        "Not the right match... 💔",
        "Better as friends! 👫",
        "The stars don't align... 🌟",
    ]

    let loveMsg = isHigh ? loveMessages[Math.floor(Math.random() * loveMessages.length)] : lowMessages[Math.floor(Math.random() * lowMessages.length)]
    let bar = '█'.repeat(Math.floor(percent / 10)) + '░'.repeat(10 - Math.floor(percent / 10))
    let emoji = percent > 80 ? '💘' : percent > 60 ? '💖' : percent > 40 ? '💕' : percent > 20 ? '💗' : '💔'

    // Loading animation
    let frames = ["《 █▒▒▒▒▒▒▒▒▒▒▒》10%", "《 ████▒▒▒▒▒▒▒▒》30%", "《 ███████▒▒▒▒▒》50%", "《 ██████████▒▒》80%", "《 ████████████》100%"]
    let { key } = await conn.sendMessage(m.chat, { text: '💖 *Calculating love...*' }, { quoted: m })

    for (let frame of frames) {
        await new Promise(resolve => setTimeout(resolve, 500))
        await conn.sendMessage(m.chat, { text: frame, edit: key })
    }

    let result = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── ${emoji} *LOVE METER* ──╮
│
│ 👤 @${sender}
│ 💖 @${who.split('@')[0]}
│
│ ${bar} ${percent}%
│ ${emoji} ${isHigh ? 'HIGH LOVE!' : 'LOW LOVE'}
│
│ 💬 ${loveMsg}
│
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

    await conn.sendMessage(m.chat, { text: result, edit: key, mentions: [m.sender, who] })
}

handler.help = ['love', 'amor']
handler.tags = ['fun']
handler.command = /^(love|amor)$/i

export default handler