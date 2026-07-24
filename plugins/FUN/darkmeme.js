// ═══════════════════════════════════════════════
// 🎀 FIZA — Dark Meme Plugin (Programmer Humor)
// ═══════════════════════════════════════════════

import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, isOwner, isROwner, isGroup }) => {
    if (global.opts?.self && !isOwner && !isROwner) return
    if (isGroup && global.db?.data?.chats?.[m.chat]?.muted && !isOwner && !isROwner) return
    
    let res = await fetch('https://meme-api.com/gimme/ProgrammerHumor')
    let data = await res.json()
    imgSingleButton(conn, m, data.url, `💻 *${data.title}*`, global.botname || 'FIZA', 'Next 💻', `${usedPrefix}${command}`)
}

handler.help = ['programmer', 'codememe']
handler.tags = ['fun']
handler.command = /^(programmer|codememe)$/i
export default handler