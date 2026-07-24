// ═══════════════════════════════════════════════
// 🎀 FIZA — AI Image to Text (OCR)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    let q = m.quoted ? m.quoted : m
    let mime = q.mtype || ''
    
    if (!/image/.test(mime)) return m.reply('📝 Reply to an image!')
    
    let img = await q.download()
    let base64 = img.toString('base64')
    
    try {
        let res = await fetch('https://api.siputzx.my.id/api/ai/ocr', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64 })
        })
        let data = await res.json()
        
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 👁️ *OCR RESULT* ──╮
│
│ ${data.data || data.text || 'No text found'}
│
╰── 🧁 AI Vision ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['ocr', 'readimg']
handler.tags = ['ai']
handler.command = ['ocr', 'readimg']
export default handler