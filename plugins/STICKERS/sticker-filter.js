// ═══════════════════════════════════════════════
// 🎀 FIZA — Sticker Filter (Color Effects)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    let effects = ['greyscale', 'invert', 'brightness', 'threshold', 'sepia', 'red', 'green', 'blue', 'blurple', 'pixelate', 'blur']

    if (!text) {
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎨 *STICKER FILTERS* ──╮
│
│ 📝 *Usage:*
│ ${usedPrefix}stickerfilter <filter>
│ Reply to an image!
│
│ 📋 *Filters:*
${effects.map(e => `│ • ${e}`).join('\n')}
│
│ 💡 Example:
│ ${usedPrefix}stickerfilter greyscale
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    }

    let effect = text.trim().toLowerCase()
    if (!effects.includes(effect)) {
        return m.reply(`❌ Filter not found!\n\nAvailable: ${effects.join(', ')}`)
    }

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''

    if (!mime) return m.reply('📝 *Reply to an image!*')
    if (!/image\/(jpe?g|png|webp)/.test(mime)) return m.reply('❌ Send an image (JPG/PNG)!')

    m.reply('🎨 *Applying filter...*')

    try {
        let img = await q.download()
        let base64 = img.toString('base64')

        // Upload to get URL
        let uploadRes = await fetch('https://api.siputzx.my.id/api/tools/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64 })
        })
        let uploadData = await uploadRes.json()

        if (uploadData.status && uploadData.url) {
            let filterUrl = `https://some-random-api.com/canvas/${effect}?avatar=${encodeURIComponent(uploadData.url)}`

            await conn.sendMessage(m.chat, {
                sticker: { url: filterUrl }
            }, { quoted: m })

            await m.reply(`✅ *Filter: ${effect} applied!*\n🧁 FIZA Sticker Filter`)
        } else {
            // Direct fallback
            let pp = 'https://telegra.ph/file/24fa902ead26340f3df2c.png'
            let directUrl = `https://some-random-api.com/canvas/${effect}?avatar=${encodeURIComponent(pp)}`
            await conn.sendMessage(m.chat, { sticker: { url: directUrl } }, { quoted: m })
        }

    } catch {
        m.reply('❌ Failed to apply filter!')
    }
}

handler.help = ['stickerfilter', 'stikerfilter', 'cs2', 'sfilter']
handler.tags = ['sticker', 'maker']
handler.command = /^(stickerfilter|stikerfilter|cs2|sfilter)$/i

export default handler