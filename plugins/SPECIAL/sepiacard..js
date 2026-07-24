// ═══════════════════════════════════════════════
// 🎀 FIZA — Sepia Card Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] || m.sender
    try {
        let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
        let url = `https://some-random-api.com/canvas/sepia?avatar=${encodeURIComponent(pp)}`
        await conn.sendMessage(m.chat, { image: { url }, caption: `📷 *SEPIA!*` }, { quoted: m })
    } catch { m.reply('❌ Failed!') }
}
handler.help = ['sepia']; handler.tags = ['maker']; handler.command = /^(sepia)$/i
export default handler