// ═══════════════════════════════════════════════
// 🎀 FIZA — Owner AntiSpam Toggle
// ═══════════════════════════════════════════════

let handler = async (m, { args, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')
    
    if (!args[0]) {
        let status = global.opts?.antiSpam !== false ? '✅ ON' : '❌ OFF'
        return m.reply(`📊 *AntiSpam:* ${status}\n\n.antispam on/off`)
    }
    
    if (args[0] === 'on') { global.opts.antiSpam = true; return m.reply('✅ AntiSpam ON!') }
    if (args[0] === 'off') { global.opts.antiSpam = false; return m.reply('❌ AntiSpam OFF!') }
}

handler.help = ['antispam']
handler.tags = ['owner']
handler.command = ['antispam']
handler.owner = true

export default handler