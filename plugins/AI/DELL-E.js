// ═══════════════════════════════════════════════
// 🎀 FIZA — DALL-E Image Generator (Free)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('📝 .draw cute cat')
    
    try {
        let res = await fetch(`https://api.siputzx.my.id/api/ai/dalle?prompt=${encodeURIComponent(text)}`)
        let data = await res.json()
        
        await conn.sendMessage(m.chat, {
            image: { url: data.data || data.url || data.image },
            caption: `🎨 *AI Generated:* ${text}`
        }, { quoted: m })
    } catch {
        m.reply('❌ Failed to generate!')
    }
}

handler.help = ['draw', 'imagine', 'dalle']
handler.tags = ['ai']
handler.command = ['draw', 'imagine', 'dalle', 'aiimg']
export default handler