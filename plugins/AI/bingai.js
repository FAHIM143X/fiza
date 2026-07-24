// ═══════════════════════════════════════════════
// 🎀 FIZA — Bing AI Chat
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { text }) => {
    if (!text) return m.reply('📝 .bing Hello!')
    
    try {
        let res = await fetch(`https://api.siputzx.my.id/api/ai/bing?text=${encodeURIComponent(text)}`)
        let data = await res.json()
        
        m.reply(`🤖 *Bing AI:* ${data.data || data.response || 'No response'}`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['bing']
handler.tags = ['ai']
handler.command = ['bing', 'bingai']
export default handler