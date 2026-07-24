// ═══════════════════════════════════════════════
// 🎀 FIZA — Lizard Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, isOwner, isROwner, isGroup }) => {
    if (global.opts?.self && !isOwner && !isROwner) return
    if (isGroup && global.db?.data?.chats?.[m.chat]?.muted && !isOwner && !isROwner) return
    let res = await fetch('https://nekos.life/api/v2/img/lizard')
    let data = await res.json()
    imgSingleButton(conn, m, data.url, '🦎 *LIZARD!*', global.botname || 'FIZA', 'Next 🦎', `${usedPrefix}${command}`)
}
handler.help = ['lizard']; handler.tags = ['fun']; handler.command = /^(lizard)$/i
export default handler