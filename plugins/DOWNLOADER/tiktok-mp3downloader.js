// ═══════════════════════════════════════════════
// 🎀 FIZA — TikTok MP3/Audio Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}ttmp3 <url>*\n\nExample: ${usedPrefix}ttmp3 https://vt.tiktok.com/xxx/`)

    if (!text.includes('tiktok.com')) return m.reply('❌ Please provide a valid TikTok URL!')

    m.reply('🎵 *Downloading TikTok audio...*')

    try {
        let res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(text)}`)
        let data = await res.json()

        if (data.code === 0 && data.data) {
            let audioUrl = data.data.music || data.data.music_info?.play
            
            if (audioUrl) {
                await conn.sendMessage(m.chat, {
                    audio: { url: audioUrl },
                    mimetype: 'audio/mpeg',
                    fileName: 'tiktok_audio.mp3'
                }, { quoted: m })

                await conn.sendMessage(m.chat, {
                    text: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎵 *TIKTOK AUDIO* ──╮
│ 🎶 ${data.data.music_info?.title || 'Audio'}
│ 👤 ${data.data.music_info?.author || 'Artist'}
│ ▶️ ${data.data.play_count || 0} plays
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
                }, { quoted: m })
                return
            }
        }

        m.reply('❌ No audio found!')

    } catch {
        m.reply('❌ Failed to download!')
    }
}

handler.help = ['ttmp3', 'tiktokmp3', 'tiktokaudio']
handler.tags = ['downloader']
handler.command = /^(ttmp3|tiktokmp3|tiktokaudio)$/i

export default handler