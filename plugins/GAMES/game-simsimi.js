// ═══════════════════════════════════════════════
// 🎀 FIZA — SimSimi Chat Bot Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`📝 *.simi Hello!*`)

    try {
        let res = await fetch(`https://api.siputzx.my.id/api/ai/simisimi?text=${encodeURIComponent(text)}`)
        let data = await res.json()
        
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🤖 *SIMI CHAT* ──╮
│
│ ${data.data || data.response || 'Hmm?'}
│
╰── 🧁 FIZA ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        try {
            let res = await fetch(`https://delirius-apiofc.vercel.app/tools/simi?text=${encodeURIComponent(text)}`)
            let data = await res.json()
            m.reply(`🤖 ${data.data?.message || 'Hello!'}`)
        } catch {
            m.reply('🤖 Simi is sleeping... Zzz')
        }
    }
}

handler.help = ['simi', 'bot', 'chat']
handler.tags = ['fun', 'ai']
handler.command = /^(simi|bot|alexa|cortana)$/i

export default handler