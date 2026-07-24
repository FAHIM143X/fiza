// ═══════════════════════════════════════════════
// 🎀 FIZA — Music Recognition (Shazam)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let handler = async (m, { conn, usedPrefix, command }) => {

    let q = m.quoted || m
    let mime = (q.msg || q).mimetype || ''

    if (!/audio|video/.test(mime)) {
        return m.reply(`📝 *Reply to an audio/video!*\n\nExample: Reply to a voice note with ${usedPrefix}${command}`)
    }

    m.reply('🎵 *Identifying music...*')

    try {
        // Download media
        let media = await q.download()
        let ext = mime.split('/')[1] || 'mp3'
        let tempDir = path.join(__dirname, '../../tmp')
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })
        let tempPath = path.join(tempDir, `shazam_${Date.now()}.${ext}`)
        fs.writeFileSync(tempPath, media)

        // Recognize using Shazam API
        let base64 = media.toString('base64')
        let res = await fetch('https://api.siputzx.my.id/api/tools/shazam', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ audio: base64 })
        })
        let data = await res.json()

        if (data.status && data.data) {
            let track = data.data
            let title = track.title || track.name || 'Unknown'
            let artist = track.artist || track.subtitle || 'Unknown'
            let genre = track.genre || 'Unknown'
            let cover = track.cover || track.image || track.thumbnail

            let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎵 *MUSIC FOUND!* ──╮
│ 🎶 *Title:* ${title}
│ 👤 *Artist:* ${artist}
│ 🎼 *Genre:* ${genre}
╰── 🧁 FIZA Shazam ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

            if (cover) {
                await conn.sendMessage(m.chat, {
                    image: { url: cover },
                    caption: txt
                }, { quoted: m })
            } else {
                m.reply(txt)
            }

            // Search on YouTube
            try {
                let ytRes = await fetch(`https://api.siputzx.my.id/api/search/youtube?query=${encodeURIComponent(title + ' ' + artist)}`)
                let ytData = await ytRes.json()
                if (ytData.status && ytData.data?.[0]?.url) {
                    let ytUrl = ytData.data[0].url
                    
                    // Download audio
                    let dlRes = await fetch(`https://api.siputzx.my.id/api/dl/youtubemp3?url=${encodeURIComponent(ytUrl)}`)
                    let dlData = await dlRes.json()
                    
                    if (dlData.status && dlData.data?.url) {
                        await conn.sendMessage(m.chat, {
                            audio: { url: dlData.data.url },
                            mimetype: 'audio/mpeg',
                            fileName: `${title}.mp3`
                        }, { quoted: m })
                    }
                }
            } catch {}

        } else {
            m.reply('❌ Could not identify this music!')
        }

        // Clean up
        try { fs.unlinkSync(tempPath) } catch {}

    } catch {
        m.reply('❌ Failed to identify! Try with clearer audio.')
    }
}

handler.help = ['whatmusic', 'shazam', 'quemusica', 'findmusic']
handler.tags = ['tools']
handler.command = /^(whatmusic|shazam|quemusica|quemusicaes|findmusic)$/i

export default handler