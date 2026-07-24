// ═══════════════════════════════════════════════
// 🎀 FIZA — It's So Stupid Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] || m.sender
    let name = who.split('@')[0]
    let msg = text || 'im+stupid'
    
    try {
        let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
        let url = `https://some-random-api.com/canvas/its-so-stupid?avatar=${encodeURIComponent(pp)}&dog=${encodeURIComponent(msg)}`
        
        await conn.sendMessage(m.chat, {
            image: { url },
            caption: `🐶 *IT'S SO STUPID!*\n👤 @${name}\n🧁 FIZA`,
            mentions: [who]
        }, { quoted: m })
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['stupid', 'iss']
handler.tags = ['maker', 'fun']
handler.command = /^(stupid|iss|itssostupid)$/i

export default handler