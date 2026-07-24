// ═══════════════════════════════════════════════
// 🎀 FIZA — Image Enhancer (HD/Remini)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let handler = async (m, { conn, usedPrefix, command }) => {

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (!mime) return m.reply(`📝 *Reply to an image!*\n\nExample: Reply to a photo with ${usedPrefix}${command}`)
    if (!/image\/(jpe?g|png|webp)/.test(mime)) return m.reply(`❌ Format not supported! (${mime})\nSend JPG or PNG.`)

    m.reply('✨ *Enhancing image...*')

    try {
        // Download image
        let img = await q.download()
        let base64 = img.toString('base64')

        // API 1: Stellar upscale
        let tempDir = path.join(__dirname, '../../tmp')
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })
        let tempPath = path.join(tempDir, `enhance_${Date.now()}.jpg`)
        fs.writeFileSync(tempPath, img)

        // Upload to get URL
        let uploadRes = await fetch('https://api.siputzx.my.id/api/tools/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64 })
        })
        let uploadData = await uploadRes.json()

        if (uploadData.status && uploadData.url) {
            // Enhance
            let enhanceRes = await fetch(`https://api.stellarwa.xyz/tools/upscale?url=${encodeURIComponent(uploadData.url)}&key=BrunoSobrino`)
            let buffer = await enhanceRes.buffer()

            await conn.sendMessage(m.chat, {
                image: buffer,
                caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── ✨ *ENHANCED!* ──╮
│ 🖼️ Image enhanced!
│ 📐 HD Quality
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
            }, { quoted: m })
        } else {
            // Fallback: Simple remini
            let reminiRes = await fetch(`https://api.siputzx.my.id/api/tools/remini?url=${encodeURIComponent('https://example.com/test.jpg')}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64 })
            })
            let reminiData = await reminiRes.json()

            if (reminiData.status && reminiData.url) {
                await conn.sendMessage(m.chat, {
                    image: { url: reminiData.url },
                    caption: `✨ *Enhanced!*\n🧁 FIZA Remini`
                }, { quoted: m })
            } else {
                m.reply('❌ Enhancement failed!')
            }
        }

        // Clean up
        try { fs.unlinkSync(tempPath) } catch {}

    } catch (e) {
        console.log(e)
        m.reply('❌ Failed to enhance image!')
    }
}

handler.help = ['remini', 'hd', 'enhance', 'enhancer']
handler.tags = ['tools', 'ai']
handler.command = /^(remini|hd|enhance|enhancer)$/i

export default handler