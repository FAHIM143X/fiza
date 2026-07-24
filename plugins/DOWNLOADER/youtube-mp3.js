// ═══════════════════════════════════════════════
// 🎀 FIZA — YouTube MP3 Downloader Plugin
// ═══════════════════════════════════════════════

import yts from 'yt-search'
import { exec } from 'child_process'
import fs from 'fs'
import axios from 'axios'

let handler = async (m, { conn, text }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

    if (!text) {
        return m.reply(`${BORDER_TOP}\n❗ *Provide a YouTube title or link.*\n📝 Example: .ytmp3 blackpink\n${BORDER_BOTTOM}`)
    }

    try {
        // Search for the video
        let search = await yts(text)
        let video = search.videos[0]
        let url = video.url
        let title = video.title

        // Download MP3 using yt-dlp
        let filePath = './temp_' + Date.now() + '.mp3'
        let command = `yt-dlp -f bestaudio --extract-audio --audio-format mp3 -o "${filePath}" "${url}"`

        // Get thumbnail
        let thumb = (await axios.get(video.thumbnail, { responseType: 'arraybuffer' })).data

        // Send reaction
        await conn.sendMessage(m.chat, {
            react: { text: '🎧', key: m.key }
        })

        // Execute yt-dlp
        exec(command, async (error) => {
            if (error) {
                console.error('yt-dlp error:', error)
                return conn.sendMessage(m.chat, {
                    text: `${BORDER_TOP}\n❌ *Failed to download MP3.*\n${BORDER_BOTTOM}`
                }, { quoted: m })
            }

            // Send the MP3
            await conn.sendMessage(m.chat, {
                document: { url: filePath },
                mimetype: 'audio/mpeg',
                fileName: title + '.mp3',
                jpegThumbnail: thumb,
                caption: `${BORDER_TOP}
🎧 *Here's your MP3 from YouTube!*

🎵 *${title}*
🔗 ${url}

💗 Powered by FIZA
${BORDER_BOTTOM}`
            }, { quoted: m })

            // Clean up temp file
            fs.unlinkSync(filePath)
        })

    } catch (e) {
        console.error(e)
        return m.reply(`${BORDER_TOP}\n❌ *Error downloading. Make sure yt-dlp is installed.*\n${BORDER_BOTTOM}`)
    }
}

handler.help = ['ytmp3', 'ytaudio']
handler.tags = ['downloader']
handler.command = ['ytmp3', 'ytaudio']

export default handler