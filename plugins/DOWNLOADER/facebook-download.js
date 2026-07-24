// ═══════════════════════════════════════════════
// 🎀 FIZA — Facebook Video Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}fb <url>*\n\nExample: ${usedPrefix}fb https://www.facebook.com/share/v/xxx/`)

    if (!text.includes('facebook.com') && !text.includes('fb.com') && !text.includes('fb.watch')) {
        return m.reply('❌ Please provide a valid Facebook URL!')
    }

    m.reply('📘 *Downloading from Facebook...*')

    try {
        // API 1: siputzx
        let res = await fetch(`https://api.siputzx.my.id/api/dl/facebook?url=${encodeURIComponent(text)}`)
        let data = await res.json()

        if (data.status && data.data) {
            let video = data.data
            
            if (video.url || video.download || video.video) {
                let videoUrl = video.url || video.download || video.video

                // Send video
                if (videoUrl) {
                    await conn.sendMessage(m.chat, {
                        video: { url: videoUrl },
                        caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 📘 *FACEBOOK* ──╮
│ 👤 ${video.author || video.owner || 'User'}
│ 💬 ${(video.title || video.caption || '').slice(0, 100)}
│ 👁️ ${video.views || 'N/A'} views
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
                    }, { quoted: m })
                    return
                }
            }

            // If images
            if (video.images || video.photos) {
                let images = video.images || video.photos || []
                for (let img of images) {
                    await conn.sendMessage(m.chat, {
                        image: { url: img.url || img },
                        caption: '📘 Facebook Photo'
                    }, { quoted: m })
                }
                return
            }
        }

        // API 2: Delirius
        let res2 = await fetch(`https://delirius-apiofc.vercel.app/download/facebook?url=${encodeURIComponent(text)}`)
        let data2 = await res2.json()

        if (data2.status && data2.data) {
            let media = data2.data
            let urls = Array.isArray(media) ? media : [media]

            for (let item of urls) {
                let type = item.type === 'video' ? 'video' : 'image'
                let url = item.url || item.download || item

                if (typeof url === 'string' && url.startsWith('http')) {
                    await conn.sendMessage(m.chat, {
                        [type]: { url },
                        caption: `📘 *Facebook*\n🧁 FIZA Downloader`
                    }, { quoted: m })
                }
            }
            return
        }

        // API 3: InstaTikTok fallback
        let res3 = await fetch(`https://instatiktok.com/api`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `url=${encodeURIComponent(text)}&platform=facebook&siteurl=https://instatiktok.com/`
        })
        let html = await res3.text()
        
        // Extract video URL
        let videoMatch = html.match(/href="(https:\/\/[^"]*\.(?:mp4|mov)[^"]*)"/)
        if (videoMatch) {
            await conn.sendMessage(m.chat, {
                video: { url: videoMatch[1] },
                caption: '📘 *Facebook Video*\n🧁 FIZA'
            }, { quoted: m })
            return
        }

        m.reply('❌ Failed to download! This may be a private video.')

    } catch {
        m.reply('❌ Download failed!')
    }
}

handler.help = ['fb', 'facebook', 'fbdl', 'facebookdl']
handler.tags = ['downloader']
handler.command = /^(fb|facebook|fbdl|facebookdl)$/i

export default handler