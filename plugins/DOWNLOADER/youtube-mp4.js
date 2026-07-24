// ═══════════════════════════════════════════════
// 🎀 FIZA — YouTube Video Downloader Plugin
// ═══════════════════════════════════════════════

import yts from 'yt-search'
import { exec } from 'child_process'
import fs from 'fs'
import axios from 'axios'

let handler = async (m, { conn, text }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

    if (!text) {
        return m.reply(`${BORDER_TOP}\n❗ *Provide a YouTube title or link.*\n📝 Example: .ytmp4 blackpink\n${BORDER_BOTTOM}`)
    }

    try {
        // Search YouTube
        let search = await yts(text)
        let video = search.videos[0]
        let url = video.url
        let title = video.title

        // Caption
        let caption = `╭────❏ 𝙁𝙄𝙕𝘼 𝙑𝙄𝘿𝙀𝙊 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿
│🎞️ 𝙏𝙞𝙩𝙡𝙚: *${title}*
│📎 𝙇𝙞𝙣𝙠: ${url}
│📥 𝙌𝙪𝙖𝙡𝙞𝙩𝙮: 360p
╰─────────────⭑
💗 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝙁𝙄𝙕𝘼`

        // Get thumbnail
        let thumb = (await axios.get(video.thumbnail, { responseType: 'arraybuffer' })).data

        // Send wait message
        await conn.sendMessage(m.chat, {
            text: `⏳ *WAIT YOUR VIDEO IS COMING...*\n🎬 *${title}*`
        }, { quoted: m })

        // Download path
        let filePath = './temp_' + Date.now() + '.mp4'

        // yt-dlp command (360p)
        let command = `yt-dlp -f "bestvideo[height<=360]+bestaudio/best[height<=360]" --merge-output-format mp4 -o "${filePath}" "${url}"`

        exec(command, async (error) => {
            if (error || !fs.existsSync(filePath)) {
                console.error('ytmp4 error:', error)
                return conn.sendMessage(m.chat, {
                    text: `${BORDER_TOP}\n❌ *Failed to download. Try shorter video or lower quality.*\n${BORDER_BOTTOM}`
                }, { quoted: m })
            }

            // Check file size (max ~63MB)
            let fileSize = (fs.statSync(filePath).size / 1024) / 1024
            if (fileSize > 63) {
                fs.unlinkSync(filePath)
                return conn.sendMessage(m.chat, {
                    text: `❌ *File too large (${fileSize.toFixed(1)} MB). Try shorter video.*`
                }, { quoted: m })
            }

            // Send video
            await conn.sendMessage(m.chat, {
                video: { url: filePath },
                mimetype: 'video/mp4',
                caption: `${BORDER_TOP}\n${caption}\n${BORDER_BOTTOM}`,
                jpegThumbnail: thumb
            }, { quoted: m })

            // Clean up
            fs.unlinkSync(filePath)
        })

    } catch (e) {
        console.error('ytmp4 error:', e)
        return m.reply(`${BORDER_TOP}\n❌ *Unexpected error occurred while processing the video.*\n${BORDER_BOTTOM}`)
    }
}

handler.help = ['ytmp4', 'mp4']
handler.tags = ['downloader']
handler.command = ['ytmp4', 'mp4']

export default handler