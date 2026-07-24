// ═══════════════════════════════════════════════
// 🎀 FIZA — TikTok Image/Slideshow Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}ttimg <tiktok_url>*\n\nExample: ${usedPrefix}ttimg https://vm.tiktok.com/xxx/`)

    if (!text.includes('tiktok.com')) return m.reply('❌ Please provide a valid TikTok URL!')

    m.reply('🖼️ *Downloading TikTok images...*')

    try {
        // API for TikTok images
        let res = await fetch(`https://api.siputzx.my.id/api/dl/tiktok?url=${encodeURIComponent(text)}`)
        let data = await res.json()

        if (data.status && data.data) {
            let images = data.data.images || data.data.media || []
            
            if (images.length === 0) return m.reply('❌ No images found! This might be a video.')

            for (let i = 0; i < images.length; i++) {
                let img = images[i]
                await conn.sendMessage(m.chat, {
                    image: { url: img.url || img },
                    caption: i === 0 ? `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 📸 *TIKTOK SLIDESHOW* ──╮
│ 🖼️ Image ${i + 1}/${images.length}
│ 👤 ${data.data.author || 'Unknown'}
│ 💬 ${(data.data.title || '').slice(0, 100)}
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡` : `📸 Image ${i + 1}/${images.length}`
                }, { quoted: m })
            }
            return
        }

        // Fallback: dlpanda
        let res2 = await fetch(`https://dlpanda.com/es?url=${encodeURIComponent(text)}&token=G7eRpMaa`)
        let html = await res2.text()
        let imgs = html.match(/<img[^>]+src="([^">]+)"/g)
        
        if (imgs) {
            let urls = imgs.map(img => img.match(/src="([^">]+)"/)[1]).filter(url => url.includes('tiktok'))
            for (let url of urls) {
                await conn.sendMessage(m.chat, {
                    image: { url },
                    caption: `📸 *TikTok Image*\n🧁 FIZA`
                }, { quoted: m })
            }
        } else {
            m.reply('❌ No images found!')
        }

    } catch {
        m.reply('❌ Failed to download!')
    }
}

handler.help = ['ttimg', 'tiktokimg', 'tiktokslide']
handler.tags = ['downloader']
handler.command = /^(ttimg|tiktokimg|tiktokslide|ttslide)$/i

export default handler