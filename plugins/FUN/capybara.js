// ═══════════════════════════════════════════════
// 🎀 FIZA — Capybara Plugin
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, isOwner, isROwner, isGroup }) => {
    if (global.opts?.self && !isOwner && !isROwner) return
    if (isGroup && global.db?.data?.chats?.[m.chat]?.muted && !isOwner && !isROwner) return
    let res = await fetch('https://api.capy.lol/v1/capybara?json=true')
    let data = await res.json()
    imgSingleButton(conn, m, data.data.url, '🦫 *CAPYBARA!*', global.botname || 'FIZA', 'Next 🦫', `${usedPrefix}${command}`)
}
handler.help = ['capybara']; handler.tags = ['fun']; handler.command = /^(capybara)$/i
export default handler