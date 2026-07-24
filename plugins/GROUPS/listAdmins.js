// ═══════════════════════════════════════════════
// 🎀 FIZA — Group List Admins
// ═══════════════════════════════════════════════

let handler = async (m, { conn, isGroup, groupMetadata }) => {
    if (!isGroup) return m.reply('👥 *Group only!*')
    
    let admins = groupMetadata.participants.filter(p => p.admin)
    let txt = `｡ﾟ•┈୨💖୧┈•ﾟ｡
╭── 👑 *ADMINS* ──╮
│ 🌸 ${groupMetadata.subject}
│
${admins.map((p, i) => `│ ${i+1}. @${p.id.split('@')[0]} ${p.admin === 'superadmin' ? '👑' : '🛡️'}`).join('\n')}
│
│ 📊 Total: ${admins.length} admins
╰── ✨ FIZA ✨ ──╯
｡ﾟ•┈୨🌸୧┈•ﾟ｡`
    
    m.reply(txt, null, { mentions: admins.map(p => p.id) })
}

handler.help = ['listadmin', 'admins']
handler.tags = ['group']
handler.command = ['listadmin', 'admins', 'adminlist']
handler.group = true

export default handler