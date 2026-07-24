// ═══════════════════════════════════════════════
// 🎀 FIZA — Sticker Maker Plugin
// ═══════════════════════════════════════════════

import { sticker } from '../../lib/sticker.js'

let handler = async (m, { conn, args }) => {
    let botName = global.botname || 'FIZA'
    let packName = global.packname || botName
    let ownerName = global.author || 'FAHIM'

    // If replying to an image/video
    if (m.quoted) {
        let mime = m.quoted.mtype
        if (/image|video|webp/.test(mime)) {
            let media = await m.quoted.download()
            let stiker = await sticker(media, false, packName, ownerName)
            await conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m })
            return
        }
        return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n❌ *Reply to an image or video!*\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    }

    // If sending image/video with caption
    if (m.mtype === 'imageMessage' || m.mtype === 'videoMessage') {
        let media = await m.download()
        let stiker = await sticker(media, false, packName, ownerName)
        await conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m })
        return
    }

    // Help message
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
💫 *${botName} STICKER MAKER*
💗━━━━━━⊱💖⊰━━━━━━💗

📝 *How to use:*
⊱ Send image with caption .s
⊱ Reply to image with .s
⊱ Reply to video with .s

🧁 *${packName}*
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['sticker', 's', 'stiker']
handler.tags = ['tools', 'sticker']
handler.command = ['sticker', 's', 'stiker', 'stickergif', 'sgif']
handler.limit = 2

export default handler