// ═══════════════════════════════════════════════
// 🎀 FIZA — Sticker Pack Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}stickerpack <url>*\n\nExample: ${usedPrefix}stickerpack https://getstickerpack.com/stickers/flork-memes`)

    m.reply('💫 *Downloading sticker pack...*')

    try {
        let res = await fetch(`https://api.akuari.my.id/downloader/stickerpack?link=${encodeURIComponent(text)}`)
        let data = await res.json()
        let stickers = data.result || data

        if (!stickers || stickers.length === 0) return m.reply('❌ No stickers found!')

        let count = 0
        for (let url of stickers) {
            await conn.sendMessage(m.chat, {
                sticker: { url },
                contextInfo: {
                    forwardingScore: 200,
                    isForwarded: true
                }
            }, { quoted: m })
            count++
            await new Promise(r => setTimeout(r, 1000)) // Delay to avoid spam
        }

        await m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 💫 *STICKER PACK* ──╮
│ ✅ Downloaded!
│ 📦 ${count} stickers
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)

    } catch {
        m.reply('❌ Failed to download sticker pack!')
    }
}

handler.help = ['stickerpack', 'stickerspack', 'spack']
handler.tags = ['downloader', 'sticker']
handler.command = /^(stickerpack|stickerspack|spack)$/i

export default handler