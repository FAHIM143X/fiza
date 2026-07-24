// ═══════════════════════════════════════════════
// 🎀 FIZA — Tweet Card Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('📝 .tweet Hello World!')
    let who = m.quoted ? m.quoted.sender : m.sender
    let name = conn.getName(who) || who.split('@')[0]
    try {
        let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
        let url = `https://some-random-api.com/canvas/tweet?avatar=${encodeURIComponent(pp)}&comment=${encodeURIComponent(text)}&username=${encodeURIComponent(name)}`
        await conn.sendMessage(m.chat, { image: { url }, caption: `🐦 *Tweet by* @${who.split('@')[0]}`, mentions: [who] }, { quoted: m })
    } catch { m.reply('❌ Failed!') }
}
handler.help = ['tweet']; handler.tags = ['maker']; handler.command = /^(tweet)$/i
export default handler