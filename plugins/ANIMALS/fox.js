// ═══════════════════════════════════════════════
// 🎀 FIZA — Fox Plugin (With Mode Check)
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
    
    let res = await fetch('https://randomfox.ca/floof/')
    let data = await res.json()
    imgSingleButton(conn, m, data.image, '🦊 *FOX!*', global.botname || 'FIZA', 'Next 🦊', `${usedPrefix}${command}`)
}

handler.help = ['fox']
handler.tags = ['fun']
handler.command = /^(fox)$/i

export default handler