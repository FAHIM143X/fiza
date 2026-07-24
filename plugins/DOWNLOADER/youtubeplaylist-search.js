// ═══════════════════════════════════════════════
// 🎀 FIZA — YouTube Playlist Search
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) return m.reply(`📝 *${usedPrefix}playlist <name>*\n\nExample: ${usedPrefix}playlist lofi hip hop`)

    m.reply('🔍 *Searching YouTube...*')

    try {
        // Search YouTube
        let res = await fetch(`https://api.siputzx.my.id/api/search/youtube?query=${encodeURIComponent(text)}`)
        let data = await res.json()

        if (!data.status || !data.data || data.data.length === 0) {
            return m.reply('❌ No results found!')
        }

        // Store results for later use
        if (!global.ytSearch) global.ytSearch = {}
        global.ytSearch[m.sender] = {
            videos: data.data,
            timeout: setTimeout(() => delete global.ytSearch[m.sender], 300000)
        }

        let results = data.data.slice(0, 10)
        let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎵 *YOUTUBE SEARCH* ──╮
│ 🔍 ${text}
│ 📋 ${results.length} results
│
${results.map((v, i) => `│ *${i+1}.* ${(v.title || v.name).slice(0, 40)}...\n│ ⏱️ ${v.duration || v.timestamp || 'N/A'} | 👁️ ${v.views || 'N/A'}\n│`).join('\n')}
│
│ 📝 *Reply with number:* 1-${results.length}
│ 🎵 ${usedPrefix}play <number>
│ 🎥 ${usedPrefix}video <number>
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

        // Send thumbnail
        let thumb = data.data[0]?.thumbnail || data.data[0]?.thumb
        if (thumb) {
            await conn.sendMessage(m.chat, {
                image: { url: thumb },
                caption: txt
            }, { quoted: m })
        } else {
            m.reply(txt)
        }

    } catch {
        m.reply('❌ Search failed!')
    }
}

handler.help = ['playlist', 'yts', 'ytsearch']
handler.tags = ['search', 'downloader']
handler.command = /^(playlist|yts|ytsearch|ytfind)$/i

export default handler