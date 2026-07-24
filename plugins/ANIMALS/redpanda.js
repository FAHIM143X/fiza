// ═══════════════════════════════════════════════
// 🎀 FIZA — Red Panda Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, isOwner, isROwner, isGroup }) => {
    if (global.opts?.self && !isOwner && !isROwner) return
    if (isGroup && global.db?.data?.chats?.[m.chat]?.muted && !isOwner && !isROwner) return
    let res = await fetch('https://some-random-api.com/animal/red_panda')
    let data = await res.json()
    imgSingleButton(conn, m, data.image, '🐾 *RED PANDA!*', global.botname || 'FIZA', 'Next 🐾', `${usedPrefix}${command}`)
}
handler.help = ['redpanda']; handler.tags = ['fun']; handler.command = /^(redpanda)$/i
export default handler