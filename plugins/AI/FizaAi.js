// ═══════════════════════════════════════════════
// 🎀 FIZA — AI Character Chat
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { text, command }) => {
    if (!text) return m.reply(`📝 .${command} Hello!`)
    
    let characters = {
        'fiza': 'You are FIZA, a cute and friendly WhatsApp bot. Respond in a cute kawaii style.',
        'cat': 'You are a cute cat. Respond like a cat with meows.',
        'dog': 'You are a friendly dog. Respond like a dog.',
        'sensei': 'You are a wise Japanese sensei. Give advice in a wise tone.',
        'gf': 'You are a loving girlfriend. Respond with love and care.',
    }
    
    let char = characters[command] || characters['fiza']
    
    try {
        let res = await fetch(`https://api.siputzx.my.id/api/ai/gpt4?prompt=${encodeURIComponent(char + ': ' + text)}`)
        let data = await res.json()
        
        m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡
${command === 'fiza' ? '🎀 *FIZA:*' : command === 'cat' ? '🐱 *Cat:*' : command === 'dog' ? '🐕 *Dog:*' : command === 'sensei' ? '🎌 *Sensei:*' : '💖 *GF:*'}
${data.data || data.response || 'Meow~'}
｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    } catch {
        m.reply('❌ Failed!')
    }
}

handler.help = ['fiza', 'cat', 'dog', 'sensei', 'gf']
handler.tags = ['ai']
handler.command = ['fiza', 'cat', 'dog', 'sensei', 'gf']
export default handler