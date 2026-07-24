// ═══════════════════════════════════════════════
// 🎀 FIZA — YouTube Search Plugin
// ═══════════════════════════════════════════════

import yts from 'yt-search'

let handler = async (m, { conn, text }) => {
    const BORDER_TOP = '｡ﾟ•┈୨💖୧┈•ﾟ｡'
    const BORDER_BOTTOM = '｡ﾟ•┈୨🌸୧┈•ﾟ｡'

    if (!text) {
        return m.reply(`${BORDER_TOP}
🔍 *Please provide a search query.*
📝 Example: .yts blackpink
${BORDER_BOTTOM}`)
    }

    try {
        let res = await yts(text)
        let videos = res.videos.slice(0, 5)

        if (!videos.length) {
            return m.reply(`${BORDER_TOP}\n❌ *No results found for "${text}"*\n${BORDER_BOTTOM}`)
        }

        let caption = `╔═━「 🔎 𝙔𝙊𝙐𝙏𝙐𝘽𝙀 𝙎𝙀𝘼𝙍𝘾𝙃 」━═╗
🔍 *Query:* ${text}

🎬 *Top Results:*

${videos.map((v, i) => 
    `*${i + 1}.* ${v.title}
⏱️ ${v.timestamp} | 👁️ ${v.views}
🔗 ${v.url}`
).join('\n\n')}

╚═━「 💋 FIZA 」━═╝`

        await conn.sendMessage(m.chat, {
            image: { url: videos[0].thumbnail },
            caption: caption
        }, { quoted: m })

    } catch (e) {
        console.error('YTS Error:', e)
        return m.reply(`${BORDER_TOP}\n❌ *Failed to fetch YouTube search results. Try again later.*\n${BORDER_BOTTOM}`)
    }
}

handler.help = ['yts', 'ytsearch']
handler.tags = ['search', 'downloader']
handler.command = ['yts', 'ytsearch']

export default handler