// ═══════════════════════════════════════════════
// 🎀 FIZA — Simp Card Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] || m.sender
    let name = who.split('@')[0]
    
    try {
        let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
        let url = `https://some-random-api.com/canvas/simpcard?avatar=${encodeURIComponent(pp)}`
        
        await conn.sendMessage(m.chat, {
            image: { url },
            caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡\n😆 *WTF @${name} IS A SIMP!*\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`,
            mentions: [who]
        }, { quoted: m })
    } catch {
        m.reply('❌ Failed to create simp card!')
    }
}

handler.help = ['simpcard']
handler.tags = ['fun', 'maker']
handler.command = /^(simpcard)$/i

export default handler