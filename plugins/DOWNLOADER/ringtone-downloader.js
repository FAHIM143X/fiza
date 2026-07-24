// ═══════════════════════════════════════════════
// 🎀 FIZA — Ringtone Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}ringtone <name>*\n\nExample: ${usedPrefix}ringtone iphone`)

    m.reply('🔔 *Searching ringtone...*')

    try {
        // API 1: Meloboom
        let res = await fetch(`https://meloboom.com/es/search/${encodeURIComponent(text)}`)
        let html = await res.text()
        
        // Extract audio URLs
        let audios = html.match(/<audio[^>]+src="([^">]+)"/g)
        if (audios && audios.length > 0) {
            let urls = audios.map(a => a.match(/src="([^">]+)"/)[1])
            let titles = html.match(/<h4[^>]*>([^<]+)<\/h4>/g)
            let title = titles ? titles[0]?.replace(/<[^>]+>/g, '').trim() : text
            
            let audioUrl = urls[0]
            if (!audioUrl.startsWith('http')) audioUrl = 'https://meloboom.com' + audioUrl

            await conn.sendMessage(m.chat, {
                audio: { url: audioUrl },
                mimetype: 'audio/mpeg',
                fileName: `${title}.mp3`
            }, { quoted: m })

            return m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🔔 *RINGTONE* ──╮
│ 🎵 ${title}
│ 📥 Downloaded!
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
        }

        // API 2: Fallback
        let fallbackRes = await fetch(`https://api.siputzx.my.id/api/dl/ringtone?query=${encodeURIComponent(text)}`)
        let fallbackData = await fallbackRes.json()

        if (fallbackData.status && fallbackData.data?.url) {
            await conn.sendMessage(m.chat, {
                audio: { url: fallbackData.data.url },
                mimetype: 'audio/mpeg',
                fileName: `${text}.mp3`
            }, { quoted: m })
            return
        }

        m.reply('❌ No ringtone found!')

    } catch {
        m.reply('❌ Failed to download ringtone!')
    }
}

handler.help = ['ringtone', 'ringtunes', 'nada']
handler.tags = ['downloader']
handler.command = /^(ringtone|ringtunes|nada)$/i

export default handler