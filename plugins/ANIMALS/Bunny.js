// ═══════════════════════════════════════════════
// 🎀 FIZA — Bunny Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, isOwner, isROwner, isGroup }) => {
    if (global.opts?.self && !isOwner && !isROwner) return
    if (isGroup && global.db?.data?.chats?.[m.chat]?.muted && !isOwner && !isROwner) return
    let res = await fetch('https://api.bunnies.io/v2/loop/random/?media=gif,png')
    let data = await res.json()
    imgSingleButton(conn, m, data.media.poster, '🐰 *BUNNY!*', global.botname || 'FIZA', 'Next 🐰', `${usedPrefix}${command}`)
}
handler.help = ['bunny']; handler.tags = ['fun']; handler.command = /^(bunny|rabbit)$/i
export default handler