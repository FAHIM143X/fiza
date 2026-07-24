// ═══════════════════════════════════════════════
// 🎀 FIZA — Instagram Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}ig <url>*\n\nExample: ${usedPrefix}ig https://www.instagram.com/reel/xxx/`)

    if (!text.includes('instagram.com')) return m.reply('❌ Please provide a valid Instagram URL!')

    m.reply('📸 *Downloading from Instagram...*')

    try {
        // API 1: siputzx
        let res = await fetch(`https://api.siputzx.my.id/api/dl/instagram?url=${encodeURIComponent(text)}`)
        let data = await res.json()

        if (data.status && data.data) {
            let media = Array.isArray(data.data) ? data.data : data.data.media || [data.data]
            
            for (let item of media) {
                let type = item.type === 'video' ? 'video' : 'image'
                let url = item.url || item.download || item
                
                if (typeof url === 'string' && url.startsWith('http')) {
                    await conn.sendMessage(m.chat, {
                        [type]: { url },
                        caption: type === 'video' ? '📸 Instagram Video' : '📸 Instagram Photo'
                    }, { quoted: m })
                }
            }
            
            if (media.length > 0) return
        }

        // API 2: Delirius
        let res2 = await fetch(`https://delirius-apiofc.vercel.app/download/instagram?url=${encodeURIComponent(text)}`)
        let data2 = await res2.json()

        if (data2.status && data2.data) {
            let media = Array.isArray(data2.data) ? data2.data : [data2.data]
            
            for (let item of media) {
                let type = item.type === 'video' ? 'video' : 'image'
                let url = item.url || item.download || item
                
                if (typeof url === 'string' && url.startsWith('http')) {
                    await conn.sendMessage(m.chat, {
                        [type]: { url },
                        caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 📸 *INSTAGRAM* ──╮
│ 👤 ${data2.data.username || data2.data.owner || 'User'}
│ 💬 ${(data2.data.caption || '').slice(0, 100)}
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
                    }, { quoted: m })
                }
            }
            return
        }

        m.reply('❌ Failed to download!')

    } catch {
        m.reply('❌ Download failed! Try another URL.')
    }
}

handler.help = ['ig', 'instagram', 'igdl', 'instadl']
handler.tags = ['downloader']
handler.command = /^(ig|instagram|igdl|instadl|instagramdl)$/i

export default handler