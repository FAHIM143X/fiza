// ═══════════════════════════════════════════════
// 🎀 FIZA — Owner Shutdown Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { isOwner, isROwner }) => {
    if (!isOwner && !isROwner) return m.reply('👑 *Owner only!*')
    
    await m.reply('｡ﾟ•┈୨💖୧┈•ﾟ｡\n🔴 *Shutting down...*\n💤 Bye bye~\n｡ﾟ•┈୨🌸୧┈•ﾟ｡')
    process.exit(0)
}

handler.help = ['shutdown', 'stop', 'off']
handler.tags = ['owner']
handler.command = ['shutdown', 'stop', 'off']
handler.owner = true

export default handler