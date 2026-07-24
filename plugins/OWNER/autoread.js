// ═══════════════════════════════════════════════
// 🎀 FIZA — Owner AutoRead Toggle
// ═══════════════════════════════════════════════

let handler = async (m, { args, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')
    
    if (!args[0]) {
        let status = global.opts?.autoread ? '✅ ON' : '❌ OFF'
        return m.reply(`📊 *AutoRead:* ${status}\n\n.autoread on/off`)
    }
    
    if (args[0] === 'on') { global.opts.autoread = true; return m.reply('✅ AutoRead ON!') }
    if (args[0] === 'off') { global.opts.autoread = false; return m.reply('❌ AutoRead OFF!') }
}

handler.help = ['autoread']
handler.tags = ['owner']
handler.command = ['autoread', 'read']
handler.owner = true

export default handler