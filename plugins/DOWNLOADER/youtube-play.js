// ═══════════════════════════════════════════════
// 🎀 FIZA — YouTube Play Audio & Video
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}${command} <song name>*\n\nExample: ${usedPrefix}play faded\n${usedPrefix}play2 faded`)

    let isVideo = command === 'play2'

    m.reply(`🔍 *Searching...*`)

    try {
        // Search YouTube
        let searchRes = await fetch(`https://api.siputzx.my.id/api/search/youtube?query=${encodeURIComponent(text)}`)
        let searchData = await searchRes.json()

        if (!searchData.status || !searchData.data?.[0]) return m.reply('❌ Not found!')

        let video = searchData.data[0]
        let videoUrl = video.url || video.link

        // Send info
        let info = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎵 *YOUTUBE* ──╮
│ 🎶 ${(video.title || video.name || text).slice(0, 50)}
│ 👤 ${video.author || video.channel || 'Unknown'}
│ ⏱️ ${video.duration || video.timestamp || 'N/A'}
│ 👁️ ${video.views || 'N/A'}
│
│ 📥 Downloading ${isVideo ? 'video' : 'audio'}...
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

        await conn.sendMessage(m.chat, {
            image: { url: video.thumbnail || video.thumb },
            caption: info
        }, { quoted: m })

        // Download
        let apiUrl = isVideo
            ? `https://api.siputzx.my.id/api/dl/youtube?url=${encodeURIComponent(videoUrl)}`
            : `https://api.siputzx.my.id/api/dl/youtubemp3?url=${encodeURIComponent(videoUrl)}`

        let dlRes = await fetch(apiUrl)
        let dlData = await dlRes.json()

        if (dlData.status && dlData.data?.url) {
            if (isVideo) {
                await conn.sendMessage(m.chat, {
                    video: { url: dlData.data.url },
                    caption: `🎥 *${video.title || 'Video'}*\n🧁 FIZA`
                }, { quoted: m })
            } else {
                await conn.sendMessage(m.chat, {
                    audio: { url: dlData.data.url },
                    mimetype: 'audio/mpeg',
                    fileName: `${video.title || 'audio'}.mp3`
                }, { quoted: m })
            }
        } else {
            // Fallback Ruby API
            let rubyUrl = isVideo
                ? `https://ruby-core.vercel.app/api/download/youtube/mp4?url=${encodeURIComponent(videoUrl)}`
                : `https://ruby-core.vercel.app/api/download/youtube/mp3?url=${encodeURIComponent(videoUrl)}`

            let rubyRes = await fetch(rubyUrl)
            let rubyData = await rubyRes.json()

            if (rubyData?.status && rubyData?.download?.url) {
                if (isVideo) {
                    await conn.sendMessage(m.chat, {
                        video: { url: rubyData.download.url },
                        caption: `🎥 *${video.title || 'Video'}*\n🧁 FIZA`
                    }, { quoted: m })
                } else {
                    await conn.sendMessage(m.chat, {
                        audio: { url: rubyData.download.url },
                        mimetype: 'audio/mpeg',
                        fileName: `${video.title || 'audio'}.mp3`
                    }, { quoted: m })
                }
            } else {
                m.reply('❌ Download failed! Try another song.')
            }
        }

    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['music2', 'play2']
handler.tags = ['downloader']
handler.command = ['play', 'play2']

export default handler