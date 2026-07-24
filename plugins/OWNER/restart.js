// ═══════════════════════════════════════════════
// 🎀 FIZA — Owner Restart Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')
    
    await m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n🔄 *Restarting...*\n⏳ Please wait~\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
    process.exit(0)
}

handler.help = ['restart', 'reboot']
handler.tags = ['owner']
handler.command = ['restart', 'reboot', 'reload']
handler.owner = true

export default handler