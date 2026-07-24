// ═══════════════════════════════════════════════
// 🎀 FIZA — Sticker Maker (Effects)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    let effects = ['jail', 'gay', 'glass', 'wasted', 'triggered', 'simpcard', 'horny', 'passed', 'comrade', 'blur', 'invert', 'pixelate', 'sepia', 'greyscale', 'rainbow', 'beautiful', 'facepalm']

    if (!text) {
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎨 *STICKER EFFECTS* ──╮
│
│ 📝 *Usage:*
│ ${usedPrefix}stickmaker <effect>
│ Reply to an image!
│
│ 📋 *Effects:*
${effects.map(e => `│ • ${e}`).join('\n')}
│
│ 💡 Example:
│ ${usedPrefix}stickmaker jail
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    }

    let effect = text.trim().toLowerCase()
    if (!effects.includes(effect)) {
        return m.reply(`❌ Effect not found!\n\nAvailable: ${effects.join(', ')}`)
    }

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''

    if (!mime) return m.reply('📝 *Reply to an image!*')
    if (!/image\/(jpe?g|png|webp)/.test(mime)) return m.reply('❌ Send an image (JPG/PNG)!')

    m.reply('🎨 *Creating sticker effect...*')

    try {
        // Download image
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
            // Get effect image
            let effectUrl = `https://some-random-api.com/canvas/${effect}?avatar=${encodeURIComponent(uploadData.url)}`
            
            // Send as sticker
            await conn.sendMessage(m.chat, {
                sticker: { url: effectUrl },
                contextInfo: {
                    externalAdReply: {
                        title: `🎨 ${effect} Effect`,
                        body: 'FIZA Sticker Maker'
                    }
                }
            }, { quoted: m })
        } else {
            // Fallback: Direct some-random-api
            let pp = uploadData.url || 'https://telegra.ph/file/24fa902ead26340f3df2c.png'
            let directUrl = `https://some-random-api.com/canvas/${effect}?avatar=${encodeURIComponent(pp)}`
            
            await conn.sendMessage(m.chat, {
                sticker: { url: directUrl }
            }, { quoted: m })
        }

    } catch {
        m.reply('❌ Failed to create sticker effect!')
    }
}

handler.help = ['stickmaker', 'stickermaker', 'cs', 'stickerfilter']
handler.tags = ['sticker', 'maker']
handler.command = /^(stickmaker|stickermaker|stickermarker|cs|stickerfilter)$/i

export default handler