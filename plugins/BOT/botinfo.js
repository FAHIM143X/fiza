// ═══════════════════════════════════════════════
// 🎀 FIZA — Bot Info Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn }) => {
    let botName = global.botname || 'FIZA'
    let ownerName = global.author || 'FAHIM'
    let prefix = global.prefix?.[0] || global.botprefix || '.'
    let mode = global.opts?.self ? '🔒 Private' : '🌍 Public'
    let uptime = process.uptime()
    let h = Math.floor(uptime / 3600)
    let min = Math.floor((uptime % 3600) / 60)
    let s = Math.floor(uptime % 60)
    let ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
    let plugins = Object.keys(global.plugins || {}).length || '?'

    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🤖 *BOT INFO* ──╮
│ 🌸 Name: ${botName}
│ 👑 Owner: ${ownerName}
│ 📌 Prefix: ${prefix}
│ 🌍 Mode: ${mode}
│ ⏳ Uptime: ${h}h ${min}m ${s}s
│ 💾 RAM: ${ram} MB
│ 📦 Plugins: ${plugins}
│ 📡 Status: Online ✅
╰── ✨ ${botName} ✨ ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['botinfo', 'info', 'stats']
handler.tags = ['main']
handler.command = ['botinfo', 'info', 'stats', 'status']
export default handler