// ═══════════════════════════════════════════════
// 🎀 FIZA — Food Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, isOwner, isROwner, isGroup }) => {
    if (global.opts?.self && !isOwner && !isROwner) return
    if (isGroup && global.db?.data?.chats?.[m.chat]?.muted && !isOwner && !isROwner) return
    let res = await fetch('https://foodish-api.com/api/')
    let data = await res.json()
    imgSingleButton(conn, m, data.image, '🍕 *YUM!*', global.botname || 'FIZA', 'Next 🍕', `${usedPrefix}${command}`)
}
handler.help = ['food']; handler.tags = ['fun']; handler.command = /^(food)$/i
export default handler