// ═══════════════════════════════════════════════
// 🎀 FIZA — Online Members Plugin (Fixed)
// ═══════════════════════════════════════════════

let handler = async (m, { conn, groupMetadata, participants }) => {

    if (!m.chat?.endsWith('@g.us')) return m.reply('👥 *Group only!*')

    let online = participants.filter(p => conn.presences?.[p.id])
    let total = participants.length
    let onlineCount = online.length

    let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 🟢 *ONLINE NOW* ──╮
│ 🌸 ${groupMetadata?.subject || 'Group'}
│
${onlineCount > 0 ? online.map((p, i) => `│ ${i+1}. @${p.id.split('@')[0]}`).join('\n') : '│ 😴 No one online'}
│
│ 📊 ${onlineCount}/${total} online
╰── ✨ FIZA ✨ ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`

    m.reply(txt, null, { mentions: online.map(p => p.id) })
}

handler.help = ['online', 'active']
handler.tags = ['group']
handler.command = ['online', 'active']
handler.group = true

export default handler