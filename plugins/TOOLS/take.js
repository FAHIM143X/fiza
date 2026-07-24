// ═══════════════════════════════════════════════
// 🎀 FIZA — Take Plugin (with lib/sticker.js)
// ═══════════════════════════════════════════════

import { sticker } from '../../lib/sticker.js'

let handler = async (m, { conn, text }) => {
    let packName = global.packname || global.botname || 'FIZA'
    let authorName = global.author || global.stkowner || 'FAHIM'

    // If user provides custom name: .take packname|author
    if (text) {
        let parts = text.split('|')
        packName = parts[0]?.trim() || packName
        authorName = parts[1]?.trim() || authorName
    }

    // If replying to an image/video/sticker
    if (m.quoted) {
        let mime = m.quoted.mtype
        if (/image|video|sticker/.test(mime)) {
            let media = await m.quoted.download()
            let stiker = await sticker(media, false, packName, authorName)
            await conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m })
            return
        }
    }

    // If sending image with caption
    if (m.mtype === 'imageMessage' || m.mtype === 'videoMessage') {
        let media = await m.download()
        let stiker = await sticker(media, false, packName, authorName)
        await conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m })
        return
    }

    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
💫 *TAKE STICKER*
💗━━━━━━⊱💖⊰━━━━━━💗

📝 Reply to image/video with .take
📝 .take PackName|AuthorName
📝 .take FIZA|FAHIM

📦 Default: ${packName} | ${authorName}
🧁 ${global.botname || 'FIZA'}
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['take', 'wm']
handler.tags = ['sticker']
handler.command = ['take', 'wm', 'takewm']

export default handler