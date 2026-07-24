// ═══════════════════════════════════════════════
// 🎀 FIZA — MediaFire Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}mediafire <url>*\n\nExample: ${usedPrefix}mediafire https://www.mediafire.com/file/xxx/file.zip`)

    if (!text.includes('mediafire.com')) return m.reply('❌ Please provide a valid MediaFire URL!')

    m.reply('📥 *Downloading from MediaFire...*')

    try {
        // API 1
        let res = await fetch(`https://api.siputzx.my.id/api/dl/mediafire?url=${encodeURIComponent(text)}`)
        let data = await res.json()

        if (data.status && data.data) {
            let file = data.data
            let info = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 📥 *MEDIAFIRE* ──╮
│ 📦 ${file.name || 'File'}
│ 📏 ${file.size || 'Unknown'}
│ 📅 ${file.date || 'Unknown'}
│ 📋 ${file.mime || 'Unknown'}
│
│ 📥 Downloading...
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

            await m.reply(info)

            await conn.sendMessage(m.chat, {
                document: { url: file.url || file.link },
                fileName: file.name || 'download',
                mimetype: file.mime || 'application/octet-stream'
            }, { quoted: m })

            return
        }

        // API 2: Fallback
        let res2 = await fetch(`https://delirius-apiofc.vercel.app/download/mediafire?url=${encodeURIComponent(text)}`)
        let data2 = await res2.json()

        if (data2.status && data2.data) {
            let file = data2.data
            await m.reply(`📥 *MediaFire:* ${file.name || 'File'}`)
            await conn.sendMessage(m.chat, {
                document: { url: file.url || file.link },
                fileName: file.name || 'download',
                mimetype: file.mime || 'application/octet-stream'
            }, { quoted: m })
            return
        }

        m.reply('❌ Failed to download! Link may be invalid.')

    } catch {
        m.reply('❌ Download failed!')
    }
}

handler.help = ['mediafire', 'mf', 'mediafiredl']
handler.tags = ['downloader']
handler.command = /^(mediafire|mf|mediafiredl)$/i

export default handler