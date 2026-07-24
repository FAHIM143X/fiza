// ═══════════════════════════════════════════════
// 🎀 FIZA — QR Generator Plugin (API)
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('📝 .qr https://google.com')
    await conn.sendMessage(m.chat, {
        image: { url: `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}` },
        caption: `🔲 *QR Code for:* ${text}`
    }, { quoted: m })
}

handler.help = ['qr', 'qrcode']; handler.tags = ['tools']; handler.command = ['qr', 'qrcode']
export default handler