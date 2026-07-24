// ═══════════════════════════════════════════════
// 🎀 FIZA — Text to Speech Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('📝 .tts Hello world')
    if (text.length > 200) return m.reply('📝 Max 200 characters!')
    await conn.sendMessage(m.chat, {
        audio: { url: `https://api.voicerss.org/?key=abc&hl=en&src=${encodeURIComponent(text)}` },
        mimetype: 'audio/mpeg', ptt: true, fileName: 'tts.mp3'
    }, { quoted: m })
}

handler.help = ['tts', 'speak']; handler.tags = ['tools']; handler.command = ['tts', 'speak']
export default handler