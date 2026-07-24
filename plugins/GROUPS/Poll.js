// ═══════════════════════════════════════════════
// 🎀 FIZA — Poll Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text, isGroup }) => {
    if (!isGroup) return m.reply('👥 Group only!')
    if (!text) return m.reply('📝 .poll Question|Option1|Option2|Option3')
    
    let [question, ...options] = text.split('|')
    if (!question || options.length < 2) return m.reply('📝 .poll Question|Yes|No')
    
    await conn.sendMessage(m.chat, {
        poll: {
            name: question.trim(),
            values: options.map(o => o.trim()),
            selectableCount: 1
        }
    })
}

handler.help = ['poll']
handler.tags = ['group']
handler.command = ['poll', 'vote']
handler.group = true

export default handler