// ═══════════════════════════════════════════════
// 🎀 FIZA — Pixelate Card Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] || m.sender
    try {
        let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
        let url = `https://some-random-api.com/canvas/pixelate?avatar=${encodeURIComponent(pp)}`
        await conn.sendMessage(m.chat, { image: { url }, caption: `👾 *PIXELATED!*` }, { quoted: m })
    } catch { m.reply('❌ Failed!') }
}
handler.help = ['pixel']; handler.tags = ['maker']; handler.command = /^(pixel|pixelate)$/i
export default handler