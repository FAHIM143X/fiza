// ═══════════════════════════════════════════════
// 🎀 FIZA — Meme Plugin (API)
// ═══════════════════════════════════════════════

let handler = async (m, { conn }) => {
    try {
        let res = await fetch('https://meme-api.com/gimme')
        let data = await res.json()
        await conn.sendMessage(m.chat, {
            image: { url: data.url },
            caption: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🤣 *MEME* ──╮
│ 😂 ${data.title}
│ 📌 r/${data.subreddit}
│ ⬆️ ${data.ups} upvotes
╰── 🧁 Epic meme! ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
        }, { quoted: m })
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['meme']; handler.tags = ['fun']; handler.command = ['meme', 'memes']
export default handler