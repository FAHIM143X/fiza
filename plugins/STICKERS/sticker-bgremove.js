// ═══════════════════════════════════════════════
// 🎀 FIZA — Remove Background Sticker
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (!mime) return m.reply(`📝 *Reply to an image!*\n\nExample: Reply to a photo with ${usedPrefix}${command}`)
    if (!/image\/(jpe?g|png|webp)/.test(mime)) return m.reply('❌ Send an image (JPG/PNG)!')

    m.reply('✂️ *Removing background...*')

    try {
        let img = await q.download()
        let base64 = img.toString('base64')

        // Remove background
        let res = await fetch('https://api.siputzx.my.id/api/tools/removebg', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64 })
        })
        let data = await res.json()

        if (data.status && (data.url || data.data)) {
            let resultUrl = data.url || data.data

            // Send as sticker
            await conn.sendMessage(m.chat, {
                sticker: { url: resultUrl },
                contextInfo: {
                    externalAdReply: {
                        title: '✂️ Background Removed',
                        body: 'FIZA Sticker Maker'
                    }
                }
            }, { quoted: m })
        } else {
            // Fallback: LolHuman API
            let uploadRes = await fetch('https://api.siputzx.my.id/api/tools/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64 })
            })
            let uploadData = await uploadRes.json()

            if (uploadData.status && uploadData.url) {
                let removeBgUrl = `https://api.lolhuman.xyz/api/removebg?apikey=GataDios&img=${encodeURIComponent(uploadData.url)}`
                
                await conn.sendMessage(m.chat, {
                    sticker: { url: removeBgUrl }
                }, { quoted: m })
            } else {
                m.reply('❌ Failed to remove background!')
            }
        }

    } catch {
        m.reply('❌ Failed! Try with a clearer image with a person/object in front.')
    }
}

handler.help = ['removebg', 'sremovebg', 'nobg']
handler.tags = ['sticker', 'tools']
handler.command = /^(removebg|sremovebg|nobg)$/i

export default handler