// ═══════════════════════════════════════════════
// 🎀 FIZA — YouTube Audio Player
// ═══════════════════════════════════════════════

import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'
import yts from 'yt-search'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const TEMP = path.join(__dirname, '../../temp')

if (!fs.existsSync(TEMP)) fs.mkdirSync(TEMP, { recursive: true })

const getThumb = async (id) => {
    for (const q of ['maxresdefault', 'hqdefault', 'mqdefault']) {
        try {
            const r = await axios.get(`https://img.youtube.com/vi/${id}/${q}.jpg`, {
                responseType: 'arraybuffer', timeout: 5000
            })
            const b = Buffer.from(r.data)
            if (b.length > 5000) return b
        } catch {}
    }
    return null
}

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}play <song name>*\n\nExample: ${usedPrefix}play faded alan walker`)

    let query = text.trim()

    try {
        let search = await yts(query)
        let video = search?.videos?.[0]
        if (!video) return m.reply('❌ No results found!')

        let thumb = await getThumb(video.videoId)

        // Download audio
        let out = path.join(TEMP, `play_${Date.now()}.mp3`)
        let cmd = `yt-dlp -f bestaudio --extract-audio --audio-format mp3 --audio-quality 128K -o "${out}" "${video.url}" --no-playlist --force-ipv4 --socket-timeout 30 --no-warnings -q`

        exec(cmd, async (err) => {
            if (err || !fs.existsSync(out)) {
                return m.reply('❌ Download failed!\n📝 Install yt-dlp: pkg install yt-dlp')
            }

            let size = fs.statSync(out).size
            if (size > 100 * 1024 * 1024) {
                fs.unlinkSync(out)
                return m.reply('❌ File too large!')
            }

            // Send audio directly with externalAdReply
            await conn.sendMessage(m.chat, {
                audio: fs.readFileSync(out),
                mimetype: 'audio/mpeg',
                ptt: false,
                fileName: `${video.title}.mp3`,
                contextInfo: {
                    externalAdReply: {
                        title: `🎧 ${video.title}`,
                        body: `${video.author?.name || 'YouTube'} • ${video.timestamp}`,
                        thumbnail: thumb || undefined,
                        mediaType: 2,
                        renderLargerThumbnail: false,
                        showAdAttribution: false,
                        sourceUrl: video.url,
                        mediaUrl: video.url,
                    }
                }
            }, { quoted: m })

            try { fs.unlinkSync(out) } catch {}
        })

    } catch (e) {
        console.log(e)
        m.reply('❌ Failed!')
    }
}

handler.help = ['play', 'song', 'music', 'mp3']
handler.tags = ['downloader']
handler.command = ['play2', 'song2', 'music2']

export default handler