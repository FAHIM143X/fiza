// ═══════════════════════════════════════════════
// 🎀 FIZA — YouTube Audio/Video Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}play <number/name>*\n\nExample: ${usedPrefix}play 1\n${usedPrefix}play faded`)

    let isVideo = command === 'video' || command === 'ytvideo'

    // If user replied with number
    if (!isNaN(text) && global.ytSearch?.[m.sender]) {
        let index = parseInt(text) - 1
        let videos = global.ytSearch[m.sender].videos
        if (index < 0 || index >= videos.length) return m.reply('❌ Invalid number!')

        let video = videos[index]
        let url = video.url || video.link
        return downloadAndSend(conn, m, url, isVideo)
    }

    // Search and download first result
    m.reply('🔍 *Searching...*')

    try {
        let res = await fetch(`https://api.siputzx.my.id/api/search/youtube?query=${encodeURIComponent(text)}`)
        let data = await res.json()

        if (!data.status || !data.data?.[0]) return m.reply('❌ Not found!')

        let video = data.data[0]
        let url = video.url || video.link
        await downloadAndSend(conn, m, url, isVideo)

    } catch {
        m.reply('❌ Failed!')
    }
}

async function downloadAndSend(conn, m, url, isVideo) {
    try {
        let apiUrl = isVideo
            ? `https://api.siputzx.my.id/api/dl/youtube?url=${encodeURIComponent(url)}`
            : `https://api.siputzx.my.id/api/dl/youtubemp3?url=${encodeURIComponent(url)}`

        let res = await fetch(apiUrl)
        let data = await res.json()

        if (data.status && data.data) {
            if (isVideo) {
                await conn.sendMessage(m.chat, {
                    video: { url: data.data.url || data.data.download },
                    caption: `🎥 *${data.data.title || 'Video'}*\n🧁 FIZA`
                }, { quoted: m })
            } else {
                await conn.sendMessage(m.chat, {
                    audio: { url: data.data.url || data.data.download },
                    mimetype: 'audio/mpeg',
                    fileName: `${data.data.title || 'audio'}.mp3`
                }, { quoted: m })
            }
        }
    } catch {
        m.reply('❌ Download failed!')
    }
}

handler.help = [ 'video', 'ytmp3', 'ytmp4']
handler.tags = ['downloader']
handler.command = /^(play|video|ytmp3|ytmp4|ytvideo)$/i

export default handler