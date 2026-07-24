// ═══════════════════════════════════════════════
// 🎀 FIZA — Blackbox AI (Coding)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { text }) => {
    if (!text) return m.reply('📝 .code How to create a bot?')
    
    try {
        let res = await fetch(`https://api.siputzx.my.id/api/ai/blackbox?prompt=${encodeURIComponent(text)}`)
        let data = await res.json()
        
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 💻 *AI CODER* ──╮
│
│ ${(data.data || data.response || '').slice(0, 1000)}
│
╰── 🧁 Code by AI ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['blackbox', 'code', 'dev']
handler.tags = ['ai']
handler.command = ['code', 'blackbox', 'dev', 'program']
export default handler