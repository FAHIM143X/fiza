// ═══════════════════════════════════════════════
// 🎀 FIZA — Google Image Search
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}image <search>*\n\nExample: ${usedPrefix}image cute cat`)

    m.reply('🔍 *Searching images...*')

    try {
        // API 1: Delirius
        let res = await fetch(`https://delirius-apiofc.vercel.app/search/gimage?query=${encodeURIComponent(text)}`)
        let data = await res.json()

        if (data.status && data.data?.length > 0) {
            let images = data.data.filter(img => {
                let url = img.url?.toLowerCase() || ''
                return url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.webp')
            })

            if (images.length === 0) {
                images = data.data.slice(0, 10)
            }

            let img = images[Math.floor(Math.random() * images.length)]

            await conn.sendMessage(m.chat, {
                image: { url: img.url },
                caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🖼️ *IMAGE SEARCH* ──╮
│ 🔍 ${text}
│ 📸 Source: ${img.origin?.website?.url || img.source || 'Google'}
│ 📐 ${img.resolution || img.width + 'x' + img.height || 'Unknown'}
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`,
                contextInfo: {
                    externalAdReply: {
                        title: `🖼️ ${text}`,
                        body: 'FIZA Image Search',
                        thumbnail: await (await fetch(img.url)).buffer(),
                        mediaType: 1
                    }
                }
            }, { quoted: m })
            return
        }

        // API 2: Fallback
        let fallback = `https://api.siputzx.my.id/api/search/image?query=${encodeURIComponent(text)}`
        let res2 = await fetch(fallback)
        let data2 = await res2.json()

        if (data2.status && data2.data) {
            let img = Array.isArray(data2.data) ? data2.data[0] : data2.data
            let url = img.url || img.image || img

            if (url && typeof url === 'string' && url.startsWith('http')) {
                await conn.sendMessage(m.chat, {
                    image: { url },
                    caption: `🖼️ *${text}*\n🧁 FIZA Image Search`
                }, { quoted: m })
                return
            }
        }

        m.reply('❌ No images found!')

    } catch {
        // Picsum fallback
        await conn.sendMessage(m.chat, {
            image: { url: `https://picsum.photos/800/800?random=${Math.floor(Math.random() * 100)}` },
            caption: `🖼️ *${text}*\n🧁 FIZA (Random)`
        }, { quoted: m })
    }
}

handler.help = ['image', 'gimage', 'img', 'imagen']
handler.tags = ['search', 'tools']
handler.command = /^(image|gimage|img|imagen)$/i

export default handler