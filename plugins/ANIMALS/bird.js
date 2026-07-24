// ═══════════════════════════════════════════════
// 🎀 FIZA — Bird Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, isOwner, isROwner, isGroup }) => {
    if (global.opts?.self && !isOwner && !isROwner) return
    if (isGroup && global.db?.data?.chats?.[m.chat]?.muted && !isOwner && !isROwner) return
    
    let res = await fetch('https://some-random-api.com/animal/birb')
    let data = await res.json()
    imgSingleButton(conn, m, data.image, '🐦 *BIRD!*', global.botname || 'FIZA', 'Next 🐦', `${usedPrefix}${command}`)
}

handler.help = ['bird']; handler.tags = ['fun']; handler.command = /^(bird|birb)$/i
export default handler