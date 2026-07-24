// ═══════════════════════════════════════════════
// 🎀 FIZA — TikTok Video Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}tt <url>*\n\nExample: ${usedPrefix}tt https://vt.tiktok.com/xxx/`)

    if (!text.includes('tiktok.com')) return m.reply('❌ Please provide a valid TikTok URL!')

    m.reply('🎵 *Downloading TikTok...*')

    try {
        // API 1: siputzx
        let res = await fetch(`https://api.siputzx.my.id/api/dl/tiktok?url=${encodeURIComponent(text)}`)
        let data = await res.json()

        if (data.status && data.data) {
            let videoUrl = data.data.video || data.data.play || data.data.hdplay
            
            if (videoUrl) {
                await conn.sendMessage(m.chat, {
                    video: { url: videoUrl },
                    caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎵 *TIKTOK* ──╮
│ 👤 ${data.data.author || 'Creator'}
│ 💬 ${(data.data.title || 'TikTok Video').slice(0, 100)}
│ ❤️ ${data.data.likes || 0} 💬 ${data.data.comments || 0}
│
│ 📝 ${usedPrefix}ttmp3 <url>
│    Convert to audio
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
                }, { quoted: m })
                return
            }
        }

        // API 2: TikWM (fallback)
        let res2 = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(text)}`)
        let data2 = await res2.json()

        if (data2.code === 0 && data2.data) {
            let videoUrl = data2.data.hdplay || data2.data.play
            if (videoUrl) {
                await conn.sendMessage(m.chat, {
                    video: { url: videoUrl },
                    caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎵 *TIKTOK* ──╮
│ 👤 ${data2.data.author?.nickname || 'Creator'}
│ 💬 ${data2.data.title || 'TikTok Video'}
│ ▶️ ${data2.data.play_count || 0} plays
│ ❤️ ${data2.data.digg_count || 0} likes
│
│ 📝 ${usedPrefix}ttmp3 <url>
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
                }, { quoted: m })
                return
            }
        }

        m.reply('❌ Failed to download! Try another URL.')

    } catch {
        m.reply('❌ Error downloading TikTok!')
    }
}

handler.help = ['tt', 'tiktok', 'ttdl', 'tiktokdl']
handler.tags = ['downloader']
handler.command = /^(tt|tiktok|ttdl|tiktokdl|ttnowm|tiktoknowm)$/i

export default handler