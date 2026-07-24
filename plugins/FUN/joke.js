// ═══════════════════════════════════════════════
// 🎀 FIZA — Joke Plugin (API)
// ═══════════════════════════════════════════════

let handler = async (m) => {
    try {
        let res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single')
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🤣 *JOKE TIME* ──╮
│
│ ${data.joke}
│
│ 😂😂😂😂😂
╰── 🧁 Laugh more! ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed to fetch joke!')
    }
}

handler.help = ['joke']; handler.tags = ['fun']; handler.command = ['joke', 'jokes']
export default handler