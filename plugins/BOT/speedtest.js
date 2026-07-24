// ═══════════════════════════════════════════════
// 🎀 FIZA — Speed Test Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn }) => {
    let start = Date.now()
    let msg = await m.reply('⚡ *Testing speed...*')
    let speed = Date.now() - start
    let botName = global.botname || 'FIZA'
    
    let quality = speed < 50 ? '🚀 Excellent' : speed < 100 ? '⚡ Very Good' : speed < 200 ? '👍 Good' : speed < 500 ? '🐢 Slow' : '💤 Very Slow'
    
    conn.sendMessage(m.chat, {
        text: `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── ⚡ *SPEED TEST* ──╮
│ 🤖 Bot: ${botName}
│ ⏱️ Speed: ${speed}ms
│ 📊 Rating: ${quality}
│ 💗 Status: Online
╰── ✨ ${botName} ✨ ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`,
        edit: msg.key
    })
}

handler.help = ['speedtest', 'speed']
handler.tags = ['main']
handler.command = ['speedtest', 'speed', 'ping2']
export default handler