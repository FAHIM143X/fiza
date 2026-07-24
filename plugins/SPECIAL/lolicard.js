// ═══════════════════════════════════════════════
// 🎀 FIZA — Loli Card Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] || m.sender
    let name = who.split('@')[0]
    try {
        let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
        let url = `https://some-random-api.com/canvas/lolice?avatar=${encodeURIComponent(pp)}`
        await conn.sendMessage(m.chat, { image: { url }, caption: `🚨 *LOLI POLICE!* @${name}`, mentions: [who] }, { quoted: m })
    } catch { m.reply('❌ Failed!') }
}
handler.help = ['lolice']; handler.tags = ['maker']; handler.command = /^(lolice|loli)$/i
export default handler