// ═══════════════════════════════════════════════
// 🎀 FIZA — Report Bug Plugin
// ═══════════════════════════════════════════════

let handler = async (m, { conn, text }) => {
    let botName = global.botname || 'FIZA'
    let ownerNumber = global.ownerNumber?.[0] || '917289881303'
    
    if (!text) return m.reply('📝 .report This command is broken!')
    
    let report = `📢 *BUG REPORT*\n\n👤 From: @${m.sender.split('@')[0]}\n💬 ${text}`
    let ownerJid = ownerNumber + '@s.whatsapp.net'
    
    await conn.sendMessage(ownerJid, { text: report, mentions: [m.sender] })
    m.reply(`｡ﾟ•┈୨💖୧┈•ﾟ｡\n✅ *Report sent!*\n💗 Thank you for helping improve ${botName}!\n｡ﾟ•┈୨🌸୧┈•ﾟ｡`)
}

handler.help = ['report', 'bug']
handler.tags = ['main']
handler.command = ['report', 'bug', 'bugreport']
export default handler