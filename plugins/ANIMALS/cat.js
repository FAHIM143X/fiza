// ═══════════════════════════════════════════════
// 🎀 FIZA — Cat Plugin (With Mode Check)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, isOwner, isROwner, isGroup }) => {
    
    // 🔒 Global Private Mode Check
    if (global.opts?.self && !isOwner && !isROwner) return
    
    // 🔇 Group Muted Check
    if (isGroup) {
        let db = global.db
        if (db?.data?.chats?.[m.chat]?.muted && !isOwner && !isROwner) return
    }
    
    let res = await fetch('https://api.thecatapi.com/v1/images/search')
    let data = await res.json()
    imgSingleButton(conn, m, data[0].url, '🐱 *MEOW!*', global.botname || 'FIZA', 'Next 🐱', `${usedPrefix}${command}`)
}

handler.help = ['cat', 'kitty']
handler.tags = ['fun']
handler.command = /^(cat|kitty|meow)$/i

export default handler