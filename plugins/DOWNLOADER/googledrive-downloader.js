// ═══════════════════════════════════════════════
// 🎀 FIZA — Google Drive Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}gdrive <url>*\n\nExample: ${usedPrefix}gdrive https://drive.google.com/file/d/xxx/view`)

    if (!text.includes('drive.google.com')) return m.reply('❌ Please provide a valid Google Drive URL!')

    m.reply('📥 *Downloading from Google Drive...*')

    try {
        // Extract file ID
        let id = text.match(/\/?id=(.+)/i)?.[1] || text.match(/\/d\/(.*?)\//)?.[1]
        if (!id) return m.reply('❌ Invalid Google Drive URL!')

        // API 1: Direct download
        let res = await fetch(`https://api.siputzx.my.id/api/dl/gdrive?url=${encodeURIComponent(text)}`)
        let data = await res.json()

        if (data.status && data.data) {
            let file = data.data
            let info = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 📥 *GOOGLE DRIVE* ──╮
│ 📦 ${file.name || 'File'}
│ 📏 ${file.size || 'Unknown'}
│ 📋 ${file.mime || 'Unknown'}
│
│ 📥 Downloading...
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

            await m.reply(info)

            await conn.sendMessage(m.chat, {
                document: { url: file.url || file.download },
                fileName: file.name || 'download',
                mimetype: file.mime || 'application/octet-stream'
            }, { quoted: m })
            return
        }

        // API 2: Google Drive direct
        let directRes = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'User-Agent': 'Mozilla/5.0'
            }
        })

        let textData = await directRes.text()
        let jsonData = JSON.parse(textData.slice(4))

        if (jsonData.downloadUrl) {
            let downloadUrl = jsonData.downloadUrl
            let fileName = jsonData.fileName || 'download'
            let sizeBytes = jsonData.sizeBytes || 0
            let size = formatBytes(sizeBytes)

            await m.reply(`📥 *Downloading:* ${fileName}\n📏 ${size}`)

            await conn.sendMessage(m.chat, {
                document: { url: downloadUrl },
                fileName: fileName,
                mimetype: 'application/octet-stream'
            }, { quoted: m })
            return
        }

        m.reply('❌ Download limit reached! File may be too popular.')

    } catch {
        m.reply('❌ Failed to download!')
    }
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes'
    let k = 1024
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    let i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

handler.help = ['gdrive', 'googledrive', 'gd']
handler.tags = ['downloader']
handler.command = /^(gdrive|googledrive|gd)$/i

export default handler