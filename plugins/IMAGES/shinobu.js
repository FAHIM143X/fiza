// ═══════════════════════════════════════════════
// 🎀 FIZA — Shinobu Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, isOwner, isROwner, isGroup }) => {
    if (global.opts?.self && !isOwner && !isROwner) return
    if (isGroup && global.db?.data?.chats?.[m.chat]?.muted && !isOwner && !isROwner) return
    
    let res = await fetch('https://api.waifu.pics/sfw/shinobu')
    let data = await res.json()
    imgSingleButton(conn, m, data.url, '🦋 *SHINOBU!*', global.botname || 'FIZA', 'Next 🦋', `${usedPrefix}${command}`)
}

handler.help = ['shinobu']; handler.tags = ['fun']; handler.command = /^(shinobu)$/i
export default handler