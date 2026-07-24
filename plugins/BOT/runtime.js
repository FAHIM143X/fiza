// ═══════════════════════════════════════════════
// 🎀 FIZA — Runtime Plugin
// ═══════════════════════════════════════════════

let handler = async (m) => {
    let uptime = process.uptime()
    let d = Math.floor(uptime / 86400)
    let h = Math.floor((uptime % 86400) / 3600)
    let min = Math.floor((uptime % 3600) / 60)
    let s = Math.floor(uptime % 60)
    let botName = global.botname || 'FIZA'
    
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── ⏳ *RUNTIME* ──╮
│ 🤖 ${botName}
│ 📅 ${d} Days
│ ⏰ ${h} Hours
│ 🕐 ${min} Minutes
│ ⚡ ${s} Seconds
│ 💗 Running 24/7
╰── ✨ ${botName} ✨ ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['runtime', 'uptime']
handler.tags = ['main']
handler.command = ['runtime', 'uptime']
export default handler