// ═══════════════════════════════════════════════
// 🎀 FIZA — Dog Plugin (With Mode Check)
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
    
    let res = await fetch('https://dog.ceo/api/breeds/image/random')
    let data = await res.json()
    imgSingleButton(conn, m, data.message, '🐕 *WOOF!*', global.botname || 'FIZA', 'Next 🐕', `${usedPrefix}${command}`)
}

handler.help = ['dog', 'puppy']
handler.tags = ['fun']
handler.command = /^(dog|puppy|woof)$/i

export default handler