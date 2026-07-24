// ═══════════════════════════════════════════════
// 🎀 FIZA — Megumin Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, isOwner, isROwner, isGroup }) => {
    if (global.opts?.self && !isOwner && !isROwner) return
    if (isGroup && global.db?.data?.chats?.[m.chat]?.muted && !isOwner && !isROwner) return
    
    let res = await fetch('https://api.waifu.pics/sfw/megumin')
    let data = await res.json()
    imgSingleButton(conn, m, data.url, '💥 *MEGUMIN!*', global.botname || 'FIZA', 'Next 💥', `${usedPrefix}${command}`)
}

handler.help = ['megumin']; handler.tags = ['fun']; handler.command = /^(megumin)$/i
export default handler