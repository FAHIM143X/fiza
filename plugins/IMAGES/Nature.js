// ═══════════════════════════════════════════════
// 🎀 FIZA — Nature Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, isOwner, isROwner, isGroup }) => {
    if (global.opts?.self && !isOwner && !isROwner) return
    if (isGroup && global.db?.data?.chats?.[m.chat]?.muted && !isOwner && !isROwner) return
    let res = await fetch('https://picsum.photos/800/1000')
    let buffer = await res.buffer()
    imgSingleButton(conn, m, res.url, '🌿 *NATURE!*', global.botname || 'FIZA', 'Next 🌿', `${usedPrefix}${command}`)
}
handler.help = ['nature']; handler.tags = ['fun']; handler.command = /^(nature)$/i
export default handler