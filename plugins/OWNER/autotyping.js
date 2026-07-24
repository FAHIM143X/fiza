// ═══════════════════════════════════════════════
// 🎀 FIZA — Owner AutoTyping Toggle
// ═══════════════════════════════════════════════

let handler = async (m, { args, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')
    
    if (!args[0]) {
        let status = global.opts?.autoTyping ? '✅ ON' : '❌ OFF'
        return m.reply(`📊 *AutoTyping:* ${status}\n\n.autotype on/off`)
    }
    
    if (args[0] === 'on') { global.opts.autoTyping = true; return m.reply('✅ AutoTyping ON!') }
    if (args[0] === 'off') { global.opts.autoTyping = false; return m.reply('❌ AutoTyping OFF!') }
}

handler.help = ['autotype']
handler.tags = ['owner']
handler.command = ['autotype', 'typing']
handler.owner = true

export default handler