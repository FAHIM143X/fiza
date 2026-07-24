// ═══════════════════════════════════════════════
// 🎀 FIZA — SoundCloud Downloader
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}soundcloud <song name/url>*\n\nExample: ${usedPrefix}soundcloud faded alan walker`)

    m.reply('🔊 *Searching SoundCloud...*')

    try {
        // Search
        let searchRes = await fetch(`https://delirius-apiofc.vercel.app/search/soundcloud?q=${encodeURIComponent(text)}&limit=1`)
        let searchData = await searchRes.json()

        if (!searchData.status || !searchData.data?.[0]) return m.reply('❌ Song not found!')

        let track = searchData.data[0]

        // Download
        let dlRes = await fetch(`https://delirius-apiofc.vercel.app/download/soundcloud?url=${encodeURIComponent(track.link)}`)
        let dlData = await dlRes.json()

        if (!dlData.status || !dlData.data) return m.reply('❌ Failed to download!')

        let result = dlData.data

        // Send image
        let img = result.imageURL?.replace('t500x500', 't1080x1080') || result.imageURL
        if (img) {
            await conn.sendMessage(m.chat, {
                image: { url: img },
                caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🔊 *SOUNDCLOUD* ──╮
│ 🎶 ${result.title || 'Unknown'}
│ 👤 ${result.author?.username || 'Artist'}
│ 👥 ${result.author?.followers_count || 0} followers
│ ❤️ ${result.author?.likes_count || 0} likes
│ 🔗 ${track.link}
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
            }, { quoted: m })
        }

        // Send audio
        if (result.url) {
            await conn.sendMessage(m.chat, {
                audio: { url: result.url },
                mimetype: 'audio/mpeg',
                fileName: `${result.title || 'soundcloud'}.mp3`
            }, { quoted: m })
        } else {
            m.reply('❌ No audio link found!')
        }

    } catch (e) {
        console.log(e)
        // Fallback
        try {
            let res = await fetch(`https://api.siputzx.my.id/api/dl/soundcloud?url=${encodeURIComponent(text)}`)
            let data = await res.json()
            if (data.status && data.data?.url) {
                await conn.sendMessage(m.chat, {
                    audio: { url: data.data.url },
                    mimetype: 'audio/mpeg',
                    fileName: `${data.data.title || 'soundcloud'}.mp3`
                }, { quoted: m })
                return
            }
        } catch {}
        m.reply('❌ Failed to download!')
    }
}

handler.help = ['soundcloud', 'scdl', 'soundclouddl']
handler.tags = ['downloader']
handler.command = /^(soundcloud|scdl|soundclouddl|sc)$/i

export default handler