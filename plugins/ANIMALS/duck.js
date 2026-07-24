// ═══════════════════════════════════════════════
// 🎀 FIZA — Duck Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, isOwner, isROwner, isGroup }) => {
    if (global.opts?.self && !isOwner && !isROwner) return
    if (isGroup && global.db?.data?.chats?.[m.chat]?.muted && !isOwner && !isROwner) return
    let res = await fetch('https://random-d.uk/api/random')
    let data = await res.json()
    imgSingleButton(conn, m, data.url, '🦆 *QUACK!*', global.botname || 'FIZA', 'Next 🦆', `${usedPrefix}${command}`)
}
handler.help = ['duck']; handler.tags = ['fun']; handler.command = /^(duck)$/i
export default handler