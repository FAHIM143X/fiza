// ═══════════════════════════════════════════════
// 🎀 FIZA — Goose Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, isOwner, isROwner, isGroup }) => {
    if (global.opts?.self && !isOwner && !isROwner) return
    if (isGroup && global.db?.data?.chats?.[m.chat]?.muted && !isOwner && !isROwner) return
    let res = await fetch('https://nekos.life/api/v2/img/goose')
    let data = await res.json()
    imgSingleButton(conn, m, data.url, '🪿 *GOOSE!*', global.botname || 'FIZA', 'Next 🪿', `${usedPrefix}${command}`)
}
handler.help = ['goose']; handler.tags = ['fun']; handler.command = /^(goose)$/i
export default handler