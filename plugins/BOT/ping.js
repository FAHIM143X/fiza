// ═══════════════════════════════════════════════
// 🏓 FIZA - Ping Plugin
// ═══════════════════════════════════════════════

import moment from 'moment-timezone'

let handler = async (m, { conn, prefix, botname }) => {
    const start = Date.now()
    
    // Send initial message
    let msg = await conn.sendMessage(m.chat, { 
        text: '💖 *Pinging...*' 
    }, { quoted: m })
    
    const end = Date.now()
    const speed = end - start
    
    const uptime = process.uptime()
    const hours = Math.floor(uptime / 3600)
    const minutes = Math.floor((uptime % 3600) / 60)
    const seconds = Math.floor(uptime % 60)
    
    const now = moment().tz('Asia/Kolkata')
    
    const pingText = `｡ﾟ•┈୨💖୧┈•ﾟ｡
🏓 *PONG!* ✨

💗━━━━━━⊱💖⊰━━━━━━💗

🍓 *Bot:* ${botname || 'FIZA'}
⚡ *Speed:* ${speed}ms
⏳ *Uptime:* ${hours}h ${minutes}m ${seconds}s
🕐 *Time:* ${now.format('HH:mm:ss')}
📆 *Date:* ${now.format('DD/MM/YYYY')}
💗 *Status:* Online & Cute!

💗━━━━━━⊱💖⊰━━━━━━💗

🧁 𝙈𝙖𝙙𝙚 𝙬𝙞𝙩𝙝 𝙡𝙤𝙫𝙚 𝙗𝙮 𝙁𝙄𝙕𝘼~
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

    await conn.sendMessage(m.chat, { 
        text: pingText,
        edit: msg.key 
    }, { quoted: m })
}

handler.help = ['ping', 'speed']
handler.tags = ['main']
handler.command = /^(ping|speed|pong)$/i
handler.limit = false
handler.register = false

export default handler