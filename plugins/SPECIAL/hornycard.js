// ═══════════════════════════════════════════════
// 🎀 FIZA — Horny Card Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] || m.sender
    let name = who.split('@')[0]
    
    try {
        let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
        let url = `https://some-random-api.com/canvas/horny?avatar=${encodeURIComponent(pp)}`
        
        await conn.sendMessage(m.chat, {
            image: { url },
            caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡\n😳 *HORNY CARD!*\n👤 @${name}\n🧁 FIZA\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`,
            mentions: [who]
        }, { quoted: m })
    } catch {
        m.reply('❌ Failed to create card!')
    }
}

handler.help = ['hornycard', 'hornylicense']
handler.tags = ['maker', 'fun']
handler.command = /^(hornycard|hornylicense)$/i

export default handler