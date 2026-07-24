// ═══════════════════════════════════════════════
// 🎀 FIZA — YouTube Comment Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('📝 .ytcomment Hello World!')
    
    let who = m.quoted ? m.quoted.sender : m.sender
    let name = conn.getName(who) || who.split('@')[0]
    
    try {
        let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
        let url = `https://some-random-api.com/canvas/youtube-comment?avatar=${encodeURIComponent(pp)}&comment=${encodeURIComponent(text)}&username=${encodeURIComponent(name)}`
        
        await conn.sendMessage(m.chat, {
            image: { url },
            caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡\n📺 *YouTube Comment*\n👤 ${name}\n💬 ${text}\n🧁 FIZA\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`
        }, { quoted: m })
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['ytcomment']
handler.tags = ['maker']
handler.command = /^(ytcomment|ytc)$/i

export default handler