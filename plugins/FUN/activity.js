// ═══════════════════════════════════════════════
// 🎀 FIZA — Activity Plugin (API)
// ═══════════════════════════════════════════════

let handler = async (m) => {
    try {
        let res = await fetch('https://www.boredapi.com/api/activity')
        let data = await res.json()
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🎯 *BORED?* ──╮
│
│ 🌟 ${data.activity}
│
│ 👥 Participants: ${data.participants}
│ 💰 Cost: ${data.price === 0 ? 'Free!' : '$'}
╰── 🧁 Try it! ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['activity', 'bored']; handler.tags = ['fun']; handler.command = ['activity', 'bored']
export default handler