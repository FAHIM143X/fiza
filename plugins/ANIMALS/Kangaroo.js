// ═══════════════════════════════════════════════
// 🎀 FIZA — Kangaroo Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, isOwner, isROwner, isGroup }) => {
    if (global.opts?.self && !isOwner && !isROwner) return
    if (isGroup && global.db?.data?.chats?.[m.chat]?.muted && !isOwner && !isROwner) return
    
    let res = await fetch('https://some-random-api.com/animal/kangaroo')
    let data = await res.json()
    imgSingleButton(conn, m, data.image, '🦘 *KANGAROO!*', global.botname || 'FIZA', 'Next 🦘', `${usedPrefix}${command}`)
}

handler.help = ['kangaroo']; handler.tags = ['fun']; handler.command = /^(kangaroo)$/i
export default handler